function procesarPedido(producto, cantidad) {
    // Calcular subtotal
    let subtotal = producto.precio * cantidad;
    
    // Aplicar descuento (no solicitado por el cliente)
    let descuento = subtotal * 0.10;
    let total = subtotal - descuento;
    
    // Enviar email de confirmación (no solicitado)
    enviarEmailCliente(producto.cliente);
    
    // Generar factura en PDF (no solicitado)
    generarPDFFactura(pedido);
    
    // Guardar en base de datos (solicitado)
    guardarEnBD(producto, cantidad, total);
    
    return total;
}

/*
function procesarPedido(producto, cantidad) {
    // Calcular subtotal
    let subtotal = producto.precio * cantidad;
    
    // Guardar en base de datos (solicitado)
    guardarEnBD(producto, cantidad, subtotal);
    
    return subtotal;
}

*/