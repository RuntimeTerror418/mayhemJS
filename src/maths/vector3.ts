const Vector3 = {

    add(v1: vector3, v2: vector3){ return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]; },

    sub(v1: vector3, v2: vector3): vector3 {
        return [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
    },

    scale(v: vector3, s: number){ return [v[0] * s, v[1] * s, v[2] * s]; },

    negate(v: vector3){ return [-v[0], -v[1], -v[2]]; },

    dot(v1: vector3, v2: vector3){ return [v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]]; },

    getLength(v: vector3){ return Math.hypot(v[0], v[1], v[2]); },

    normalize(v: vector3) {
        const l = Vector3.getLength(v);
        if(l === 0) return [0, 0, 0];
        return [v[0] / l, v[1] / l, v[2] / l];
    },

    cross(v1: vector3, v2: vector3){
        let res = [];
        res[0] = v1[1] * v2[2] - v1[2] * v2[1];
        res[1] = v1[2] * v2[0] - v1[0] * v2[2];
        res[2] = v1[0] * v2[1] - v1[1] * v2[0];
        return res;
    },

    addScale(v1: vector3, v2: vector3, s: number){ return [v1[0] + v2[0] * s, v1[1] + v2[1] * s, v1[2] + v2[2] * s]; },

    getDistance(p1: vector3, p2: vector3) {
        return Vector3.getLength(Vector3.sub(p2, p1));
    },

    multiplyMatrix(v: number[], m: mat4) {
        let dv = v.length < 4 ? [v[0], v[1], v[2], 1]: [v[0], v[1], v[2], v[3]];
        let res = [];
        for(let i = 0; i < 4; i++) {
            let sum = 0;
            for(let j = 0; j < 4; j++)
                sum += m[j * 4 + i] * dv[j];
            res.push(sum);
        }
        return res;
    }

};

const vec3 = Vector3;

export { vec3, Vector3 }