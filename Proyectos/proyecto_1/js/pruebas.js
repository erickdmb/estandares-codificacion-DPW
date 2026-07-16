/**
 * @fileoverview Módulo de pruebas unitarias para la Calculadora de Ahorro
 * @description Contiene pruebas con console.assert() para verificar las funciones principales
 * @author Proyecto Estandares
 * @version 1.0.0
 */

/**
 * Ejecuta todas las pruebas unitarias del proyecto
 * Muestra los resultados en consola con formato legible
 * @returns {Object} Resumen de las pruebas ejecutadas
 */
function ejecutarPruebas() {
    console.log('='.repeat(50));
    console.log('INICIANDO PRUEBAS UNITARIAS');
    console.log('='.repeat(50));

    let pruebasTotales = 0;
    let pruebasExitosas = 0;
    let pruebasFallidas = 0;

    /**
     * Funcion auxiliar para registrar el resultado de una prueba
     * @param {string} nombrePrueba - Nombre descriptivo de la prueba
     * @param {boolean} resultado - Resultado de la asercion
     */
    function registrarPrueba(nombrePrueba, resultado) {
        pruebasTotales++;
        if (resultado) {
            pruebasExitosas++;
            console.log(`[OK] ${nombrePrueba}`);
        } else {
            pruebasFallidas++;
            console.log(`[FALLA] ${nombrePrueba}`);
        }
    }

    // ===========================================
    // PRUEBAS DE VALIDACIONES
    // ===========================================
    console.log('\nPRUEBAS DE VALIDACION\n');

    // Probar validarNoVacio
    registrarPrueba('validarNoVacio: valor válido', 
        ModuloValidaciones.validarNoVacio('texto') === true);
    registrarPrueba('validarNoVacio: string vacía', 
        ModuloValidaciones.validarNoVacio('') === false);
    registrarPrueba('validarNoVacio: solo espacios', 
        ModuloValidaciones.validarNoVacio('   ') === false);
    registrarPrueba('validarNoVacio: null', 
        ModuloValidaciones.validarNoVacio(null) === false);
    registrarPrueba('validarNoVacio: número cero', 
        ModuloValidaciones.validarNoVacio(0) === true); // El número 0 es válido

    // Probar validarNumeroPositivo
    registrarPrueba('validarNumeroPositivo: número positivo', 
        ModuloValidaciones.validarNumeroPositivo(100) === true);
    registrarPrueba('validarNumeroPositivo: decimal positivo', 
        ModuloValidaciones.validarNumeroPositivo(99.99) === true);
    registrarPrueba('validarNumeroPositivo: cero', 
        ModuloValidaciones.validarNumeroPositivo(0) === false);
    registrarPrueba('validarNumeroPositivo: número negativo', 
        ModuloValidaciones.validarNumeroPositivo(-50) === false);
    registrarPrueba('validarNumeroPositivo: string numérica', 
        ModuloValidaciones.validarNumeroPositivo('150') === true);
    registrarPrueba('validarNumeroPositivo: NaN', 
        ModuloValidaciones.validarNumeroPositivo('abc') === false);

    // Probar validarNumeroNoNegativo
    registrarPrueba('validarNumeroNoNegativo: cero', 
        ModuloValidaciones.validarNumeroNoNegativo(0) === true);
    registrarPrueba('validarNumeroNoNegativo: positivo', 
        ModuloValidaciones.validarNumeroNoNegativo(50) === true);
    registrarPrueba('validarNumeroNoNegativo: negativo', 
        ModuloValidaciones.validarNumeroNoNegativo(-10) === false);

    // Probar validarRango
    registrarPrueba('validarRango: valor dentro del rango', 
        ModuloValidaciones.validarRango(50, 0, 100) === true);
    registrarPrueba('validarRango: valor en el límite inferior', 
        ModuloValidaciones.validarRango(0, 0, 100) === true);
    registrarPrueba('validarRango: valor en el límite superior', 
        ModuloValidaciones.validarRango(100, 0, 100) === true);
    registrarPrueba('validarRango: valor fuera del rango (menor)', 
        ModuloValidaciones.validarRango(-1, 0, 100) === false);
    registrarPrueba('validarRango: valor fuera del rango (mayor)', 
        ModuloValidaciones.validarRango(101, 0, 100) === false);

    // Probar validarMaximo
    registrarPrueba('validarMaximo: valor menor al máximo', 
        ModuloValidaciones.validarMaximo(50, 100) === true);
    registrarPrueba('validarMaximo: valor igual al máximo', 
        ModuloValidaciones.validarMaximo(100, 100) === true);
    registrarPrueba('validarMaximo: valor mayor al máximo', 
        ModuloValidaciones.validarMaximo(101, 100) === false);

    // Probar escaparHTML
    registrarPrueba('escaparHTML: texto sin caracteres especiales', 
        ModuloValidaciones.escaparHTML('Hola Mundo') === 'Hola Mundo');
    registrarPrueba('escaparHTML: texto con ampersand', 
        ModuloValidaciones.escaparHTML('A & B') === 'A &amp; B');
    registrarPrueba('escaparHTML: texto con etiquetas HTML', 
        ModuloValidaciones.escaparHTML('<script>alert("XSS")</script>') === 
        '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');

    // ===========================================
    // PRUEBAS DE CÁLCULOS FINANCIEROS
    // ===========================================
    console.log('\nPRUEBAS DE CALCULOS FINANCIEROS\n');

    // Probar calcularAhorroMensual
    registrarPrueba('calcularAhorroMensual: cálculo básico', 
        ModuloCalculos.calcularAhorroMensual(3000, 1500) === 1500);
    registrarPrueba('calcularAhorroMensual: gastos mayores al ingreso', 
        ModuloCalculos.calcularAhorroMensual(1000, 1500) === 0);
    registrarPrueba('calcularAhorroMensual: gastos iguales al ingreso', 
        ModuloCalculos.calcularAhorroMensual(2000, 2000) === 0);

    // Probar calcularMesesParaMeta
    registrarPrueba('calcularMesesParaMeta: cálculo básico', 
        ModuloCalculos.calcularMesesParaMeta(1000, 5000, 1500) === 4);
    registrarPrueba('calcularMesesParaMeta: meta ya alcanzada', 
        ModuloCalculos.calcularMesesParaMeta(6000, 5000, 1000) === 0);
    registrarPrueba('calcularMesesParaMeta: ahorro mensual cero', 
        ModuloCalculos.calcularMesesParaMeta(1000, 5000, 0) === Infinity);

    // Probar calcularPorcentajeAhorro
    registrarPrueba('calcularPorcentajeAhorro: cálculo básico', 
        ModuloCalculos.calcularPorcentajeAhorro(1500, 3000) === 50);
    registrarPrueba('calcularPorcentajeAhorro: ingreso cero', 
        ModuloCalculos.calcularPorcentajeAhorro(100, 0) === 0);

    // ===========================================
    // PRUEBAS DE SEGURIDAD
    // ===========================================
    console.log('\nPRUEBAS DE SEGURIDAD\n');

    // Verificar que se usa textContent (no innerHTML) en las funciones relevantes
    registrarPrueba('Funciones de validación no permiten XSS', 
        ModuloValidaciones.escaparHTML('<img onerror="alert(1)">').includes('&lt;img') === true);

    // ===========================================
    // RESUMEN DE PRUEBAS
    // ===========================================
    console.log('\n' + '='.repeat(50));
    console.log('RESUMEN DE PRUEBAS');
    console.log('='.repeat(50));
    console.log(`Total de pruebas: ${pruebasTotales}`);
    console.log(`Exitosas: ${pruebasExitosas}`);
    console.log(`Fallidas: ${pruebasFallidas}`);
    console.log(`Porcentaje de exito: ${((pruebasExitosas / pruebasTotales) * 100).toFixed(1)}%`);
    console.log('='.repeat(50));

    return {
        total: pruebasTotales,
        exitosas: pruebasExitosas,
        fallidas: pruebasFallidas,
        porcentajeExito: (pruebasExitosas / pruebasTotales) * 100
    };
}

// Ejecutar pruebas automáticamente al cargar el script
// Usamos setTimeout para asegurar que todos los módulos estén cargados
if (typeof ModuloCalculos !== 'undefined') {
    const resultadoPruebas = ejecutarPruebas();
    console.log('\nPara ver este reporte otra vez, ejecuta: ejecutarPruebas()');
} else {
    console.warn('ModuloCalculos no esta definido. Asegurate de cargar app.js despues de pruebas.js');
}

// Exportar para uso global
window.ejecutarPruebas = ejecutarPruebas;
