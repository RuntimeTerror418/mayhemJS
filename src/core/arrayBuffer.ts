const createVBO = (gl: WebGLRenderingContext, data: Array<number>) => {
    const buffer = gl.createBuffer();
    if(data.length > 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return buffer;
}

const updateVBO = (gl: WebGLRenderingContext, vbo:WebGLBuffer, data: Array<number>) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
}

const createEBO = (gl: WebGLRenderingContext, data: Array<number>) => {
    const buffer = gl.createBuffer();
    if(data.length > 0) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    return buffer;
}

const updateEBO = (gl: WebGLRenderingContext, vbo:WebGLBuffer, data: Array<number>) => {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
}


export {
    createVBO,
    updateVBO,
    createEBO,
    updateEBO
}