/// <reference types="@webgpu/types" />
import type * as Types from './types';

declare global {
  type vec1 = Types.vec1;
  type vec2 = Types.vec2;
  type vec3 = Types.vec3;
  type vec4 = Types.vec4;
  type vec5 = Types.vec5;
  type vec6 = Types.vec6;
  type vec_any = Types.vec_any;
  type mat3 = Types.mat3;
  type mat4 = Types.mat4;
  type bounds2 = Types.bounds2;
  type bounds3 = Types.bounds3;
}

export {};