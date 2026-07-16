/**
 * @fileoverview Pruebas para Calculadora de IMC
 */
function ejecutarPruebasIMC() {
    console.log('='.repeat(50));
    console.log('PRUEBAS - CALCULADORA DE IMC');
    console.log('='.repeat(50));

    let total = 0, exitosas = 0, fallidas = 0;
    const probar = (nombre, resultado) => {
        total++;
        if (resultado) { exitosas++; console.log(`[OK] ${nombre}`); }
        else { fallidas++; console.log(`[FALLA] ${nombre}`); }
    };

    console.log('\nVALIDACIONES\n');
    probar('validarPeso: válido', ValidadorIMC.validarPeso(70) === true);
    probar('validarPeso: mínimo', ValidadorIMC.validarPeso(20) === true);
    probar('validarPeso: máximo', ValidadorIMC.validarPeso(300) === true);
    probar('validarPeso: muy bajo', ValidadorIMC.validarPeso(19) === false);
    probar('validarPeso: muy alto', ValidadorIMC.validarPeso(301) === false);
    probar('validarPeso: decimal', ValidadorIMC.validarPeso(70.5) === true);

    probar('validarAltura: válida', ValidadorIMC.validarAltura(175) === true);
    probar('validarAltura: mínima', ValidadorIMC.validarAltura(50) === true);
    probar('validarAltura: máxima', ValidadorIMC.validarAltura(250) === true);
    probar('validarAltura: inválida', ValidadorIMC.validarAltura(49) === false);

    probar('validarEdad: válida', ValidadorIMC.validarEdad(30) === true);
    probar('validarEdad: inválida', ValidadorIMC.validarEdad(121) === false);

    probar('validarSexo: masculino', ValidadorIMC.validarSexo('masculino') === true);
    probar('validarSexo: femenino', ValidadorIMC.validarSexo('femenino') === true);
    probar('validarSexo: inválido', ValidadorIMC.validarSexo('otro') === false);

    console.log('\nCALCULOS IMC\n');
    // IMC = peso / altura² (altura en metros)
    // 70kg / 1.75² = 70 / 3.0625 = 22.86
    const imcNormal = CalculadoraIMC.calcularIMC(70, 175);
    probar('calcularIMC: peso normal', Math.round(imcNormal * 100) / 100 === 22.86);

    const imcSobrepeso = CalculadoraIMC.calcularIMC(90, 175);
    probar('calcularIMC: sobrepeso', Math.round(imcSobrepeso * 10) / 10 === 29.4);

    const imcObeso = CalculadoraIMC.calcularIMC(100, 170);
    probar('calcularIMC: obeso', Math.round(imcObeso * 10) / 10 === 34.6);

    console.log('\nCLASIFICACION\n');
    probar('clasificarIMC: bajo peso', CalculadoraIMC.clasificarIMC(17) === 'bajo');
    probar('clasificarIMC: normal', CalculadoraIMC.clasificarIMC(22) === 'normal');
    probar('clasificarIMC: sobrepeso', CalculadoraIMC.clasificarIMC(27) === 'sobrepeso');
    probar('clasificarIMC: obeso 1', CalculadoraIMC.clasificarIMC(32) === 'obeso1');
    probar('clasificarIMC: obeso 2', CalculadoraIMC.clasificarIMC(37) === 'obeso2');
    probar('clasificarIMC: obeso 3', CalculadoraIMC.clasificarIMC(45) === 'obeso3');

    console.log('\nPESO IDEAL\n');
    const pesoIdeal = CalculadoraIMC.calcularPesoIdeal(175);
    probar('calcularPesoIdeal', Math.round(pesoIdeal) === 67);

    console.log('\n' + '='.repeat(50));
    console.log(`TOTAL: ${total} | PASARON: ${exitosas} | FALLARON: ${fallidas}`);
    console.log('='.repeat(50));
}

window.ejecutarPruebasIMC = ejecutarPruebasIMC;
if (typeof CalculadoraIMC !== 'undefined') ejecutarPruebasIMC();
