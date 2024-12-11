# Tween

Generic values interpolator.
## Constructors
* **new Tween**(times: number[], values: T[], defaultFn: Function, fns: Function[]): Tween   
  * **times**: Times intervals.
  * **values**: Values that will be associated with each time values.
  * **defaultFn**: The interpolate function that will be used as a fallback if none of the functions in the `fns` array match the given time.
  * **fns**: Interpolate functions that will be associated with each time values.
## Methods
* **get**(index: number): number   
  * **index**
* **getCurrentValue**(): T   
* **interpolate**(t: number): T   
  * **t**: The elapsed time.
* **isEmpty**(): boolean   
* **setLooped**(looped: boolean): void   
  * **looped**: The loop flag.
* **update**(ts: number): void   
  * **ts**: The timestep.
