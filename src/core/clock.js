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