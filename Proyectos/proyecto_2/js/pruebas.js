/**
 * @fileoverview Pruebas unitarias para el Gestor de Gastos
 */
function ejecutarPruebasGastos() {
    console.log('='.repeat(50));
    console.log('PRUEBAS - GESTOR DE GASTOS');
    console.log('='.repeat(50));

    let total = 0, exitosas = 0, fallidas = 0;

    function probar(nombre, resultado) {
        total++;
        if (resultado) { exitosas++; console.log(`[OK] ${nombre}`); }
        else { fallidas++; console.log(`[FALLA] ${nombre}`); }
    }

    console.log('\nVALIDACIONES\n');

    probar('validarNoVacio: texto válido', ValidadorGastos.validarNoVacio('texto') === true);
    probar('validarNoVacio: vacío', ValidadorGastos.validarNoVacio('') === false);
    probar('validarNoVacio: solo espacios', ValidadorGastos.validarNoVacio('   ') === false);

    probar('validarMonto: número positivo', ValidadorGastos.validarMonto(100) === true);
    probar('validarMonto: decimal', ValidadorGastos.validarMonto(50.50) === true);
    probar('validarMonto: cero', ValidadorGastos.validarMonto(0) === false);
    probar('validarMonto: negativo', ValidadorGastos.validarMonto(-10) === false);

    probar('validarDescripcion: válida', ValidadorGastos.validarDescripcion('Supermercado') === true);
    probar('validarDescripcion: muy corta', ValidadorGastos.validarDescripcion('Ab') === false);

    probar('validarCategoria: válida', ValidadorGastos.validarCategoria('alimentacion') === true);
    probar('validarCategoria: inválida', ValidadorGastos.validarCategoria('invalida') === false);

    probar('validarFecha: fecha válida', ValidadorGastos.validarFecha('2026-07-14') === true);
    probar('validarFecha: vacía', ValidadorGastos.validarFecha('') === false);

    console.log('\nCALCULOS\n');

    probar('calcularTotalGastos', GestorGastos.calcularTotalGastos([{monto: 100}, {monto: 50}]) === 150);
    probar('calcularTotalGastos vacío', GestorGastos.calcularTotalGastos([]) === 0);

    probar('obtenerGastosPorCategoria', 
        GestorGastos.obtenerGastosPorCategoria([{categoria: 'alimentacion', monto: 50}, {categoria: 'alimentacion', monto: 30}]).alimentacion === 80);

    console.log('\n' + '='.repeat(50));
    console.log(`TOTAL: ${total} | PASARON: ${exitosas} | FALLARON: ${fallidas}`);
    console.log('='.repeat(50));
}

window.ejecutarPruebasGastos = ejecutarPruebasGastos;
if (typeof GestorGastos !== 'undefined') ejecutarPruebasGastos();
