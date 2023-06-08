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