// validaciones.js - Exporta funciones de validación

export function esNumeroValido(valor) {
    const numero = parseFloat(valor);
    return !isNaN(numero);
}

export function validarDivision(divisor) {
    if (divisor === 0) {
        return false;
    }
    return true;
}

export function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById("resultado");
    if (resultadoDiv) {
        resultadoDiv.innerHTML = `<span style="color: red;">${mensaje}</span>`;
    }
}

export function limpiarError() {
    const resultadoDiv = document.getElementById("resultado");
    if (resultadoDiv) {
        resultadoDiv.innerHTML = "Esperando operación...";
    }
}