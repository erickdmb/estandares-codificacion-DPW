/**
 * @fileoverview Pruebas para Lista de Tareas
 */
function ejecutarPruebasTareas() {
    console.log('='.repeat(50));
    console.log('PRUEBAS - LISTA DE TAREAS');
    console.log('='.repeat(50));

    let total = 0, exitosas = 0, fallidas = 0;
    const probar = (nombre, resultado) => {
        total++;
        if (resultado) { exitosas++; console.log(`[OK] ${nombre}`); }
        else { fallidas++; console.log(`[FALLA] ${nombre}`); }
    };

    console.log('\nVALIDACIONES\n');
    probar('validarTitulo: válido', ValidadorTareas.validarTitulo('Hacer tarea') === true);
    probar('validarTitulo: muy corto', ValidadorTareas.validarTitulo('Ab') === false);
    probar('validarTitulo: vacío', ValidadorTareas.validarTitulo('') === false);

    probar('validarPrioridad: válida', ValidadorTareas.validarPrioridad('alta') === true);
    probar('validarPrioridad: inválida', ValidadorTareas.validarPrioridad('urgente') === false);

    probar('validarFecha: vacía (opcional)', ValidadorTareas.validarFecha('') === true);
    probar('validarFecha: válida', ValidadorTareas.validarFecha('2026-12-31') === true);

    console.log('\nESTADISTICAS\n');
    probar('calcularEstadisticas', 
        GestorTareas.calcularEstadisticas([
            {completada: true}, {completada: false}, {completada: true}
        ]).completadas === 2);
    probar('calcularEstadisticas vacío', 
        GestorTareas.calcularEstadisticas([]).total === 0);

    console.log('\nFILTRADO\n');
    probar('filtrarPorEstado', 
        GestorTareas.filtrarPorEstado([{completada: true}, {completada: false}], 'pendientes').length === 1);
    probar('ordenarPorPrioridad', 
        GestorTareas.ordenarPorPrioridad([
            {prioridad: 'baja'}, {prioridad: 'alta'}, {prioridad: 'media'}
        ])[0].prioridad === 'alta');

    console.log('\n' + '='.repeat(50));
    console.log(`TOTAL: ${total} | PASARON: ${exitosas} | FALLARON: ${fallidas}`);
    console.log('='.repeat(50));
}

window.ejecutarPruebasTareas = ejecutarPruebasTareas;
if (typeof GestorTareas !== 'undefined') ejecutarPruebasTareas();
