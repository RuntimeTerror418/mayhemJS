import * as g from "../src/mayhem";
import { Mat4 } from "../src/mayhem";
const squareV = [
    0, 0, 0,
    0, 1, 0,
    1, 1, 0,
    1, 0, 0,
    0, 0,
    0, 1,
    1, 1,
    1, 0
];
class Game extends g.Renderer {
    v = g.createVBO(this.gl, squareV);
    texture;
    texture2;
    constructor(canvas, w, h) {
        super(canvas, w, h);
        this.camera = new g.OrthographicCamera(0, w, h, 0, 1, -1);
    }
    async init(gl) {
        const redImage = await g.imageLoader({ src: "./red.jpg" });
        const pfpImage = await g.imageLoader({ src: "./pfp.jpg" });
        this.texture = new g.Texture(gl, {
            destFormat: gl.RGB,
            srcFormat: gl.RGB,
            type: gl.UNSIGNED_BYTE,
            data: redImage
        });
        this.texture2 = new g.Texture(gl, {
            destFormat: gl.RGB,
            srcFormat: gl.RGB,
            type: gl.UNSIGNED_BYTE,
            data: pfpImage
        });
    }
    update(dt) {
    }
    draw(gl) {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        let mat;
        g.setShader(this.BASIC_SHADER);
        g.setUniforms({
            modelMatrix: g.Mat4.scaling(100, 100, 0),
            color: [1, 0, 0, 1]
        });
        g.setAttributes({
            position: { buffer: this.v, size: 3, type: gl.FLOAT, stride: 0, offset: 0 }
        });
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        g.setShader(this.TEXTURE_SHADER);
        mat = Mat4.translate(Mat4.identity(), 100, 100);
        mat = Mat4.scale(mat, 100, 100, 0);
        this.texture.use();
        g.setUniforms({
            modelMatrix: mat,
        });
        g.setAttributes({
            position: { buffer: this.v, size: 3, type: gl.FLOAT, stride: 0, offset: 0 },
            texture: { buffer: this.v, size: 2, type: gl.FLOAT, stride: 0, offset: 3 * 4 * Float32Array.BYTES_PER_ELEMENT }
        });
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        mat = Mat4.translate(Mat4.identity(), 200, 200);
        mat = Mat4.scale(mat, 100, 100, 0);
        this.texture2.use();
        g.setUniforms({
            modelMatrix: mat,
        });
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }
    onResize(gl, e) { }
}
const main = async () => {
    const canvas = document.getElementById("gl");
    const game = new Game(canvas, 640, 640);
    await game.start();
};
addEventListener("load", main);
//# sourceMappingURL=main.js.map