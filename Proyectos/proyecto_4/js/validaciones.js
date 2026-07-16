/**
 * @fileoverview Validaciones para Lista de Tareas
 */
const ValidadorTareas = {
    mensajes: {
        tituloRequerido: 'El título es obligatorio',
        tituloCorto: 'El título debe tener al menos 3 caracteres',
        prioridadInvalida: 'Selecciona una prioridad válida',
        fechaInvalida: 'La fecha no es válida'
    },

    /**
     * Valida que el campo no esté vacío
     * @param {string} valor 
     * @returns {boolean}
     */
    validarNoVacio(valor) {
        return valor !== null && valor !== undefined && String(valor).trim().length > 0;
    },

    /**
     * Valida el título de la tarea
     * @param {string} titulo 
     * @returns {boolean}
     */
    validarTitulo(titulo) {
        return this.validarNoVacio(titulo) && titulo.trim().length >= 3;
    },

    /**
     * Valida la prioridad
     * @param {string} prioridad 
     * @returns {boolean}
     */
    validarPrioridad(prioridad) {
        return ['baja', 'media', 'alta'].includes(prioridad);
    },

    /**
     * Valida una fecha
     * @param {string} fecha 
     * @returns {boolean}
     */
    validarFecha(fecha) {
        if (!fecha) return true; // Opcional
        const fechaObj = new Date(fecha);
        return fechaObj instanceof Date && !isNaN(fechaObj);
    },

    /**
     * Valida una tarea completa
     * @param {Object} tarea 
     * @returns {{esValido: boolean, errores: Object}}
     */
    validarTarea(tarea) {
        const errores = {};
        let esValido = true;

        if (!this.validarTitulo(tarea.titulo)) {
            errores.titulo = tarea.titulo ? this.mensajes.tituloCorto : this.mensajes.tituloRequerido;
            esValido = false;
        }
        if (!this.validarPrioridad(tarea.prioridad)) {
            errores.prioridad = this.mensajes.prioridadInvalida;
            esValido = false;
        }
        if (tarea.fechaLimite && !this.validarFecha(tarea.fechaLimite)) {
            errores.fechaLimite = this.mensajes.fechaInvalida;
            esValido = false;
        }

        return { esValido, errores };
    },

    /**
     * Muestra error en el campo
     * @param {string} idError 
     * @param {string} mensaje 
     */
    mostrarError(idError, mensaje) {
        const elemento = document.getElementById(idError);
        if (elemento) elemento.textContent = mensaje;
    },

    /**
     * Limpia todos los errores
     */
    limpiarErrores() {
        document.querySelectorAll('.form__error').forEach(el => el.textContent = '');
    }
};

window.ValidadorTareas = ValidadorTareas;
