function obtenerTipoUsuario(edad) {
    let tipo;
    if (edad >= 18) {
        tipo = "Mayor de edad";
    } else {
        tipo = "Menor de edad";
    }
    return tipo;
}

function esNumeroPositivo(numero) {
    let resultado;
    if (numero > 0) {
        resultado = true;
    } else {
        resultado = false;
    }
    return resultado;
}



console.log(obtenerTipoUsuario(20)); // Mayor de edad
console.log(esNumeroPositivo(5)); // true



/*
function obtenerTipoUsuario(edad) {
    return edad >= 18 ? "Mayor de edad" : "Menor de edad";
}

function esNumeroPositivo(numero) {
    return numero > 0;
}
    */