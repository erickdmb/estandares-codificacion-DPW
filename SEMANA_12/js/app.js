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