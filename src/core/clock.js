export class Clock {
    #lastTime;
    constructor(autoStart = false) {
        if (autoStart)
            this.#lastTime = performance.now();
    }
    now() { return performance.now(); }
    getDelta() {
        let dt = this.getElapsedTime() * 0.001;
        this.#lastTime = this.now();
        if (dt > 0.2)
            dt = 0;
        return dt;
    }
    getElapsedTime() { return this.now() - this.#lastTime; }
    start() { this.#lastTime = performance.now(); }
}
//# sourceMappingURL=clock.js.map