import { UT } from './utils';

const EPSILON = 1e-16;

/**
 * A quaternion.
 * This class is a fork from Quaternion.js.
 * Thanks to @rawify for his incredible work: https://github.com/rawify/Quaternion.js
 */
class Quaternion {
  w: number;
  x: number;
  y: number;
  z: number;

  /**
   * @param {number} w - real
   * @param {number} x - imag
   * @param {number} y - imag
   * @param {number} z - imag
   */
  constructor(w: number = 1, x: number = 0, y: number = 0, z: number = 0) {
    this.w = w;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static ZERO = new Quaternion(0, 0, 0, 0);
  static ONE = new Quaternion(1, 0, 0, 0);

  /**
   * Creates a new normalized Quaternion object
   *
   * @param {number} w - real
   * @param {number} x - imag
   * @param {number} y - imag
   * @param {number} z - imag
   * @returns
   */
  static createNormalized(w: number, x: number, y: number, z: number): Quaternion {
    // We assume |Q| > 0 for internal usage
    let il = 1 / Math.sqrt(w * w + x * x + y * y + z * z);
    return new Quaternion(w * il, x * il, y * il, z * il);
  }

  /**
   * Gets a spherical random number
   * @link http://planning.cs.uiuc.edu/node198.html
   */
  static createRandom(): Quaternion {
    let u1 = Math.random();
    let u2 = Math.random();
    let u3 = Math.random();

    let s = Math.sqrt(1 - u1);
    let t = Math.sqrt(u1);

    return new Quaternion(
      t * Math.cos(2 * Math.PI * u3),
      s * Math.sin(2 * Math.PI * u2),
      s * Math.cos(2 * Math.PI * u2),
      t * Math.sin(2 * Math.PI * u3)
    );
  }

  /**
   * Calculates the quaternion to rotate vector u onto vector v
   * @link https://raw.org/proof/quaternion-from-two-vectors/
   *
   * @param {vec3} u - The first vector.
   * @param {vec3} v - The second vector.
   */
  static createFromBetweenVectors(u: vec3, v: vec3): Quaternion {
    let ux = u[0];
    let uy = u[1];
    let uz = u[2];

    let vx = v[0];
    let vy = v[1];
    let vz = v[2];

    let uLen = Math.sqrt(ux * ux + uy * uy + uz * uz);
    let vLen = Math.sqrt(vx * vx + vy * vy + vz * vz);

    // Normalize u and v
    if (uLen > 0) ux /= uLen, uy /= uLen, uz /= uLen;
    if (vLen > 0) vx /= vLen, vy /= vLen, vz /= vLen;

    // Calculate dot product of normalized u and v
    let dot = ux * vx + uy * vy + uz * vz;

    // Parallel when dot > 0.999999
    if (dot >= 1 - EPSILON) {
      return Quaternion.ONE;
    }

    // Anti-Parallel (close to PI) when dot < -0.999999
    if (1 + dot <= EPSILON) {
      // Rotate 180° around any orthogonal vector
      // axis = len(cross([1, 0, 0], u)) == 0 ? cross([0, 1, 0], u) : cross([1, 0, 0], u) and therefore
      //    return Quaternion['fromAxisAngle'](Math.abs(ux) > Math.abs(uz) ? [-uy, ux, 0] : [0, -uz, uy], Math.PI)
      // or return Quaternion['fromAxisAngle'](Math.abs(ux) > Math.abs(uz) ? [ uy,-ux, 0] : [0,  uz,-uy], Math.PI)
      // or ...

      // Since fromAxisAngle(axis, PI) == Quaternion(0, axis).normalize(),
      if (Math.abs(ux) > Math.abs(uz)) {
        return Quaternion.createNormalized(0, -uy, ux, 0);
      } else {
        return Quaternion.createNormalized(0, 0, -uz, uy);
      }
    }

    // w = cross(u, v)
    let wx = uy * vz - uz * vy;
    let wy = uz * vx - ux * vz;
    let wz = ux * vy - uy * vx;

    // |Q| = sqrt((1.0 + dot) * 2.0)
    return Quaternion.createNormalized(1 + dot, wx, wy, wz);
  }

  /**
   * Creates quaternion by a rotation given as axis-angle orientation
   *
   * @param {Array} axis The axis around which to rotate
   * @param {number} angle The angle in radians
   * @returns {Quaternion}
   */
  static createFromAxisAngle(axis: vec3, angle: number): Quaternion {
    let a = axis[0];
    let b = axis[1];
    let c = axis[2];

    let halfAngle = angle * 0.5;
    let sin_2 = Math.sin(halfAngle);
    let cos_2 = Math.cos(halfAngle);
    let sin_norm = sin_2 / Math.sqrt(a * a + b * b + c * c);

    return new Quaternion(cos_2, a * sin_norm, b * sin_norm, c * sin_norm);
  }

  /**
   * Creates a quaternion by a rotation given by Euler angles (multiplication order from right to left)
   *
   * @param {number} φ First angle
   * @param {number} θ Second angle
   * @param {number} ψ Third angle
   * @param {string=} order Axis order (Tait Bryan)
   * @returns {Quaternion}
   */
  static createFromEuler(φ: number, θ: number, ψ: number, order: string): Quaternion {
    let _x = φ * 0.5;
    let _y = θ * 0.5;
    let _z = ψ * 0.5;

    let cX = Math.cos(_x);
    let cY = Math.cos(_y);
    let cZ = Math.cos(_z);

    let sX = Math.sin(_x);
    let sY = Math.sin(_y);
    let sZ = Math.sin(_z);

    if (order === undefined || order === 'ZXY') {
      // axisAngle([0, 0, 1], φ) * axisAngle([1, 0, 0], θ) * axisAngle([0, 1, 0], ψ)
      return new Quaternion(
        cX * cY * cZ - sX * sY * sZ,
        sY * cX * cZ - sX * sZ * cY,
        sX * sY * cZ + sZ * cX * cY,
        sX * cY * cZ + sY * sZ * cX
      );
    }

    if (order === 'XYZ' || order === 'RPY') { // roll around X, pitch around Y, yaw around Z
      // axisAngle([1, 0, 0], φ) * axisAngle([0, 1, 0], θ) * axisAngle([0, 0, 1], ψ)
      return new Quaternion(
        cX * cY * cZ - sX * sY * sZ,
        sX * cY * cZ + sY * sZ * cX,
        sY * cX * cZ - sX * sZ * cY,
        sX * sY * cZ + sZ * cX * cY
      );
    }

    if (order === 'YXZ') { // deviceorientation
      // axisAngle([0, 1, 0], φ) * axisAngle([1, 0, 0], θ) * axisAngle([0, 0, 1], ψ)
      return new Quaternion(
        sX * sY * sZ + cX * cY * cZ,
        sX * sZ * cY + sY * cX * cZ,
        sX * cY * cZ - sY * sZ * cX,
        sZ * cX * cY - sX * sY * cZ
      );
    }

    if (order === 'ZYX' || order === 'YPR') {
      // axisAngle([0, 0, 1], φ) * axisAngle([0, 1, 0], θ) * axisAngle([1, 0, 0], ψ)
      return new Quaternion(
        sX * sY * sZ + cX * cY * cZ,
        sZ * cX * cY - sX * sY * cZ,
        sX * sZ * cY + sY * cX * cZ,
        sX * cY * cZ - sY * sZ * cX
      );
    }

    if (order === 'YZX') {
      // axisAngle([0, 1, 0], φ) * axisAngle([0, 0, 1], θ) * axisAngle([1, 0, 0], ψ)
      return new Quaternion(
        cX * cY * cZ - sX * sY * sZ,
        sX * sY * cZ + sZ * cX * cY,
        sX * cY * cZ + sY * sZ * cX,
        sY * cX * cZ - sX * sZ * cY
      );
    }

    if (order === 'XZY') {
      // axisAngle([1, 0, 0], φ) * axisAngle([0, 0, 1], θ) * axisAngle([0, 1, 0], ψ)
      return new Quaternion(
        sX * sY * sZ + cX * cY * cZ,
        sX * cY * cZ - sY * sZ * cX,
        sZ * cX * cY - sX * sY * cZ,
        sX * sZ * cY + sY * cX * cZ
      );
    }

    if (order === 'ZYZ') {
      // axisAngle([0, 0, 1], φ) * axisAngle([0, 1, 0], θ) * axisAngle([0, 0, 1], ψ)
      return new Quaternion(
        cX * cY * cZ - sX * sZ * cY,
        sY * sZ * cX - sX * sY * cZ,
        sX * sY * sZ + sY * cX * cZ,
        sX * cY * cZ + sZ * cX * cY
      );
    }

    if (order === 'ZXZ') {
      // axisAngle([0, 0, 1], φ) * axisAngle([1, 0, 0], θ) * axisAngle([0, 0, 1], ψ)
      return new Quaternion(
        cX * cY * cZ - sX * sZ * cY,
        sX * sY * sZ + sY * cX * cZ,
        sX * sY * cZ - sY * sZ * cX,
        sX * cY * cZ + sZ * cX * cY
      );
    }

    if (order === 'YXY') {
      // axisAngle([0, 1, 0], φ) * axisAngle([1, 0, 0], θ) * axisAngle([0, 1, 0], ψ)
      return new Quaternion(
        cX * cY * cZ - sX * sZ * cY,
        sX * sY * sZ + sY * cX * cZ,
        sX * cY * cZ + sZ * cX * cY,
        sY * sZ * cX - sX * sY * cZ
      );
    }

    if (order === 'YZY') {
      // axisAngle([0, 1, 0], φ) * axisAngle([0, 0, 1], θ) * axisAngle([0, 1, 0], ψ)
      return new Quaternion(
        cX * cY * cZ - sX * sZ * cY,
        sX * sY * cZ - sY * sZ * cX,
        sX * cY * cZ + sZ * cX * cY,
        sX * sY * sZ + sY * cX * cZ
      );
    }

    if (order === 'XYX') {
      // axisAngle([1, 0, 0], φ) * axisAngle([0, 1, 0], θ) * axisAngle([1, 0, 0], ψ)
      return new Quaternion(
        cX * cY * cZ - sX * sZ * cY,
        sX * cY * cZ + sZ * cX * cY,
        sX * sY * sZ + sY * cX * cZ,
        sX * sY * cZ - sY * sZ * cX
      );
    }

    if (order === 'XZX') {
      // axisAngle([1, 0, 0], φ) * axisAngle([0, 0, 1], θ) * axisAngle([1, 0, 0], ψ)
      return new Quaternion(
        cX * cY * cZ - sX * sZ * cY,
        sX * cY * cZ + sZ * cX * cY,
        sY * sZ * cX - sX * sY * cZ,
        sX * sY * sZ + sY * cX * cZ
      );
    }

    return new Quaternion();
  }

  /**
   * Creates a quaternion by a rotation matrix
   *
   * @param {mat3} matrix - The matrix.
   * @returns {Quaternion}
   */
  static createFromMatrix(matrix: mat3): Quaternion {
    let m00 = matrix[0];
    let m01 = matrix[1];
    let m02 = matrix[2];

    let m10 = matrix[3];
    let m11 = matrix[4];
    let m12 = matrix[5];

    let m20 = matrix[6];
    let m21 = matrix[7];
    let m22 = matrix[8];

    let tr = m00 + m11 + m22; // 2 * w = sqrt(1 + tr)

    // Choose the element with the biggest value on the diagonal
    if (tr > 0) { // if trace is positive then "w" is biggest component
      // |Q| = 2 * sqrt(1 + tr) = 4w
      return Quaternion.createNormalized(tr + 1.0, m21 - m12, m02 - m20, m10 - m01);
    }
    else if (m00 > m11 && m00 > m22) {
      // |Q| = 2 * sqrt(1.0 + m00 - m11 - m22) = 4x
      return Quaternion.createNormalized(m21 - m12, 1.0 + m00 - m11 - m22, m01 + m10, m02 + m20);
    }
    else if (m11 > m22) {
      // |Q| = 2 * sqrt(1.0 + m11 - m00 - m22) = 4y
      return Quaternion.createNormalized(m02 - m20, m01 + m10, 1.0 + m11 - m00 - m22, m12 + m21);
    }
    else {
      // |Q| = 2 * sqrt(1.0 + m22 - m00 - m11) = 4z
      return Quaternion.createNormalized(m10 - m01, m02 + m20, m12 + m21, 1.0 + m22 - m00 - m11);
    }
  }

  /**
   * Creates a quaternion from a lookat direction
   *
   * @param {vec3} lookAt - The lookAt direction vector.
   * @param {vec3} up - The up vector.
   * @returns {Quaternion}
   */
  static createFromLookAt(lookAt: vec3, up: vec3 = UT.VEC3_UP): Quaternion {
    const axeZ = UT.VEC3_NORMALIZE([-lookAt[0], -lookAt[1], -lookAt[2]]);
    const axeX = UT.VEC3_CROSS(up, axeZ);
    const axeY = UT.VEC3_CROSS(axeZ, axeX);

    return Quaternion.createFromMatrix([
      axeX[0], axeX[1], axeX[2],
      axeY[0], axeY[1], axeY[2],
      axeZ[0], axeZ[1], axeZ[2]
    ]);
  }

  /**
   * Rotates a quaternion by the given angle about the X axis
   *
   * @param {number} rad angle (in radians) to rotate
   * @returns {Quaternion}
   */
  rotateX(rad: number): Quaternion {
    rad *= 0.5;
    let bx = Math.sin(rad);
    let bw = Math.cos(rad);

    return new Quaternion(
      this.w * bw - this.x * bx,
      this.x * bw + this.w * bx,
      this.y * bw + this.z * bx,
      this.z * bw - this.y * bx
    );
  }

  /**
   * Rotates a quaternion by the given angle about the Y axis
   *
   * @param {quat} out quat receiving operation result
   * @param {ReadonlyQuat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */
  rotateY(rad: number): Quaternion {
    rad *= 0.5;
    let by = Math.sin(rad);
    let bw = Math.cos(rad);

    return new Quaternion(
      this.w * bw - this.y * by,
      this.x * bw - this.z * by,
      this.y * bw + this.w * by,
      this.z * bw + this.x * by
    );
  }

  /**
   * Rotates a quaternion by the given angle about the Z axis
   *
   * @param {quat} out quat receiving operation result
   * @param {ReadonlyQuat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */
  rotateZ(rad: number): Quaternion {
    rad *= 0.5;
    let bz = Math.sin(rad);
    let bw = Math.cos(rad);

    return new Quaternion(
      this.w * bw - this.z * bz,
      this.x * bw + this.y * bz,
      this.y * bw - this.x * bz,
      this.z * bw + this.w * bz
    );
  }

  /**
   * Adds two quaternions Q1 and Q2
   *
   * @param {number|Object|string} w real
   * @param {number=} x imag
   * @param {number=} y imag
   * @param {number=} z imag
   * @returns {Quaternion}
   */
  add(w: number, x: number, y: number, z: number): Quaternion {
    return new Quaternion(this.w + w, this.x + x, this.y + y, this.z + z);
  }

  /**
   * Subtracts a quaternions Q2 from Q1
   *
   * @param {number|Object|string} w real
   * @param {number=} x imag
   * @param {number=} y imag
   * @param {number=} z imag
   * @returns {Quaternion}
   */
  sub(w: number, x: number, y: number, z: number): Quaternion {
    return new Quaternion(this.w - w, this.x - x, this.y - y, this.z - z);
  }

  /**
   * Calculates the additive inverse, or simply it negates the quaternion
   *
   * @returns {Quaternion}
   */
  neg(): Quaternion {
    return new Quaternion(-this.w, -this.x, -this.y, -this.z);
  }

  /**
   * Calculates the length/modulus/magnitude or the norm of a quaternion
   *
   * @returns {number}
   */
  norm(): number {
    return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * Calculates the squared length/modulus/magnitude or the norm of a quaternion
   *
   * @returns {number}
   */
  normSq(): number {
    return this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
  }

  /**
   * Normalizes the quaternion to have |Q| = 1 as long as the norm is not zero
   * Alternative names are the signum, unit or versor
   *
   * @returns {Quaternion}
   */
  normalize(): Quaternion {
    let norm = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
    if (norm < EPSILON) {
      return Quaternion.ZERO;
    }

    norm = 1 / norm;
    return new Quaternion(this.w * norm, this.x * norm, this.y * norm, this.z * norm);
  }

  /**
   * Calculates the Hamilton product of two quaternions
   * Leaving out the imaginary part results in just scaling the quat
   *
   * @param {number|Object|string} w real
   * @param {number=} x imag
   * @param {number=} y imag
   * @param {number=} z imag
   * @returns {Quaternion}
   */
  mul(w: number, x: number, y: number, z: number): Quaternion {
    return new Quaternion(
      this.w * w - this.x * x - this.y * y - this.z * z,
      this.w * x + this.x * w + this.y * z - this.z * y,
      this.w * y + this.y * w + this.z * x - this.x * z,
      this.w * z + this.z * w + this.x * y - this.y * x
    );
  }

  /**
   * Scales a quaternion by a scalar, faster than using multiplication
   *
   * @param {number} s scaling factor
   * @returns {Quaternion}
   */
  scale(s: number): Quaternion {
    return new Quaternion(
      this.w * s,
      this.x * s,
      this.y * s,
      this.z * s
    );
  }

  /**
   * Calculates the dot product of two quaternions
   *
   * @param {number|Object|string} w real
   * @param {number=} x imag
   * @param {number=} y imag
   * @param {number=} z imag
   * @returns {number}
   */
  dot(w: number, x: number, y: number, z: number): number {
    return this.w * w + this.x * x + this.y * y + this.z * z;
  }

  /**
   * Calculates the inverse of a quat for non-normalized quats such that
   * Q^-1 * Q = 1 and Q * Q^-1 = 1
   *
   * @returns {Quaternion}
   */
  inverse(): Quaternion {
    let normSq = this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
    if (normSq === 0) {
      return Quaternion.ZERO;
    }

    normSq = 1 / normSq;
    return new Quaternion(this.w * normSq, -this.x * normSq, -this.y * normSq, -this.z * normSq);
  }

  /**
   * Multiplies a quaternion with the inverse of a second quaternion
   *
   * @param {number|Object|string} w real
   * @param {number=} x imag
   * @param {number=} y imag
   * @param {number=} z imag
   * @returns {Quaternion}
   */
  div(w: number, x: number, y: number, z: number): Quaternion {
    var normSq = w * w + x * x + y * y + z * z;
    if (normSq === 0) {
      return Quaternion.ZERO;
    }

    normSq = 1 / normSq;

    return new Quaternion(
      (this.w * w + this.x * x + this.y * y + this.z * z) * normSq,
      (this.x * w - this.w * x - this.y * z + this.z * y) * normSq,
      (this.y * w - this.w * y - this.z * x + this.x * z) * normSq,
      (this.z * w - this.w * z - this.x * y + this.y * x) * normSq
    );
  }

  /**
   * Calculates the conjugate of a quaternion
   *
   * @returns {Quaternion}
   */
  conjugate(): Quaternion {
    return new Quaternion(this.w, -this.x, -this.y, -this.z);
  }

  /**
   * Calculates the natural exponentiation of the quaternion
   *
   * @returns {Quaternion}
   */
  exp(): Quaternion {
    let vNorm = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    let wExp = Math.exp(this.w);
    let scale = wExp * Math.sin(vNorm) / vNorm;

    if (vNorm === 0) {
      return new Quaternion(wExp, 0, 0, 0);
    }

    return new Quaternion(
      wExp * Math.cos(vNorm),
      this.x * scale,
      this.y * scale,
      this.z * scale
    );
  }

  /**
   * Calculates the natural logarithm of the quaternion
   *
   * @returns {Quaternion}
   */
  log(): Quaternion {
    if (this.y === 0 && this.z === 0) {
      return new Quaternion(
        LOG_HYPOT(this.w, this.x),
        Math.atan2(this.x, this.w), 0, 0
      );
    }

    let qNorm2 = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    let vNorm = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    let scale = Math.atan2(vNorm, this.w) / vNorm;

    return new Quaternion(
      Math.log(qNorm2) * 0.5,
      this.x * scale,
      this.y * scale,
      this.z * scale
    );
  }

  /**
   * Checks if two quats are the same
   *
   * @param {number|Object|string} w real
   * @param {number=} x imag
   * @param {number=} y imag
   * @param {number=} z imag
   * @returns {boolean}
   */
  equals(w: number, x: number, y: number, z: number): boolean {
    return Math.abs(w - this.w) < EPSILON &&
    Math.abs(x - this.x) < EPSILON &&
    Math.abs(y - this.y) < EPSILON &&
    Math.abs(z - this.z) < EPSILON;
  }

  /**
   * Checks if all parts of a quaternion are finite
   *
   * @returns {boolean}
   */
  isFinite(): boolean {
    return isFinite(this.w) && isFinite(this.x) && isFinite(this.y) && isFinite(this.z);
  }

  /**
   * Checks if any of the parts of the quaternion is not a number
   *
   * @returns {boolean}
   */
  isNaN(): boolean {
    return isNaN(this.w) || isNaN(this.x) || isNaN(this.y) || isNaN(this.z);
  }

  /**
   * Returns the real part of the quaternion
   *
   * @returns {number}
   */
  real(): number {
    return this.w;
  }

  /**
   * Returns the imaginary part of the quaternion as a 3D vector / array
   *
   * @returns {vec3}
   */
  imag(): vec3 {
    return [this.x, this.y, this.z];
  }

  /**
   * Gets the actual quaternion as a 4D vector / array
   *
   * @returns {vec4}
   */
  toVector(): vec4 {
    return [this.w, this.x, this.y, this.z];
  }

  /**
   * Calculates the 3x3 rotation matrix for the current quat
   */
  toMatrix(): mat3 {
    let wx = this.w * this.x, wy = this.w * this.y, wz = this.w * this.z;
    let xx = this.x * this.x, xy = this.x * this.y, xz = this.x * this.z;
    let yy = this.y * this.y, yz = this.y * this.z, zz = this.z * this.z;

    return [
      1 - 2 * (yy + zz), 2 * (xy - wz), 2 * (xz + wy),
      2 * (xy + wz), 1 - 2 * (xx + zz), 2 * (yz - wx),
      2 * (xz - wy), 2 * (yz + wx), 1 - 2 * (xx + yy)
    ];
  }

  /**
   * Calculates the homogeneous 4x4 rotation matrix for the current quat
   */
  toMatrix4(): mat4 {
    var wx = this.w * this.x, wy = this.w * this.y, wz = this.w * this.z;
    var xx = this.x * this.x, xy = this.x * this.y, xz = this.x * this.z;
    var yy = this.y * this.y, yz = this.y * this.z, zz = this.z * this.z;

    return [
      1 - 2 * (yy + zz), 2 * (xy - wz), 2 * (xz + wy), 0,
      2 * (xy + wz), 1 - 2 * (xx + zz), 2 * (yz - wx), 0,
      2 * (xz - wy), 2 * (yz + wx), 1 - 2 * (xx + yy), 0,
      0, 0, 0, 1
    ];
  }

  /**
   * Determines the homogeneous rotation matrix string used for CSS 3D transforms
   *
   * @returns {string}
   */
  toCSSTransform(): string {
    let angle = 2 * Math.acos(this.w);
    let sin2 = 1 - this.w * this.w;

    if (sin2 < EPSILON) {
      angle = 0;
      sin2 = 1;
    }
    else {
      sin2 = 1 / Math.sqrt(sin2);
    }

    return `rotate3d(${this.x * sin2}, ${this.y * sin2}, ${this.z * sin2}, ${angle}rad)`;
  }

  /**
   * Calculates the axis and angle representation of the quaternion
   *
   * @returns {Array}
   */
  toAxisAngle(): Array<any> {
    let sin2 = 1 - this.w * this.w; // sin(angle / 2) = sin(acos(w)) = sqrt(1 - w^2) = |v|, since 1 = dot(Q) <=> dot(v) = 1 - w^2
    if (sin2 < EPSILON) { // Alternatively |v| == 0
      // If the sine is close to 0, we're close to the unit quaternion and the direction does not matter
      return [[this.x, this.y, this.z], 0]; // or [[1, 0, 0], 0] ?  or [[0, 0, 0], 0] ?
    }

    let isin = 1 / Math.sqrt(sin2);
    let angle = 2 * Math.acos(this.w); // Alternatively: 2 * atan2(|v|, w)      
    return [[this.x * isin, this.y * isin, this.z * isin], angle];
  }

  /**
   * Clones the actual object
   *
   * @returns {Quaternion}
   */
  clone(): Quaternion {
    return new Quaternion(this.w, this.x, this.y, this.z);
  }

  /**
   * Rotates a vector according to the current quaternion, assumes |q|=1
   * @link https://raw.org/proof/vector-rotation-using-quaternions/
   *
   * @param {Array} v The vector to be rotated
   * @returns {Array}
   */
  rotateVector(v: vec3): vec3 {
    // t = 2q x v
    var tx = 2 * (this.y * v[2] - this.z * v[1]);
    var ty = 2 * (this.z * v[0] - this.x * v[2]);
    var tz = 2 * (this.x * v[1] - this.y * v[0]);

    // v + w t + q x t
    return [
      v[0] + this.w * tx + this.y * tz - this.z * ty,
      v[1] + this.w * ty + this.z * tx - this.x * tz,
      v[2] + this.w * tz + this.x * ty - this.y * tx
    ];
  }

  /**
   * Gets a function to spherically interpolate between two quaternions
   * 
   * @param {number} w - real
   * @param {number} x - imag
   * @param {number} y - imag
   * @param {number} z - imag
   * @returns Function
   */
  slerp(w: number, x: number, y: number, z: number): Function {
    let w1 = this.w;
    let x1 = this.x;
    let y1 = this.y;
    let z1 = this.z;

    var cosTheta0 = w1 * w + x1 * x + y1 * y + z1 * z;
    if (cosTheta0 < 0) {
      w1 = -w1;
      x1 = -x1;
      y1 = -y1;
      z1 = -z1;
      cosTheta0 = -cosTheta0;
    }

    if (cosTheta0 >= 1 - EPSILON) {
      return function(t: number) {
        return Quaternion.createNormalized(
          w1 + t * (w - w1),
          x1 + t * (x - x1),
          y1 + t * (y - y1),
          z1 + t * (z - z1)
        );
      };
    }

    var Theta0 = Math.acos(cosTheta0);
    var sinTheta0 = Math.sin(Theta0);

    return function(t: number) {
      let Theta = Theta0 * t;
      let sinTheta = Math.sin(Theta);
      let cosTheta = Math.cos(Theta);

      let s0 = cosTheta - cosTheta0 * sinTheta / sinTheta0;
      let s1 = sinTheta / sinTheta0;

      return new Quaternion(
        s0 * w1 + s1 * w,
        s0 * x1 + s1 * x,
        s0 * y1 + s1 * y,
        s0 * z1 + s1 * z
      );
    }
  }
}

export { Quaternion };

function LOG_HYPOT(a: number, b: number) {
  var _a = Math.abs(a);
  var _b = Math.abs(b);

  if (a === 0) {
    return Math.log(_b);
  }

  if (b === 0) {
    return Math.log(_a);
  }

  if (_a < 3000 && _b < 3000) {
    return 0.5 * Math.log(a * a + b * b);
  }

  a = a / 2;
  b = b / 2;

  return 0.5 * Math.log(a * a + b * b) + Math.LN2;
}