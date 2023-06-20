import {Vec2} from "../math/vec2.js";

const Collision = {

    circleToCircle(c1: iCircle, c2: iCircle) {
        const dPos = Vec2.sub(c2.pos, c1.pos);
        return Vec2.getLength(dPos) < c1.radius + c2.radius;
    },

    circleToAABB(c: iCircle, r: iAABB) {
        let dx = Math.abs(c.pos[0] - (r.pos[0] + r.size[0] * 0.5));
        let dy = Math.abs(c.pos[1] - (r.pos[1] + r.size[1] * 0.5));
        if(dx > c.radius + r.size[0] / 2 || dy > c.radius + r.size[1] / 2)
            return false;
        if(dx < r.size[0] || dy < r.size[1]) return true;
        dx = dx - r.size[0];
        dy = dy - r.size[1];
        return dx * dx + dy * dy <= c.radius * c.radius;
    }
}


export { Collision }