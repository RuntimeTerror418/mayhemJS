
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Clock_lastTime;
export class Clock {
    constructor(autoStart = false) {
        _Clock_lastTime.set(this, void 0);
        if (autoStart)
            __classPrivateFieldSet(this, _Clock_lastTime, performance.now(), "f");
    }
    now() { return performance.now(); }
    getDelta() {
        let dt = this.getElapsedTime() * 0.001;
        __classPrivateFieldSet(this, _Clock_lastTime, this.now(), "f");
        if (dt > 0.2)
            dt = 0;
        return dt;
    }
    getElapsedTime() { return this.now() - __classPrivateFieldGet(this, _Clock_lastTime, "f"); }
    start() { __classPrivateFieldSet(this, _Clock_lastTime, performance.now(), "f"); }
}
_Clock_lastTime = new WeakMap();
//# sourceMappingURL=clock.js.map
const imageLoader = (params = {}) => {
    const img = new Image();
    for (const option in params)
        img[option] = params[option];
    return new Promise((resolve, reject) => {
        img.addEventListener("load", e => { resolve(img); });
        img.addEventListener("error", e => { reject(e); });
    });
};
export { imageLoader };
//# sourceMappingURL=loader.js.map
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Renderer_instances, _Renderer_gl, _Renderer_setSize, _Renderer_setShaderDefault;
import { Clock } from "./clock.js";
import { createBasicShader } from "../shader/basicShader.js";
import { createTextureShader } from "../shader/textureShader.js";
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
    constructor(canvas, width, height) {
        _Renderer_instances.add(this);
        _Renderer_gl.set(this, void 0);
        this.canvas = canvas;
        if (!(this.canvas instanceof HTMLCanvasElement))
            throw new Error("Your Browser does not support HTML5 Canvas; Please upgrade to a supported browser");
        __classPrivateFieldGet(this, _Renderer_instances, "m", _Renderer_setSize).call(this, width, height);
        __classPrivateFieldSet(this, _Renderer_gl, this.canvas.getContext("webgl", glAttributes), "f");
        if (!__classPrivateFieldGet(this, _Renderer_gl, "f") || !(__classPrivateFieldGet(this, _Renderer_gl, "f") instanceof WebGLRenderingContext))
            throw new Error("Failed to initialize webgl 1.0; please upgrade your graphics card");
        this.BASIC_SHADER = createBasicShader(__classPrivateFieldGet(this, _Renderer_gl, "f"));
        this.TEXTURE_SHADER = createTextureShader(__classPrivateFieldGet(this, _Renderer_gl, "f"));
        this.clock = new Clock();
        window.addEventListener("resize", e => this.onResize(__classPrivateFieldGet(this, _Renderer_gl, "f"), e));
    }
    async start() {
        const loop = () => {
            this.update(this.clock.getDelta());
            this.camera.update();
            __classPrivateFieldGet(this, _Renderer_gl, "f").viewport(0, 0, this.width, this.height);
            __classPrivateFieldGet(this, _Renderer_instances, "m", _Renderer_setShaderDefault).call(this);
            this.draw(__classPrivateFieldGet(this, _Renderer_gl, "f"));
            requestAnimationFrame(loop);
        };
        if (!this.camera)
            throw new Error("There is no camera for this renderer");
        await this.init(__classPrivateFieldGet(this, _Renderer_gl, "f"));
        this.clock.start();
        requestAnimationFrame(loop);
    }
    get gl() { return __classPrivateFieldGet(this, _Renderer_gl, "f"); }
}
_Renderer_gl = new WeakMap(), _Renderer_instances = new WeakSet(), _Renderer_setSize = function _Renderer_setSize(w, h) {
    this.width = this.canvas.width = w;
    this.height = this.canvas.height = h;
}, _Renderer_setShaderDefault = function _Renderer_setShaderDefault() {
    this.BASIC_SHADER.use();
    this.BASIC_SHADER.uniformSetters({
        projectionMatrix: this.camera.projectionMatrix,
        viewMatrix: this.camera.viewMatrix,
    });
    this.TEXTURE_SHADER.use();
    this.TEXTURE_SHADER.uniformSetters({
        projectionMatrix: this.camera.projectionMatrix,
        viewMatrix: this.camera.viewMatrix,
    });
};
export { Renderer };
//# sourceMappingURL=renderer.js.map

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
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
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
//# sourceMappingURL=vector2.js.map
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




var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Shader_gl;
let LAST_SHADER;
/**
 * Creates a shader object from the arguments passed
 * @param gl {WebGLRenderingContext} webgl1.0 rendering context
 * @param shaderType {number} the type of the shader
 * @param source {string} the source of the shader
 * @returns {WebGLShader}
 */
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
/**
 * This function extracts all attributes and uniforms in a shader program
 * @param v {string} the vertexshader source
 * @param f {string} the fragmentshader source
 * @param program {WebGLProgram} active program
 * @returns {[{},{}]}
 */
