type vector2 = [number, number];

type vector3 = [number, number, number];

type mat3 = [
    number, number, number,
    number, number, number,
    number, number, number
];

type mat4 = [
    ...mat3, number,
    number, number, number,
    number, number, number
];

interface camera {
    projectionMatrix: mat4,
    viewMatrix: mat4,
    translation: vector3,
    rotation: vector3,
    scale: vector3,
}

interface Renderable {
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    camera: camera,
}