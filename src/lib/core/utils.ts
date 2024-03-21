import { Quaternion } from './quaternion';

class UT {
  static DEG_TO_RAD_RATIO = Math.PI / 180;
  static EPSILON = 0.0000001;
  static BIG_EPSILON = 0.0001;
  static VEC2_SIZE = 8;
  static VEC2_ZERO: vec2 = [0, 0];
  static VEC2_LEFT: vec2 = [-1, 0];
  static VEC2_RIGHT: vec2 = [1, 0];
  static VEC2_UP: vec2 = [0, 1];
  static VEC2_DOWN: vec2 = [0, -1];
  static VEC2_ISO_LEFT: vec2 = [0, 1];
  static VEC2_ISO_RIGHT: vec2 = [0, -1];
  static VEC2_ISO_FORWARD: vec2 = [-1, 0];
  static VEC2_ISO_BACKWARD: vec2 = [1, 0];
  static VEC3_SIZE = 12;
  static VEC3_ZERO: vec3 = [0, 0, 0];
  static VEC3_BACKWARD: vec3 = [0, 0, 1];
  static VEC3_FORWARD: vec3 = [0, 0, -1];
  static VEC3_LEFT: vec3 = [-1, 0, 0];
  static VEC3_RIGHT: vec3 = [1, 0, 0];
  static VEC3_UP: vec3 = [0, 1, 0];
  static VEC3_DOWN: vec3 = [0, -1, 0];

  /**
   * @ignore
   */
  static FAIL(message: string) {
    const elem = document.querySelector<HTMLDivElement>('#APP_FAIL')!;
    elem.classList.add('SHOW');
    elem.textContent = message;
  }

  /**
   * @param ms - Time to wait (in milliseconds).
   */
  static WAIT(ms: number): Promise<any> {
    return new Promise((resolve: Function) => {
      window.setTimeout(() => resolve(), ms);
    });
  }

  /**
   * @param arr - The array to shuffle.
   */
  static SHUFFLE(arr: Array<any>): Array<any> {
    const res = arr.slice();
    let tmp, cur, tp = res.length;
    if (tp) {
      while (--tp) {
        cur = Math.floor(Math.random() * (tp + 1));
        tmp = res[cur];
        res[cur] = res[tp];
        res[tp] = tmp;
      }
    }

    return res;
  }

