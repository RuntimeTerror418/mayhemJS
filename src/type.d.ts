type vec2 = [number, number];

type vec3 = [number, number, number];

type vec4 = [number, number, number, number];

type mat4 = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
];

interface iCircle {
    pos: vec2,
    radius: number
}

interface iAABB {
    pos: vec2;
    size: vec2;
}