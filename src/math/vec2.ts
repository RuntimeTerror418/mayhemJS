const Vec2 = {

    create(...args: number[]): vec2 {
        let res: vec2 = [0, 0];
        for(let i = 0; i < args.length; i++) {
            res[0] = args[i] || res[0];
            res[1] = args[i + 1] || res[1];
        }
        return res;
    },

    add(v1: vec2, v2: vec2): vec2 {
        return [v1[0] + v2[0], v1[1] + v2[1]];
    },

    addScale(v1: vec2, v2: vec2, s: number): void {
        v1[0] += v2[0] * s;
        v1[1] += v2[1] * s;
    },

    sub(v1: vec2, v2: vec2): vec2 {
        return [v1[0] - v2[0], v1[1] - v2[1]];
    },

    subScale(v1: vec2, v2: vec2, s: number): void {
        v1[0] -= v2[0] * s;
        v1[1] -= v2[1] * s;
    },

    scale(v: vec2, s: number): vec2 {
        return [v[0] * s, v[1] * s];
    },

    negate(v: vec2): vec2 {
        return [-v[0], -v[1]];
    },

    dot(v1: vec2, v2: vec2): number {
        return v1[0] * v2[0] + v1[1] * v2[1];
    },

    getLength(v: vec2): number {
        return Math.hypot(v[0], v[1]);
    },

    normalize(v: vec2): vec2 {
        const l = Vec2.getLength(v);
        if(l === 0) return [0, 0];
        return [v[0] / l, v[1] / l];
    },

    perp(v: vec2): vec2 {
        return [-v[1], v[0]];
    },

    getAngle(v: vec2): number {
        return Math.atan2(v[1], v[0]);
    },

    fromAngle(a: number, hyp: number): vec2 {
        return Vec2.scale([Math.cos(a), Math.sin(a)], hyp);
    },

    // multiplyMatrix(v: vec2, m: mat2): vec2 {
    //     let res = vec2.create();
    //     for(let i = 0; i < 2; i++) {
    //         let sum = 0;
    //         for(let j = 0; j < 2; j++)
    //             sum += m[j * 2 + i] * v[j];
    //         res.push(sum);
    //     }
    //     return res;
    // }

}

export { Vec2 };