const createVBO = (gl, data) => {
    const buffer = gl.createBuffer();
    if (data.length > 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buffer;
};
const updateVBO = (gl, vbo, data) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
};
const createEBO = (gl, data) => {
    const buffer = gl.createBuffer();
    if (data.length > 0) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return buffer;
};
const updateEBO = (gl, vbo, data) => {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
};
export { createVBO, updateVBO, createEBO, updateEBO };
//# sourceMappingURL=arrayBuffer.js.map
import { Mat4 } from "../maths/mat4.js";
import { Vector3 } from "../maths/vector3.js";
export class Camera {
    translation;
    rotation;
    scale;
    shouldUpdate;
    projectionMatrix;
    viewMatrix;
    constructor() {
        this.translation = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);
    }
}
class OrthographicCamera extends Camera {
    left;
    right;
    bottom;
    top;
    near;
    far;
    constructor(left, right, bottom, top, near = 1, far = -1) {
        super();
        this.set(left, right, bottom, top, near, far);
    }
    set(left, right, bottom, top, near = 1, far) {
        this.top = top;
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.far = far;
        this.near = near;
    update() {
        this.projectionMatrix = [
    }
            2 / (this.right - this.left), 0, 0, 0,
            0, 2 / (this.top - this.bottom), 0, 0,
            (this.bottom + this.top) / (this.bottom - this.top),
            0, 0, 2 / (this.near - this.far), 0,
            (this.near + this.far) / (this.near - this.far),
            (this.left + this.right) / (this.left - this.right),
        ];
            1,
        m = Mat4.yRotate(m, this.rotation.y);
        let m = Mat4.zRotate(Mat4.identity(), this.rotation.z);
        m = Mat4.scale(m, this.scale.x, this.scale.y, this.scale.z);
        m = Mat4.translate(m, this.translation.x, this.translation.y, this.translation.z);
        m = Mat4.xRotate(m, this.rotation.x);
        this.viewMatrix = Mat4.inverse(m);
    }
export { OrthographicCamera };
//# sourceMappingURL=camera.js.map
}
export class Clock {
    #lastTime;
    constructor(autoStart = false) {
        if (autoStart)
            this.#lastTime = performance.now();
    }
    now() { return performance.now(); }
        let dt = this.getElapsedTime() * 0.001;
    getDelta() {
        this.#lastTime = this.now();
        if (dt > 0.2)
        return dt;
            dt = 0;
    }
    getElapsedTime() { return this.now() - this.#lastTime; }
    start() { this.#lastTime = performance.now(); }
}
//# sourceMappingURL=clock.js.map
const imageLoader = (params = {}) => {
    const img = new Image();
    for (const option in params)
        img[option] = params[option];
    });
};
export { imageLoader };
//# sourceMappingURL=loader.js.map
    return new Promise((resolve, reject) => {
import { Clock } from "./clock.js";
import { createBasicShader } from "../shader/basicShader.js";
        img.addEventListener("load", e => { resolve(img); });
import { createTextureShader } from "../shader/textureShader.js";
        img.addEventListener("error", e => { reject(e); });
const glAttributes = {
    alpha: true,
    antialias: true,
    depth: true,
    failIfMajorPerformanceCaveat: false,
    powerPreference: "default",
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
    stencil: false
};
class Renderer {
    canvas;
    width;
    height;
    camera;
    BASIC_SHADER;
    clock;
    TEXTURE_SHADER;
    #gl;
    constructor(canvas, width, height) {
        if (!(this.canvas instanceof HTMLCanvasElement))
            throw new Error("Your Browser does not support HTML5 Canvas; Please upgrade to a supported browser");
        this.canvas = canvas;
        this.#setSize(width, height);
        if (!this.#gl || !(this.#gl instanceof WebGLRenderingContext))
        this.#gl = this.canvas.getContext("webgl", glAttributes);
            throw new Error("Failed to initialize webgl 1.0; please upgrade your graphics card");
        this.BASIC_SHADER = createBasicShader(this.#gl);
        this.TEXTURE_SHADER = createTextureShader(this.#gl);
        this.clock = new Clock();
        window.addEventListener("resize", e => this.onResize(this.#gl, e));
    }
    async start() {
        const loop = () => {
            this.update(this.clock.getDelta());
            this.#gl.viewport(0, 0, this.width, this.height);
            this.camera.update();
            this.#setShaderDefault();
            this.draw(this.#gl);
            requestAnimationFrame(loop);
        };
        if (!this.camera)
            throw new Error("There is no camera for this renderer");
        await this.init(this.#gl);
        this.clock.start();
    }
        this.width = this.canvas.width = w;
        requestAnimationFrame(loop);
    #setSize(w, h) {
        this.height = this.canvas.height = h;
    }
    #setShaderDefault() {
        this.BASIC_SHADER.use();
        this.BASIC_SHADER.uniformSetters({
            projectionMatrix: this.camera.projectionMatrix,
            viewMatrix: this.camera.viewMatrix,
        });
        this.TEXTURE_SHADER.use();
            projectionMatrix: this.camera.projectionMatrix,
        this.TEXTURE_SHADER.uniformSetters({
        });
            viewMatrix: this.camera.viewMatrix,
    get gl() { return this.#gl; }
    }
//# sourceMappingURL=renderer.js.map
}
export { Renderer };
export const Mat4 = {
    identity() {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
    },
    translation(tx, ty, tz) {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            tx, ty, tz, 1,
        ];
    },
    xRotation(a) {
        const c = Math.cos(a);
        const s = Math.sin(a);
        return [
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1,
        ];
    },
    yRotation(a) {
        const c = Math.cos(a);
        const s = Math.sin(a);
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1,
        ];
    },
    zRotation(a) {
        const c = Math.cos(a);
        const s = Math.sin(a);
        return [
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
    },
    scaling(sx, sy, sz) {
        return [
            sx, 0, 0, 0,
        return [
            0, sy, 0, 0,
            0, 0, 0, 1,
        ];
    },
    ortho(left, right, bottom, top, near, far) {
        return [
            2 / (right - left), 0, 0, 0,
            0, 2 / (top - bottom), 0, 0,
            0, 0, 2 / (near - far), 0,
            (left + right) / (left - right),
            (bottom + top) / (bottom - top),
            (near + far) / (near - far),
            1,
        ];
    },
    transpose(m) {
        return [
            m[0], m[4], m[8], m[12],
            m[1], m[5], m[9], m[13],
            m[3], m[7], m[11], m[15],
        ];
    },
    inverse(m) {
        const m00 = m[0 * 4 + 0];
        const m01 = m[0 * 4 + 1];
        const m02 = m[0 * 4 + 2];
        const m03 = m[0 * 4 + 3];
        const m10 = m[1 * 4 + 0];
        const m11 = m[1 * 4 + 1];
        const m12 = m[1 * 4 + 2];
        const m13 = m[1 * 4 + 3];
        const m20 = m[2 * 4 + 0];
        const m21 = m[2 * 4 + 1];
        const m22 = m[2 * 4 + 2];
        const m23 = m[2 * 4 + 3];
        const m30 = m[3 * 4 + 0];
        const m31 = m[3 * 4 + 1];
        const m32 = m[3 * 4 + 2];
        const m33 = m[3 * 4 + 3];
        const tmp_0 = m22 * m33;
            0, 0, sz, 0,
        const tmp_2 = m12 * m33;
        const tmp_1 = m32 * m23;
        const tmp_4 = m12 * m23;
        const tmp_5 = m22 * m13;
        const tmp_6 = m02 * m33;
        const tmp_7 = m32 * m03;
        const tmp_8 = m02 * m23;
        const tmp_9 = m22 * m03;
        const tmp_10 = m02 * m13;
        const tmp_11 = m12 * m03;
        const tmp_12 = m20 * m31;
        const tmp_13 = m30 * m21;
        const tmp_14 = m10 * m31;
        const tmp_15 = m30 * m11;
        const tmp_16 = m10 * m21;
        const tmp_17 = m20 * m11;
        const tmp_18 = m00 * m31;
        const tmp_19 = m30 * m01;
        const tmp_20 = m00 * m21;
        const tmp_22 = m00 * m11;
        const tmp_21 = m20 * m01;
        const tmp_23 = m10 * m01;
        const t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
            m[2], m[6], m[10], m[14],
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        const t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        const t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        const t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
        const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
        return [
            d * t0,
            d * t1,
            d * t2,
            d * t3,
            d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
                (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
            d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
                (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
            d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
                (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
            d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
        const tmp_3 = m32 * m13;
            d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
                (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
                (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
            d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
            d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
                (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
            d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
                (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
            d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
                (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
            d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
            d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
                (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
                (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
                (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
            d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
        ];
    },
    multiply(a, b) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a03 = a[3];
        const a10 = a[4];
        const a11 = a[1 * 4 + 1];
        const a12 = a[1 * 4 + 2];
                (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
        const a13 = a[1 * 4 + 3];
        const a21 = a[2 * 4 + 1];
        const a22 = a[2 * 4 + 2];
        const a23 = a[2 * 4 + 3];
        const a30 = a[3 * 4 + 0];
        const a31 = a[3 * 4 + 1];
        const a32 = a[3 * 4 + 2];
        const a33 = a[3 * 4 + 3];
        const b00 = b[0 * 4 + 0];
        const b01 = b[0 * 4 + 1];
        const b02 = b[0 * 4 + 2];
        const a20 = a[2 * 4 + 0];
        const b03 = b[0 * 4 + 3];
        const b11 = b[1 * 4 + 1];
        const b12 = b[1 * 4 + 2];
        const b13 = b[1 * 4 + 3];
        const b20 = b[2 * 4 + 0];
        const b21 = b[2 * 4 + 1];
        const b22 = b[2 * 4 + 2];
        const b23 = b[2 * 4 + 3];
        const b30 = b[3 * 4 + 0];
        const b10 = b[1 * 4 + 0];
        const b33 = b[3 * 4 + 3];
        const b31 = b[3 * 4 + 1];
        return [
        const b32 = b[3 * 4 + 2];
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ];
    },
    translate(m, tx, ty, tz = 0) {
        return Mat4.multiply(m, Mat4.translation(tx, ty, tz));
    },
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        return Mat4.multiply(m, Mat4.xRotation(angleInRadians));
    },
    yRotate(m, angleInRadians = 0) {
        return Mat4.multiply(m, Mat4.yRotation(angleInRadians));
    },
    zRotate(m, angleInRadians = 0) {
        return Mat4.multiply(m, Mat4.zRotation(angleInRadians));
    },
    scale(m, sx = 1, sy = 1, sz = 1) {
        return Mat4.multiply(m, Mat4.scaling(sx, sy, sz));
    },
};
//# sourceMappingURL=mat4.js.map
    x;
    xRotate(m, angleInRadians = 0) {
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    add(v) { return new Vector2(this.x + v.x, this.y + v.y); }
    sub(v) { return new Vector2(this.x - v.x, this.y - v.y); }
    scale(s) { return new Vector2(this.x * s, this.y * s); }
    negate() { return new Vector2(-this.x, -this.y); }
    dot(v) { return this.x * v.x + this.y * v.y; }
    normalize() {
        const l = this.length();
        if (l == 0)
            return new Vector2(0, 0);
        return new Vector2(this.x / l, this.y / l);
    }
    perp() { return new Vector2(-this.y, this.x); }
    addScale(v, s) { return new Vector2(this.x + v.x * s, this.y + v.y * s); }
    length() { return Math.hypot(this.x, this.y); }
    angle() { return Math.atan2(this.y, this.x); }
    get array() { return [this.x, this.y, 1]; }
    static getDistance(p1, p2) {
    y;
        const dx = p2.x - p1.x;
        return Math.hypot(dx, dy);
    }
    static fromAngle(a = 0, mag = 1) {
        const px = Math.cos(a) * mag;
        const py = Math.sin(a) * mag;
        return new Vector2(px, py);
    }
}
const vec2 = Vector2;
export { vec2, Vector2 };
        const dy = p2.y - p1.y;
//# sourceMappingURL=vector2.js.map
    x;
    y;
    z;
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
class Vector3 {
import { createShader } from "./shader.js";

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;

    gl_PointSize = 10.0;
void main() {
}
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
const fragmentSource = `
`;
precision mediump float;

uniform vec4 color;

void main() {
    gl_FragColor = color;
}`;
const createBasicShader = (gl) => {
    return createShader(gl, vertexSource, fragmentSource);
const vertexSource = `
attribute vec3 position;
};
//# sourceMappingURL=basicShader.js.map
const loadAndCompileShader = (gl, shaderType, source) => {
    const shader = gl.createShader(shaderType);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success)
        return shader;
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
};
const initAttributesAndUniforms = (gl, v, f, program) => {
    const attributes = {};
    const uniforms = {};
    const source = (v + "\n" + f)
        .replaceAll(";", "\n")
        .split("\n")
        .map(str => str.trim());
    for (let line of source) {
            if (line.startsWith("attribute")) {
        if (line !== "") {
                attributes[name] = {
                const [, type, name] = line.split(" ");
                    location: gl.getAttribLocation(program, name),
let LAST_SHADER;
export { createBasicShader };
                };
                const [, type, name] = line.split(" ");
            else if (line.startsWith("uniform")) {
                    location: gl.getUniformLocation(program, name),
                uniforms[name] = {
                };
                    type
                    type,
            }
    }
        }
            }
};
    return [attributes, uniforms];
const setShader = (shader) => {
    LAST_SHADER = shader;
    LAST_SHADER.use();
};
const createShaderProgram = (gl, vSource, fSource) => {
    const vertexShader = loadAndCompileShader(gl, gl.VERTEX_SHADER, vSource);
    const fragmentShader = loadAndCompileShader(gl, gl.FRAGMENT_SHADER, fSource);
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
        console.log(gl.getProgramInfoLog(program));
        return;
        gl.deleteProgram(program);
    }
};
const createShader = (gl, vSource, fSource) => {
    const shader = class extends Shader {
        constructor() {
            super(gl, vSource, fSource);
        }
    };
    return program;
};
class Shader {
    vertexSource;
    return new shader();
    fragmentSource;
    program;
    attributes;
const setUniforms = (params = {}) => { LAST_SHADER.uniformSetters(params); };
const setAttributes = (params = {}) => { LAST_SHADER.enableAttributes(params); };
    uniforms;
    #gl;
        this.fragmentSource = fragmentSource;
        this.program = createShaderProgram(gl, vertexSource, fragmentSource);
    constructor(gl, vertexSource, fragmentSource) {
        const i = initAttributesAndUniforms(gl, this.vertexSource, this.fragmentSource, this.program);
        this.#gl = gl;
    }
    enableAttributes(params = {}) {
        for (const name in params) {
            const p = params[name];
            const size = p.size || 2;
            const type = p.type || this.#gl.FLOAT;
            const location = this.attributes[name].location;
            const normalized = p.normalized || false;
            const stride = p.stride || 0;
            const offset = p.offset || 0;
            this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, p.buffer);
            this.#gl.enableVertexAttribArray(location);
            this.#gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
        }
    }
    disableAttributes() {
        for (const attr in this.attributes)
        this.vertexSource = vertexSource;
        this.attributes = i[0];
        this.uniforms = i[1];
        for (const name in params) {
            this.#gl.disableVertexAttribArray(this.attributes[attr].location);
    }
    uniformSetters(params = {}) {
            const { location, type } = this.uniforms[name];
        }
            this.set(location, type, params[name]);
    }
                this.#gl.uniform1f(location, value);
    set(location, type, value) {
        switch (type) {
            case "float":
                this.#gl.uniform4fv(location, value);
                break;
            case "vec4":
                break;
                break;
                this.#gl.uniform1i(location, value);
                break;
        }
    }
    use() { this.#gl.useProgram(this.program); }
}
export { Shader, createShader, setShader, setUniforms, setAttributes };
                console.warn("sampler2D is not implemented yet");
let unit = 0;
export class Texture {
    unit;
//# sourceMappingURL=shader.js.map
    data;
    width;
    height;
    #texture;
    #destFormat;
    #srcFormat;
    #type;
                this.#gl.uniformMatrix4fv(location, false, value);
            case "mat4":
            case "sampler2D":
    #gl;
        this.#srcFormat = params.srcFormat || gl.RGBA;
        this.#type = params.type || gl.UNSIGNED_BYTE;
        this.data = params.data;
        this.width = params.width || this.data.width;
        this.height = params.height || this.data.height;
        this.#texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.#texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, this.#destFormat, this.#srcFormat, this.#type, this.data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.#gl = gl;
    }
}
    use() { this.#gl.bindTexture(this.#gl.TEXTURE_2D, this.#texture); }
//# sourceMappingURL=texture.js.map
import { createShader } from "./shader.js";
const vertexSource = `
attribute vec3 position;

attribute vec2 texture;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
    constructor(gl, params = {}) {
        this.#destFormat = params.destFormat || gl.RGBA;
        this.unit = unit++;
uniform mat4 modelMatrix;
varying vec2 vTexCoord;
    gl_PointSize = 10.0;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
    vTexCoord = texture;
}
const fragmentSource = `
precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D image;

void main() {
    gl_FragColor = texture2D(image, vTexCoord);
}`;
const createTextureShader = (gl) => {
    return createShader(gl, vertexSource, fragmentSource);
};
export { createTextureShader };
//# sourceMappingURL=textureShader.js.map
`;


void main() {
