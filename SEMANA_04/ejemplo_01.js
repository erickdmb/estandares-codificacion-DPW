let d=new Date();
let a= d.getDay();
let b=5;
let x=a+b;

console.log(x);

//var es la forma antigua de declarar variables, se recomienda usar let o const para evitar problemas de alcance y reasignación accidental
// de variables. En este caso, se ha utilizado let para declarar las variables d, a, b y x.


const fechaActual = new Date();
const diaSemana = fechaActual.getDay();
const DIAS_AGREGAR = 5;
const fechaFutura = diaSemana + DIAS_AGREGAR;

console.log(`La fecha futura será: ${fechaFutura}`);

//let es una forma de declarar variables que permite reasignar su valor, mientras que const se utiliza para declarar constantes,
// es decir, variables cuyo valor no puede cambiar una vez asignado. En este caso, 
// se ha utilizado const para declarar las variables fechaActual, diaSemana, DIAS_AGREGAR y fechaFutura,
// ya que sus valores no necesitan ser modificados después de su asignación inicial.