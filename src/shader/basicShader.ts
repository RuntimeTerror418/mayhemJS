import {createShader, Shader} from "./shader.js";

const basicShader_vertexSource = `
attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

void main() {
    gl_PointSize = 10.0;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
}
`;

const basicShader_fragmentSource = `
precision mediump float;

uniform vec4 color;

void main() {
    gl_FragColor = color;
}`;

const createBasicShader = (gl:WebGLRenderingContext) => {
    return createShader(gl, basicShader_vertexSource, basicShader_fragmentSource);
}

export { createBasicShader }