/**
 * @fileoverview Validaciones para el Conversor de Unidades
 */
const ValidadorUnidades = {
    /**
     * Valida que el valor sea un número válido
     * @param {string|number} valor 
     * @returns {boolean}
     */
    validarNumero(valor) {
        if (valor === '' || valor === null || valor === undefined) return false;
        return !isNaN(parseFloat(valor)) && isFinite(valor);
    },

    /**
     * Valida que la unidad exista en la lista
     * @param {string} unidad 
     * @param {Array} unidadesValidas 
     * @returns {boolean}
     */
    validarUnidad(unidad, unidadesValidas) {
        return unidadesValidas.includes(unidad);
    },

    /**
     * Valida el valor de entrada
     * @param {HTMLInputElement} input 
     * @returns {{esValido: boolean, mensaje: string}}
     */
    validarCampo(input) {
        if (!this.validarNumero(input.value)) {
            return { esValido: false, mensaje: 'Ingresa un número válido' };
        }
        return { esValido: true, mensaje: '' };
    },

    /**
     * Escapa HTML para prevenir XSS
     * @param {string} texto 
     * @returns {string}
     */
    escaparHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
};

window.ValidadorUnidades = ValidadorUnidades;
