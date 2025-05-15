/// <reference types="@webgpu/types" />

declare global {
  type vec1 = Float32Array | Uint32Array | [number];
  type vec2 = Float32Array | Uint32Array | [number, number];
  type vec3 = Float32Array | Uint32Array | [number, number, number];
  type vec4 = Float32Array | Uint32Array | [number, number, number, number];
  type vec5 = Float32Array | Uint32Array | [number, number, number, number, number];
  type vec6 = Float32Array | Uint32Array | [number, number, number, number, number, number];
  type vec_any = Array<number>;

  type mat3 = Float32Array | Uint32Array | [
    number, number, number,
    number, number, number,
    number, number, number
  ];

  type mat4 = Float32Array | Uint32Array | [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
  ];

  type bounds2 = {left: number, right: number, bottom: number, top: number };
  type bounds3 = {left: number, right: number, bottom: number, top: number, back: number, front: number };
}

export {};