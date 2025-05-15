declare let ZERO: Quaternion;
declare let ONE: Quaternion;
/**
 * A quaternion.
 * This class is a fork from Quaternion.js.
 * Thanks to @rawify for his incredible work: https://github.com/rawify/Quaternion.js
 */
declare class Quaternion {
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
    constructor(w?: number, x?: number, y?: number, z?: number);
    /**
     * Creates a new normalized Quaternion object
     *
     * @param {number} w - real
     * @param {number} x - imag
     * @param {number} y - imag
     * @param {number} z - imag
     * @returns
     */
    static createNormalized(w: number, x: number, y: number, z: number): Quaternion;
    /**
     * Gets a spherical random number
     * @link http://planning.cs.uiuc.edu/node198.html
     */
    static createRandom(): Quaternion;
    /**
     * Calculates the quaternion to rotate vector u onto vector v
     * @link https://raw.org/proof/quaternion-from-two-vectors/
     *
     * @param {vec3} u - The first vector.
     * @param {vec3} v - The second vector.
     */
    static createFromBetweenVectors(u: vec3, v: vec3): Quaternion;
    /**
     * Creates quaternion by a rotation given as axis-angle orientation
     *
     * @param {Array} axis The axis around which to rotate
     * @param {number} angle The angle in radians
     * @returns {Quaternion}
     */
    static createFromAxisAngle(axis: vec3, angle: number): Quaternion;
    /**
     * Creates a quaternion by a rotation given by Euler angles (multiplication order from right to left)
     *
     * @param {number} f First angle
     * @param {number} s Second angle
     * @param {number} t Third angle
     * @param {string=} order Axis order (Tait Bryan)
     * @returns {Quaternion}
     */
    static createFromEuler(f: number, s: number, t: number, order: string): Quaternion;
    /**
     * Creates a quaternion by a rotation matrix
     *
     * @param {mat3} matrix - The matrix.
     * @returns {Quaternion}
     */
    static createFromMatrix(matrix: mat3): Quaternion;
    /**
     * Creates a quaternion from a lookat direction
     *
     * @param {vec3} lookAt - The lookAt direction vector.
     * @param {vec3} up - The up vector.
     * @returns {Quaternion}
     */
    static createFromLookAt(lookAt: vec3, up?: vec3): Quaternion;
    /**
     * Rotates a quaternion by the given angle about the X axis
     *
     * @param {number} rad angle (in radians) to rotate
     * @returns {Quaternion}
     */
    rotateX(rad: number): Quaternion;
    /**
     * Rotates a quaternion by the given angle about the Y axis
     *
     * @param {quat} out quat receiving operation result
     * @param {ReadonlyQuat} a quat to rotate
     * @param {number} rad angle (in radians) to rotate
     * @returns {quat} out
     */
    rotateY(rad: number): Quaternion;
    /**
     * Rotates a quaternion by the given angle about the Z axis
     *
     * @param {quat} out quat receiving operation result
     * @param {ReadonlyQuat} a quat to rotate
     * @param {number} rad angle (in radians) to rotate
     * @returns {quat} out
     */
    rotateZ(rad: number): Quaternion;
    /**
     * Adds two quaternions Q1 and Q2
     *
     * @param {number|Object|string} w real
     * @param {number=} x imag
     * @param {number=} y imag
     * @param {number=} z imag
     * @returns {Quaternion}
     */
    add(w: number, x: number, y: number, z: number): Quaternion;
    /**
     * Subtracts a quaternions Q2 from Q1
     *
     * @param {number|Object|string} w real
     * @param {number=} x imag
     * @param {number=} y imag
     * @param {number=} z imag
     * @returns {Quaternion}
     */
    sub(w: number, x: number, y: number, z: number): Quaternion;
    /**
     * Calculates the additive inverse, or simply it negates the quaternion
     *
     * @returns {Quaternion}
     */
    neg(): Quaternion;
    /**
     * Calculates the length/modulus/magnitude or the norm of a quaternion
     *
     * @returns {number}
     */
    norm(): number;
    /**
     * Calculates the squared length/modulus/magnitude or the norm of a quaternion
     *
     * @returns {number}
     */
    normSq(): number;
    /**
     * Normalizes the quaternion to have |Q| = 1 as long as the norm is not zero
     * Alternative names are the signum, unit or versor
     *
     * @returns {Quaternion}
     */
    normalize(): Quaternion;
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
    mul(w: number, x: number, y: number, z: number): Quaternion;
    /**
     * Scales a quaternion by a scalar, faster than using multiplication
     *
     * @param {number} s scaling factor
     * @returns {Quaternion}
     */
    scale(s: number): Quaternion;
    /**
     * Calculates the dot product of two quaternions
     *
     * @param {number|Object|string} w real
     * @param {number=} x imag
     * @param {number=} y imag
     * @param {number=} z imag
     * @returns {number}
     */
    dot(w: number, x: number, y: number, z: number): number;
    /**
     * Calculates the inverse of a quat for non-normalized quats such that
     * Q^-1 * Q = 1 and Q * Q^-1 = 1
     *
     * @returns {Quaternion}
     */
    inverse(): Quaternion;
    /**
     * Multiplies a quaternion with the inverse of a second quaternion
     *
     * @param {number|Object|string} w real
     * @param {number=} x imag
     * @param {number=} y imag
     * @param {number=} z imag
     * @returns {Quaternion}
     */
    div(w: number, x: number, y: number, z: number): Quaternion;
    /**
     * Calculates the conjugate of a quaternion
     *
     * @returns {Quaternion}
     */
    conjugate(): Quaternion;
    /**
     * Calculates the natural exponentiation of the quaternion
     *
     * @returns {Quaternion}
     */
    exp(): Quaternion;
    /**
     * Calculates the natural logarithm of the quaternion
     *
     * @returns {Quaternion}
     */
    log(): Quaternion;
    /**
     * Checks if two quats are the same
     *
     * @param {number|Object|string} w real
     * @param {number=} x imag
     * @param {number=} y imag
     * @param {number=} z imag
     * @returns {boolean}
     */
    equals(w: number, x: number, y: number, z: number): boolean;
    /**
     * Checks if all parts of a quaternion are finite
     *
     * @returns {boolean}
     */
    isFinite(): boolean;
    /**
     * Checks if any of the parts of the quaternion is not a number
     *
     * @returns {boolean}
     */
    isNaN(): boolean;
    /**
     * Returns the real part of the quaternion
     *
     * @returns {number}
     */
    real(): number;
    /**
     * Returns the imaginary part of the quaternion as a 3D vector / array
     *
     * @returns {vec3}
     */
    imag(): vec3;
    /**
     * Gets the actual quaternion as a 4D vector / array
     *
     * @returns {vec4}
     */
    toVector(): vec4;
    /**
     * Calculates the 3x3 rotation matrix for the current quat
     */
    toMatrix(): mat3;
    /**
     * Calculates the homogeneous 4x4 rotation matrix for the current quat
     */
    toMatrix4(): mat4;
    /**
     * Determines the homogeneous rotation matrix string used for CSS 3D transforms
     *
     * @returns {string}
     */
    toCSSTransform(): string;
    /**
     * Calculates the axis and angle representation of the quaternion
     *
     * @returns {Array}
     */
    toAxisAngle(): Array<any>;
    /**
     * Clones the actual object
     *
     * @returns {Quaternion}
     */
    clone(): Quaternion;
    /**
     * Rotates a vector according to the current quaternion, assumes |q|=1
     * @link https://raw.org/proof/vector-rotation-using-quaternions/
     *
     * @param {Array} v The vector to be rotated
     * @returns {Array}
     */
    rotateVector(v: vec3): vec3;
    /**
     * Gets a function to spherically interpolate between two quaternions
     *
     * @param {number} w - real
     * @param {number} x - imag
     * @param {number} y - imag
     * @param {number} z - imag
     * @returns Function
     */
    slerp(w: number, x: number, y: number, z: number): Function;
}
export { Quaternion, ZERO, ONE };
