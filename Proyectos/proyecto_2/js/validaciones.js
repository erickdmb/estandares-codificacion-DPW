/**
 * @fileoverview Módulo de validaciones para el Gestor de Gastos
 * @description Validación de entradas del usuario
 */
const ValidadorGastos = {
    mensajes: {
        requerido: 'Este campo es obligatorio',
        montoInvalido: 'El monto debe ser un número positivo mayor a 0',
        categoriaInvalida: 'Selecciona una categoría válida',
        fechaInvalida: 'La fecha no es válida',
        descripcionCorta: 'La descripción debe tener al menos 3 caracteres'
    },

    /**
     * Valida que el campo no esté vacío
     * @param {string} valor - Valor a validar
     * @returns {boolean}
     */
    validarNoVacio(valor) {
        return valor !== null && valor !== undefined && String(valor).trim().length > 0;
    },

    /**
     * Valida un monto positivo
     * @param {number|string} monto - Monto a validar
     * @returns {boolean}
     */
    validarMonto(monto) {
        const numero = parseFloat(monto);
        return !isNaN(numero) && numero > 0;
    },

    /**
     * Valida la descripción del gasto
     * @param {string} descripcion - Descripción a validar
     * @returns {boolean}
     */
    validarDescripcion(descripcion) {
        return this.validarNoVacio(descripcion) && descripcion.trim().length >= 3;
    },

    /**
     * Valida que la categoría sea válida
     * @param {string} categoria - Categoría a validar
     * @returns {boolean}
     */
    validarCategoria(categoria) {
        const categoriasValidas = ['alimentacion', 'transporte', 'entretenimiento', 'salud', 'educacion', 'servicios', 'otros'];
        return categoriasValidas.includes(categoria);
    },

    /**
     * Valida la fecha del gasto
     * @param {string} fecha - Fecha en formato YYYY-MM-DD
     * @returns {boolean}
     */
    validarFecha(fecha) {
        if (!this.validarNoVacio(fecha)) return false;
        const fechaObj = new Date(fecha);
        return fechaObj instanceof Date && !isNaN(fechaObj);
    },

    /**
     * Valida un gasto completo
     * @param {Object} gasto - Objeto con datos del gasto
     * @returns {Object} {esValido: boolean, errores: Object}
     */
    validarGasto(gasto) {
        const errores = {};
        let esValido = true;

        if (!this.validarDescripcion(gasto.descripcion)) {
            errores.descripcion = this.mensajes.descripcionCorta;
            esValido = false;
        }
        if (!this.validarMonto(gasto.monto)) {
            errores.monto = this.mensajes.montoInvalido;
            esValido = false;
        }
        if (!this.validarCategoria(gasto.categoria)) {
            errores.categoria = this.mensajes.categoriaInvalida;
            esValido = false;
        }
        if (!this.validarFecha(gasto.fecha)) {
            errores.fecha = this.mensajes.fechaInvalida;
            esValido = false;
        }

        return { esValido, errores };
    },

    /**
     * Muestra un error en el elemento correspondiente
     * @param {string} idError - ID del elemento de error
     * @param {string} mensaje - Mensaje de error
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

window.ValidadorGastos = ValidadorGastos;
