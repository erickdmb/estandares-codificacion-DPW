// Módulo de formateo - Responsabilidad: dar formato a datos
// Este módulo puede reutilizarse en cualquier proyecto que necesite formateo

export function formatearNumero(numero, decimales = 2) {
    if (typeof numero !== 'number') return numero;
    return numero.toFixed(decimales);
}

export function formatearFecha() {
    const ahora = new Date();
    return `${ahora.getDate()}/${ahora.getMonth() + 1}/${ahora.getFullYear()} ${ahora.getHours()}:${ahora.getMinutes()}:${ahora.getSeconds()}`;
}

export function formatearOperacion(num1, num2, operacion, resultado) {
    const simbolos = {
        sumar: '+',
        restar: '-',
        multiplicar: '×',
        dividir: '÷'
    };
    return `${num1} ${simbolos[operacion]} ${num2} = ${resultado}`;
}