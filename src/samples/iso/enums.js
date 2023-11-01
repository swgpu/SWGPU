import { UT } from '../../lib/core/utils';

export const DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD'
};

export const DIRECTION_TO_VEC3 = {
  LEFT: UT.VEC3_LEFT,
  RIGHT: UT.VEC3_RIGHT,
  FORWARD: UT.VEC3_FORWARD,
  BACKWARD: UT.VEC3_BACKWARD
};

export const PIXEL_PER_UNIT = 48;
export const ORTHO_SIZE = 8.4;
export const ORTHO_DEPTH = 100;
export const CAMERA_MATRIX = [0.7071, 0.0000,  0.7071, 0.0000, 0.3546, 0.8652, -0.3546, 0.0000, -0.6118, 0.5015,  0.6118, 0.0000, -7.3046, 4.9583,  5.6356, 1.0000];