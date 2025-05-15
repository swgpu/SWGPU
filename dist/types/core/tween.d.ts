/**
 * Generic values interpolator.
 * @typeParam T - The interpolate value type as a number or array of numbers.
 */
declare class Tween<T> {
    times: Array<number>;
    values: Array<T>;
    fns: Array<Function>;
    defaultFn: Function;
    timeElapsed: number;
    looped: boolean;
    currentValue: T;
    /**
     * @param {Array<number>} times - Times intervals.
     * @param {Array<T>} values - Values that will be associated with each time values.
     * @param {Function} defaultFn - The interpolate function that will be used as a fallback if none of the functions in the `fns` array match the given time.
     * @param {Array<Function>} fns - Interpolate functions that will be associated with each time values.
     */
    constructor(times?: Array<number>, values?: Array<T>, defaultFn?: Function, fns?: Array<Function>);
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Returns the interpolated value based on the given times and values.
     *
     * @param {number} t - The elapsed time.
     */
    interpolate(t: number): T;
    /**
     * Set the animation in loop.
     *
     * @param {boolean} looped - The loop flag.
     */
    setLooped(looped: boolean): void;
    /**
     * Returns the current interpolated value.
     */
    getCurrentValue(): T;
    /**
     * Returns the current interpolated value at specific array index.
     */
    get(index?: number): number;
    /**
     * Checks if the times and values variables are empty.
     */
    isEmpty(): boolean;
}
export { Tween };
