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