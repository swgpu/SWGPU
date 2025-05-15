import { Quaternion } from './quaternion';
declare class UT {
    static DEG_TO_RAD_RATIO: number;
    static EPSILON: number;
    static BIG_EPSILON: number;
    static VEC2_SIZE: number;
    static VEC2_ZERO: vec2;
    static VEC2_LEFT: vec2;
    static VEC2_RIGHT: vec2;
    static VEC2_UP: vec2;
    static VEC2_DOWN: vec2;
    static VEC2_ISO_LEFT: vec2;
    static VEC2_ISO_RIGHT: vec2;
    static VEC2_ISO_FORWARD: vec2;
    static VEC2_ISO_BACKWARD: vec2;
    static VEC3_SIZE: number;
    static VEC3_ZERO: vec3;
    static VEC3_BACKWARD: vec3;
    static VEC3_FORWARD: vec3;
    static VEC3_LEFT: vec3;
    static VEC3_RIGHT: vec3;
    static VEC3_UP: vec3;
    static VEC3_DOWN: vec3;
    /**
     * @ignore
     */
    static FAIL(message: string): void;
    /**
     * @param filename - The file name.
     */
    static GET_FILENAME_INFOS(filename: string): {
        name: string;
        ext: string;
    };
    /**
     * @param ms - Time to wait (in milliseconds).
     */
    static WAIT(ms: number): Promise<any>;
    /**
     * @param arr - The array to shuffle.
     */
    static SHUFFLE(arr: Array<any>): Array<any>;
    /**
     * @param start - The start value.
     * @param stop - The stop value.
     * @param step - Increment step.
     */
    static RANGE_ARRAY(start: number, stop: number, step?: number): number[];
    /**
     * @param min - The min.
     * @param max - The max.
     */
    static RANDARRAY(min: number, max: number): Array<number>;
    /**
     * @param base - The origin value.
     * @param spread - The spread value.
     */
    static SPREAD(base: number, spread: number): number;
    /**
     * @param min - The min.
     * @param max - The max.
     */
    static GET_RANDOM_INT(min: number, max: number): number;
    /**
     * @param min - The min.
     * @param max - The max.
     */
    static GET_RANDOM_FLOAT(min: number, max: number): number;
    /**
     * @param value - The value to clamp.
     * @param min - The min.
     * @param max - The max.
     */
    static CLAMP(value: number, min: number, max: number): number;
    /**
     * @param deg - Angle in degrees.
     */
    static DEG_TO_RAD(deg: number): number;
    /**
     * @param angle - Angle in radians.
     */
    static NORMALIZE_ANGLE(angle: number): number;
    /**
     * @param a - The begin.
     * @param b - The end.
     * @param t - The time.
     */
    static LERP(a: number, b: number, t: number): number;
    /**
     * @param a - The begin.
     * @param b - The end.
     * @param coefficient - The increase coefficient factor.
     * @param t - The time.
     */
    static LERP_EXP(a: number, b: number, exp: number, t: number): number;
    /**
     * @param a - The begin.
     * @param b - The end.
     * @param t - The time.
     */
    static MIX(a: Array<number>, b: Array<number>, t: number): Array<number>;
    /**
     * @param tl - The top left color.
     * @param tr - The top right color.
     * @param bl - The bottom left color.
     * @param br - The bottom right color.
     * @param t1 - The horizontal interpolation distance.
     * @param t2 - The vertical interpolation distance.
     */
    static BILINEAR_FILTER(tl: Array<number>, tr: Array<number>, bl: Array<number>, br: Array<number>, t1: number, t2: number): Array<any>;
    /**
     * @param num - The number.
     * @param digits - The number after float.
     * @param base - The numeric base.
     */
    static TO_FIXED_NUMBER(num: number, digits: number, base?: number): number;
    /**
     * @param src - Number.
     * @param out - Vector one.
     */
    static VEC1_COPY(src: number, out?: vec1): vec1;
    /**
     * @param x - The first component.
     * @param y - The second component.
     */
    static VEC2_CREATE(x?: number, y?: number): Float32Array;
    /**
     * @param str - The string.
     * @param separator - The token separator between components.
     * @param out - The vector.
     */
    static VEC2_PARSE(str: string, separator?: string, out?: vec2): vec2;
    /**
     * @param src - The source vector.
     * @param out - The destination vector.
     */
    static VEC2_COPY(src: vec2, out?: vec2): vec2;
    /**
     * @param a - The vector to check.
     */
    static VEC2_ISZERO(a: vec2): boolean;
    /**
     * @param base - The base vector.
     * @param spread - The spread vector.
     */
    static VEC2_SPREAD(base: vec2, spread: vec2): vec2;
    /**
     * @param b - The begin vector.
     * @param e - The end vector.
     * @param t - The time.
     * @param d - The divide.
     */
    static VEC2_LERP(b: vec2, e: vec2, t: number, d?: number): vec2;
    /**
     * @param center - The position you want to rotate around.
     * @param radius - The radius relative to the center of the rotation.
     * @param angle - The angle rotation.
     */
    static VEC2_ROTATE_AROUND(center: vec2, radius: number, angle: number): vec2;
    /**
     * @param a - The source vector.
     * @param out - The opposite vector.
     */
    static VEC2_OPPOSITE(a: vec2, out?: vec2): vec2;
    /**
     * @param a - The first point.
     * @param b - The second point.
     */
    static VEC2_DISTANCE(a: vec2, b: vec2): number;
    /**
     * @param a - The source vector.
     */
    static VEC2_LENGTH(a: vec2): number;
    /**
     * @param a - The source vector.
     * @param out - The normalized vector.
     */
    static VEC2_NORMALIZE(a: vec2, out?: vec2): vec2;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     */
    static VEC2_DOT(a: vec2, b: vec2): number;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     */
    static VEC2_CROSS(a: vec2, b: vec2): number;
    /**
     * @param p - The first point.
     * @param q - The second point.
     * @param r - The third point.
     */
    static VEC2_ORIENTATION(p: vec2, q: vec2, r: vec2): number;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The result vector.
     */
    static VEC2_ADD(a: vec2, b: vec2, out?: vec2): vec2;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The result vector.
     */
    static VEC2_SUBSTRACT(a: vec2, b: vec2, out?: vec2): vec2;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The result vector.
     */
    static VEC2_MULTIPLY(a: vec2, b: vec2, out?: vec2): vec2;
    /**
     * @param a - The first vector.
     * @param scale - The scale value.
     * @param out - The result vector.
     */
    static VEC2_SCALE(a: vec2, scale: number, out?: vec2): vec2;
    /**
     * @param a - The first vector.
     * @param b - The second vector to scale and add to the first.
     * @param scale - The scale value for second vector.
     * @param out - The result vector.
     */
    static VEC2_ADD_SCALED(a: vec2, b: vec2, scale: number, out?: vec2): vec2;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The result vector with minimum values for each component pair.
     */
    static VEC2_MIN(a: vec2, b: vec2, out?: vec2): vec2;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The result vector with maximum values for each component pair.
     */
    static VEC2_MAX(a: vec2, b: vec2, out?: vec2): vec2;
    /**
     * @param value - The vector to clamp.
     * @param min - The min vector.
     * @param max - The max vector.
     */
    static VEC2_CLAMP(value: vec2, min: vec2, max: vec2, out?: vec2): vec2;
    /**
     * @param a - The vector to floor.
     */
    static VEC2_FLOOR(a: vec2, out?: vec2): vec2;
    /**
     * @param a - The vector to ceil.
     */
    static VEC2_CEIL(a: vec2, out?: vec2): vec2;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     */
    static VEC2_ANGLE_BETWEEN(a: vec2, b: vec2): number;
    /**
     * @param a - The vector.
     */
    static VEC2_ANGLE(a: vec2): number;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     */
    static VEC2_ISEQUAL(a: vec2, b: vec2): boolean;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The projection vector.
     */
    static VEC2_PROJECTION_COS(a: vec2, b: vec2, out?: vec2): vec2;
    /**
     * @param p0 - The start point.
     * @param p1 - The inter point.
     * @param p2 - The end point.
     * @param t - The time.
     * @param out - The result point.
     */
    static VEC2_QUADRATIC_BEZIER(p0: vec2, p1: vec2, p2: vec2, t: number, out?: vec2): vec2;
    /**
     * @param p - The iso point.
     */
    static VEC2_ISO_TO_2D(p: vec2): vec2;
    /**
     * @param p - The ortho point.
     */
    static VEC2_2D_TO_ISO(p: vec2): vec2;
    /**
     *
     * @param direction - The direction (FORWARD, BACKWARD, LEFT, RIGHT)
     * @param depth - The depth of shape.
     * @param width - The width of shape.
     */
    static VEC2_ISO_CARDINAL_POINTS(direction: string, depth: number, width: number): {
        f: vec2;
        l: vec2;
        r: vec2;
        b: vec2;
    };
    /**
     * @param x - The first component.
     * @param y - The second component.
     * @param z - The third component.
     */
    static VEC3_CREATE(x?: number, y?: number, z?: number): Float32Array;
    /**
     * @param str - The string.
     * @param separator - The token separator between components.
     * @param out - The vector.
     */
    static VEC3_PARSE(str: string, separator?: string, out?: vec3): vec3;
    /**
     * @param src - The source vector.
     * @param out - The destination vector.
     */
    static VEC3_COPY(src: vec3, out?: vec3): vec3;
    /**
     * @param a - The vector to check.
     */
    static VEC3_ISZERO(a: vec3): boolean;
    /**
     * @param base - The base vector.
     * @param spread - The spread vector.
     */
    static VEC3_SPREAD(base: vec3, spread: vec3): vec3;
    /**
     * @param b - The begin.
     * @param e - The end.
     * @param t - The time.
     * @param d - The divide.
     */
    static VEC3_LERP(b: vec3, e: vec3, t: number, d?: number): vec3;
    /**
     * @param center - The position you want to rotate around.
     * @param radius - The radius relative to the center of the rotation.
     * @param phi - The phi angle.
     * @param theta - The theta angle.
     */
    static VEC3_ROTATE_AROUND(center: vec3, radius: number, phi: number, theta: number): vec3;
    /**
     * @param a - The origin vector.
     * @param out - The opposite vector.
     */
    static VEC3_OPPOSITE(a: vec3, out?: vec3): vec3;
    /**
     * @param a - The first point.
     * @param b - The second point.
     */
    static VEC3_DISTANCE(a: vec3, b: vec3): number;
    /**
     * @param a - The vector.
     */
    static VEC3_LENGTH(a: vec3): number;
    /**
     * @param a - The origin vector.
     * @param out - The normalized vector.
     */
    static VEC3_NORMALIZE(a: vec3, out?: vec3): vec3;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     */
    static VEC3_DOT(a: vec3, b: vec3): number;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The cross vector.
     */
    static VEC3_CROSS(a: vec3, b: vec3, out?: vec3): vec3;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The result vector.
     */
    static VEC3_ADD(a: vec3, b: vec3, out?: vec3): vec3;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The result vector.
     */
    static VEC3_SUBSTRACT(a: vec3, b: vec3, out?: vec3): vec3;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The result vector.
     */
    static VEC3_MULTIPLY(a: vec3, b: vec3, out?: vec3): vec3;
    /**
     * @param a - The first vector.
     * @param scale - The scale value.
     * @param out - The result vector.
     */
    static VEC3_SCALE(a: vec3, scale: number, out?: vec3): vec3;
    /**
     * @param a - The first vector.
     * @param b - The second vector to scale and add to the first.
     * @param scale - The scale value for second vector.
     * @param out - The result vector.
     */
    static VEC3_ADD_SCALED(a: vec3, b: vec3, scale: number, out?: vec3): vec3;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     */
    static VEC3_ANGLE_BETWEEN(a: vec3, b: vec3): number;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The result vector with minimum values for each component pair.
     */
    static VEC3_MIN(a: vec3, b: vec3, out?: vec3): vec3;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     * @param out - The result vector with maximum values for each component pair.
     */
    static VEC3_MAX(a: vec3, b: vec3, out?: vec3): vec3;
    /**
     * @param value - The vector to clamp.
     * @param min - The min vector.
     * @param max - The max vector.
     */
    static VEC3_CLAMP(value: vec3, min: vec3, max: vec3, out?: vec3): vec3;
    /**
     * @param a - The vector to floor.
     */
    static VEC3_FLOOR(a: vec3, out?: vec3): vec3;
    /**
     * @param a - The vector to ceil.
     */
    static VEC3_CEIL(a: vec3, out?: vec3): vec3;
    /**
     * @param a - The first vector.
     * @param b - The second vector.
     */
    static VEC3_ISEQUAL(a: vec3, b: vec3): boolean;
    /**
     * @param p0 - The start point.
     * @param p1 - The inter point.
     * @param p2 - The end point.
     * @param t - The time.
     * @param out - The result point.
     */
    static VEC3_QUADRATIC_BEZIER(p0: vec3, p1: vec3, p2: vec3, t: number, out?: vec3): vec3;
    /**
     * @param a - The vector to transform.
     * @param q - The quaternion filter.
     */
    static VEC3_APPLY_QUATERNION(a: vec3, q: Quaternion): vec3;
    /**
     * @param x - The first component.
     * @param y - The second component.
     * @param z - The third component.
     * @param w - The fourth component.
     */
    static VEC4_CREATE(x?: number, y?: number, z?: number, w?: number): Float32Array;
    /**
     * @param str - The string.
     * @param separator - The token separator between components.
     * @param out - The vector.
     */
    static VEC4_PARSE(str: string, separator?: string, out?: vec4): vec4;
    /**
     * @param src - The source vector.
     * @param out - The destination vector.
     */
    static VEC4_COPY(src: vec4, out?: vec4): vec4;
    /**
     * @param a - The vector to check.
     */
    static VEC4_ISZERO(a: vec4): boolean;
    static MAT3_CREATE(): Float32Array;
    /**
     * @param src - The source matrix.
     * @param out - The destination matrix.
     */
    static MAT3_COPY(src: mat3, out: mat3): mat3;
    /**
     * @param a - The matrix.
     * @param v - The vector.
     * @param out - The result transformed vector.
     */
    static MAT3_MULTIPLY_BY_VEC3(a: mat3, v: vec3, out?: vec3): vec3;
    /**
     * @param a - The first matrix.
     * @param b - The second matrix.
     * @param out - The result matrix.
     */
    static MAT3_MULTIPLY(a: mat3, b: mat3, out?: mat3): mat3;
    /**
     * @param a - The matrix.
     * @param out - The inverted matrix.
     */
    static MAT3_INVERT(a: mat3, out?: mat3): mat3;
    /**
     * @param out - The identity matrix.
     */
    static MAT3_IDENTITY(out?: mat3): mat3;
    /**
     * @param x - The x-scale.
     * @param y - The y-scale.
     * @param out - The result matrix.
     */
    static MAT3_SCALE(x: number, y: number, out?: mat3): mat3;
    /**
     * @param a - The angle.
     * @param out - The result matrix.
     */
    static MAT3_ROTATE(a: number, out?: mat3): mat3;
    /**
     * @param x - The x-translation.
     * @param y - The y-translation.
     * @param out - The result matrix.
     */
    static MAT3_TRANSLATE(x: number, y: number, out?: mat3): mat3;
    /**
     * @param position - The position vector.
     * @param offset - The offset translation.
     * @param rotation - The rotation angle.
     * @param scale - The scale vector.
     * @param out - The result matrix.
     */
    static MAT3_TRANSFORM(position: vec2, offset: vec2, rotation: number, scale: vec2, out?: mat3): mat3;
    /**
     * @param w - The width;
     * @param h - The height;
     * @param out - The result matrix.
     */
    static MAT3_PROJECTION(w: number, h: number, out?: mat3): mat3;
    static MAT4_CREATE(): Float32Array;
    /**
     * @param src - The source matrix.
     * @param out - The destination matrix.
     */
    static MAT4_COPY(src: mat4, out: mat4): mat4;
    /**
     * @param a - The matrix.
     * @param v - The vector.
     * @param out - The result vector.
     */
    static MAT4_MULTIPLY_BY_VEC4(a: mat4, v: vec4, out?: vec4): vec4;
    /**
     * @param a - The first matrix.
     * @param b - The second matrix.
     * @param out - The result matrix.
     */
    static MAT4_MULTIPLY(a: mat4, b: mat4, out?: mat4): mat4;
    /**
     * @param matrices - The list of matrix to multiply.
     */
    static MAT4_COMPUTE(...matrices: Array<mat4>): mat4;
    /**
     * @param a - The origin matrix.
     * @param out - The inverted matrix.
     */
    static MAT4_INVERT(a: mat4, out?: mat4): mat4;
    /**
     * @param out - The matrix identity.
     */
    static MAT4_IDENTITY(out?: mat4): mat4;
    /**
     * @param x - The x-scale.
     * @param y - The y-scale.
     * @param z - The z-scale.
     * @param out - The result matrix.
     */
    static MAT4_SCALE(x: number, y: number, z: number, out?: mat4): mat4;
    /**
     * @param a - The x-angle.
     * @param out - The result matrix.
     */
    static MAT4_ROTATE_X(a: number, out?: mat4): mat4;
    /**
     * @param a - The y-angle.
     * @param out - The result matrix.
     */
    static MAT4_ROTATE_Y(a: number, out?: mat4): mat4;
    /**
     * @param a - The z-angle.
     * @param out - The result matrix.
     */
    static MAT4_ROTATE_Z(a: number, out?: mat4): mat4;
    /**
     * @param x - The x-translation.
     * @param y - The y-translation.
     * @param z - The z-translation.
     * @param out - The result matrix.
     */
    static MAT4_TRANSLATE(x: number, y: number, z: number, out?: mat4): mat4;
    /**
     * @param position - The position vector.
     * @param rotation - The rotation vector (y -> x -> z).
     * @param scale - The scale vector.
     * @param quaternion - The rotation quaternion.
     * @param out - The result matrix.
     */
    static MAT4_TRANSFORM(position: vec3, rotation: vec3, scale: vec3, quaternion: Quaternion, out?: mat4): mat4;
    /**
     * @param width - The width.
     * @param height - The height.
     * @param depth - The depth.
     * @param out - The result matrix.
     */
    static MAT4_ORTHOGRAPHIC(width: number, height: number, depth: number, out?: mat4): mat4;
    /**
     * @param left - The left limit.
     * @param right - The right limit.
     * @param bottom - The bottom limit.
     * @param top - The top limit.
     * @param near - The near limit.
     * @param far - The far limit.
     * @param out - The result matrix.
     */
    static MAT4_ORTHO(left: number, right: number, bottom: number, top: number, near: number, far: number, out?: mat4): mat4;
    /**
     * @param fov - The fovy angle.
     * @param ar - The aspect-ratio.
     * @param near - The near value.
     * @param far - The far value.
     * @param out - The result matrix.
     */
    static MAT4_PERSPECTIVE(fov: number, ar: number, near: number, far: number, out?: mat4): mat4;
    /**
     * @param position - The position.
     * @param target - The target.
     * @param vertical - The up vector.
     * @param out - The result matrix.
     */
    static MAT4_LOOKAT(position: vec3, target: vec3, vertical?: vec3, out?: mat4): mat4;
    /**
     * @param a - The source matrix.
     * @param out - The transposed matrix.
     */
    static MAT4_TRANSPOSE(a: mat4, out?: mat4): mat4;
    /**
     * @param {number} l - The left side of rectangle.
     * @param {number} r - The right side of rectangle.
     * @param {number} t - The top side of rectangle.
     * @param {number} b - The bottom side of rectangle.
     */
    static GET_LINES_FROM_RECT(l: number, t: number, r: number, b: number): {
        l: [vec2, vec2];
        t: [vec2, vec2];
        r: [vec2, vec2];
        b: [vec2, vec2];
    };
    /**
     * @param c1 - center of circle 1.
     * @param r1 - radius of circle 1.
     * @param c2 - center of circle 2.
     * @param r2 - radius of circle 2.
     * @param outVelocity - The out elastic collision velocity.
     */
    static COLLIDE_CIRCLE_TO_CIRCLE(c1: vec2, r1: number, c2: vec2, r2: number, outVelocity?: vec2): boolean;
    /**
     * @param c1 - The bottom-center of cylinder 1.
     * @param r1 - The radius of cylinder 1.
     * @param h1 - The height of cylinder 1.
     * @param c2 - The bottom-center of cylinder 2.
     * @param r2 - The radius of cylinder 2.
     * @param h2 - The height of cylinder 2.
     * @param outVelocity - The out elastic collision velocity.
     */
    static COLLIDE_CYLINDER_TO_CYLINDER(c1: vec3, r1: number, h1: number, c2: vec3, r2: number, h2: number, outVelocity?: vec2): boolean;
    /**
     * @param p - The point.
     * @param cp - The bottom-center of cylinder.
     * @param ch - The height of cylinder.
     * @param cr - The radius of cylinder.
     */
    static COLLIDE_POINT_TO_CYLINDER(p: vec3, cp: vec3, ch: number, cr: number): boolean;
    /**
     * @param p - The point.
     * @param min - The min of rect.
     * @param max - The max of rect.
     */
    static COLLIDE_POINT_TO_RECT(p: vec2, min: vec2, max: vec2): boolean;
    /**
     * @param min1 - The min rect 1.
     * @param max1 - The max rect 1.
     * @param min2 - The min rect 2.
     * @param max2 - The max rect 2.
     */
    static COLLIDE_RECT_TO_RECT(min1: vec2, max1: vec2, min2: vec2, max2: vec2): boolean;
    /**
     * @param p - The point.
     * @param min - The min point of box.
     * @param max - The max point of box.
     */
    static COLLIDE_POINT_TO_BOX(p: vec3, min: vec3, max: vec3): boolean;
    /**
     * @param min1 - The min of box 1.
     * @param max1 - The max of box 1.
     * @param min2 - The min of box 2.
     * @param max2 - The max of box 2.
     */
    static COLLIDE_BOX_TO_BOX(min1: vec3, max1: vec3, min2: vec3, max2: vec3): boolean;
    /**
     * @param p1 - The start line 1.
     * @param q1 - The end line 1.
     * @param p2 - The start line 2.
     * @param q2 - The end line 2.
     */
    static COLLIDE_LINE_TO_LINE(p1: vec2, q1: vec2, p2: vec2, q2: vec2): boolean;
    /**
     * @param p - The point.
     * @param a - The first triangle point.
     * @param b - The second triangle point.
     * @param c - The third triangle point.
     */
    static TRI2_POINT_INSIDE(p: vec2, a: vec2, b: vec2, c: vec2): number;
    /**
     * @param a - The first triangle point.
     * @param b - The second triangle point.
     * @param c - The third triangle point.
     * @param out - The normal vector.
     */
    static TRI3_NORMAL(a: vec3, b: vec3, c: vec3, out?: vec3): vec3;
    /**
     * @param p - The point.
     * @param a - The first triangle point.
     * @param b - The second triangle point.
     * @param c - The third triangle point.
     * @param n - The normal vector.
     */
    static TRI3_POINT_INSIDE(p: vec3, a: vec3, b: vec3, c: vec3): boolean;
    /**
     * @param p - The point.
     * @param a - The first triangle point.
     * @param b - The second triangle point.
     * @param c - The third triangle point.
     */
    static TRI3_POINT_ELEVATION(p: vec2, a: vec3, b: vec3, c: vec3): number;
    /**
     * @param origin - The origin ray.
     * @param dir - The direction ray.
     * @param a - The first triangle point.
     * @param b - The second triangle point.
     * @param c - The third triangle point.
     * @param culling - Culling enabled flag.
     * @param outIntersectPoint - The intersection point.
     */
    static RAY_TRIANGLE(origin: vec3, dir: vec3, a: vec3, b: vec3, c: vec3, culling?: boolean, outIntersectPoint?: vec3): boolean;
    /**
     * @param origin - The origin ray.
     * @param dir - The direction ray.
     * @param a - The plan corner.
     * @param n - The plan normal.
     * @param culling - Culling enabled flag.
     * @param outIntersectPoint - The intersection point.
     */
    static RAY_PLAN(origin: vec3, dir: vec3, a: vec3, n: vec3, culling: boolean, outIntersectPoint?: vec3): boolean;
    /**
     * @param origin - The origin ray.
     * @param dir - The direction ray.
     * @param min - The min box.
     * @param max - The max box.
     * @param outIntersectPoint - The intersection point.
     */
    static RAY_BOX(origin: vec3, dir: vec3, min: vec3, max: vec3, outIntersectPoint?: vec3): boolean;
    /**
     * @param t - The time.
     * @param b - The begin.
     * @param e - The end.
     * @param d - The divide.
     */
    static LINEAR(t: number, b: number, e: number, d?: number): number;
    /**
     * @param t - The time.
     * @param b - The begin.
     * @param e - The end.
     * @param d - The divide.
     */
    static EASE_IN_QUAD(t: number, b: number, e: number, d?: number): number;
    /**
     * @param t - The time.
     * @param b - The begin.
     * @param e - The end.
     * @param d - The divide.
     */
    static EASE_OUT_QUAD(t: number, b: number, e: number, d?: number): number;
    /**
     * @param t - The time.
     * @param b - The begin.
     * @param e - The end.
     * @param d - The divide.
     */
    static EASE_IN_OUT_QUAD(t: number, b: number, e: number, d?: number): number;
}
export { UT };
