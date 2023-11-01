import { UT } from './utils';

/**
 * The `TweenAbstract` class is generic class that provides methods for interpolating values based
 * on given times and values.
 * @typeParam T - The interpolate value type.
 */
class TweenAbstract<T> {
  times: Array<number>;
  values: Array<T>;
  fns: Array<Function>;
  defaultFn: Function;

  /**
   * The constructor.
   * @param times - The `times` parameter is an array of numbers. It represents the time values for each
   * corresponding value in the `values` array.
   * @param values - The `values` parameter is an array of values of type `T`. It represents the values
   * that will be associated with each time in the `times` array.
   * @param {Function} defaultFn - The `defaultFn` parameter is the default interpolate function that will be used as a
   * fallback if none of the functions in the `fns` array match the given time.
   * @param fns - The `fns` parameter is an optional array of interpolate functions.
   */
  constructor(times: Array<number>, values: Array<T>, defaultFn: Function, fns: Array<Function> = []) {
    this.times = times;
    this.values = values;
    this.fns = fns;
    this.defaultFn = defaultFn;
  }

  /**
   * The "interpolate" function takes a time value and returns the interpolated value based on the given
   * times and values.
   * @param {number} t - t is a number representing the time at which we want to interpolate a value.
   * @returns The method is returing a value of type T.
   */
  interpolate(t: number): T {
    let i = 0;
    let n = this.times.length;

    while (i < n && t > this.times[i]) i++;
    if (i == 0) return this.values[0];
    if (i == n) return this.values[n - 1];

    const beginValue = this.values[i - 1];
    const endValue = this.values[i];
    const currentT = t - this.times[i - 1];
    const currentDuration = this.times[i] - this.times[i - 1];

    if (this.fns[i]) {
      return this.fns[i](currentT, beginValue, endValue, currentDuration);
    }

    return this.defaultFn(currentT, beginValue, endValue, currentDuration);
  }

  /**
   * The "isEmpty" function checks if the `times` and `values` arrays are empty and returns a boolean value.
   * @returns A boolean value indicate is it is empty or not.
   */
  isEmpty(): boolean {
    return this.times.length == 0 || this.values.length == 0;
  }
}

/**
 * The `TweenNumber` class is a shortcut subclass of "TweenAbstract" that handles tweening of number values using
 * linear interpolation.
 */
class TweenNumber extends TweenAbstract<number> {
  constructor(times: Array<number> = [], values: Array<number> = []) {
    super(times, values, UT.LINEAR);
  }
}

/**
 * The `TweenVEC2` class is a shortcut subclass of "TweenAbstract" that handles tweening of vec2 values using
 * linear interpolation.
 */
class TweenVEC2 extends TweenAbstract<vec2> {
  constructor(times: Array<number> = [], values: Array<vec2> = []) {
    super(times, values, UT.LINEAR_VEC2);
  }
}

/**
 * The `TweenVEC3` class is a shortcut subclass of "TweenAbstract" that handles tweening of vec3 values using
 * linear interpolation.
 */
class TweenVEC3 extends TweenAbstract<vec3> {
  constructor(times: Array<number> = [], values: Array<vec3> = []) {
    super(times, values, UT.LINEAR_VEC3);
  }
}

export { TweenNumber, TweenVEC2, TweenVEC3 };