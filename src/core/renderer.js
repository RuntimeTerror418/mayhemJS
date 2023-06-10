import { Clock } from "./clock.js";
import { createBasicShader } from "../shader/basicShader.js";
import { createTextureShader } from "../shader/textureShader.js";
const renderer_glAttributes = {
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
    clock;
    BASIC_SHADER;
    TEXTURE_SHADER;
    #gl;
    constructor(canvas, width, height) {
        this.canvas = canvas;
        if (!(this.canvas instanceof HTMLCanvasElement))
            throw new Error("Your Browser does not support HTML5 Canvas; Please upgrade to a supported browser");
        this.#setSize(width, height);
        this.#gl = this.canvas.getContext("webgl", renderer_glAttributes);
        if (!this.#gl || !(this.#gl instanceof WebGLRenderingContext))
            throw new Error("Failed to initialize webgl 1.0; please upgrade your graphics card");
        this.BASIC_SHADER = createBasicShader(this.#gl);
        this.TEXTURE_SHADER = createTextureShader(this.#gl);
        this.clock = new Clock();
        window.addEventListener("resize", e => this.onResize(this.#gl, e));
    }
    async start() {
        const loop = () => {
            this.update(this.clock.getDelta());
            this.camera.update();
            this.#gl.viewport(0, 0, this.width, this.height);
            this.#setShaderDefault();
            this.draw(this.#gl);
            requestAnimationFrame(loop);
        };
        if (!this.camera)
            throw new Error("There is no camera for this renderer");
        await this.init(this.#gl);
        this.clock.start();
        requestAnimationFrame(loop);
    }
    #setSize(w, h) {
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
    }
    #setShaderDefault() {
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
    }
    get gl() { return this.#gl; }
}
export { Renderer };
//# sourceMappingURL=renderer.js.map