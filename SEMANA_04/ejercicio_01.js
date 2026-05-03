class D {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    d() {
        return this.a * this.b * (1+this.c);
    }
}

let t = new D(100, 2, 0.18);
let r = t.d();
console.log(r);