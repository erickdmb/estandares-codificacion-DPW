function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        return "Error: División por cero";
    }
    return a / b;
}

function calcularTodo(a, b) {
    return {
        suma: sumar(a, b),
        resta: restar(a, b),
        multiplicacion: multiplicar(a, b),
        division: dividir(a, b)
    };
}

console.log(calcularTodo(10, 5));


function calcularTodo(a, b) {
    // Retorna un objeto con los resultados de las cuatro operaciones
    return {
        suma: sumar(a, b),
        resta: restar(a, b),
        multiplicacion: multiplicar(a, b),
        division: dividir(a, b)
    };
}