import { Mat4 } from "../maths/mat4.js";
import { Vector3 } from "../maths/vector3.js";
export class Camera {
    constructor() {
        this.translation = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);
    }
}
class OrthographicCamera extends Camera {
    constructor(left, right, bottom, top, near = 1, far = -1) {
        super();
        this.set(left, right, bottom, top, near, far);
    }
    set(left, right, bottom, top, near = 1, far) {
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
        let m = Mat4.zRotate(Mat4.identity(), this.rotation.z);
        m = Mat4.yRotate(m, this.rotation.y);
        m = Mat4.xRotate(m, this.rotation.x);
        m = Mat4.scale(m, this.scale.x, this.scale.y, this.scale.z);
        m = Mat4.translate(m, this.translation.x, this.translation.y, this.translation.z);
        this.viewMatrix = Mat4.inverse(m);
    }
}
export { OrthographicCamera };
//# sourceMappingURL=camera.js.map