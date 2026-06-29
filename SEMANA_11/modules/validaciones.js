// Módulo de validaciones - Responsabilidad: validar datos de entrada

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

export function limpiarErrores() {
    const resultadoDiv = document.getElementById("resultado");
    if (resultadoDiv) {
        resultadoDiv.innerHTML = "Esperando operación...";
        resultadoDiv.className = "resultado";
    }
}

export function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById("resultado");
    if (resultadoDiv) {
        resultadoDiv.innerHTML = mensaje;
        resultadoDiv.className = "resultado error";
    }
}

export function mostrarExito(mensaje) {
    const resultadoDiv = document.getElementById("resultado");
    if (resultadoDiv) {
        resultadoDiv.innerHTML = mensaje;
        resultadoDiv.className = "resultado exito";
    }
}