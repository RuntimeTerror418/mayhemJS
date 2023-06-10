import { createShader } from "./shader.js";
const texture_shader_vertexSource = `
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
const texture_shader_fragmentSource = `
precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D image;

void main() {
    gl_FragColor = texture2D(image, vTexCoord);
}`;
const createTextureShader = (gl) => {
    return createShader(gl, texture_shader_vertexSource, texture_shader_fragmentSource);
};
export { createTextureShader };
//# sourceMappingURL=textureShader.js.map