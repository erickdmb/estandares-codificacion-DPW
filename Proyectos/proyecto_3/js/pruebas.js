/**
 * @fileoverview Pruebas para el Conversor de Unidades
 */
function ejecutarPruebasConversor() {
    console.log('='.repeat(50));
    console.log('PRUEBAS - CONVERSOR DE UNIDADES');
    console.log('='.repeat(50));

    let total = 0, exitosas = 0, fallidas = 0;
    const probar = (nombre, resultado) => {
        total++;
        if (resultado) { exitosas++; console.log(`[OK] ${nombre}`); }
        else { fallidas++; console.log(`[FALLA] ${nombre}`); }
    };

    console.log('\nVALIDACIONES\n');
    probar('validarNumero: numero valido', ValidadorUnidades.validarNumero(100) === true);
    probar('validarNumero: decimal', ValidadorUnidades.validarNumero(3.14159) === true);
    probar('validarNumero: string vacia', ValidadorUnidades.validarNumero('') === false);
    probar('validarNumero: texto', ValidadorUnidades.validarNumero('abc') === false);
    probar('validarNumero: infinito', ValidadorUnidades.validarNumero(Infinity) === false);

    console.log('\nLONGITUD\n');
    probar('km a metros', ConversorUnidades.convertirParaPruebas(1, 'longitud', 'km', 'm') === 1000);
    probar('m a cm', ConversorUnidades.convertirParaPruebas(1, 'longitud', 'm', 'cm') === 100);
    probar('pulgada a cm', Math.round(ConversorUnidades.convertirParaPruebas(1, 'longitud', 'pulgada', 'cm') * 100) / 100 === 2.54);

    console.log('\nPESO\n');
    probar('kg a g', ConversorUnidades.convertirParaPruebas(1, 'peso', 'kg', 'g') === 1000);
    probar('libra a kg', Math.round(ConversorUnidades.convertirParaPruebas(1, 'peso', 'lb', 'kg') * 1000) / 1000 === 0.454);

    console.log('\nTEMPERATURA\n');
    probar('Celsius a Fahrenheit', ConversorUnidades.convertirParaPruebas(0, 'temperatura', 'C', 'F') === 32);
    probar('Celsius a Kelvin', ConversorUnidades.convertirParaPruebas(0, 'temperatura', 'C', 'K') === 273.15);
    probar('100C a F', ConversorUnidades.convertirParaPruebas(100, 'temperatura', 'C', 'F') === 212);

    console.log('\nVOLUMEN\n');
    probar('litro a ml', ConversorUnidades.convertirParaPruebas(1, 'volumen', 'L', 'mL') === 1000);
    probar('galon a litros', Math.round(ConversorUnidades.convertirParaPruebas(1, 'volumen', 'gal', 'L') * 100) / 100 === 3.79);

    console.log('\n' + '='.repeat(50));
    console.log(`TOTAL: ${total} | PASARON: ${exitosas} | FALLARON: ${fallidas}`);
    console.log('='.repeat(50));
}

window.ejecutarPruebasConversor = ejecutarPruebasConversor;
if (typeof ConversorUnidades !== 'undefined') ejecutarPruebasConversor();