const initAttributesAndUniforms = (gl, v, f, program) => {
    const attributes = {};
    const uniforms = {};
    // join the source file together and replace all ;
    // with a "\n", then split by "\n" and trim all indexes
    const source = (v + "\n" + f)
        .replaceAll(";", "\n")
        .split("\n")
        .map(str => str.trim());
    // read all indexes and process those starting with "attributes" or "uniforms"
    for (let line of source) {
        if (line !== "") {
            if (line.startsWith("attribute")) {
                const [, type, name] = line.split(" ");
                attributes[name] = {
                    location: gl.getAttribLocation(program, name),
                    type,
                };
            }
            else if (line.startsWith("uniform")) {
                const [, type, name] = line.split(" ");
                uniforms[name] = {
                    location: gl.getUniformLocation(program, name),
                    type
                };
            }
        } // if line ends
    } // for (let line) ends
    return [attributes, uniforms];
};
const setShader = (shader) => {
    LAST_SHADER = shader;
    LAST_SHADER.use();
};
const setUniforms = (params = {}) => { LAST_SHADER.uniformSetters(params); };
const setAttributes = (params = {}) => { LAST_SHADER.enableAttributes(params); };
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
        gl.deleteProgram(program);
        return;
    }
    return program;
};
const createShader = (gl, vSource, fSource) => {
    const shader = class extends Shader {
        constructor() {
            super(gl, vSource, fSource);
        }
    };
    return new shader();
};
/**
 * This is the principal class for shaders.
 * For compatibility purpose, all shaders must inherit from this class
 *
 * All vertex shaders are expected to define three mandatory uniforms,
 * projectionMatrix
 * viewMatrix
 * modelMatrix
 * The gl_Position of the shader depends on these three
 *
 * value for projectionMatrix and viewMatrix will be provided by the engine
 */
class Shader {
    constructor(gl, vertexSource, fragmentSource) {
        _Shader_gl.set(this, void 0);
        this.vertexSource = vertexSource;
        this.fragmentSource = fragmentSource;
        this.program = createShaderProgram(gl, vertexSource, fragmentSource);
        const i = initAttributesAndUniforms(gl, this.vertexSource, this.fragmentSource, this.program);
        this.attributes = i[0];
        this.uniforms = i[1];
        __classPrivateFieldSet(this, _Shader_gl, gl, "f");
    }
    /**
     * position:{ buffer,  size, type, normalized, stride, offset }
     * @param params
     */
    enableAttributes(params = {}) {
        for (const name in params) {
            const p = params[name];
            const location = this.attributes[name].location;
            const size = p.size || 2;
            const type = p.type || __classPrivateFieldGet(this, _Shader_gl, "f").FLOAT;
            const normalized = p.normalized || false;
            const stride = p.stride || 0;
            const offset = p.offset || 0;
            __classPrivateFieldGet(this, _Shader_gl, "f").bindBuffer(__classPrivateFieldGet(this, _Shader_gl, "f").ARRAY_BUFFER, p.buffer);
            __classPrivateFieldGet(this, _Shader_gl, "f").enableVertexAttribArray(location);
            __classPrivateFieldGet(this, _Shader_gl, "f").vertexAttribPointer(location, size, type, normalized, stride, offset);
        }
    }
    disableAttributes() {
        for (const attr in this.attributes)
            __classPrivateFieldGet(this, _Shader_gl, "f").disableVertexAttribArray(this.attributes[attr].location);
    }
    uniformSetters(params = {}) {
        for (const name in params) {
            const { location, type } = this.uniforms[name];
            this.set(location, type, params[name]);
        }
    }
    set(location, type, value) {
        switch (type) {
            case "float":
                __classPrivateFieldGet(this, _Shader_gl, "f").uniform1f(location, value);
                break;
            case "vec4":
                __classPrivateFieldGet(this, _Shader_gl, "f").uniform4fv(location, value);
                break;
            case "mat4":
                __classPrivateFieldGet(this, _Shader_gl, "f").uniformMatrix4fv(location, false, value);
                break;
            case "sampler2D":
                console.warn("sampler2D is not implemented yet");
                __classPrivateFieldGet(this, _Shader_gl, "f").uniform1i(location, value);
                break;
        } // switch (type) ends
    }
    use() { __classPrivateFieldGet(this, _Shader_gl, "f").useProgram(this.program); }
}
_Shader_gl = new WeakMap();
export { Shader, createShader, setShader, setUniforms, setAttributes };
//# sourceMappingURL=shader.js.map
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Texture_texture, _Texture_destFormat, _Texture_srcFormat, _Texture_type, _Texture_gl;
let unit = 0;
export class Texture {
    constructor(gl, params = {}) {
        _Texture_texture.set(this, void 0);
        _Texture_destFormat.set(this, void 0);
        _Texture_srcFormat.set(this, void 0);
        _Texture_type.set(this, void 0);
        _Texture_gl.set(this, void 0);
        this.unit = unit++;
        __classPrivateFieldSet(this, _Texture_destFormat, params.destFormat || gl.RGBA, "f");
        __classPrivateFieldSet(this, _Texture_srcFormat, params.srcFormat || gl.RGBA, "f");
        __classPrivateFieldSet(this, _Texture_type, params.type || gl.UNSIGNED_BYTE, "f");
        this.data = params.data;
        this.width = params.width || this.data.width;
        this.height = params.height || this.data.height;
        __classPrivateFieldSet(this, _Texture_texture, gl.createTexture(), "f");
        gl.bindTexture(gl.TEXTURE_2D, __classPrivateFieldGet(this, _Texture_texture, "f"));
        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        // Upload the image into the texture.
        gl.texImage2D(gl.TEXTURE_2D, 0, __classPrivateFieldGet(this, _Texture_destFormat, "f"), __classPrivateFieldGet(this, _Texture_srcFormat, "f"), __classPrivateFieldGet(this, _Texture_type, "f"), this.data);
        gl.bindTexture(gl.TEXTURE_2D, null);
        __classPrivateFieldSet(this, _Texture_gl, gl, "f");
    }
    use() { __classPrivateFieldGet(this, _Texture_gl, "f").bindTexture(__classPrivateFieldGet(this, _Texture_gl, "f").TEXTURE_2D, __classPrivateFieldGet(this, _Texture_texture, "f")); }
}
_Texture_texture = new WeakMap(), _Texture_destFormat = new WeakMap(), _Texture_srcFormat = new WeakMap(), _Texture_type = new WeakMap(), _Texture_gl = new WeakMap();
//# sourceMappingURL=texture.js.map






