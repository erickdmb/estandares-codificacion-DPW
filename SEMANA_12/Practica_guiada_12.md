# Practica guiada semana 12

## 1. Proposito de la practica

El estudiante comparará código ineficiente vs código optimizado para entender cómo mejorar el rendimiento de sus aplicaciones

## 2. Fundamento Teorico

### ¿Qué es el DOM?
El DOM es la representación del HTML en JavaScript. Permite leer y modificar elementos de la página.
### ¿Por qué optimizar?
| Problema | Consecuencia |
|----------|--------------|
| Código lento | Usuarios frustrados |
| DOM modificado muchas veces | Página lenta |
| Cálculos repetidos | Procesador sobrecargado |

### Herramientas para medir
| Herramienta | Descripción |
|-------------|-------------|
| Chrome DevTools | Herramientas de desarrollo del navegador |
| console.time() | Mide el tiempo de ejecución |
| Performance tab | Analiza el rendimiento de la página |

```javascript
// Ejemplo de console.time()
console.time('miFuncion');
miFuncion();
console.timeEnd('miFuncion');
```
## 3. Parte Práctica
#### Paso 1: Crear la siguiente estructura de carpetas para el proyecto
 ```bash
 semana12_tu_nombre/
    css/
        estilos.css
    js/
        app.js    
    index.html                
 ```
 #### Paso 2: Crear el archivo CSS `css/estilos.css`
```css
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background: #f4f4f4;
}

h1 {
    color: #007bff;
    text-align: center;
}

button {
    padding: 10px 20px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background: #0056b3;
}

.resultado {
    margin: 20px 0;
    padding: 15px;
    background: white;
    border-radius: 5px;
    max-height: 300px;
    overflow-y: auto;
}

.tiempo {
    color: #666;
    font-size: 14px;
}
```

 #### Paso 3: Crear el archivo JavaScript `js/app.js`
```js
console.log("EJECUTANDO PRUEBAS DE RENDIMIENTO");

// FUNCIÓN 1: Bucle ineficiente (MUY LENTO)
function bucleIneficiente() {
    const resultado = document.getElementById("resultado1");
    
    // LIMPIAR resultado
    resultado.innerHTML = "";
    
    // console.time mide cuánto tarda el código
    console.time("Bucle ineficiente");
    
    // MAL: Escribe en el DOM 10,000 veces
    // Cada vez que se escribe, el navegador vuelve a pintar la página
    for (let i = 0; i < 10000; i++) {
        resultado.innerHTML += i + " ";
    }
    
    // FIN de la medición
    console.timeEnd("Bucle ineficiente");
    
    // Mostrar tiempo en la página
    resultado.innerHTML += `<br><span class="tiempo">Tiempo: Ver consola (F12)</span>`;
}

// FUNCIÓN 2: Bucle eficiente (RÁPIDO)
function bucleEficiente() {
    const resultado = document.getElementById("resultado2");
    resultado.innerHTML = "";
    
    console.time("Bucle eficiente");
    
    // BIEN: Guardar todo en una variable
    // BIEN: Escribir UNA SOLA VEZ en el DOM
    let acumulador = "";
    const LIMITE = 10000;
    
    for (let i = 0; i < LIMITE; i++) {
        acumulador += i + " ";
    }
    
    resultado.innerHTML = acumulador;
    
    console.timeEnd("Bucle eficiente");
    
    resultado.innerHTML += `<br><span class="tiempo">Tiempo: Ver consola (F12)</span>`;
}

// FUNCIÓN 3: Crear lista de forma ineficiente
function domIneficiente() {
    const resultado = document.getElementById("resultado3");
    resultado.innerHTML = "";
    
    console.time("DOM ineficiente");
    
    // MAL: Crear elementos uno por uno
    const lista = document.createElement("ul");
    
    for (let i = 0; i < 500; i++) {
        const item = document.createElement("li");
        item.textContent = "Elemento " + i;
        lista.appendChild(item);
    }
    
    resultado.appendChild(lista);
    
    console.timeEnd("DOM ineficiente");
    resultado.innerHTML += `<br><span class="tiempo">Tiempo: Ver consola (F12)</span>`;
}

// FUNCIÓN 4: Crear lista de forma eficiente
function domEficiente() {
    const resultado = document.getElementById("resultado4");
    resultado.innerHTML = "";
    
    console.time("DOM eficiente");
    
    // BIEN: Guardar HTML en una variable y escribir UNA VEZ
    let html = "<ul>";
    for (let i = 0; i < 500; i++) {
        html += `<li>Elemento ${i}</li>`;
    }
    html += "</ul>";
    
    resultado.innerHTML = html;
    
    console.timeEnd("DOM eficiente");
    resultado.innerHTML += `<br><span class="tiempo">Tiempo: Ver consola (F12)</span>`;
}

// FUNCIÓN 5: Cálculos repetidos (INEFICIENTE)
function calcularIneficiente() {
    const resultado = document.getElementById("resultado5");
    resultado.innerHTML = "";
    
    console.time("Cálculo ineficiente");
    
    let html = "";
    
    // MAL: Calcular Math.pow en cada iteración
    for (let i = 1; i <= 100; i++) {
        let raiz = Math.sqrt(i);
        let cuadrado = i * i;
        let cubo = Math.pow(i, 3);
        html += `N: ${i}, R: ${raiz.toFixed(2)}, C2: ${cuadrado}, C3: ${cubo}<br>`;
    }
    
    resultado.innerHTML = html;
    
    console.timeEnd("Cálculo ineficiente");
    resultado.innerHTML += `<br><span class="tiempo">Tiempo: Ver consola (F12)</span>`;
}

// FUNCIÓN 6: Cálculos optimizados (EFICIENTE)
function calcularEficiente() {
    const resultado = document.getElementById("resultado6");
    resultado.innerHTML = "";
    
    console.time("Cálculo eficiente");
    
    let html = "";
    
    // BIEN: Reutilizar cálculos
    for (let i = 1; i <= 100; i++) {
        let raiz = Math.sqrt(i);
        let cuadrado = i * i;
        let cubo = cuadrado * i; // reutiliza cuadrado
        html += `N: ${i}, R: ${raiz.toFixed(2)}, C2: ${cuadrado}, C3: ${cubo}<br>`;
    }
    
    resultado.innerHTML = html;
    
    console.timeEnd("Cálculo eficiente");
    resultado.innerHTML += `<br><span class="tiempo">Tiempo: Ver consola (F12)</span>`;
}

// FUNCIÓN: Ejecutar TODAS las pruebas
function ejecutarTodas() {
    console.clear();
    console.log("EJECUTANDO TODAS LAS PRUEBAS");
    console.log("Compara los tiempos en la consola.");
    console.log("");
    
    // Ejecutar una por una (con retraso para ver cada resultado)
    bucleIneficiente();
    setTimeout(bucleEficiente, 100);
    setTimeout(domIneficiente, 200);
    setTimeout(domEficiente, 300);
    setTimeout(calcularIneficiente, 400);
    setTimeout(calcularEficiente, 500);
    
    setTimeout(() => {
        console.log("FIN DE LAS PRUEBAS");
        console.log("¿Cuál fue más rápido?");
    }, 600);
}

// EXPONER FUNCIONES AL HTML

// Sin esto, los botones no pueden llamar a las funciones
window.bucleIneficiente = bucleIneficiente;
window.bucleEficiente = bucleEficiente;
window.domIneficiente = domIneficiente;
window.domEficiente = domEficiente;
window.calcularIneficiente = calcularIneficiente;
window.calcularEficiente = calcularEficiente;
window.ejecutarTodas = ejecutarTodas;

console.log("Aplicación cargada. Usa los botones para probar.");
```

