export type vec1 = Float32Array | Uint32Array | [number];
export type vec2 = Float32Array | Uint32Array | [number, number];
export type vec3 = Float32Array | Uint32Array | [number, number, number];
export type vec4 = Float32Array | Uint32Array | [number, number, number, number];
export type vec5 = Float32Array | Uint32Array | [number, number, number, number, number];
export type vec6 = Float32Array | Uint32Array | [number, number, number, number, number, number];
export type vec_any = Array<number>;

export type mat3 = Float32Array | Uint32Array | [
  number, number, number,
  number, number, number,
  number, number, number
];

export type mat4 = Float32Array | Uint32Array | [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number
];

export type bounds2 = {left: number, right: number, bottom: number, top: number };
export type bounds3 = {left: number, right: number, bottom: number, top: number, back: number, front: number };
