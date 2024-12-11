# CurveInterpolator

Cubic curve interpolator
## Constructors
* **new CurveInterpolator**(points: Vector[], options: CurveInterpolatorOptions): default   
  * **points**: control points
  * **options**: curve interpolator options
## Methods
* **createLookupTable**(func, samples: number, options): Map   
  * **func**: function generating lookup table value
  * **samples**: number of samples (segments)
  * **options**: object of { from, to, cacheKey } - if cacheKey is included, the map will be stored in the internal cache
* **forEach**(func, samples, from: number, to: number): void   
  * **func**: callback function
  * **samples**: number of (evenly spaced) samples OR an array of user specified positions (u)
  * **from**: from position
  * **to**: to position
* **getBoundingBox**(from: number, to: number): BBox   
  * **from**: position from
  * **to**: position to
* **getCurvatureAt**(position: number)   
  * **position**: position on curve (0 - 1)
* **getCurvatureAtTime**(t: number)   
  * **t**: time (t) along curve (0 - 1)
* **getDerivativeAt**(position: number, target: T): T   
  * **position**: position on curve (0 - 1)
  * **target**: optional target
* **getFrenetFrames**(segments: number, from: number, to: number)   
  * **segments**: number of samples (segments) along the curve (will return segments + 1 frames)
  * **from**: position from
  * **to**: position to
* **getIntersects**(v: number, axis: number, max: number, margin: number)   
  * **v**: lookup value
  * **axis**: index of axis [0=x, 1=y, 2=z ...]
  * **max**: max solutions (i.e. 0=all, 1=first along curve, -1=last along curve)
  * **margin**
* **getIntersectsAsPositions**(v: number, axis: number, max: number, margin: number)   
  * **v**: lookup value
  * **axis**: index of axis [0=x, 1=y, 2=z ...]
  * **max**: max solutions (i.e. 0=all, 1=first along curve, -1=last along curve)
  * **margin**
* **getIntersectsAsTime**(v: number, axis: number, max: number, margin: number)   
  * **v**: lookup value
  * **axis**: index of axis [0=x, 1=y, 2=z ...]
  * **max**: max solutions (i.e. 0=all, 1=first along curve, -1=last along curve)
  * **margin**
* **getLengthAt**(position: number, clampInput: boolean): number   
  * **position**: position on curve (0..1)
  * **clampInput**
* **getNearestPosition**(point: Vector, threshold: number, samples: number)   
  * **point**: Vector
  * **threshold**: Precision
  * **samples**
* **getNormalAt**(position: number, target: T): T   
  * **position**: position on curve (0 - 1)
  * **target**: optional target
* **getNormalAtTime**(t: number, target: T): T   
  * **t**: time at curve (0 - 1)
  * **target**: optional target
* **getPointAt**(position: number, target: T): T   
  * **position**: position on curve (0..1)
  * **target**: optional target
* **getPointAtTime**(t: number, target: VectorType): Vector   
  * **t**: time along full curve (encodes segment index and segment t)
  * **target**: optional target vector
* **getPoints**(segments: number, returnType)   
  * **segments**: number of samples (segments)
  * **returnType**: optional return type
* **getPositionAtKnot**(index: number): number   
  * **index**: index of knot (control/input point)
* **getPositionFromLength**(length: number, clampInput: boolean): number   
  * **length**
  * **clampInput**: whether the input value should be clamped to a valid range or not
* **getPositionFromTime**(t: number, clampInput: boolean): number   
  * **t**: time on curve (0..1)
  * **clampInput**: whether the input value should be clamped to a valid range or not
* **getSecondDerivativeAt**(position: number, target: T): T   
  * **position**: position on curve (0 - 1)
  * **target**: optional target
* **getTangentAt**(position: number, target: T): T   
  * **position**: position on curve (0 - 1)
  * **target**: optional target
* **getTangentAtTime**(t: number, target: T): T   
  * **t**: time at curve (0 - 1)
  * **target**: optional target
* **getTimeAtKnot**(index: number): number   
  * **index**: index of knot (control/input point)
* **getTimeFromPosition**(position: number, clampInput: boolean): number   
  * **position**: position on curve (0..1)
  * **clampInput**: whether the input value should be clamped to a valid range or not
* **map**(func, samples, from: number, to: number)   
  * **func**: mapping function
  * **samples**: number of (evenly spaced) samples OR an array of user specified positions (u)
  * **from**: from position
  * **to**: to position
* **reduce**(func, initialValue: T, samples, from: number, to: number): T   
  * **func**: reduce function
  * **initialValue**: initial accumulator value
  * **samples**: number of (evenly spaced) samples OR an array of user specified positions (u)
  * **from**: from position
  * **to**: to position
* **reset**(): void   
