function calc(p, a) {
    let r = p * a;
    let igv = r * 0.18;
    let t = r + igv;
    return t;
}

let x = 100;
let y = 2;
let z = calc(x, y);
console.log(z);