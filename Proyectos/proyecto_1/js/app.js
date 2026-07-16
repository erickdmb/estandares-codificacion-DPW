/**
 * @fileoverview Modulo de calculos financieros para la Calculadora de Ahorro
 */
const ModuloCalculos = {
    /**
     * Calcula el ahorro mensual disponible
     * @param {number} ingresoMensual
     * @param {number} gastosMensuales
     * @returns {number}
     */
    calcularAhorroMensual(ingresoMensual, gastosMensuales) {
        const ahorro = ingresoMensual - gastosMensuales;
        return Math.max(0, ahorro);
    },

    /**
     * Calcula los meses necesarios para alcanzar una meta
     * @param {number} ahorroActual
     * @param {number} metaAhorro
     * @param {number} ahorroMensual
     * @returns {number}
     */
    calcularMesesParaMeta(ahorroActual, metaAhorro, ahorroMensual) {
        if (ahorroActual >= metaAhorro) return 0;
        if (ahorroMensual <= 0) return Infinity;
        const montoRestante = metaAhorro - ahorroActual;
        return Math.ceil(montoRestante / ahorroMensual);
    },

    /**
     * Calcula el porcentaje de ahorro sobre el ingreso
     * @param {number} ahorro
     * @param {number} ingreso
     * @returns {number}
     */
    calcularPorcentajeAhorro(ahorro, ingreso) {
        if (ingreso <= 0) return 0;
        return (ahorro / ingreso) * 100;
    }
};

window.ModuloCalculos = ModuloCalculos;

/**
 * @fileoverview Aplicacion principal de la Calculadora de Ahorro
 */
