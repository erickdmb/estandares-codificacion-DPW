//El bucle calcula lo mismo en cada vuelta
for (let i = 0; i < 10000; i++) {
    document.body.innerHTML += i;
}

//Guarda el valor antes de entrar al bucle
const TOTAL = 10000;
let acumulador = "";
for (let i = 0; i < TOTAL; i++) {
    acumulador += i;
}
document.body.innerHTML = acumulador;


//Calcular lo mismo una y otra vez
for (let i = 0; i < 1000; i++) {
    console.log(Math.sqrt(i));
}


//Si algo no cambia, no lo calcules dentro del bucle
const limite = 1000;
for (let i = 0; i < limite; i++) {
    console.log(Math.sqrt(i));
}

//escribir el DOM es lento
for (let i = 0; i < 500; i++) {
    lista.innerHTML += `<li>${i}</li>`;
}


//acumula todo y escribe una sola vez
let html = "";
for (let i = 0; i < 500; i++) {
    html += `<li>${i}</li>`;
}
lista.innerHTML = html;

//Buscar en un array es lento (revisa uno por uno)
//const usuario = usuarios.find(u => u.id === id);

//Usa un mapa (objeto) para busquedas rápidas)
const mapa = {};
usuarios.forEach(u => mapa[u.id] = u);
const usuario = mapa[id];

// Cargar todo al inicio (lento)
import { moduloGrande } from './modulo-grande.js';

//Carga el módulo solo cuando se necesite
boton.addEventListener('click', async () => {
    const { moduloGrande } = await import('./modulo-grande.js');
    moduloGrande.hacerAlgo();
});

//dom

// Seleccionar un elemento
document.getElementById("resultado");

// Modificar su contenido
document.getElementById("resultado").innerHTML = "Hola";

// Escuchar un evento
document.getElementById("btn").addEventListener("click", function() {
    // hacer algo
});

//herramienta para medir
console.time("miBucle");

for (let i = 0; i < 1000000; i++) {
    // hacer algo
}

console.timeEnd("miBucle");

console.time("nombre");
// código a medir
console.timeEnd("nombre");