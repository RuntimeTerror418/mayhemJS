class Vector2 implements vector2 {

    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(v: vector2) { return new Vector2(this.x + v.x, this.y + v.y); }

    sub(v: vector2) { return new Vector2(this.x - v.x, this.y - v.y); }

    scale(s) { return new Vector2(this.x * s, this.y * s); }

    negate() { return new Vector2(-this.x, -this.y); }

    dot(v: vector2) { return this.x * v.x + this.y * v.y; }

    normalize() {
        const l = this.length();
        if(l == 0)
            return new Vector2(0, 0);
        return new Vector2(this.x / l, this.y / l);
    }

    perp() { return new Vector2(-this.y, this.x); }

    addScale(v: Vector2, s: number) { return new Vector2(this.x + v.x * s, this.y + v.y * s); }

    length() { return Math.hypot(this.x, this.y); }

    angle() { return Math.atan2(this.y, this.x); }

    get array(){ return [this.x, this.y, 1]; }

    static getDistance(p1: vector2, p2: vector2) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.hypot(dx, dy);
    }

    static fromAngle(a: number = 0, mag: number = 1) {
        const px = Math.cos(a) * mag;
        const py = Math.sin(a) * mag;
        return new Vector2(px, py);
    }

}

const vec2 = Vector2;

export { vec2, Vector2 }