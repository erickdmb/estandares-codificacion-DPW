/**
 * @fileoverview Calculadora de IMC - Lógica de cálculos
 */
const CalculadoraIMC = {
    /**
     * Calcula el Índice de Masa Corporal
     * @param {number} peso - Peso en kilogramos
     * @param {number} altura - Altura en centímetros
     * @returns {number} IMC redondeado a 2 decimales
     */
    calcularIMC(peso, altura) {
        const alturaMetros = altura / 100;
        const imc = peso / (alturaMetros * alturaMetros);
        return Math.round(imc * 100) / 100;
    },

    /**
     * Clasifica el IMC según la OMS
     * @param {number} imc 
     * @returns {string} Clasificación
     */
    clasificarIMC(imc) {
        if (imc < 18.5) return 'bajo';
        if (imc < 25) return 'normal';
        if (imc < 30) return 'sobrepeso';
        if (imc < 35) return 'obeso1';
        if (imc < 40) return 'obeso2';
        return 'obeso3';
    },

    /**
     * Obtiene el nombre de la clasificación
     * @param {string} clasificacion 
     * @returns {string}
     */
    obtenerNombreClasificacion(clasificacion) {
        const nombres = {
            bajo: 'Bajo peso',
            normal: 'Peso normal',
            sobrepeso: 'Sobrepeso',
            obeso1: 'Obesidad grado I',
            obeso2: 'Obesidad grado II',
            obeso3: 'Obesidad grado III'
        };
        return nombres[clasificacion] || 'Desconocido';
    },

    /**
     * Calcula el peso ideal según el IMC normal (22)
     * @param {number} altura - Altura en centímetros
     * @returns {number} Peso ideal en kg
     */
    calcularPesoIdeal(altura) {
        const alturaMetros = altura / 100;
        return Math.round(22 * alturaMetros * alturaMetros * 10) / 10;
    },

    /**
     * Calcula el rango de peso saludable
     * @param {number} altura - Altura en centímetros
     * @returns {{min: number, max: number}}
     */
    calcularRangoPesoSaludable(altura) {
        const alturaMetros = altura / 100;
        return {
            min: Math.round(18.5 * alturaMetros * alturaMetros * 10) / 10,
            max: Math.round(24.9 * alturaMetros * alturaMetros * 10) / 10
        };
    }
};

window.CalculadoraIMC = CalculadoraIMC;

/**
 * @fileoverview Aplicación principal de la Calculadora de IMC
 */
