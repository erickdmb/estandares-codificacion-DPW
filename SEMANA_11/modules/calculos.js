// Módulo de cálculos - Responsabilidad: operaciones matemáticas
// Este módulo está diseñado para ser REUTILIZABLE en cualquier proyecto

export function sumar(a, b) {
    return a + b;
}

export function restar(a, b) {
    return a - b;
}

export function multiplicar(a, b) {
    return a * b;
}

export function dividir(a, b) {
    if (b === 0) {
        throw new Error("No se puede dividir por cero");
    }
    return a / b;
}

export const PI = 3.14159265359;

export function areaCirculo(radio) {
    return PI * radio * radio;
}

// Función que reutiliza otras funciones del mismo módulo
export function calcularTodo(a, b) {
    return {
        suma: sumar(a, b),
        resta: restar(a, b),
        multiplicacion: multiplicar(a, b),
        division: dividir(a, b)
    };
}