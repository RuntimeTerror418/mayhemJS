abstract class Renderer {

    #canvas: HTMLCanvasElement;
    #size = [300, 150];
    #width: number = 300;
    #height: number = 150;
    #lastTime: number = 0;
    #useFixTimeStep = false;
    #deltaTime = 0;
    protected gl: WebGLRenderingContext;

    protected constructor(el: HTMLCanvasElement | null,
                          w: number = 300,
                          h: number = 150,
                          renderingContext = { })
    {
        this.#canvas = el instanceof HTMLCanvasElement ? el : document.createElement("canvas");
        if(!(this.#canvas instanceof HTMLCanvasElement))
            throw new Error("Mayhem unable to initialize Canvas Renderer");

        this.gl = this.#canvas.getContext("webgl", renderingContext) as WebGLRenderingContext;
        if(!(this.gl instanceof WebGLRenderingContext))
            throw new Error("Mayhem unable to initialize webgl rendering context");

        this.width = w;
        this.height = h;
    }

    abstract onStart(gl: WebGLRenderingContext);
    abstract onUpdate(dt: number);
    abstract onDraw(gl: WebGLRenderingContext);

    setTimeStep(v: number): void {
        this.#deltaTime = v;
    }

    start() {
        this.onStart(this.gl);
        this.#lastTime = performance.now();
        const loop = () => {
            const now = performance.now();
            let dt = this.#useFixTimeStep ? this.#deltaTime : (now - this.#lastTime) * 0.001;
            this.#lastTime = now;
            this.onUpdate(dt);
            this.onDraw(this.gl);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }

    set width(n: number) {
        this.#width = n;
        this.#canvas.width = n;
    }

    get width(): number { return this.#width; }

    set height(n: number) {
        this.#height = n;
        this.#canvas.height = n;
    }

    get height(): number { return this.#height; }

    getBoundingRect(){
        return this.#canvas.getBoundingClientRect();
    }

    getElement(): HTMLCanvasElement {
        return this.#canvas;
    }
}

export { Renderer };