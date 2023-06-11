import {Mat4} from "../maths/mat4.js";

export abstract class Camera {

    translation: vector3;
    rotation: vector3;
    scale: vector3;
    projectionMatrix: mat4;
    viewMatrix: mat4;

    protected constructor() {
        this.translation = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }

    abstract update();

}

class OrthographicCamera extends Camera {

    left: number;
    right: number;
    bottom: number;
    top: number;
    near: number;
    far: number;

    constructor(left: number, right: number, bottom: number, top: number, near: number = 1, far = -1) {
        super();
        this.set(left, right, bottom, top, near, far);
    }

    set(left: number, right: number, bottom: number, top: number, near: number = 1, far: number) {
        this.left = left;
        this.right = right;
        this.bottom = bottom;
        this.top = top;
        this.near = near;
        this.far = far;
    }

    update() {
        this.projectionMatrix = [
            2 / (this.right - this.left), 0, 0, 0,
            0, 2 / (this.top - this.bottom), 0, 0,
            0, 0, 2 / (this.near - this.far), 0,

            (this.left + this.right) / (this.left - this.right),
            (this.bottom + this.top) / (this.bottom - this.top),
            (this.near + this.far) / (this.near - this.far),
            1,
        ];
        let m = Mat4.zRotate(Mat4.identity(), this.rotation[2]);
        m = Mat4.yRotate(m, this.rotation[1]);
        m = Mat4.xRotate(m, this.rotation[0]);
        m = Mat4.scale(m, ...this.scale);
        m = Mat4.translate(m, ...this.translation);
        this.viewMatrix = Mat4.inverse(m);
    }

}


class PerspectiveCamera extends Camera {

    constructor() {
        super();
    }

    update() {
    }

}


export {
    OrthographicCamera
}