#### Paso 4: Crear el archivo html `index.html`
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Optimización - Semana 12</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
    <h1>Optimización y Rendimiento</h1>
    
    <p>
        <button onclick="ejecutarTodas()" style="background-color: #28a745; font-size: 18px; padding: 15px;">
            Ejecutar Todas las Pruebas
        </button>
    </p>
    
    <p><strong>Instrucciones:</strong></p>
    <ol>
        <li>Abre la consola (F12)</li>
        <li>Haz clic en <strong>"Ejecutar Todas las Pruebas"</strong></li>
        <li>Compara los tiempos de cada versión</li>
    </ol>
    
    <hr>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
            <button onclick="bucleIneficiente()" style="background-color: #dc3545;">Bucle INEFICIENTE</button>
            <div class="resultado" id="resultado1">Presiona el botón</div>
        </div>
        <div>
            <button onclick="bucleEficiente()" style="background-color: #28a745;">Bucle EFICIENTE</button>
            <div class="resultado" id="resultado2">Presiona el botón</div>
        </div>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
        <div>
            <button onclick="domIneficiente()" style="background-color: #dc3545;">DOM INEFICIENTE</button>
            <div class="resultado" id="resultado3">Presiona el botón</div>
        </div>
        <div>
            <button onclick="domEficiente()" style="background-color: #28a745;">DOM EFICIENTE</button>
            <div class="resultado" id="resultado4">Presiona el botón</div>
        </div>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
        <div>
            <button onclick="calcularIneficiente()" style="background-color: #dc3545;">Cálculo INEFICIENTE</button>
            <div class="resultado" id="resultado5">Presiona el botón</div>
        </div>
        <div>
            <button onclick="calcularEficiente()" style="background-color: #28a745;">Cálculo EFICIENTE</button>
            <div class="resultado" id="resultado6">Presiona el botón</div>
        </div>
    </div>
    
    <hr>
      
    <script type="module" src="js/app.js"></script>
</body>
</html>
```

#### Paso 05: Ejecutar el proyecto

1.	Abre la carpeta semana12_tu_nombre en VS Code
2.	Haz clic derecho en index.html
3.	Selecciona "Open with Live Server"
4.	Abre la consola (F12) para ver los mensajes


## 4. Conclusiones
•	¿Qué versión fue más rápida en cada prueba?

•	¿Por qué el bucle eficiente es más rápido que el ineficiente?

•	¿Por qué el DOM eficiente es más rápido que el ineficiente?

•	¿Qué aprendiste sobre optimización de código en esta práctica?

