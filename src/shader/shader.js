let LAST_SHADER;
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
        }
    }
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
class Shader {
    vertexSource;
    fragmentSource;
    program;
    attributes;
    uniforms;
    #gl;
    constructor(gl, vertexSource, fragmentSource) {
        this.vertexSource = vertexSource;
        this.fragmentSource = fragmentSource;
        this.program = createShaderProgram(gl, vertexSource, fragmentSource);
        const i = initAttributesAndUniforms(gl, this.vertexSource, this.fragmentSource, this.program);
        this.attributes = i[0];
        this.uniforms = i[1];
        this.#gl = gl;
    }
    enableAttributes(params = {}) {
        for (const name in params) {
            const p = params[name];
            const location = this.attributes[name].location;
            const size = p.size || 2;
            const type = p.type || this.#gl.FLOAT;
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
            this.#gl.disableVertexAttribArray(this.attributes[attr].location);
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
                this.#gl.uniform1f(location, value);
                break;
            case "vec4":
                this.#gl.uniform4fv(location, value);
                break;
            case "mat4":
                this.#gl.uniformMatrix4fv(location, false, value);
                break;
            case "sampler2D":
                console.warn("sampler2D is not implemented yet");
                this.#gl.uniform1i(location, value);
                break;
        }
    }
    use() { this.#gl.useProgram(this.program); }
}
export { Shader, createShader, setShader, setUniforms, setAttributes };
//# sourceMappingURL=shader.js.map