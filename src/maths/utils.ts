Math["__proto__"] = {

    g: 9.8,

    G: 6.67e-11,

    degToRad(n: number){ return n * this.PI / 180; },

    radToDeg(n: number){ return n * 180 / this.PI; },

    lerp(a: number, b: number, t: number){ return a + (b - a) * t; },

    randRange(a: number, b: number){ return this.lerp(a, b, this.random()); },

    randInt(a: number, b: number){ return ~~(this.randRange(a, b)); }
}