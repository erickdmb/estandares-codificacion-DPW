// app.js - Punto de entrada de la aplicación
// Importa todos los módulos y los coordina

import { 
    esNumeroValido, 
    validarDivision, 
    limpiarErrores, 
    mostrarError, 
    mostrarExito 
} from '../modules/validaciones.js';

import { 
    sumar, 
    restar, 
    multiplicar, 
    dividir, 
    areaCirculo,
    calcularTodo
} from '../modules/calculos.js';

import { 
    formatearNumero, 
    formatearOperacion, 
    formatearFecha 
} from '../modules/formateo.js';

import { 
    guardarEnHistorial, 
    mostrarHistorialEnUI, 
    limpiarHistorial 
} from '../modules/storage.js';

console.log("--- APLICACIÓN MODULAR CARGADA ---");
console.log("Módulos importados:");
console.log("- validaciones.js (validación de datos)");
console.log("- calculos.js (operaciones matemáticas)");
console.log("- formateo.js (formato de datos)");
console.log("- storage.js (almacenamiento local)");
console.log("Fecha y hora:", formatearFecha());

// Mostrar historial al cargar la página
mostrarHistorialEnUI();

// Función principal de la calculadora
window.calcular = function() {
    limpiarErrores();
    
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operacion = document.getElementById("operacion").value;
    
    if (!esNumeroValido(num1)) {
        mostrarError("Error: Ingresa un primer número válido");
        return;
    }
    
    let resultado;
    let operacionTexto = "";
    
    try {
        switch(operacion) {
            case "sumar":
                if (!esNumeroValido(num2)) {
                    mostrarError("Error: Ingresa un segundo número válido");
                    return;
                }
                resultado = sumar(num1, num2);
                operacionTexto = formatearOperacion(num1, num2, "sumar", formatearNumero(resultado));
                break;
                
            case "restar":
                if (!esNumeroValido(num2)) {
                    mostrarError("Error: Ingresa un segundo número válido");
                    return;
                }
                resultado = restar(num1, num2);
                operacionTexto = formatearOperacion(num1, num2, "restar", formatearNumero(resultado));
                break;
                
            case "multiplicar":
                if (!esNumeroValido(num2)) {
                    mostrarError("Error: Ingresa un segundo número válido");
                    return;
                }
                resultado = multiplicar(num1, num2);
                operacionTexto = formatearOperacion(num1, num2, "multiplicar", formatearNumero(resultado));
                break;
                
            case "dividir":
                if (!esNumeroValido(num2)) {
                    mostrarError("Error: Ingresa un segundo número válido");
                    return;
                }
                if (!validarDivision(num2)) {
                    mostrarError("Error: No se puede dividir por cero");
                    return;
                }
                resultado = dividir(num1, num2);
                operacionTexto = formatearOperacion(num1, num2, "dividir", formatearNumero(resultado));
                break;
                
            case "area":
                resultado = areaCirculo(num1);
                operacionTexto = `Área del círculo con radio ${num1} = ${formatearNumero(resultado)}`;
                break;
                
            default:
                mostrarError("Operación no válida");
                return;
        }
        
        mostrarExito(`Resultado: ${formatearNumero(resultado)}`);
        console.log(`Operación realizada: ${operacionTexto} | Hora: ${formatearFecha()}`);
        
        guardarEnHistorial(operacionTexto, formatearNumero(resultado));
        mostrarHistorialEnUI();
        
    } catch (error) {
        mostrarError(`Error: ${error.message}`);
        console.log("Error capturado:", error.message);
    }
};

// Función para calcular todo (reutilización)
window.calcularTodo = function() {
    limpiarErrores();
    
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    
    if (!esNumeroValido(num1) || !esNumeroValido(num2)) {
        mostrarError("Error: Ingresa dos números válidos");
        return;
    }
    
    try {
        const resultados = calcularTodo(num1, num2);
        
        let mensaje = `Resultados para ${num1} y ${num2}:<br>`;
        mensaje += `Suma: ${formatearNumero(resultados.suma)}<br>`;
        mensaje += `Resta: ${formatearNumero(resultados.resta)}<br>`;
        mensaje += `Multiplicación: ${formatearNumero(resultados.multiplicacion)}<br>`;
        mensaje += `División: ${formatearNumero(resultados.division)}`;
        
        mostrarExito(mensaje);
        console.log("Calcular todo ejecutado:", resultados);
        
        guardarEnHistorial(`Todas las operaciones con ${num1} y ${num2}`, mensaje);
        mostrarHistorialEnUI();
        
    } catch (error) {
        mostrarError(`Error: ${error.message}`);
    }
};

// Función para limpiar historial
window.limpiarHistorial = function() {
    limpiarHistorial();
    mostrarHistorialEnUI();
    mostrarExito("Historial limpiado correctamente");
    console.log("Historial limpiado");
};

console.log("Calculadora modular lista. Usa las funciones de los 4 módulos.");