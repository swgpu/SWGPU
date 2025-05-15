/**
 * Is used to move along a serie of points.
 * It emit 'E_FINISHED'
 */
declare class Motion {
    vertices: Array<number>;
    points: Array<vec3>;
    speed: number;
    looped: boolean;
    running: boolean;
    currentPosition: vec3;
    currentMove: vec3;
    currentPointIndex: number;
    currentSegmentTime: number;
    /**
     * @param {Array<vec3>} points - The serie of points.
     * @param {boolean} looped - Determine if path is closed, if closed then motion running in loop.
     */
    constructor(points?: Array<vec3>, looped?: boolean);
    /**
     * Load asynchronously from a json file (jlm).
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
    /**
     * Load asynchronously from a binary file (jlmb).
     *
     * @param {string} path - The file path.
     */
    loadFromBinaryFile(path: string): Promise<void>;
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Start moving along the path.
     */
    run(): void;
    /**
     * Set the moving speed.
     *
     * @param {number} speed - The moving speed.
     */
    setSpeed(speed: number): void;
    /**
     * Set the point list.
     *
     * @param {Array<vec3>} points - The points.
     */
    setPoints(points: Array<vec3>): void;
    /**
     * Stop moving along the path.
     */
    stop(): void;
    /**
     * Check if currently moving along the path.
     */
    isRunning(): boolean;
    /**
     * Returns vertices.
     */
    getVertices(): Array<number>;
    /**
     * Returns the current position.
     */
    getCurrentPosition(): vec3;
    /**
     * Returns the current position x-coordinate.
     */
    getCurrentPositionX(): number;
    /**
     * Returns the current position y-coordinate.
     */
    getCurrentPositionY(): number;
    /**
     * Returns the current position z-coordinate.
     */
    getCurrentPositionZ(): number;
    /**
     * Returns the current move.
     */
    getCurrentMove(): vec3;
    /**
     * Returns the current move x-coordinate.
     */
    getCurrentMoveX(): number;
    /**
     * Returns the current move y-coordinate.
     */
    getCurrentMoveY(): number;
    /**
     * Returns the current move z-coordinate.
     */
    getCurrentMoveZ(): number;
    /**
     * Returns the current y-rotation in 3D space.
     */
    getCurrentRotationY(): number;
    /**
     * Returns the current y-rotation in 3D space.
     */
    getCurrentRotationZ(): number;
    /**
     * Returns the current previous point index.
     */
    getPrevPointIndex(): number;
    /**
     * Returns the current next point index.
     */
    getNextPointIndex(): number;
    /**
     * Returns the current prev point.
     */
    getPrevPoint(): vec3;
    /**
     * Returns the current next point.
     */
    getNextPoint(): vec3;
    /**
     * Returns the T value for the current segment (from 0 to 1).
     */
    getCurrentSegmentTime(): number;
}
export { Motion };
