# Quaternion

A quaternion.
This class is a fork from Quaternion.js.
Thanks to
## Constructors
* **new Quaternion**(w: number, x: number, y: number, z: number): Quaternion   
  * **w**: real
  * **x**: imag
  * **y**: imag
  * **z**: imag
## Methods
* **add**(w: number, x: number, y: number, z: number): Quaternion   
  * **w**: real
  * **x**: imag
  * **y**: imag
  * **z**: imag
* **clone**(): Quaternion   
* **conjugate**(): Quaternion   
* **div**(w: number, x: number, y: number, z: number): Quaternion   
  * **w**: real
  * **x**: imag
  * **y**: imag
  * **z**: imag
* **dot**(w: number, x: number, y: number, z: number): number   
  * **w**: real
  * **x**: imag
  * **y**: imag
  * **z**: imag
* **equals**(w: number, x: number, y: number, z: number): boolean   
  * **w**: real
  * **x**: imag
  * **y**: imag
  * **z**: imag
* **exp**(): Quaternion   
* **imag**(): vec3   
* **inverse**(): Quaternion   
* **isFinite**(): boolean   
* **isNaN**(): boolean   
* **log**(): Quaternion   
* **mul**(w: number, x: number, y: number, z: number): Quaternion   
  * **w**: real
  * **x**: imag
  * **y**: imag
  * **z**: imag
* **neg**(): Quaternion   
* **norm**(): number   
* **normSq**(): number   
* **normalize**(): Quaternion   
* **real**(): number   
* **rotateVector**(v: vec3): vec3   
  * **v**: The vector to be rotated
* **rotateX**(rad: number): Quaternion   
  * **rad**: angle (in radians) to rotate
* **rotateY**(rad: number): Quaternion   
  * **rad**: angle (in radians) to rotate
* **rotateZ**(rad: number): Quaternion   
  * **rad**: angle (in radians) to rotate
* **scale**(s: number): Quaternion   
  * **s**: scaling factor
* **slerp**(w: number, x: number, y: number, z: number): Function   
  * **w**: real
  * **x**: imag
  * **y**: imag
  * **z**: imag
* **sub**(w: number, x: number, y: number, z: number): Quaternion   
  * **w**: real
  * **x**: imag
  * **y**: imag
  * **z**: imag
* **toAxisAngle**()   
* **toCSSTransform**(): string   
* **toMatrix**(): mat3   
* **toMatrix4**(): mat4   
* **toVector**(): vec4   
* *static* **createFromAxisAngle**(axis: vec3, angle: number): Quaternion   
  * **axis**: The axis around which to rotate
  * **angle**: The angle in radians
* *static* **createFromBetweenVectors**(u: vec3, v: vec3): Quaternion   
  * **u**: The first vector.
  * **v**: The second vector.
* *static* **createFromEuler**(φ: number, θ: number, ψ: number, order: string): Quaternion   
  * **φ**: First angle
  * **θ**: Second angle
  * **ψ**: Third angle
  * **order**: Axis order (Tait Bryan)
* *static* **createFromLookAt**(lookAt: vec3, up: vec3): Quaternion   
  * **lookAt**: The lookAt direction vector.
  * **up**: The up vector.
* *static* **createFromMatrix**(matrix: mat3): Quaternion   
  * **matrix**: The matrix.
* *static* **createNormalized**(w: number, x: number, y: number, z: number): Quaternion   
  * **w**: real
  * **x**: imag
  * **y**: imag
  * **z**: imag
* *static* **createRandom**(): Quaternion   
