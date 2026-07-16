/**
 * @fileoverview Módulo de validaciones para la Calculadora de Ahorro
 * @description Contiene funciones de validación de entradas del usuario
 * siguiendo el principio KISS (Keep It Simple, Stupid)
 * @author Proyecto Estandares
 * @version 1.0.0
 */

/**
 * Constantes de validación con mensajes de error descriptivos
 * Centraliza los mensajes para facilitar mantenimiento (DRY)
 */
const MENSAJES_ERROR = {
    campoRequerido: 'Este campo es obligatorio',
    numeroPositivo: 'Debe ser un número positivo',
    numeroNegativo: 'No puede ser un número negativo',
    rangoInvalido: 'El valor debe estar entre {min} y {max}',
    formatoInvalido: 'Formato de número inválido',
    excedeMaximo: 'El valor excede el máximo permitido ({max})',
    metaInalcanzable: 'Tu meta de ahorro no puede alcanzarse con tu presupuesto actual'
};

/**
 * Expresiones regulares para validación
 * Usadas para validar formatos específicos
 */
const PATRONES = {
    numeroDecimal: /^\d+([.,]\d+)?$/,
    numeroEntero: /^\d+$/
};

/**
 * Valida que un valor no esté vacío
 * @param {string|number} valor - Valor a validar
 * @returns {boolean} true si el valor es válido
 */
function validarNoVacio(valor) {
    if (valor === null || valor === undefined) {
        return false;
    }
    const valorStr = String(valor).trim();
    return valorStr.length > 0;
}

/**
 * Valida que un valor sea un número positivo (mayor que cero)
 * @param {string|number} valor - Valor a validar
 * @returns {boolean} true si el valor es un número positivo válido
 */
function validarNumeroPositivo(valor) {
    const numero = parseFloat(valor);
    return !isNaN(numero) && numero > 0;
}

/**
 * Valida que un valor sea un número no negativo (mayor o igual a cero)
 * @param {string|number} valor - Valor a validar
 * @returns {boolean} true si el valor es un número no negativo válido
 */
function validarNumeroNoNegativo(valor) {
    const numero = parseFloat(valor);
    return !isNaN(numero) && numero >= 0;
}

/**
 * Valida que un valor esté dentro de un rango específico
 * @param {string|number} valor - Valor a validar
 * @param {number} min - Valor mínimo del rango
 * @param {number} max - Valor máximo del rango
 * @returns {boolean} true si el valor está dentro del rango
 */
function validarRango(valor, min, max) {
    const numero = parseFloat(valor);
    return !isNaN(numero) && numero >= min && numero <= max;
}

/**
 * Valida que el valor no exceda un máximo permitido
 * @param {string|number} valor - Valor a validar
 * @param {number} maximo - Valor máximo permitido
 * @returns {boolean} true si el valor no excede el máximo
 */
function validarMaximo(valor, maximo) {
    const numero = parseFloat(valor);
    return !isNaN(numero) && numero <= maximo;
}

/**
 * Valida un campo individual del formulario
 * @param {HTMLInputElement} input - Elemento input a validar
 * @returns {Object} Objeto con el resultado de la validación {esValido, mensaje}
 */
function validarCampo(input) {
    const valor = input.value.trim();
    const nombre = input.name;
    let esValido = true;
    let mensaje = '';

    // Verificar si el campo es requerido
    if (input.hasAttribute('required') && !validarNoVacio(valor)) {
        esValido = false;
        mensaje = MENSAJES_ERROR.campoRequerido;
    }
    // Si no es requerido y está vacío, es válido
    else if (!validarNoVacio(valor)) {
        return { esValido: true, mensaje: '' };
    }
    // Validar según el tipo de input
    else {
        const tipo = input.type;
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || Infinity;

        // Validar número positivo para campos sin mínimo específico
        if (min === 0 && !validarNumeroNoNegativo(valor)) {
            esValido = false;
            mensaje = min === 0 ? MENSAJES_ERROR.numeroPositivo : MENSAJES_ERROR.numeroNegativo;
        }
        // Validar rango
        else if (!validarRango(valor, min, max)) {
            if (max === Infinity) {
                mensaje = MENSAJES_ERROR.numeroNegativo;
            } else {
                mensaje = MENSAJES_ERROR.rangoInvalido.replace('{min}', min).replace('{max}', max);
            }
            esValido = false;
        }
    }

    return { esValido, mensaje };
}

/**
 * Valida todos los campos de un formulario
 * @param {HTMLFormElement} formulario - Formulario a validar
 * @returns {Object} Objeto con resultados de validación por campo
 */
function validarFormulario(formulario) {
    const resultados = {};
    let esFormularioValido = true;

    // Obtener todos los inputs del formulario
    const inputs = formulario.querySelectorAll('input');

    inputs.forEach(input => {
        const resultado = validarCampo(input);
        resultados[input.name] = resultado;
        if (!resultado.esValido) {
            esFormularioValido = false;
        }
    });

    return {
        esValido: esFormularioValido,
        resultados
    };
}

/**
 * Valida si el ahorro mensual es suficiente para alcanzar la meta
 * @param {number} ahorroMensual - Cantidad de dinero que se puede ahorrar mensualmente
 * @param {number} montoRestante - Monto faltante para alcanzar la meta
 * @param {number} mesesEstimados - Meses estimados para alcanzar la meta
 * @returns {boolean} true si el ahorro mensual es suficiente
 */
function validarAhorroSuficiente(ahorroMensual, montoRestante, mesesEstimados) {
    if (ahorroMensual <= 0) return false;
    const mesesMaximos = 600; // 50 años máximo
    return mesesEstimados <= mesesMaximos;
}

/**
 * Escapa caracteres HTML para prevenir XSS
 * Usa textContent internamente, pero esta función está disponible para otros usos
 * @param {string} texto - Texto a escapar
 * @returns {string} Texto con caracteres HTML escapados
 */
function escaparHTML(texto) {
    const mapaEntidades = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return texto.replace(/[&<>"']/g, caracter => mapaEntidades[caracter]);
}

/**
 * Muestra el mensaje de error en un elemento span de error
 * @param {string} idError - ID del elemento span de error
 * @param {string} mensaje - Mensaje de error a mostrar
 */
function mostrarError(idError, mensaje) {
    const elementoError = document.getElementById(idError);
    if (elementoError) {
        // Usar textContent para prevenir XSS (principio de seguridad)
        elementoError.textContent = mensaje;
        elementoError.classList.add('form__error--visible');
    }
}

/**
 * Limpia todos los mensajes de error del formulario
 */
function limpiarErrores() {
    const elementosError = document.querySelectorAll('.form__error');
    elementosError.forEach(elemento => {
        elemento.textContent = '';
        elemento.classList.remove('form__error--visible');
    });
}

// Exportar funciones para uso global
window.ModuloValidaciones = {
    validarNoVacio,
    validarNumeroPositivo,
    validarNumeroNoNegativo,
    validarRango,
    validarMaximo,
    validarCampo,
    validarFormulario,
    validarAhorroSuficiente,
    escaparHTML,
    mostrarError,
    limpiarErrores
};
