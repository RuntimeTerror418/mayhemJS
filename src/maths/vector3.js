class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(v) { return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z); }
    sub(v) { return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z); }
    scale(s) { return new Vector3(this.x * s, this.y * s, this.z * s); }
    negate() { return new Vector3(-this.x, -this.y, -this.z); }
    dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
    normalize() {
        const l = this.length();
        if (l == 0)
            return new Vector3(0, 0, 0);
        return new Vector3(this.x / l, this.y / l, this.z / l);
    }
    addScale(v, s) { return new Vector3(this.x + v.x * s, this.y + v.y * s, this.z + v.z * s); }
    length() { return Math.hypot(this.x, this.y, this.z); }
    get array() { return [this.x, this.y, this.z, 1]; }
    static getDistance(p1, p2) {
        return Math.hypot(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
    }
}
const vec3 = Vector3;
export { vec3, Vector3 };
//# sourceMappingURL=vector3.js.map