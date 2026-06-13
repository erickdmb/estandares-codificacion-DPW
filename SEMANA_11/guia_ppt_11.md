# Modularización
 Dividir un programa grande en módulos más pequeños, cada uno con una responsabilidad específica.

 ```bash
 proyecto/
    modules/
        validaciones.js   (solo validaciones)
        calculos.js       (solo cálculos)
        formateo.js       (solo formato)
        storage.js        (solo almacenamiento)
    app.js                (integra todo)
 ```

# Reutilización

Escribir código que pueda ser usado en múltiples partes de una aplicación o en múltiples proyectos.

```js
// Una vez que creas esta función...
export function formatearNumero(numero, decimales = 2) {
    return numero.toFixed(decimales);
}

// Puedes usarla en cualquier lugar
let resultado1 = formatearNumero(10 / 3);  // "3.33"
let resultado2 = formatearNumero(PI);       // "3.14"
```

# Ejemplo de Modularización
## Estructura del proyecto de hoy

```bash
semana11
    |-index.html
    |-css/
      |-- estilos.css
    |-modules/
      |- validaciones.js    -> exporta funciones de validación
      |- calculos.js        -> exporta funciones matemáticas
      |- formateo.js        -> exporta funciones de formato
      |- storage.js         -> exporta funciones de almacenamiento
    |-js/
      |- app.js             -> importa todos y los usa
```
# Ejemplo de código modular
## validaciones.js (módulo) -> exporta funciones

```js
export function esNumeroValido(valor) {
    return !isNaN(parseFloat(valor));
}

export function mostrarError(mensaje) {
    resultadoDiv.innerHTML = mensaje;
}
```

## app.js -> importa y usa

```js
import { esNumeroValido, mostrarError } from './modules/validaciones.js';

if (!esNumeroValido(num1)) {
    mostrarError("Error: Número inválido");
}
```

# Reutilizaicón en acción
## El módulo calculos.js puede reutilizarse en cualquier proyecto:

```javascript
// En un proyecto de calculadora
import { sumar, restar } from './modules/calculos.js';

// En un proyecto de geometría
import { areaCirculo, PI } from './modules/calculos.js';

// En un proyecto de estadísticas
import { porcentaje, promedio } from './modules/calculos.js';
```