  /**
   * @param start - The start value.
   * @param stop - The stop value.
   * @param step - Increment step.
   */
  static RANGE_ARRAY(start: number, stop: number, step: number = 0) {
    return Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);
  }

  /**
   * @param min - The min.
   * @param max - The max.
   */
  static RANDARRAY(min: number, max: number): Array<number> {
    const arr = [];
    for (let i = min; i <= max; i++) {
      arr.push(i);
    }

    return UT.SHUFFLE(arr);
  }

  /**
   * @param base - The origin value.
   * @param spread - The spread value.
   */
  static SPREAD(base: number, spread: number): number {
    return base + spread * (Math.random() - 0.5);
  }

  /**
   * @param min - The min.
   * @param max - The max.
   */
  static GET_RANDOM_INT(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * @param min - The min.
   * @param max - The max.
   */
  static GET_RANDOM_FLOAT(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
  }

  /**
   * @param value - The value to clamp.
   * @param min - The min.
   * @param max - The max.
   */
  static CLAMP(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  /**
   * @param deg - Angle in degrees.
   */
  static DEG_TO_RAD(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * @param a - The begin.
   * @param b - The end.
   * @param t - The time.
   */
  static LERP(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  /**
   * @param num - The number.
   * @param digits - The number after float.
   * @param base - The numeric base.
   */
  static TO_FIXED_NUMBER(num: number, digits: number, base: number = 10): number {
    const pow = Math.pow(base, digits);
    return Math.round(num * pow) / pow;
  }

  /**
   * @param src - Number.
   * @param out - Vector one.
   */
  static VEC1_COPY(src: number, out: vec1 = [0]): vec1 {
    out[0] = src;
    return out;
  }

  /**
   * @param x - The first component.
   * @param y - The second component.
   */
  static VEC2_CREATE(x: number = 0, y: number = 0): Float32Array {
    const out = new Float32Array(2);
    out[0] = x;
    out[1] = y;
    return out;
  }

  /**
   * @param str - The string.
   * @param separator - The token separator between components.
   * @param out - The vector.
   */
  static VEC2_PARSE(str: string, separator: string = ' ', out: vec2 = [0, 0]): vec2 {
    const a = str.split(separator);
    out[0] = parseFloat(a[0]);
    out[1] = parseFloat(a[1]);
    return out;
  }

  /**
   * @param src - The source vector.
   * @param out - The destination vector.
   */
  static VEC2_COPY(src: vec2, out: vec2 = [0, 0]): vec2 {
    out[0] = src[0];
    out[1] = src[1];
    return out;
  }

  /**
   * @param base - The base vector.
   * @param spread - The spread vector.
   */
  static VEC2_SPREAD(base: vec2, spread: vec2): vec2 {
    const rand2 = UT.VEC2_CREATE(Math.random() - 0.5, Math.random() - 0.5);
    return UT.VEC2_ADD(base, UT.VEC2_MULTIPLY(spread, rand2));
  }

  /**
   * @param center - The position you want to rotate around.
   * @param radius - The radius relative to the center of the rotation.
   * @param angle - The angle rotation.
   */
  static VEC2_ROTATE_AROUND(center: vec2, radius: number, angle: number): vec2 {
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return [center[0] + x, center[1] + y];
  }

  /**
   * @param a - The source vector.
   * @param out - The opposite vector.
   */
  static VEC2_OPPOSITE(a: vec2, out: vec2 = [0, 0]): vec2 {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
  }

  /**
   * @param a - The first point.
   * @param b - The second point.
   */
  static VEC2_DISTANCE(a: vec2, b: vec2): number {
    const x = b[0] - a[0];
    const y = b[1] - a[1];
    return Math.sqrt((x * x) + (y * y));
  }

  /**
   * @param a - The source vector.
   */
  static VEC2_LENGTH(a: vec2): number {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
  }

  /**
   * @param a - The source vector.
   * @param out - The normalized vector.
   */
  static VEC2_NORMALIZE(a: vec2, out: vec2 = [0, 0]): vec2 {
    const len = UT.VEC2_LENGTH(a);
    if (len > 0) {
      out[0] = a[0] / len;
      out[1] = a[1] / len;
    }

    return out;
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   */
  static VEC2_DOT(a: vec2, b: vec2): number {
    return a[0] * b[0] + a[1] * b[1];
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   */
  static VEC2_CROSS(a: vec2, b: vec2): number {
    return a[0] * b[1] - a[1] * b[0];
  }

  /**
   * @param p - The first point.
   * @param q - The second point.
   * @param r - The third point.
   */
  static VEC2_ORIENTATION(p: vec2, q: vec2, r: vec2): number {
    const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    if (val == 0) return 0; // collinear
    return (val > 0) ? 1 : 2; // clock or counterclock wise
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   * @param out - The result vector.
   */
  static VEC2_ADD(a: vec2, b: vec2, out: vec2 = [0, 0]): vec2 {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   * @param out - The result vector.
   */

  static VEC2_SUBSTRACT(a: vec2, b: vec2, out: vec2 = [0, 0]): vec2 {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   * @param out - The result vector.
   */
  static VEC2_MULTIPLY(a: vec2, b: vec2, out: vec2 = [0, 0]): vec2 {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
  }

  /**
   * @param a - The first vector.
   * @param scale - The scale value.
   * @param out - The result vector.
   */
  static VEC2_SCALE(a: vec2, scale: number, out: vec2 = [0, 0]): vec2 {
    out[0] = a[0] * scale;
    out[1] = a[1] * scale;
    return out;
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector to scale and add to the first.
   * @param scale - The scale value for second vector.
   * @param out - The result vector.
   */
  static VEC2_ADD_SCALED(a: vec2, b: vec2, scale: number, out: vec2 = [0, 0]): vec2 {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    return out;
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   */
  static VEC2_ANGLE_BETWEEN(a: vec2, b: vec2): number {
    return Math.acos(UT.VEC2_DOT(a, b) / (UT.VEC2_LENGTH(a) * UT.VEC2_LENGTH(b)));
  }

  /**
   * @param a - The vector.
   */
  static VEC2_ANGLE(a: vec2): number {
    const angle = Math.atan2(a[1], a[0]);
    return (angle > 0) ? angle : (angle + Math.PI * 2);
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   */
  static VEC2_ISEQUAL(a: vec2, b: vec2): boolean {
    return a[0] == b[0] && a[1] == b[1];
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   * @param out - The projection vector.
   */
  static VEC2_PROJECTION_COS(a: vec2, b: vec2, out: vec2 = [0, 0]): vec2 {
    const bLength = Math.sqrt((b[0] * b[0]) + (b[1] * b[1]));
    const scale = ((a[0] * b[0]) + (a[1] * b[1])) / (bLength * bLength);
    out[0] = b[0] * scale;
    out[1] = b[1] * scale;
    return out;
  }

  /**
   * @param p0 - The start point.
   * @param p1 - The inter point.
   * @param p2 - The end point.
   * @param t - The time.
   * @param out - The result point.
   */
  static VEC2_QUADRATIC_BEZIER(p0: vec2, p1: vec2, p2: vec2, t: number, out: vec2 = [0, 0]): vec2 {
    const pax = p0[0] + ((p1[0] - p0[0]) * t);
    const pay = p0[1] + ((p1[1] - p0[1]) * t);

    const pbx = p1[0] + ((p2[0] - p1[0]) * t);
    const pby = p1[1] + ((p2[1] - p1[1]) * t);

    out[0] = pax + ((pbx - pax) * t);
    out[1] = pay + ((pby - pay) * t);
    return out;
  }

  /**
   * @param p - The iso point.
   */
  static VEC2_ISO_TO_2D(p: vec2): vec2 {
    let x = (2 * p[1] + p[0]) * 0.5;
    let y = (2 * p[1] - p[0]) * 0.5;
    return [x, y];
  }

  /**
   * @param p - The ortho point.
   */
  static VEC2_2D_TO_ISO(p: vec2): vec2 {
    let x = (p[0] - p[1]);
    let y = (p[0] + p[1]) * 0.5;
    return [x, y];
  }

  /**
   * 
   * @param direction - The direction (FORWARD, BACKWARD, LEFT, RIGHT)
   * @param depth - The depth of shape.
   * @param width - The width of shape.
   */
  static VEC2_ISO_CARDINAL_POINTS(direction: string, depth: number, width: number): {f: vec2, l: vec2, r: vec2, b: vec2} {
    if (direction == 'FORWARD') {
      const f = UT.VEC2_2D_TO_ISO([-depth * 0.5, 0]);
      const l = UT.VEC2_2D_TO_ISO([0, width * 0.5]);
      const r = UT.VEC2_2D_TO_ISO([0, -width * 0.5]);
      const b = UT.VEC2_2D_TO_ISO([depth * 0.5, 0]);
      return { f, l, r, b };
    }

    if (direction == 'BACKWARD') {
      const f = UT.VEC2_2D_TO_ISO([depth * 0.5, 0]);
      const l = UT.VEC2_2D_TO_ISO([0, -width * 0.5]);
      const r = UT.VEC2_2D_TO_ISO([0, width * 0.5]);
      const b = UT.VEC2_2D_TO_ISO([-depth * 0.5, 0]);
      return { f, l, r, b };
    }

    if (direction == 'LEFT') {
      const f = UT.VEC2_2D_TO_ISO([0, depth * 0.5]);
      const l = UT.VEC2_2D_TO_ISO([-width * 0.5, 0]);
      const r = UT.VEC2_2D_TO_ISO([width * 0.5, 0]);
      const b = UT.VEC2_2D_TO_ISO([0, depth * 0.5]);
      return { f, l, r, b };
    }

    if (direction == 'RIGHT') {
      const f = UT.VEC2_2D_TO_ISO([0, -depth * 0.5]);
      const l = UT.VEC2_2D_TO_ISO([width * 0.5, 0]);
      const r = UT.VEC2_2D_TO_ISO([-width * 0.5, 0]);
      const b = UT.VEC2_2D_TO_ISO([0, depth * 0.5]);
      return { f, l, r, b };
    }

    return { f: [0, 0], l: [0, 0], r: [0, 0], b: [0, 0] };
  }

  /**
   * @param x - The first component.
   * @param y - The second component.
   * @param z - The third component.
   */
  static VEC3_CREATE(x: number = 0, y: number = 0, z: number = 0): Float32Array {
    const out = new Float32Array(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }

  /**
   * @param str - The string.
   * @param separator - The token separator between components.
   * @param out - The vector.
   */
  static VEC3_PARSE(str: string, separator: string = ' ', out: vec3 = [0, 0, 0]): vec3 {
    const a = str.split(separator);
    out[0] = parseFloat(a[0]);
    out[1] = parseFloat(a[1]);
    out[2] = parseFloat(a[2]);
    return out;
  }

  /**
   * @param src - The source vector.
   * @param out - The destination vector.
   */
  static VEC3_COPY(src: vec3, out: vec3 = [0, 0, 0]): vec3 {
    out[0] = src[0];
    out[1] = src[1];
    out[2] = src[2];
    return out;
  }

  /**
   * @param base - The base vector.
   * @param spread - The spread vector.
   */
  static VEC3_SPREAD(base: vec3, spread: vec3): vec3 {
    const rand3 = UT.VEC3_CREATE(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
    return UT.VEC3_ADD(base, UT.VEC3_MULTIPLY(spread, rand3));
  }

  /**
   * @param center - The position you want to rotate around.
   * @param radius - The radius relative to the center of the rotation.
   * @param phi - The phi angle.
   * @param theta - The theta angle.
   */
  static VEC3_ROTATE_AROUND(center: vec3, radius: number, phi: number, theta: number): vec3 {
    const r = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius;
    const z = Math.sin(phi) * r;
    const x = Math.cos(phi) * r;
    return [center[0] + x, center[1] + y, center[2] + z];
  }

  /**
   * @param a - The origin vector.
   * @param out - The opposite vector.
   */
  static VEC3_OPPOSITE(a: vec3, out: vec3 = [0, 0, 0]): vec3 {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }

  /**
   * @param a - The first point.
   * @param b - The second point.
   */
  static VEC3_DISTANCE(a: vec3, b: vec3): number {
    const x = b[0] - a[0];
    const y = b[1] - a[1];
    const z = b[2] - a[2];
    return Math.sqrt((x * x) + (y * y) + (z * z));
  }

  /**
   * @param a - The vector.
   */
  static VEC3_LENGTH(a: vec3): number {
    return Math.sqrt((a[0] * a[0]) + (a[1] * a[1]) + (a[2] * a[2]));
  }

  /**
   * @param a - The origin vector.
   * @param out - The normalized vector.
   */
  static VEC3_NORMALIZE(a: vec3, out: vec3 = [0, 0, 0]): vec3 {
    const len = UT.VEC3_LENGTH(a);
    if (len > 0) {
      out[0] = a[0] / len;
      out[1] = a[1] / len;
      out[2] = a[2] / len;
    }

    return out;
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   */
  static VEC3_DOT(a: vec3, b: vec3): number {
    return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   * @param out - The cross vector.
   */
  static VEC3_CROSS(a: vec3, b: vec3, out: vec3 = [0, 0, 0]): vec3 {
    out[0] = (a[1] * b[2]) - (a[2] * b[1]);
    out[1] = (a[2] * b[0]) - (a[0] * b[2]);
    out[2] = (a[0] * b[1]) - (a[1] * b[0]);
    return out;
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   * @param out - The result vector.
   */
  static VEC3_ADD(a: vec3, b: vec3, out: vec3 = [0, 0, 0]): vec3 {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   * @param out - The result vector.
   */
  static VEC3_SUBSTRACT(a: vec3, b: vec3, out: vec3 = [0, 0, 0]): vec3 {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   * @param out - The result vector.
   */
  static VEC3_MULTIPLY(a: vec3, b: vec3, out: vec3 = [0, 0, 0]): vec3 {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }

  /**
   * @param a - The first vector.
   * @param scale - The scale value.
   * @param out - The result vector.
   */
  static VEC3_SCALE(a: vec3, scale: number, out: vec3 = [0, 0, 0]): vec3 {
    out[0] = a[0] * scale;
    out[1] = a[1] * scale;
    out[2] = a[2] * scale;
    return out;
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector to scale and add to the first.
   * @param scale - The scale value for second vector.
   * @param out - The result vector.
   */
  static VEC3_ADD_SCALED(a: vec3, b: vec3, scale: number, out: vec3 = [0, 0, 0]): vec3 {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    return out;
  }

  /**
   * @param a - The first vector.
   * @param b - The second vector.
   */
  static VEC3_ISEQUAL(a: vec3, b: vec3): boolean {
    return a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
  }

  /**
   * @param p0 - The start point.
   * @param p1 - The inter point.
   * @param p2 - The end point.
   * @param t - The time.
   * @param out - The result point.
   */
  static VEC3_QUADRATIC_BEZIER(p0: vec3, p1: vec3, p2: vec3, t: number, out: vec3 = [0, 0, 0]): vec3 {
    const pax = p0[0] + ((p1[0] - p0[0]) * t);
    const pay = p0[1] + ((p1[1] - p0[1]) * t);
    const paz = p0[2] + ((p1[2] - p0[2]) * t);

    const pbx = p1[0] + ((p2[0] - p1[0]) * t);
    const pby = p1[1] + ((p2[1] - p1[1]) * t);
    const pbz = p1[2] + ((p2[2] - p1[2]) * t);

    out[0] = pax + ((pbx - pax) * t);
    out[1] = pay + ((pby - pay) * t);
    out[2] = paz + ((pbz - paz) * t);
    return out;
  }

  /**
   * @param x - The first component.
   * @param y - The second component.
   * @param z - The third component.
   * @param w - The fourth component.
   */
  static VEC4_CREATE(x: number = 0, y: number = 0, z: number = 0, w: number = 0): Float32Array {
    const out = new Float32Array(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }

  /**
   * @param str - The string.
   * @param separator - The token separator between components.
   * @param out - The vector.
   */
  static VEC4_PARSE(str: string, separator: string = ' ', out: vec4 = [0, 0, 0, 0]): vec4 {
    const a = str.split(separator);
    out[0] = parseFloat(a[0]);
    out[1] = parseFloat(a[1]);
    out[2] = parseFloat(a[2]);
    out[3] = 1.0;
    return out;
  }

  /**
   * @param src - The source vector.
   * @param out - The destination vector.
   */
  static VEC4_COPY(src: vec4, out: vec4 = [0, 0, 0, 0]): vec4 {
    out[0] = src[0];
    out[1] = src[1];
    out[2] = src[2];
    out[3] = src[3];
    return out;
  }

  static MAT3_CREATE(): Float32Array {
    const out = new Float32Array(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }

  /**
   * @param src - The source matrix.
   * @param out - The destination matrix.
   */
  static MAT3_COPY(src: mat3, out: mat3): mat3 {
    out[0] = src[0];
    out[1] = src[1];
    out[2] = src[2];
    out[3] = src[3];
    out[4] = src[4];
    out[5] = src[5];
    out[6] = src[6];
    out[7] = src[7];
    out[8] = src[8];
    return out;
  }

  /**
   * @param a - The matrix.
   * @param v - The vector.
   * @param out - The result transformed vector.
   */
  static MAT3_MULTIPLY_BY_VEC3(a: mat3, v: vec3, out: vec3 = [0, 0, 0]): vec3 {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a10 = a[3];
    const a11 = a[4];
    const a12 = a[5];
    const a20 = a[6];
    const a21 = a[7];
    const a22 = a[8];
    const v00 = v[0];
    const v01 = v[1];
    const v02 = v[2];

    out[0] = v00 * a00 + v01 * a10 + v02 * a20;
    out[1] = v00 * a01 + v01 * a11 + v02 * a21;
    out[2] = v00 * a02 + v01 * a12 + v02 * a22;
    return out;
  }

  /**
   * @param a - The first matrix.
   * @param b - The second matrix.
   * @param out - The result matrix.
   */
  static MAT3_MULTIPLY(a: mat3, b: mat3, out: mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0]): mat3 {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a10 = a[3];
    const a11 = a[4];
    const a12 = a[5];
    const a20 = a[6];
    const a21 = a[7];
    const a22 = a[8];
    const b00 = b[0];
    const b01 = b[1];
    const b02 = b[2];
    const b10 = b[3];
    const b11 = b[4];
    const b12 = b[5];
    const b20 = b[6];
    const b21 = b[7];
    const b22 = b[8];

    const c00 = b00 * a00 + b01 * a10 + b02 * a20;
    const c01 = b00 * a01 + b01 * a11 + b02 * a21;
    const c02 = b00 * a02 + b01 * a12 + b02 * a22;

    const c10 = b10 * a00 + b11 * a10 + b12 * a20;
    const c11 = b10 * a01 + b11 * a11 + b12 * a21;
    const c12 = b10 * a02 + b11 * a12 + b12 * a22;

    const c20 = b20 * a00 + b21 * a10 + b22 * a20;
    const c21 = b20 * a01 + b21 * a11 + b22 * a21;
    const c22 = b20 * a02 + b21 * a12 + b22 * a22;

    out[0] = c00;
    out[1] = c01;
    out[2] = c02;
    out[3] = c10;
    out[4] = c11;
    out[5] = c12;
    out[6] = c20;
    out[7] = c21;
    out[8] = c22;
    return out;
  }

  /**
   * @param a - The matrix.
   * @param out - The inverted matrix.
   */
  static MAT3_INVERT(a: mat3, out: mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0]): mat3 {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a10 = a[3];
    const a11 = a[4];
    const a12 = a[5];
    const a20 = a[6];
    const a21 = a[7];
    const a22 = a[8];
    const b01 = a22 * a11 - a12 * a21;
    const b11 = -a22 * a10 + a12 * a20;
    const b21 = a21 * a10 - a11 * a20;

    let det = a00 * b01 + a01 * b11 + a02 * b21;
    if (!det) {
      throw new Error('UT::MAT4_INVERT(): det is invalid !');
    }

    det = 1.0 / det;

    const c00 = b01 * det;
    const c01 = (-a22 * a01 + a02 * a21) * det;
    const c02 = (a12 * a01 - a02 * a11) * det;

    const c10 = b11 * det;
    const c11 = (a22 * a00 - a02 * a20) * det;
    const c12 = (-a12 * a00 + a02 * a10) * det;

    const c20 = b21 * det;
    const c21 = (-a21 * a00 + a01 * a20) * det;
    const c22 = (a11 * a00 - a01 * a10) * det;

    out[0] = c00;
    out[1] = c01;
    out[2] = c02;
    out[3] = c10;
    out[4] = c11;
    out[5] = c12;
    out[6] = c20;
    out[7] = c21;
    out[8] = c22;
    return out;
  }

  /**
   * @param out - The identity matrix.
   */
  static MAT3_IDENTITY(out: mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0]): mat3 {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }

  /**
   * @param x - The x-scale.
   * @param y - The y-scale.
   * @param out - The result matrix.
   */
  static MAT3_SCALE(x: number, y: number, out: mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0]): mat3 {
    out[0] = x;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = y;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }

  /**
   * @param a - The angle.
   * @param out - The result matrix.
   */
  static MAT3_ROTATE(a: number, out: mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0]): mat3 {
    const c = Math.cos(a);
    const s = Math.sin(a);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = -s;
    out[4] = c;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }

  /**
   * @param x - The x-translation.
   * @param y - The y-translation.
   * @param out - The result matrix.
   */
  static MAT3_TRANSLATE(x: number, y: number, out: mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0]): mat3 {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = x;
    out[7] = y;
    out[8] = 1;
    return out;
  }

  /**
   * @param w - The width;
   * @param h - The height;
   * @param out - The result matrix.
   */
  static MAT3_PROJECTION(w: number, h: number, out: mat3 = [0, 0, 0, 0, 0, 0, 0, 0, 0]): mat3 {
    out[0] = 2 / w;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 2 / h;
    out[5] = 0;
    out[6] = -1;
    out[7] = -1;
    out[8] = 1;
    return out;
  }

  static MAT4_CREATE(): Float32Array {
    const out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * @param src - The source matrix.
   * @param out - The destination matrix.
   */
  static MAT4_COPY(src: mat4, out: mat4): mat4 {
    out[0] = src[0];
    out[1] = src[1];
    out[2] = src[2];
    out[3] = src[3];
    out[4] = src[4];
    out[5] = src[5];
    out[6] = src[6];
    out[7] = src[7];
    out[8] = src[8];
    out[9] = src[9];
    out[10] = src[10];
    out[11] = src[11];
    out[12] = src[12];
    out[13] = src[13];
    out[14] = src[14];
    out[15] = src[15];
    return out;
  }

  /**
   * @param a - The matrix.
   * @param v - The vector.
   * @param out - The result vector.
   */
  static MAT4_MULTIPLY_BY_VEC4(a: mat4, v: vec4, out: vec4 = [0, 0, 0, 0]): vec4 {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const a30 = a[12];
    const a31 = a[13];
    const a32 = a[14];
    const a33 = a[15];
    const v00 = v[0];
    const v01 = v[1];
    const v02 = v[2];
    const v03 = v[3];

    out[0] = v00 * a00 + v01 * a10 + v02 * a20 + v03 * a30;
    out[1] = v00 * a01 + v01 * a11 + v02 * a21 + v03 * a31;
    out[2] = v00 * a02 + v01 * a12 + v02 * a22 + v03 * a32;
    out[3] = v00 * a03 + v01 * a13 + v02 * a23 + v03 * a33;
    return out;
  }

  /**
   * @param a - The first matrix.
   * @param b - The second matrix.
   * @param out - The result matrix.
   */
  static MAT4_MULTIPLY(a: mat4, b: mat4, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const a30 = a[12];
    const a31 = a[13];
    const a32 = a[14];
    const a33 = a[15];
    const b00 = b[0];
    const b01 = b[1];
    const b02 = b[2];
    const b03 = b[3];
    const b10 = b[4];
    const b11 = b[5];
    const b12 = b[6];
    const b13 = b[7];
    const b20 = b[8];
    const b21 = b[9];
    const b22 = b[10];
    const b23 = b[11];
    const b30 = b[12];
    const b31 = b[13];
    const b32 = b[14];
    const b33 = b[15];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
    out[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
    out[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
    out[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
    out[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
    out[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
    out[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
    out[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
    out[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
    out[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
    out[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
    out[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
    out[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
    out[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
    return out;
  }

  /**
   * @param matrices - The list of matrix to multiply.
   */
  static MAT4_COMPUTE(...matrices: Array<mat4>): mat4 {
    for (let i = 0; i < matrices.length - 1; i++) {
      matrices[i + 1] = UT.MAT4_MULTIPLY(matrices[i], matrices[i + 1]);
    }

    return matrices[matrices.length - 1];
  }

  /**
   * @param a - The origin matrix.
   * @param out - The inverted matrix.
   */
  static MAT4_INVERT(a: mat4, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const a30 = a[12];
    const a31 = a[13];
    const a32 = a[14];
    const a33 = a[15];
    const b00 = a00 * a11 - a01 * a10;
    const b01 = a00 * a12 - a02 * a10;
    const b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11;
    const b04 = a01 * a13 - a03 * a11;
    const b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30;
    const b07 = a20 * a32 - a22 * a30;
    const b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31;
    const b10 = a21 * a33 - a23 * a31;
    const b11 = a22 * a33 - a23 * a32;

    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      throw new Error('UT::MAT4_INVERT(): det is invalid !');
    }

    det = 1.0 / det;

    const c00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    const c01 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    const c02 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    const c03 = (a22 * b04 - a21 * b05 - a23 * b03) * det;

    const c10 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    const c11 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    const c12 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    const c13 = (a20 * b05 - a22 * b02 + a23 * b01) * det;

    const c20 = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    const c21 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    const c22 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    const c23 = (a21 * b02 - a20 * b04 - a23 * b00) * det;

    const c30 = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    const c31 = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    const c32 = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    const c33 = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    out[0] = c00;
    out[1] = c01;
    out[2] = c02;
    out[3] = c03;
    out[4] = c10;
    out[5] = c11;
    out[6] = c12;
    out[7] = c13;
    out[8] = c20;
    out[9] = c21;
    out[10] = c22;
    out[11] = c23;
    out[12] = c30;
    out[13] = c31;
    out[14] = c32;
    out[15] = c33;
    return out;
  }

  /**
   * @param out - The matrix identity.
   */
  static MAT4_IDENTITY(out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * @param x - The x-scale.
   * @param y - The y-scale.
   * @param z - The z-scale.
   * @param out - The result matrix.
   */
  static MAT4_SCALE(x: number, y: number, z: number, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    out[0] = x;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = y;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = z;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * @param a - The x-angle.
   * @param out - The result matrix.
   */
  static MAT4_ROTATE_X(a: number, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    const c = Math.cos(a);
    const s = Math.sin(a);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = -s;
    out[7] = 0;
    out[8] = 0;
    out[9] = s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * @param a - The y-angle.
   * @param out - The result matrix.
   */
  static MAT4_ROTATE_Y(a: number, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    const c = Math.cos(a);
    const s = Math.sin(a);
    out[0] = c;
    out[1] = 0;
    out[2] = s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = -s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * @param a - The z-angle.
   * @param out - The result matrix.
   */
  static MAT4_ROTATE_Z(a: number, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    const c = Math.cos(a);
    const s = Math.sin(a);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * @param x - The x-translation.
   * @param y - The y-translation.
   * @param z - The z-translation.
   * @param out - The result matrix.
   */
  static MAT4_TRANSLATE(x: number, y: number, z: number, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = x;
    out[13] = y;
    out[14] = z;
    out[15] = 1;
    return out;
  }

  /**
   * @param position - The position vector.
   * @param rotation - The rotation vector (y -> x -> z).
   * @param scale - The scale vector.
   * @param quaternion - The rotation quaternion.
   * @param out - The result matrix.
   */
  static MAT4_TRANSFORM(position: vec3, rotation: vec3, scale: vec3, quaternion: Quaternion, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    UT.MAT4_TRANSLATE(position[0], position[1], position[2], out);
    UT.MAT4_MULTIPLY(out, quaternion.toMatrix4(), out);
    UT.MAT4_MULTIPLY(out, UT.MAT4_ROTATE_Y(rotation[1]), out);
    UT.MAT4_MULTIPLY(out, UT.MAT4_ROTATE_X(rotation[0]), out); // y -> x -> z
    UT.MAT4_MULTIPLY(out, UT.MAT4_ROTATE_Z(rotation[2]), out);
    UT.MAT4_MULTIPLY(out, UT.MAT4_SCALE(scale[0], scale[1], scale[2]), out);
    return out;
  }

  /**
   * @param width - The width.
   * @param height - The height.
   * @param depth - The depth.
   * @param out - The result matrix.
   */
  static MAT4_ORTHOGRAPHIC(width: number, height: number, depth: number, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 { // @todo: add width & height
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 2 / height;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = -2 / depth;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * @param left - The left limit.
   * @param right - The right limit.
   * @param bottom - The bottom limit.
   * @param top - The top limit.
   * @param near - The near limit.
   * @param far - The far limit.
   * @param out - The result matrix.
   */
  static MAT4_ORTHO(left: number, right: number, bottom: number, top: number, near: number, far: number, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    out[0] = 2 / (right - left);
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 2 / (top - bottom);
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 / (near - far);
    out[11] = 0;
    out[12] = (left + right) / (left - right);
    out[13] = (bottom + top) / (bottom - top);
    out[14] = (near + far) / (near - far);
    out[15] = 1;
    return out;
  }

  /**
   * @param fov - The fovy angle.
   * @param ar - The aspect-ratio.
   * @param near - The near value.
   * @param far - The far value.
   * @param out - The result matrix.
   */
  static MAT4_PERSPECTIVE(fov: number, ar: number, near: number, far: number, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    out[0] = (1 / (Math.tan(fov / 2) * ar));
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1 / Math.tan(fov / 2);
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (near + far) / (near - far);
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) / (near - far);
    out[15] = 0;
    return out;
  }

  /**
   * @param position - The position.
   * @param target - The target.
   * @param vertical - The up vector.
   * @param out - The result matrix.
   */
  static MAT4_LOOKAT(position: vec3, target: vec3, vertical: vec3 = UT.VEC3_UP, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    const axeZ = UT.VEC3_NORMALIZE(UT.VEC3_SUBSTRACT(position, target));
    vertical = UT.VEC3_NORMALIZE(vertical);

    if (Math.abs(UT.VEC3_DOT(axeZ, vertical)) > 1 - UT.EPSILON) {
      const arbitraryVec: vec3 = Math.abs(axeZ[1]) < 1 - UT.EPSILON ? [0, 1, 0] : [1, 0, 0];
      vertical = UT.VEC3_NORMALIZE(UT.VEC3_CROSS(arbitraryVec, axeZ));
    }

    const axeX = UT.VEC3_NORMALIZE(UT.VEC3_CROSS(vertical, axeZ));
    const axeY = UT.VEC3_NORMALIZE(UT.VEC3_CROSS(axeZ, axeX));
    out[0] = axeX[0];
    out[1] = axeX[1];
    out[2] = axeX[2];
    out[3] = 0;
    out[4] = axeY[0];
    out[5] = axeY[1];
    out[6] = axeY[2];
    out[7] = 0;
    out[8] = axeZ[0];
    out[9] = axeZ[1];
    out[10] = axeZ[2];
    out[11] = 0;
    out[12] = position[0];
    out[13] = position[1];
    out[14] = position[2];
    out[15] = 1;
    return out;
  }

  /**
   * @param a - The source matrix.
   * @param out - The transposed matrix.
   */
  static MAT4_TRANSPOSE(a: mat4, out: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]): mat4 {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const a30 = a[12];
    const a31 = a[13];
    const a32 = a[14];
    const a33 = a[15];
    out[0] = a00;
    out[1] = a10;
    out[2] = a20;
    out[3] = a30;
    out[4] = a01;
    out[5] = a11;
    out[6] = a21;
    out[7] = a31;
    out[8] = a02;
    out[9] = a12;
    out[10] = a22;
    out[11] = a32;
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
    out[15] = a33;
    return out;
  }

  /**
   * @param c1 - center of circle 1.
   * @param r1 - radius of circle 1.
   * @param c2 - center of circle 2.
   * @param r2 - radius of circle 2.
   * @param outVelocity - The out elastic collision velocity.
   */
  static COLLIDE_CIRCLE(c1: vec2, r1: number, c2: vec2, r2: number, outVelocity: vec2 = [0, 0]): boolean {
    const delta = UT.VEC2_SUBSTRACT(c1, c2);
    const distance = UT.VEC2_LENGTH(delta);
    const distanceMin = r1 + r2;

    if (distance > distanceMin) {
      return false;
    }

    const c = Math.PI * 2 - (Math.PI * 2 - Math.atan2(delta[1], delta[0]));
    outVelocity[0] = Math.cos(c) * (distanceMin - distance);
    outVelocity[1] = Math.sin(c) * (distanceMin - distance);
    return true;
  }

  /**
   * @param c1 - The center of cylinder 1.
   * @param r1 - The radius of cylinder 1.
   * @param h1 - The height of cylinder 1.
   * @param c2 - The center of cylinder 2.
   * @param r2 - The radius of cylinder 2.
   * @param h2 - The height of cylinder 2.
   * @param outVelocity - The out elastic collision velocity.
   */
  static COLLIDE_CYLINDER(c1: vec3, r1: number, h1: number, c2: vec3, r2: number, h2: number, outVelocity: vec2 = [0, 0]): boolean {
    let isCollide = UT.COLLIDE_CIRCLE([c1[0], c1[2]], r1, [c2[0], c2[2]], r2, outVelocity);
    if (!isCollide) {
      return false;
    }

    let min1 = c1[1];
    let max1 = c1[1] + h1;
    let min2 = c2[1];
    let max2 = c2[1] + h2;
    return min1 <= max2 && max1 >= min2;
  }

  /**
   * @param p - The point.
   * @param min - The min of rect.
   * @param max - The max of rect.
   */
  static COLLIDE_POINT_TO_RECT(p: vec2, min: vec2, max: vec2): boolean {
    return (
      (p[0] >= min[0] && p[0] <= max[0]) &&
      (p[1] >= min[1] && p[1] <= max[1])
    );
  }

  /**
   * @param min1 - The min rect 1.
   * @param max1 - The max rect 1.
   * @param min2 - The min rect 2.
   * @param max2 - The max rect 2.
   */
  static COLLIDE_RECT_TO_RECT(min1: vec2, max1: vec2, min2: vec2, max2: vec2): boolean {
    return (
      (min1[0] <= max2[0] && max1[0] >= min2[0]) &&
      (min1[1] <= max2[1] && max1[1] >= min2[1])
    );
  }

  /**
   * @param p - The point.
   * @param min - The min point of box.
   * @param max - The max point of box.
   */
  static COLLIDE_POINT_TO_BOX(p: vec3, min: vec3, max: vec3): boolean {
    return (
      (p[0] >= min[0] && p[0] <= max[0]) &&
      (p[1] >= min[1] && p[1] <= max[1]) &&
      (p[2] >= min[2] && p[2] <= max[2])
    );
  }

  /**
   * @param min1 - The min of box 1.
   * @param max1 - The max of box 1.
   * @param min2 - The min of box 2.
   * @param max2 - The max of box 2.
   */
  static COLLIDE_BOX_TO_BOX(min1: vec3, max1: vec3, min2: vec3, max2: vec3): boolean {
    return (
      (min1[0] <= max2[0] && max1[0] >= min2[0]) &&
      (min1[1] <= max2[1] && max1[1] >= min2[1]) &&
      (min1[2] <= max2[2] && max1[2] >= min2[2])
    );
  }

  /**
   * @param p1 - The start line 1.
   * @param q1 - The end line 1.
   * @param p2 - The start line 2.
   * @param q2 - The end line 2.
   */
  static COLLIDE_LINE_TO_LINE(p1: vec2, q1: vec2, p2: vec2, q2: vec2): boolean {
    let o1 = UT.VEC2_ORIENTATION(p1, q1, p2);
    let o2 = UT.VEC2_ORIENTATION(p1, q1, q2);
    let o3 = UT.VEC2_ORIENTATION(p2, q2, p1);
    let o4 = UT.VEC2_ORIENTATION(p2, q2, q1);
    return o1 != o2 && o3 != o4;
  }

  /**
   * @param p - The point.
   * @param a - The first triangle point.
   * @param b - The second triangle point.
   * @param c - The third triangle point.
   */
  static TRI2_POINT_INSIDE(p: vec2, a: vec2, b: vec2, c: vec2): number {
    const ab = UT.VEC2_SUBSTRACT(b, a);
    const bc = UT.VEC2_SUBSTRACT(c, b);
    const ca = UT.VEC2_SUBSTRACT(a, c);
    const ap = UT.VEC2_SUBSTRACT(p, a);
    const bp = UT.VEC2_SUBSTRACT(p, b);
    const cp = UT.VEC2_SUBSTRACT(p, c);

    const crossAPAB = UT.VEC2_CROSS(ap, ab);
    if (crossAPAB < UT.EPSILON) {
      return -1;
    }

    const crossBPBC = UT.VEC2_CROSS(bp, bc);
    if (crossBPBC < UT.EPSILON) {
      return -2;
    }

    const crossCPCA = UT.VEC2_CROSS(cp, ca);
    if (crossCPCA < UT.EPSILON) {
      return -3;
    }

    return 1;
  }

  /**
   * @param a - The first triangle point.
   * @param b - The second triangle point.
   * @param c - The third triangle point.
   * @param out - The normal vector.
   */
  static TRI3_NORMAL(a: vec3, b: vec3, c: vec3, out: vec3 = [0, 0, 0]): vec3 {
    const ab = UT.VEC3_SUBSTRACT(b, a);
    const ac = UT.VEC3_SUBSTRACT(c, a);
    return UT.VEC3_CROSS(ab, ac, out);
  }

  /**
   * @param p - The point.
   * @param a - The first triangle point.
   * @param b - The second triangle point.
   * @param c - The third triangle point.
   * @param n - The normal vector.
   */
  static TRI3_POINT_INSIDE(p: vec3, a: vec3, b: vec3, c: vec3, n?: vec3): boolean {
    if (!n) {
      n = UT.TRI3_NORMAL(a, b, c);
    }

    const ab = UT.VEC3_SUBSTRACT(b, a);
    const bc = UT.VEC3_SUBSTRACT(c, b);
    const ca = UT.VEC3_SUBSTRACT(a, c);
    const ap = UT.VEC3_SUBSTRACT(p, a);
    const bp = UT.VEC3_SUBSTRACT(p, b);
    const cp = UT.VEC3_SUBSTRACT(p, c);

    const crossAPAB = UT.VEC3_CROSS(ab, ap);
    if (UT.VEC3_DOT(crossAPAB, n) < UT.EPSILON) {
      return false;
    }

    const crossBPBC = UT.VEC3_CROSS(bc, bp);
    if (UT.VEC3_DOT(crossBPBC, n) < UT.EPSILON) {
      return false;
    }

    const crossCPCA = UT.VEC3_CROSS(ca, cp);
    if (UT.VEC3_DOT(crossCPCA, n) < UT.EPSILON) {
      return false;
    }

    return true;
  }

  /**
   * @param p - The point.
   * @param a - The first triangle point.
   * @param b - The second triangle point.
   * @param c - The third triangle point.
   */
  static TRI3_POINT_ELEVATION(p: vec2, a: vec3, b: vec3, c: vec3): number {
    const ab = UT.VEC3_CREATE(b[0] - a[0], 0, b[2] - a[2]);
    const ca = UT.VEC3_CREATE(a[0] - c[0], 0, a[2] - c[2]);
    const ap = UT.VEC3_CREATE(p[0] - a[0], 0, p[1] - a[2]);
    const bp = UT.VEC3_CREATE(p[0] - b[0], 0, p[1] - b[2]);
    const cp = UT.VEC3_CREATE(p[0] - c[0], 0, p[1] - c[2]);

    const area = UT.VEC3_LENGTH(UT.VEC3_CROSS(ab, ca));
    const wa = UT.VEC3_LENGTH(UT.VEC3_CROSS(bp, cp)) / area;
    const wb = UT.VEC3_LENGTH(UT.VEC3_CROSS(ap, cp)) / area;
    const wc = UT.VEC3_LENGTH(UT.VEC3_CROSS(ap, bp)) / area;
    if (wa + wb + wc > 1 + UT.BIG_EPSILON) {
      return Infinity;
    }

    // nous déterminons la coordonnée 'y' grâce aux poids precedemment trouvés.
    // celà est possible car : wa*HA + wb*HB = 0 et wa+wb*GH + wc*GC = 0.
    const vert = a[1] + ((b[1] - a[1]) * (wb / (wa + wb)));
    const elev = vert + ((c[1] - vert) * (wc / (wa + wb + wc)));
    return elev;
  }

  /**
   * @param origin - The origin ray.
   * @param dir - The direction ray.
   * @param a - The first triangle point.
   * @param b - The second triangle point.
   * @param c - The third triangle point.
   * @param culling - Culling enabled flag.
   * @param outIntersectPoint - The intersection point.
   */
  static RAY_TRIANGLE(origin: vec3, dir: vec3, a: vec3, b: vec3, c: vec3, culling: boolean = false, outIntersectPoint: vec3 = [0, 0, 0]): boolean {
    const n = UT.TRI3_NORMAL(a, b, c);
    if (!UT.RAY_PLAN(origin, dir, a, n, culling, outIntersectPoint)) {
      return false;
    }

    return UT.TRI3_POINT_INSIDE(outIntersectPoint, a, b, c, n);
  }

  /**
   * @param origin - The origin ray.
   * @param dir - The direction ray.
   * @param a - The plan corner.
   * @param n - The plan normal.
   * @param culling - Culling enabled flag.
   * @param outIntersectPoint - The intersection point.
   */
  static RAY_PLAN(origin: vec3, dir: vec3, a: vec3, n: vec3, culling: boolean, outIntersectPoint: vec3 = [0, 0, 0]): boolean {
    const s = UT.VEC3_DOT(dir, n);
    if (culling && s >= 0) {
      return false;
    }

    if (s > -UT.EPSILON && s < UT.EPSILON) {
      return false;
    }

    const d = UT.VEC3_DOT(n, a) * -1;
    const l = UT.VEC3_DOT(n, origin) * -1;
    const t = (l - d) / s;

    outIntersectPoint[0] = origin[0] + (dir[0] * t);
    outIntersectPoint[1] = origin[1] + (dir[1] * t);
    outIntersectPoint[2] = origin[2] + (dir[2] * t);
    return true;
  }

  /**
   * @param origin - The origin ray.
   * @param dir - The direction ray.
   * @param min - The min box.
   * @param max - The max box.
   * @param outIntersectPoint - The intersection point.
   */
  static RAY_BOX(origin: vec3, dir: vec3, min: vec3, max: vec3, outIntersectPoint: vec3 = [0, 0, 0]): boolean {
    for (let i = 0; i < 3; i++) {
      if (origin[i] < min[i]) {
        const t = (min[i] - origin[i]) / (dir[i]);
        const x = origin[0] + dir[0] * t;
        const y = origin[1] + dir[1] * t;
        const z = origin[2] + dir[2] * t;
        if (x >= min[0] && x <= max[0] && y >= min[1] && y <= max[1] && z >= min[2] && z <= max[2]) {
          outIntersectPoint[0] = x;
          outIntersectPoint[1] = y;
          outIntersectPoint[2] = z;
          return true;
        }
      }
      else if (origin[i] > max[i]) {
        const t = (max[i] - origin[i]) / (dir[i]);
        const x = origin[0] + (dir[0] * t);
        const y = origin[1] + (dir[1] * t);
        const z = origin[2] + (dir[2] * t);
        if (x >= min[0] && x <= max[0] && y >= min[1] && y <= max[1] && z >= min[2] && z <= max[2]) {
          outIntersectPoint[0] = x;
          outIntersectPoint[1] = y;
          outIntersectPoint[2] = z;
          return true;
        }
      }
    }

    return false;
  }

  /**
   * @param t - The time.
   * @param b - The begin.
   * @param e - The end.
   * @param d - The divide.
   */
  static LINEAR(t: number, b: number, e: number, d: number = 1): number {
    return b + (e - b) * t / d;
  }

  /**
   * @param t - The time.
   * @param b - The begin.
   * @param e - The end.
   * @param d - The divide.
   */
  static EASE_IN_QUAD(t: number, b: number, e: number, d: number = 1): number {
    return (e - b) * (t /= d) * t + b;
  }

  /**
   * @param t - The time.
   * @param b - The begin.
   * @param e - The end.
   * @param d - The divide.
   */
  static EASE_OUT_QUAD(t: number, b: number, e: number, d: number = 1): number {
    const c = e - b;
    return -c * (t /= d) * (t - 2) + b;
  }

  /**
   * @param t - The time.
   * @param b - The begin.
   * @param e - The end.
   * @param d - The divide.
   */
  static EASE_IN_OUT_QUAD(t: number, b: number, e: number, d: number = 1): number {
    const c = e - b;
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  }

  /**
   * @param t - The time.
   * @param b - The begin vector.
   * @param e - The end vector.
   * @param d - The divide.
   */
  static LINEAR_VEC2(t: number, b: vec2, e: vec2, d: number = 1): vec2 {
    const c = UT.VEC2_SUBSTRACT(e, b);
    const p = t / d;
    return [b[0] + c[0] * p, b[1] + c[1] * p];
  }

  /**
   * @param t - The time.
   * @param b - The begin.
   * @param e - The end.
   * @param d - The divide.
   */
  static LINEAR_VEC3(t: number, b: vec3, e: vec3, d: number = 1): vec3 {
    const c = UT.VEC3_SUBSTRACT(e, b);
    const p = t / d;
    return [b[0] + c[0] * p, b[1] + c[1] * p, b[2] + c[2] * p];
  }
}

export { UT };