const AppAhorro = {
    formulario: null,
    historialCalculos: [],
    STORAGE_KEY: 'calculadoraAhorro_historial',

    init() {
        console.log('Inicializando Calculadora de Ahorro...');
        this.formulario = document.getElementById('ahorroForm');
        this.configurarEventos();
        this.cargarHistorial();
    },

    configurarEventos() {
        this.formulario.addEventListener('submit', (e) => this.manejarSubmit(e));
        this.formulario.addEventListener('reset', () => this.manejarReset());

        const inputs = this.formulario.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => this.validarCampoEnTiempoReal(e.target));
            input.addEventListener('input', () => this.limpiarErrorCampo(input));
        });

        const btnLimpiarHistorial = document.getElementById('btnLimpiarHistorial');
        if (btnLimpiarHistorial) {
            btnLimpiarHistorial.addEventListener('click', () => this.limpiarHistorial());
        }
    },

    manejarSubmit(evento) {
        evento.preventDefault();
        ModuloValidaciones.limpiarErrores();
        const validacion = ModuloValidaciones.validarFormulario(this.formulario);

        if (!validacion.esValido) {
            this.mostrarErrores(validacion.resultados);
            return;
        }

        const datos = this.obtenerDatosFormulario();
        const resultados = this.calcularResultados(datos);
        this.mostrarResultados(resultados);
        this.guardarEnHistorial(datos, resultados);
    },

    manejarReset() {
        ModuloValidaciones.limpiarErrores();
        this.limpiarResultados();
    },

    obtenerDatosFormulario() {
        return {
            ahorroActual: parseFloat(document.getElementById('ahorroActual').value) || 0,
            ingresoMensual: parseFloat(document.getElementById('ingresoMensual').value) || 0,
            gastosMensuales: parseFloat(document.getElementById('gastosMensuales').value) || 0,
            metaAhorro: parseFloat(document.getElementById('metaAhorro').value) || 0
        };
    },

    calcularResultados(datos) {
        const ahorroMensual = ModuloCalculos.calcularAhorroMensual(datos.ingresoMensual, datos.gastosMensuales);
        const montoRestante = Math.max(0, datos.metaAhorro - datos.ahorroActual);
        const mesesParaMeta = ModuloCalculos.calcularMesesParaMeta(datos.ahorroActual, datos.metaAhorro, ahorroMensual);
        const porcentajeAhorro = ModuloCalculos.calcularPorcentajeAhorro(ahorroMensual, datos.ingresoMensual);

        return { ahorroMensual, montoRestante, mesesParaMeta, porcentajeAhorro };
    },

    mostrarErrores(resultados) {
        Object.keys(resultados).forEach(nombreCampo => {
            const resultado = resultados[nombreCampo];
            const idError = 'error' + this.capitalizar(nombreCampo);
            if (!resultado.esValido) {
                ModuloValidaciones.mostrarError(idError, resultado.mensaje);
            }
        });
    },

    validarCampoEnTiempoReal(input) {
        const resultado = ModuloValidaciones.validarCampo(input);
        const idError = 'error' + this.capitalizar(input.name);
        if (!resultado.esValido) {
            ModuloValidaciones.mostrarError(idError, resultado.mensaje);
        } else {
            this.limpiarErrorCampo(input);
        }
    },

    limpiarErrorCampo(input) {
        const idError = 'error' + this.capitalizar(input.name);
        const elementoError = document.getElementById(idError);
        if (elementoError) elementoError.textContent = '';
    },

    mostrarResultados(resultados) {
        const contenedor = document.getElementById('resultadosContainer');
        contenedor.innerHTML =
            '<article class="result-card result-card--highlight">' +
                '<p class="result-card__title">Ahorro Mensual</p>' +
                '<p class="result-card__value">S/ ' + resultados.ahorroMensual.toFixed(2) + '</p>' +
            '</article>' +
            '<article class="result-card">' +
                '<p class="result-card__title">Monto Restante para Meta</p>' +
                '<p class="result-card__value">S/ ' + resultados.montoRestante.toFixed(2) + '</p>' +
            '</article>' +
            '<article class="result-card">' +
                '<p class="result-card__title">Meses para Alcanzar Meta</p>' +
                '<p class="result-card__value">' + (resultados.mesesParaMeta === Infinity ? 'No es posible' : resultados.mesesParaMeta + ' meses') + '</p>' +
            '</article>' +
            '<article class="result-card">' +
                '<p class="result-card__title">Porcentaje de Ahorro</p>' +
                '<p class="result-card__value">' + resultados.porcentajeAhorro.toFixed(1) + '%</p>' +
            '</article>';
    },

    limpiarResultados() {
        document.getElementById('resultadosContainer').innerHTML =
            '<p class="results__empty">Ingresa tus datos para ver los resultados</p>';
    },

    capitalizar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    guardarEnHistorial(datos, resultados) {
        const registro = {
            fecha: new Date().toISOString(),
            datos: { ahorroActual: datos.ahorroActual, metaAhorro: datos.metaAhorro },
            resultados: { ahorroMensual: resultados.ahorroMensual, mesesParaMeta: resultados.mesesParaMeta }
        };
        this.historialCalculos.unshift(registro);
        if (this.historialCalculos.length > 10) this.historialCalculos = this.historialCalculos.slice(0, 10);
        this.guardarEnStorage();
        this.renderizarHistorial();
    },

    cargarHistorial() {
        try {
            const datosGuardados = localStorage.getItem(this.STORAGE_KEY);
            if (datosGuardados) {
                this.historialCalculos = JSON.parse(datosGuardados);
                this.renderizarHistorial();
            }
        } catch (error) {
            console.error('Error al cargar historial:', error);
            this.historialCalculos = [];
        }
    },

    guardarEnStorage() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.historialCalculos));
        } catch (error) {
            console.error('Error al guardar historial:', error);
        }
    },

    renderizarHistorial() {
        const contenedor = document.getElementById('historialContainer');
        const btnLimpiar = document.getElementById('btnLimpiarHistorial');

        if (this.historialCalculos.length === 0) {
            contenedor.innerHTML = '<p class="history__empty">No hay calculos guardados</p>';
            btnLimpiar.classList.add('btn--hidden');
            return;
        }

        let html = '';
        for (const registro of this.historialCalculos) {
            const fecha = new Date(registro.fecha);
            const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
            });
            html +=
                '<article class="history__item">' +
                    '<div class="history__item-info">' +
                        '<p class="history__item-date">' + fechaFormateada + '</p>' +
                        '<p class="history__item-details">' +
                            'Ahorro: S/ ' + registro.datos.ahorroActual.toFixed(0) + ' | Meta: S/ ' + registro.datos.metaAhorro.toFixed(0) +
                        '</p>' +
                    '</div>' +
                    '<p class="history__item-amount">S/ ' + registro.resultados.ahorroMensual.toFixed(0) + '/mes</p>' +
                '</article>';
        }

        contenedor.innerHTML = html;
        btnLimpiar.classList.remove('btn--hidden');
    },

    limpiarHistorial() {
        this.historialCalculos = [];
        localStorage.removeItem(this.STORAGE_KEY);
        this.renderizarHistorial();
    }
};

document.addEventListener('DOMContentLoaded', () => AppAhorro.init());
