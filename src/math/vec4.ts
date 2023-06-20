const Vec4 = {

    add(v1: vec4, v2: vec4){ return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]; },

    addScale(v1: vec4, v2: vec4, s: number): void {
        v1[0] += v2[0] * s;
        v1[1] += v2[1] * s;
        v1[2] += v2[2] * s;
        v1[3] += v2[3] * s;
    },

    sub(v1: vec4, v2: vec4): vec4 {
        return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2], v1[3] - v2[3]];
    },

    subScale(v1: vec4, v2: vec4, s: number): void {
        v1[0] -= v2[0] * s;
        v1[1] -= v2[1] * s;
        v1[2] -= v2[2] * s;
        v1[3] -= v2[3] * s;
    },

    multiplyMatrix(v: vec4, m: mat4) {
        let res = [];
        for(let i = 0; i < 4; i++) {
            let sum = 0;
            for(let j = 0; j < 4; j++)
                sum += m[j * 4 + i] * v[j];
            res.push(sum);
        }
        return res;
    }

}

export { Vec4 };