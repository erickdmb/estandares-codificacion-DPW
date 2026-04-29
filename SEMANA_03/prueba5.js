const IGV = 0.18;

function calcularPrecioConIVA(precioSinIVA, cantidad) {
    const subtotal = precioSinIVA * cantidad;
    const impuesto = subtotal * IGV;
    const total = subtotal + impuesto;
    return total;
}

const precioProducto = 100;
const cantidadProductos = 2;
const precioFinal = calcularPrecioConIVA(precioProducto, cantidadProductos);
console.log(precioFinal);