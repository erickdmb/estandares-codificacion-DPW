function saludar() {
    const nombre = document.getElementById("nombre").value;
    const salida = document.getElementById("salida");

    // Validación: nombre no puede estar vacío
    if (!nombre || nombre.trim() === "") {
        salida.textContent = "Error: El nombre no puede estar vacío";
        return;
    }

    // Escape de salida (seguridad XSS)
    const nombreSeguro = nombre.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    salida.textContent = "Bienvenido " + nombreSeguro;
}

console.log("Aplicación cargada (versión segura contra XSS)");

/*
function saludar() {
    const nombre = document.getElementById("nombre").value;
    const salida = document.getElementById("salida");
    const nombreSeguro = nombre.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    salida.textContent = "Bienvenido " + nombreSeguro;
}

console.log("Aplicación cargada (versión segura contra XSS)");


function saludar() {
    const nombre = document.getElementById("nombre").value;
    const salida = document.getElementById("salida");

    // Mostrar en consola qué se está procesando
    console.log("Nombre ingresado:", nombre);

    salida.innerHTML = "Bienvenido " + nombre;
}

console.log("Aplicación cargada. Lista para probar XSS.");*/