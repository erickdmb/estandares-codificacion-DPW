/**
 * @fileoverview Validaciones para Calculadora de IMC
 */
const ValidadorIMC = {
    mensajes: {
        campoRequerido: 'Este campo es obligatorio',
        pesoInvalido: 'El peso debe estar entre 20 y 300 kg',
        alturaInvalida: 'La altura debe estar entre 50 y 250 cm',
        edadInvalida: 'La edad debe estar entre 1 y 120 años',
        sexoRequerido: 'Selecciona tu sexo'
    },

    /**
     * Valida que el campo no esté vacío
     * @param {string|number} valor 
     * @returns {boolean}
     */
    validarNoVacio(valor) {
        return valor !== null && valor !== undefined && String(valor).trim().length > 0;
    },

    /**
     * Valida que el valor sea un número válido
     * @param {number} valor 
     * @returns {boolean}
     */
    validarNumero(valor) {
        return !isNaN(parseFloat(valor)) && isFinite(valor);
    },

    /**
     * Valida el peso (20-300 kg)
     * @param {number} peso 
     * @returns {boolean}
     */
    validarPeso(peso) {
        const valor = parseFloat(peso);
        return this.validarNumero(valor) && valor >= 20 && valor <= 300;
    },

    /**
     * Valida la altura (50-250 cm)
     * @param {number} altura 
     * @returns {boolean}
     */
    validarAltura(altura) {
        const valor = parseFloat(altura);
        return this.validarNumero(valor) && valor >= 50 && valor <= 250;
    },

    /**
     * Valida la edad (1-120 años)
     * @param {number} edad 
     * @returns {boolean}
     */
    validarEdad(edad) {
        const valor = parseInt(edad);
        return this.validarNumero(valor) && valor >= 1 && valor <= 120;
    },

    /**
     * Valida el sexo
     * @param {string} sexo 
     * @returns {boolean}
     */
    validarSexo(sexo) {
        return ['masculino', 'femenino'].includes(sexo);
    },

    /**
     * Valida todos los campos del formulario
     * @param {Object} datos 
     * @returns {{esValido: boolean, errores: Object}}
     */
    validarFormulario(datos) {
        const errores = {};
        let esValido = true;

        if (!this.validarPeso(datos.peso)) {
            errores.peso = this.mensajes.pesoInvalido;
            esValido = false;
        }
        if (!this.validarAltura(datos.altura)) {
            errores.altura = this.mensajes.alturaInvalida;
            esValido = false;
        }
        if (!this.validarEdad(datos.edad)) {
            errores.edad = this.mensajes.edadInvalida;
            esValido = false;
        }
        if (!this.validarSexo(datos.sexo)) {
            errores.sexo = this.mensajes.sexoRequerido;
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

window.ValidadorIMC = ValidadorIMC;
