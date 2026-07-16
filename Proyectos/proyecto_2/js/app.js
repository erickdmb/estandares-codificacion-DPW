/**
 * @fileoverview Aplicacion principal del Gestor de Gastos
 */
const GestorGastos = {
    gastos: [],
    STORAGE_KEY: 'gestorGastos_lista',
    editandoId: null,

    init() {
        console.log('Inicializando Gestor de Gastos...');
        this.formulario = document.getElementById('gastoForm');
        this.configurarEventos();
        this.cargarGastos();
        this.establecerFechaPredeterminada();
    },

    configurarEventos() {
        this.formulario.addEventListener('submit', (e) => this.manejarSubmit(e));
        this.formulario.addEventListener('reset', () => this.limpiarFormulario());

        document.getElementById('filtroCategoria').addEventListener('change', () => this.renderizarLista());
        document.getElementById('btnLimpiarGastos').addEventListener('click', () => this.limpiarTodosGastos());
    },

    establecerFechaPredeterminada() {
        const fechaInput = document.getElementById('fechaGasto');
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.value = hoy;
    },

    manejarSubmit(e) {
        e.preventDefault();
        ValidadorGastos.limpiarErrores();

        const gasto = this.obtenerDatosFormulario();
        const validacion = ValidadorGastos.validarGasto(gasto);

        if (!validacion.esValido) {
            this.mostrarErrores(validacion.errores);
            return;
        }

        if (this.editandoId) {
            this.actualizarGasto(this.editandoId, gasto);
            this.editandoId = null;
            this.formulario.querySelector('button[type="submit"]').textContent = 'Agregar Gasto';
        } else {
            this.agregarGasto(gasto);
        }

        this.limpiarFormulario();
    },

    obtenerDatosFormulario() {
        return {
            descripcion: document.getElementById('descripcionGasto').value.trim(),
            monto: parseFloat(document.getElementById('montoGasto').value),
            categoria: document.getElementById('categoriaGasto').value,
            fecha: document.getElementById('fechaGasto').value
        };
    },

    mostrarErrores(errores) {
        if (errores.descripcion) ValidadorGastos.mostrarError('errorDescripcion', errores.descripcion);
        if (errores.monto) ValidadorGastos.mostrarError('errorMonto', errores.monto);
        if (errores.categoria) ValidadorGastos.mostrarError('errorCategoria', errores.categoria);
        if (errores.fecha) ValidadorGastos.mostrarError('errorFecha', errores.fecha);
    },

    agregarGasto(gasto) {
        gasto.id = Date.now().toString();
        gasto.fechaCreacion = new Date().toISOString();
        this.gastos.unshift(gasto);
        this.guardarGastos();
        this.renderizarTodo();
    },

    actualizarGasto(id, gasto) {
        const index = this.gastos.findIndex(g => g.id === id);
        if (index !== -1) {
            this.gastos[index] = { ...this.gastos[index], ...gasto };
            this.guardarGastos();
            this.renderizarTodo();
        }
    },

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(g => g.id !== id);
        this.guardarGastos();
        this.renderizarTodo();
    },

    editarGasto(id) {
        const gasto = this.gastos.find(g => g.id === id);
        if (gasto) {
            document.getElementById('descripcionGasto').value = gasto.descripcion;
            document.getElementById('montoGasto').value = gasto.monto;
            document.getElementById('categoriaGasto').value = gasto.categoria;
            document.getElementById('fechaGasto').value = gasto.fecha;
            this.editandoId = id;
            this.formulario.querySelector('button[type="submit"]').textContent = 'Actualizar Gasto';
        }
    },

    limpiarFormulario() {
        this.formulario.reset();
        this.establecerFechaPredeterminada();
        ValidadorGastos.limpiarErrores();
        this.editandoId = null;
        this.formulario.querySelector('button[type="submit"]').textContent = 'Agregar Gasto';
    },

    limpiarTodosGastos() {
        if (confirm('Estas seguro de eliminar todos los gastos?')) {
            this.gastos = [];
            this.guardarGastos();
            this.renderizarTodo();
        }
    },

    calcularTotalGastos(gastos) {
        const lista = gastos || this.gastos;
        return lista.reduce(function(sum, g) { return sum + g.monto; }, 0);
    },

    obtenerGastosPorCategoria(gastos) {
        const lista = gastos || this.gastos;
        const resumen = {};
        lista.forEach(function(g) {
            resumen[g.categoria] = (resumen[g.categoria] || 0) + g.monto;
        });
        return resumen;
    },

    renderizarResumen() {
        const total = this.calcularTotalGastos();
        document.getElementById('totalGastos').textContent = 'S/ ' + total.toFixed(2);

        const porCategoria = this.obtenerGastosPorCategoria();
        const contenedor = document.getElementById('resumenCategorias');

        const nombres = {
            alimentacion: 'Alimentacion', transporte: 'Transporte', entretenimiento: 'Entretenimiento',
            salud: 'Salud', educacion: 'Educacion', servicios: 'Servicios', otros: 'Otros'
        };

        let html = '';
        for (const categoria in porCategoria) {
            if (porCategoria.hasOwnProperty(categoria)) {
                const monto = porCategoria[categoria];
                html +=
                    '<div class="category-card">' +
                        '<p class="category-card__name">' + (nombres[categoria] || categoria) + '</p>' +
                        '<p class="category-card__amount">S/ ' + monto.toFixed(2) + '</p>' +
                    '</div>';
            }
        }
        contenedor.innerHTML = html || '<p class="summary__empty">Sin gastos registrados</p>';
    },

    renderizarLista() {
        const filtro = document.getElementById('filtroCategoria').value;
        const gastosFiltrados = filtro ? this.gastos.filter(function(g) { return g.categoria === filtro; }) : this.gastos;
        const contenedor = document.getElementById('listaGastos');
        const btnLimpiar = document.getElementById('btnLimpiarGastos');

        if (gastosFiltrados.length === 0) {
            contenedor.innerHTML = '<p class="expense-list__empty">No hay gastos registrados</p>';
            btnLimpiar.classList.add('btn--hidden');
            return;
        }

        let html = '';
        for (let i = 0; i < gastosFiltrados.length; i++) {
            const gasto = gastosFiltrados[i];
            const fechaFormateada = new Date(gasto.fecha).toLocaleDateString('es-ES', {
                day: '2-digit', month: 'short', year: 'numeric'
            });
            html +=
                '<article class="expense-item">' +
                    '<div class="expense-item__info">' +
                        '<p class="expense-item__description">' + gasto.descripcion + '</p>' +
                        '<p class="expense-item__details">' + gasto.categoria + ' - ' + fechaFormateada + '</p>' +
                    '</div>' +
                    '<p class="expense-item__amount">S/ ' + gasto.monto.toFixed(2) + '</p>' +
                    '<div class="expense-item__actions">' +
                        '<button type="button" class="expense-item__btn expense-item__btn--edit" onclick="GestorGastos.editarGasto(\'' + gasto.id + '\')">Editar</button>' +
                        '<button type="button" class="expense-item__btn expense-item__btn--delete" onclick="GestorGastos.eliminarGasto(\'' + gasto.id + '\')">Eliminar</button>' +
                    '</div>' +
                '</article>';
        }

        contenedor.innerHTML = html;
        btnLimpiar.classList.toggle('btn--hidden', this.gastos.length === 0);
    },

    renderizarTodo() {
        this.renderizarResumen();
        this.renderizarLista();
    },

    guardarGastos() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.gastos));
    },

    cargarGastos() {
        try {
            const datos = localStorage.getItem(this.STORAGE_KEY);
            if (datos) {
                this.gastos = JSON.parse(datos);
                this.renderizarTodo();
            }
        } catch (error) {
            console.error('Error al cargar gastos:', error);
            this.gastos = [];
        }
    }
};

document.addEventListener('DOMContentLoaded', () => GestorGastos.init());
