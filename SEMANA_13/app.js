/**
 * Suma dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} La suma de a y b
 */
function sumar(a, b) {
    return a + b;
}

/**
 * Resta dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} La resta de a y b
 */
function restar(a, b) {
    return a - b;
}

/**
 * Multiplica dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} La multiplicación de a y b
 */
function multiplicar(a, b) {
    return a * b;
}

/**
 * Divide dos números
 * @param {number} a - Dividendo
 * @param {number} b - Divisor
 * @returns {number|string} El cociente o un mensaje de error
 */
function dividir(a, b) {
    if (b === 0) {
        return "Error: División por cero";
    }
    return a / b;
}

/**
 * Calcula todas las operaciones básicas entre dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {Object} Objeto con suma, resta, multiplicación y división
 */
function calcularTodo(a, b) {
    return {
        suma: sumar(a, b),
        resta: restar(a, b),
        multiplicacion: multiplicar(a, b),
        division: dividir(a, b)
    };
}

console.log(calcularTodo(10, 5));