const AppIMC = {
    historial: [],
    STORAGE_KEY: 'calculadoraIMC_historial',

    init() {
        console.log('Inicializando Calculadora de IMC...');
        this.formulario = document.getElementById('imcForm');
        this.configurarEventos();
        this.cargarHistorial();
    },

    configurarEventos() {
        this.formulario.addEventListener('submit', (e) => this.manejarSubmit(e));
        this.formulario.addEventListener('reset', () => this.limpiarResultados());
        
        const inputs = this.formulario.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validarCampoIndividual(input));
            input.addEventListener('input', () => this.limpiarErrorCampo(input));
        });

        document.getElementById('btnLimpiarHistorial').addEventListener('click', () => this.limpiarHistorial());
    },

    manejarSubmit(e) {
        e.preventDefault();
        ValidadorIMC.limpiarErrores();

        const datos = this.obtenerDatosFormulario();
        const validacion = ValidadorIMC.validarFormulario(datos);

        if (!validacion.esValido) {
            this.mostrarErrores(validacion.errores);
            return;
        }

        const resultado = this.calcular(datos);
        this.mostrarResultado(resultado);
        this.guardarEnHistorial(datos, resultado);
    },

    obtenerDatosFormulario() {
        return {
            peso: parseFloat(document.getElementById('peso').value),
            altura: parseFloat(document.getElementById('altura').value),
            edad: parseInt(document.getElementById('edad').value),
            sexo: document.getElementById('sexo').value
        };
    },

    mostrarErrores(errores) {
        if (errores.peso) ValidadorIMC.mostrarError('errorPeso', errores.peso);
        if (errores.altura) ValidadorIMC.mostrarError('errorAltura', errores.altura);
        if (errores.edad) ValidadorIMC.mostrarError('errorEdad', errores.edad);
        if (errores.sexo) ValidadorIMC.mostrarError('errorSexo', errores.sexo);
    },

    validarCampoIndividual(input) {
        const nombre = input.name;
        const valor = input.type === 'number' ? parseFloat(input.value) : input.value;
        
        let esValido = true;
        switch (nombre) {
            case 'peso': esValido = ValidadorIMC.validarPeso(valor); break;
            case 'altura': esValido = ValidadorIMC.validarAltura(valor); break;
            case 'edad': esValido = ValidadorIMC.validarEdad(valor); break;
            case 'sexo': esValido = ValidadorIMC.validarSexo(valor); break;
        }

        if (!esValido && valor) {
            ValidadorIMC.mostrarError(`error${this.capitalizar(nombre)}`, ValidadorIMC.mensajes[`${nombre}Invalido`] || ValidadorIMC.mensajes.campoRequerido);
        }
    },

    limpiarErrorCampo(input) {
        const idError = `error${this.capitalizar(input.name)}`;
        const elemento = document.getElementById(idError);
        if (elemento) elemento.textContent = '';
    },

    capitalizar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    calcular(datos) {
        const imc = CalculadoraIMC.calcularIMC(datos.peso, datos.altura);
        const clasificacion = CalculadoraIMC.clasificarIMC(imc);
        const nombreClasificacion = CalculadoraIMC.obtenerNombreClasificacion(clasificacion);
        const pesoIdeal = CalculadoraIMC.calcularPesoIdeal(datos.altura);
        const rangoSaludable = CalculadoraIMC.calcularRangoPesoSaludable(datos.altura);

        return {
            imc,
            clasificacion,
            nombreClasificacion,
            pesoIdeal,
            rangoSaludable,
            datos
        };
    },

    mostrarResultado(resultado) {
        const contenedor = document.getElementById('resultadoContainer');
        
        contenedor.innerHTML = `
            <div class="result-card result-card--${resultado.clasificacion}">
                <p class="result-card__value">${resultado.imc}</p>
                <p class="result-card__category">${resultado.nombreClasificacion}</p>
                <div class="result-card__details">
                    <p>Altura: ${resultado.datos.altura} cm</p>
                    <p>Peso: ${resultado.datos.peso} kg</p>
                    <p>Peso ideal: ${resultado.pesoIdeal} kg</p>
                    <p>Rango saludable: ${resultado.rangoSaludable.min} - ${resultado.rangoSaludable.max} kg</p>
                    <p>Edad: ${resultado.datos.edad} anos</p>
                </div>
            </div>
        `;
    },

    limpiarResultados() {
        ValidadorIMC.limpiarErrores();
        document.getElementById('resultadoContainer').innerHTML = '<p class="result__empty">Ingresa tus datos para ver el resultado</p>';
    },

    guardarEnHistorial(datos, resultado) {
        const registro = {
            fecha: new Date().toISOString(),
            datos: { ...datos },
            imc: resultado.imc,
            clasificacion: resultado.nombreClasificacion
        };

        this.historial.unshift(registro);
        if (this.historial.length > 10) this.historial = this.historial.slice(0, 10);
        
        this.guardarStorage();
        this.renderizarHistorial();
    },

    renderizarHistorial() {
        const contenedor = document.getElementById('historialContainer');
        const btnLimpiar = document.getElementById('btnLimpiarHistorial');

        if (this.historial.length === 0) {
            contenedor.innerHTML = '<p class="history__empty">No hay registros guardados</p>';
            btnLimpiar.classList.add('btn--hidden');
            return;
        }

        let html = '';
        for (const registro of this.historial) {
            const fecha = new Date(registro.fecha);
            const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            html += `
                <article class="history-item">
                    <div class="history-item__data">
                        <p>${registro.datos.peso} kg / ${registro.datos.altura} cm</p>
                        <p class="history-item__date">${fechaFormateada}</p>
                    </div>
                    <div class="history-item__imc">${registro.imc} - ${registro.clasificacion}</div>
                </article>
            `;
        }

        contenedor.innerHTML = html;
        btnLimpiar.classList.remove('btn--hidden');
    },

    limpiarHistorial() {
        if (confirm('¿Limpiar todo el historial?')) {
            this.historial = [];
            this.guardarStorage();
            this.renderizarHistorial();
        }
    },

    guardarStorage() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.historial));
        } catch (error) {
            console.error('Error al guardar historial:', error);
        }
    },

    cargarHistorial() {
        try {
            const datos = localStorage.getItem(this.STORAGE_KEY);
            if (datos) {
                this.historial = JSON.parse(datos);
                this.renderizarHistorial();
            }
        } catch (error) {
            console.error('Error al cargar historial:', error);
            this.historial = [];
        }
    }
};

document.addEventListener('DOMContentLoaded', () => AppIMC.init());
