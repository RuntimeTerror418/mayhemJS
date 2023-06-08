import {createShader} from "./shader.js";

const vertexSource = `
attribute vec3 position;
attribute vec2 texture;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

varying vec2 vTexCoord;

void main() {
    gl_PointSize = 10.0;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1);
    vTexCoord = texture;
}
`;

const fragmentSource = `
precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D image;

void main() {
    gl_FragColor = texture2D(image, vTexCoord);
}`;

const createTextureShader = (gl:WebGLRenderingContext) => {
    return createShader(gl, vertexSource, fragmentSource);
}

export { createTextureShader }