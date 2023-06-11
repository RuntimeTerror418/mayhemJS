const Vector2 = {

    add(v1: vector2, v2: vector2){ return [v1[0] + v2[0], v1[1] + v2[1]]; },

    sub(v1: vector2, v2: vector2): vector2 {
        return [v1[0] - v2[0], v1[1] - v2[1]];
    },

    scale(v: vector2, s: number){ return [v[0] * s, v[1] * s]; },

    negate(v: vector2){ return [-v[0], -v[1]]; },

    dot(v1: vector2, v2: vector2){ return [v1[0] * v2[0] + v1[1] * v2[1]]; },

    getLength(v: vector2){ return Math.hypot(v[0], v[1]); },

    normalize(v: vector2) {
        const l = Vector2.getLength(v);
        if(l === 0) return [0, 0];
        return [v[0] / l, v[1] / l];
    },

    perp(v: vector2){ return [-v[1], v[0]]; },

    addScale(v1: vector2, v2: vector2, s: number){ return [v1[0] + v2[0] * s, v1[1] + v2[1] * s]; },

    getAngle(v: vector2){ return Math.atan2(v[1], v[0]); },

    getDistance(p1: vector2, p2: vector2) {
        return Vector2.getLength(Vector2.sub(p2, p1));
    },

    fromAngle(a: number, hyp: number) {
        return Vector2.scale([Math.cos(a), Math.sin(a)], hyp);
    },

    multiplyMatrix(v: number[], m: mat3) {
        let dv = v.length < 3 ? [v[0], v[1], 1]: [v[0], v[1], v[2]];
        let res = [];
        for(let i = 0; i < 3; i++) {
            let sum = 0;
            for(let j = 0; j < 3; j++)
                sum += m[j * 3 + i] * dv[j];
            res.push(sum);
        }
        return res;
    }

};

const vec2 = Vector2;

export { vec2, Vector2 }