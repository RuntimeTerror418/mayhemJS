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

    vertexSource;
    fragmentSource;
    program;
    attributes;
    uniforms;

    #gl:WebGLRenderingContext;

    constructor(gl:WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
        this.#gl = gl;
        this.vertexSource = vertexSource;
        this.fragmentSource = fragmentSource;
        this.program = this.#initProgram(vertexSource, fragmentSource);

        const i = this.#initAttributesAndUniforms(this.vertexSource, this.fragmentSource);

        this.attributes = i[0];
        this.uniforms = i[1];
    }

    /**
     * position:{ buffer,  size, type, normalized, stride, offset }
     * @param params
     */
    enableAttributes(params = { }) {
        for(const name in params) {
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

    uniformSetters(params = {}) {
        for(const name in params) {
            const {location, type} = this.uniforms[name];
            this.set(location, type, params[name]);
        }
    }

    set(location, type, value) {
        switch(type) {
            case "float":
                this.#gl.uniform1f(location, value);
                break;
            case "vec3":
                this.#gl.uniform3fv(location, value);
                break;
            case "vec4":
                this.#gl.uniform4fv(location, value);
                break;
            case "mat4":
                this.#gl.uniformMatrix4fv(location, false, value);
                break;
        }   // switch (type) ends
    }

    use() { this.#gl.useProgram(this.program); }

    /**
     * Creates a shader object from the arguments passed
     * @param this.#gl {WebGLRenderingContext} webgl1.0 rendering context
     * @param shaderType {number} the type of the shader
     * @param source {string} the source of the shader
     * @returns {WebGLShader}
     */
    #loadAndCompileShader (shaderType: number, source: string) {
        const shader = this.#gl.createShader(shaderType);
        this.#gl.shaderSource(shader, source);
        this.#gl.compileShader(shader);

        const success = this.#gl.getShaderParameter(shader, this.#gl.COMPILE_STATUS);
        if(success) return shader;
        console.log(this.#gl.getShaderInfoLog(shader));
        this.#gl.deleteShader(shader);
    }

    #initProgram  (vSource: string, fSource: string) {
        const vertexShader = this.#loadAndCompileShader(this.#gl.VERTEX_SHADER, vSource);
        const fragmentShader = this.#loadAndCompileShader(this.#gl.FRAGMENT_SHADER, fSource);
        let program = this.#gl.createProgram();
        this.#gl.attachShader(program, vertexShader);
        this.#gl.attachShader(program, fragmentShader);
        this.#gl.linkProgram(program);
        let success = this.#gl.getProgramParameter(program, this.#gl.LINK_STATUS);
        if(!success) {
            console.log(this.#gl.getProgramInfoLog(program));
            this.#gl.deleteProgram(program);
            return;
        }
        return program;
    }

    /**
     * This function extracts all attributes and uniforms in a shader program
     * @param vertexShaderSource {string} the vertexshader source
     * @param fragmentShaderSource {string} the fragmentshader source
     * @param program {WebGLProgram} active program
     * @returns {[{},{}]}
     */
    #initAttributesAndUniforms (vertexShaderSource: string, fragmentShaderSource: string) {

        const attributes = {};
        const uniforms = {};

        // join the source file together and replace all ;
        // with a "\n", then split by "\n" and trim all indexes
        const source = (vertexShaderSource + "\n" + fragmentShaderSource)
            .replaceAll(";", "\n")
            .split("\n")
            .map(str => str.trim());

        // read all indexes and process those starting with "attributes" or "uniforms"
        for(let line of source) {
            if(line !== "") {
                if(line.startsWith("attribute")) {
                    const [, type, name] = line.split(" ");
                    attributes[name] = {
                        location: this.#gl.getAttribLocation(this.program, name),
                        type,
                    };
                }
                else if(line.startsWith("uniform")) {
                    const [, type, name] = line.split(" ");
                    uniforms[name] = {
                        location: this.#gl.getUniformLocation(this.program, name),
                        type
                    };
                }
            }   // if line ends
        }   // for (let line) ends

        return [attributes, uniforms];
    }

}

export { Shader }