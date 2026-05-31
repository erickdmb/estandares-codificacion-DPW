
/*let numero = parseInt("Hola");

console.log(numero.toFixed(2));
*/

//solucion con try-catch
try{
    let numero = parseInt("Hola");
    console.log(numero.toFixed(2));
}catch(error){
    console.log("Error: No se puede convertir el texto a numero");
}


try {
    // Código que puede generar una excepción
} catch (error) {
    // Código que se ejecuta si hay excepción
}


try{
    // Código que puede generar una excepción
} catch (error) {
    // Código que se ejecuta si hay excepción
}finally{
    // Código que se ejecuta siempre
}

