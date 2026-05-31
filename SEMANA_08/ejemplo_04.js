


function fibonacci(n) {
    let a = 0;           // primer número
    let b = 1;           // segundo número
    
    for (let i = 0; i < n; i++) {  // se repite n veces
        console.log(a);            // muestra el número actual
        let temp = a + b;          // calcula el siguiente
        a = b;                     // avanza al siguiente
        b = temp;                  // actualiza el siguiente
    }
}



fibonacci(10);  // n = 10 → muestra 10 números