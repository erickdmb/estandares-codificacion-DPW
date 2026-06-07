import { sumar, restar, multiplicar, dividir } from './calculos.js';
import { esNumeroValido, validarDivision, mostrarError, limpiarError } from './validaciones.js';

console.log("Aplicación cargada");

window.calcular = function() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operacion = document.getElementById("operacion").value;
    const resultadoDiv = document.getElementById("resultado");
    
    limpiarError();
    
    if (!esNumeroValido(num1) || !esNumeroValido(num2)) {
        mostrarError("Error: Ingresa números válidos");
        return;
    }
    
    let resultado;
    
    try {
        switch(operacion) {
            case "sumar":
                resultado = sumar(num1, num2);
                break;
            case "restar":
                resultado = restar(num1, num2);
                break;
            case "multiplicar":
                resultado = multiplicar(num1, num2);
                break;
            case "dividir":
                if (!validarDivision(num2)) {
                    mostrarError("Error: No se puede dividir por cero");
                    return;
                }
                resultado = dividir(num1, num2);
                break;
            default:
                mostrarError("Operación no válida");
                return;
        }
        
        resultadoDiv.innerHTML = `<span style="color: green;">Resultado: ${resultado}</span>`;
        console.log(`Operación: ${operacion} | Resultado: ${resultado}`);
        
    } catch (error) {
        mostrarError(`Error: ${error.message}`);
    }
};

console.log("Calculadora lista");