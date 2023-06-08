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