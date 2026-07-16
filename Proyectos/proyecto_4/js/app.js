/**
 * @fileoverview Aplicación principal de Lista de Tareas
 */
const GestorTareas = {
    tareas: [],
    STORAGE_KEY: 'gestorTareas_lista',
    editandoId: null,

    init() {
        console.log('Inicializando Gestor de Tareas...');
        this.formulario = document.getElementById('tareaForm');
        this.configurarEventos();
        this.cargarTareas();
    },

    configurarEventos() {
        this.formulario.addEventListener('submit', (e) => this.manejarSubmit(e));
        
        document.getElementById('btnCancelar').addEventListener('click', () => this.cancelarEdicion());
        document.getElementById('btnLimpiarCompletadas').addEventListener('click', () => this.limpiarCompletadas());
        document.getElementById('btnLimpiarTodas').addEventListener('click', () => this.limpiarTodas());

        document.getElementById('filtroEstado').addEventListener('change', () => this.renderizar());
        document.getElementById('filtroPrioridad').addEventListener('change', () => this.renderizar());
        document.getElementById('ordenarPor').addEventListener('change', () => this.renderizar());
    },

    manejarSubmit(e) {
        e.preventDefault();
        ValidadorTareas.limpiarErrores();

        const tarea = this.obtenerDatosFormulario();
        const validacion = ValidadorTareas.validarTarea(tarea);

        if (!validacion.esValido) {
            this.mostrarErrores(validacion.errores);
            return;
        }

        if (this.editandoId) {
            this.actualizarTarea(this.editandoId, tarea);
            this.cancelarEdicion();
        } else {
            this.agregarTarea(tarea);
        }

        this.limpiarFormulario();
    },

    obtenerDatosFormulario() {
        return {
            titulo: document.getElementById('tituloTarea').value.trim(),
            descripcion: document.getElementById('descripcionTarea').value.trim(),
            prioridad: document.getElementById('prioridadTarea').value,
            fechaLimite: document.getElementById('fechaLimite').value,
            categoria: document.getElementById('categoriaTarea').value
        };
    },

    mostrarErrores(errores) {
        if (errores.titulo) ValidadorTareas.mostrarError('errorTitulo', errores.titulo);
    },

    agregarTarea(tarea) {
        tarea.id = Date.now().toString();
        tarea.completada = false;
        tarea.fechaCreacion = new Date().toISOString();
        this.tareas.unshift(tarea);
        this.guardarTareas();
        this.renderizar();
    },

    actualizarTarea(id, datos) {
        const index = this.tareas.findIndex(t => t.id === id);
        if (index !== -1) {
            this.tareas[index] = { ...this.tareas[index], ...datos };
            this.guardarTareas();
            this.renderizar();
        }
    },

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.guardarTareas();
        this.renderizar();
    },

    toggleCompletada(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;
            this.guardarTareas();
            this.renderizar();
        }
    },

    editarTarea(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            document.getElementById('tituloTarea').value = tarea.titulo;
            document.getElementById('descripcionTarea').value = tarea.descripcion || '';
            document.getElementById('prioridadTarea').value = tarea.prioridad;
            document.getElementById('fechaLimite').value = tarea.fechaLimite || '';
            document.getElementById('categoriaTarea').value = tarea.categoria || 'general';
            
            this.editandoId = id;
            document.getElementById('formTitle').textContent = 'Editar Tarea';
            document.getElementById('btnSubmit').textContent = 'Actualizar';
            document.getElementById('btnCancelar').classList.remove('btn--hidden');
            document.getElementById('tituloTarea').focus();
        }
    },

    cancelarEdicion() {
        this.editandoId = null;
        this.limpiarFormulario();
        document.getElementById('formTitle').textContent = 'Nueva Tarea';
        document.getElementById('btnSubmit').textContent = 'Agregar Tarea';
        document.getElementById('btnCancelar').classList.add('btn--hidden');
    },

    limpiarFormulario() {
        this.formulario.reset();
        ValidadorTareas.limpiarErrores();
    },

    limpiarCompletadas() {
        if (confirm('¿Eliminar todas las tareas completadas?')) {
            this.tareas = this.tareas.filter(t => !t.completada);
            this.guardarTareas();
            this.renderizar();
        }
    },

    limpiarTodas() {
        if (confirm('¿Eliminar TODAS las tareas? Esta acción no se puede deshacer.')) {
            this.tareas = [];
            this.guardarTareas();
            this.renderizar();
        }
    },

    calcularEstadisticas(tareas = this.tareas) {
        return {
            total: tareas.length,
            completadas: tareas.filter(t => t.completada).length,
            pendientes: tareas.filter(t => !t.completada).length
        };
    },

    filtrarPorEstado(tareas, estado) {
        if (estado === 'todas') return tareas;
        if (estado === 'pendientes') return tareas.filter(t => !t.completada);
        if (estado === 'completadas') return tareas.filter(t => t.completada);
        return tareas;
    },

    filtrarPorPrioridad(tareas, prioridad) {
        if (prioridad === 'todas') return tareas;
        return tareas.filter(t => t.prioridad === prioridad);
    },

    ordenarPorPrioridad(tareas) {
        const orden = { alta: 0, media: 1, baja: 2 };
        return [...tareas].sort((a, b) => orden[a.prioridad] - orden[b.prioridad]);
    },

    ordenarPorFecha(tareas) {
        return [...tareas].sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
    },

    ordenarPorFechaLimite(tareas) {
        return [...tareas].sort((a, b) => {
            if (!a.fechaLimite) return 1;
            if (!b.fechaLimite) return -1;
            return new Date(a.fechaLimite) - new Date(b.fechaLimite);
        });
    },

    renderizar() {
        this.renderizarEstadisticas();
        this.renderizarLista();
    },

    renderizarEstadisticas() {
        const stats = this.calcularEstadisticas();
        document.getElementById('totalTareas').textContent = stats.total;
        document.getElementById('tareasCompletadas').textContent = stats.completadas;
        document.getElementById('tareasPendientes').textContent = stats.pendientes;
    },

    renderizarLista() {
        const contenedor = document.getElementById('listaTareas');
        const filtroEstado = document.getElementById('filtroEstado').value;
        const filtroPrioridad = document.getElementById('filtroPrioridad').value;
        const ordenarPor = document.getElementById('ordenarPor').value;

        let tareasFiltradas = this.filtrarPorEstado(this.tareas, filtroEstado);
        tareasFiltradas = this.filtrarPorPrioridad(tareasFiltradas, filtroPrioridad);

        if (ordenarPor === 'prioridad') tareasFiltradas = this.ordenarPorPrioridad(tareasFiltradas);
        else if (ordenarPor === 'fechaLimite') tareasFiltradas = this.ordenarPorFechaLimite(tareasFiltradas);
        else tareasFiltradas = this.ordenarPorFecha(tareasFiltradas);

        if (tareasFiltradas.length === 0) {
            contenedor.innerHTML = '<p class="task-list__empty">No hay tareas. Agrega una!</p>';
            return;
        }

        let html = '';
        for (const tarea of tareasFiltradas) {
            const fechaFormateada = tarea.fechaLimite ? this.formatearFecha(tarea.fechaLimite) : null;
            const estaVencida = fechaFormateada && new Date(tarea.fechaLimite) < new Date() && !tarea.completada;
            const claseCompletada = tarea.completada ? ' task-item--completed' : '';

            html +=
                '<article class="task-item' + claseCompletada + '">' +
                    '<input type="checkbox" class="task-item__checkbox"' + (tarea.completada ? ' checked' : '') +
                    ' onchange="GestorTareas.toggleCompletada(\'' + tarea.id + '\')">' +
                    '<div class="task-item__content">' +
                        '<p class="task-item__title">' + this.escaparHTML(tarea.titulo) + '</p>' +
                        '<p class="task-item__meta">' +
                            tarea.prioridad + ' | ' + tarea.categoria +
                            (fechaFormateada ? ' | ' + fechaFormateada + (estaVencida ? ' (Vencida)' : '') : '') +
                        '</p>' +
                    '</div>' +
                    '<div class="task-item__actions">' +
                        '<button type="button" class="task-item__btn task-item__btn--edit" onclick="GestorTareas.editarTarea(\'' + tarea.id + '\')">Editar</button>' +
                        '<button type="button" class="task-item__btn task-item__btn--delete" onclick="GestorTareas.eliminarTarea(\'' + tarea.id + '\')">Eliminar</button>' +
                    '</div>' +
                '</article>';
        }

        contenedor.innerHTML = html;
    },

    escaparHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    },

    formatearFecha(fecha) {
        return new Date(fecha).toLocaleDateString('es-ES', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    },

    formatearFechaCorta(fechaISO) {
        return new Date(fechaISO).toLocaleDateString('es-ES', {
            day: '2-digit', month: 'short'
        });
    },

    guardarTareas() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tareas));
    },

    cargarTareas() {
        try {
            const datos = localStorage.getItem(this.STORAGE_KEY);
            if (datos) {
                this.tareas = JSON.parse(datos);
                this.renderizar();
            }
        } catch (error) {
            console.error('Error al cargar tareas:', error);
            this.tareas = [];
        }
    }
};

document.addEventListener('DOMContentLoaded', () => GestorTareas.init());
