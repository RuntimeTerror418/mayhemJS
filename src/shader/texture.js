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