# PRACTICA GUIADA DE LA SEMANA 11

## Proposito
El estudiante aplicará principios de modularización (dividir el código en módulos) y reutilización (usar el mismo código en múltiples lugares) para crear aplicaciones más mantenibles y escalables.

## Parte Práctica
### Paso 1: Crear la carpeta del proyecto

Crear una carpeta llamada `semana11_tu_nombre`

### Paso 2: Crear subcarpetas

Dentro de `semana11_tu_nombre`, crea:
* Carpeta `css`
* Carpeta `js`
* Carpeta `modules`

### Paso 3: Estructura del proyecto

 ```bash
 semana11_tu_nombre/
    css/
        estilos.css
    js/
        app.js 
    modules/
        validaciones.js   
        calculos.js       
        formateo.js      
        storage.js        
    index.html                
 ```

### Paso 4: Crear el archivo CSS

 Archivo: `css/estilos.css`

 ```css
 body {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background: #f4f4f4;
}

h1 {
    color: #007bff;
    text-align: center;
}

h2 {
    color: #333;
    font-size: 18px;
    margin-top: 20px;
}

label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
}

input, select, button {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
}

button {
    background: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background: #0056b3;
}

.resultado {
    margin-top: 20px;
    padding: 10px;
    background: white;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
}

.historial {
    margin-top: 20px;
    padding: 10px;
    background: white;
    border-radius: 5px;
    max-height: 200px;
    overflow-y: auto;
}

.historial-item {
    padding: 5px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
}

.error {
    color: red;
}

.exito {
    color: green;
}
```

### Paso 5: Crear el módulo de validaciones
Archivo: `modules/validaciones.js`

```js
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
```

### Paso 6: Crear el módulo de cálculos
Archivo: `modules/calculos.js`

```js
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
```

### Paso 7: Crear el módulo de formateo
Archivo: `modules/formateo.js`

```js
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
```
### Paso 8: Crear el módulo de almacenamiento
Archivo: `modules/storage.js`

```js
// Módulo de almacenamiento - Responsabilidad: guardar y recuperar datos
// Este módulo puede reutilizarse para cualquier tipo de historial

const STORAGE_KEY = 'calculadora_historial';

export function guardarEnHistorial(operacion, resultado) {
    const historial = obtenerHistorial();
    historial.unshift({
        operacion: operacion,
        resultado: resultado,
        fecha: new Date().toLocaleString()
    });
    
    // Mantener solo últimos 10 registros
    if (historial.length > 10) {
        historial.pop();
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
    return historial;
}

export function obtenerHistorial() {
    const historial = localStorage.getItem(STORAGE_KEY);
    if (historial) {
        return JSON.parse(historial);
    }
    return [];
}

export function limpiarHistorial() {
    localStorage.removeItem(STORAGE_KEY);
    return [];
}

export function mostrarHistorialEnUI() {
    const historialDiv = document.getElementById("historial");
    const historial = obtenerHistorial();
    
    if (!historialDiv) return;
    
    if (historial.length === 0) {
        historialDiv.innerHTML = "<p>No hay operaciones guardadas</p>";
        return;
    }
    
    let html = "";
    for (let i = 0; i < historial.length; i++) {
        html += `<div class="historial-item">
                    <strong>${historial[i].operacion}</strong><br>
                    Resultado: ${historial[i].resultado}<br>
                    <small>${historial[i].fecha}</small>
                 </div>`;
    }
    historialDiv.innerHTML = html;
}
```

### Paso 9: Crear el archivo principal
Archivo: `js/app.js`

```js
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

console.log("=== APLICACIÓN MODULAR CARGADA ===");
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
```

### Paso 10: Crear el archivo HTML
Archivo: `index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora Modular - Semana 11</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
    <h1>Calculadora Modular</h1>
    <p>Aplicación con <strong>modularización y reutilización</strong> de código</p>
    
    <label for="num1">Primer número:</label>
    <input type="number" id="num1" placeholder="Ej: 10">
    
    <label for="num2">Segundo número:</label>
    <input type="number" id="num2" placeholder="Ej: 5">
    
    <label for="operacion">Operación:</label>
    <select id="operacion">
        <option value="sumar">Sumar (+)</option>
        <option value="restar">Restar (-)</option>
        <option value="multiplicar">Multiplicar (×)</option>
        <option value="dividir">Dividir (÷)</option>
        <option value="area">Área del círculo (πr²)</option>
    </select>
    
    <button onclick="calcular()">Calcular</button>
    <button onclick="calcularTodo()" style="background-color: #28a745;">Calcular Todo</button>
    <button onclick="limpiarHistorial()" style="background-color: #dc3545;">Limpiar Historial</button>
    
    <div class="resultado" id="resultado">
        Esperando operación...
    </div>
    
    <h2>Historial de operaciones</h2>
    <div class="historial" id="historial">
        Cargando historial...
    </div>
    
    <hr>
    <p><strong>Módulos creados:</strong></p>
    <ul>
        <li><strong>validaciones.js</strong> - Validación de datos</li>
        <li><strong>calculos.js</strong> - Operaciones matemáticas</li>
        <li><strong>formateo.js</strong> - Formato de números y fechas</li>
        <li><strong>storage.js</strong> - Almacenamiento local (historial)</li>
        <li><strong>app.js</strong> - Punto de entrada que integra todo</li>
    </ul>
    <p><strong>Consola (F12):</strong> Verás los mensajes de carga de módulos</p>
    
    <script type="module" src="js/app.js"></script>
</body>
</html>
```


# 3. CÓMO EJECUTAR
### Abre la carpeta semana11_tu_nombre en VS Code

* Haz clic derecho en `index.html`
* Selecciona "Open with Live Server"
* Abre la consola (F12) para ver los mensajes