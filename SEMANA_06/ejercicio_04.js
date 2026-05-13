function mostrarSaludo() {
    let nombre = prompt("Ingresa tu nombre:");
    let edad = prompt("Ingresa tu edad:");
    
    document.getElementById("mensaje").innerHTML = 
        "Bienvenido " + nombre + ", tienes " + edad + " años";
}



/*
<!DOCTYPE html>
<html>
<head>
    <title>Prueba de Seguridad</title>
</head>
<body>
    <div id="mensaje"></div>
    <script>
        function mostrarSaludo() {
            let nombre = prompt("Ingresa tu nombre:");
            let edad = prompt("Ingresa tu edad:");
            
            if (!nombre || nombre.trim() === "") {
                nombre = "Invitado";
            } else {
                nombre = nombre.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
            
            let edadNumero = parseInt(edad);
            let edadValida = !isNaN(edadNumero) ? edadNumero : "no válida";
            
            let mensaje = document.getElementById("mensaje");
            mensaje.textContent = "Bienvenido " + nombre + ", tienes " + edadValida + " años";
        }
        
        mostrarSaludo();
    </script>
</body>
</html>
*/