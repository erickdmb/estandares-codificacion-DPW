// FUNCIONES CON ERRORES
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

// PRUEBAS CON console.assert()

console.log("EJECUTANDO PRUEBAS");

// Prueba 1: sumar
console.assert(sumar(2, 3) === 5, "Error: sumar(2, 3) debería ser 5");

// Prueba 2: restar
console.assert(restar(5, 3) === 2, "Error: restar(5, 3) debería ser 2");

// Prueba 3: multiplicar
console.assert(multiplicar(2, 3) === 6, "Error: multiplicar(2, 3) debería ser 6");

// Prueba 4: dividir
console.assert(dividir(10, 2) === 5, "Error: dividir(10, 2) debería ser 5");

// Prueba 5: dividir por cero
console.assert(dividir(10, 0) === "Error: División por cero", 
    "Error: dividir(10, 0) debería retornar mensaje de error");

console.log("FIN DE PRUEBAS");
console.log("Todas las pruebas pasaron");