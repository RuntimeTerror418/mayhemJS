export class Texture {

    unit: number;
    data: any;
    width: number;
    height: number;


    #texture: WebGLTexture;
    #destFormat: number;
    #srcFormat: number;
    #type: number;
    #gl: WebGLRenderingContext;


    constructor(gl: WebGLRenderingContext, params: any = { }) {
        this.#destFormat = params.destFormat || gl.RGBA;
        this.#srcFormat = params.srcFormat || gl.RGBA;
        this.#type = params.type || gl.UNSIGNED_BYTE;
        this.data = params.data;
        this.width = params.width || this.data.width;
        this.height = params.height || this.data.height;
        this.#texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.#texture);

        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        // Upload the image into the texture.
        gl.texImage2D(gl.TEXTURE_2D, 0, this.#destFormat, this.#srcFormat, this.#type, this.data);
        gl.bindTexture(gl.TEXTURE_2D, null);

        this.#gl = gl;
    }

    use() { this.#gl.bindTexture(this.#gl.TEXTURE_2D, this.#texture); }

}