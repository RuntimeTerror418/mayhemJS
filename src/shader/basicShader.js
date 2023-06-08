import { createShader } from "./shader.js";
const vertexSource = `
attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

void main() {
    gl_PointSize = 10.0;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
}
`;
const fragmentSource = `
precision mediump float;

uniform vec4 color;

void main() {
    gl_FragColor = color;
}`;
const createBasicShader = (gl) => {
    return createShader(gl, vertexSource, fragmentSource);
};
export { createBasicShader };
//# sourceMappingURL=basicShader.js.map