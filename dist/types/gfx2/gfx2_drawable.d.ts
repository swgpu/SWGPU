import { Poolable } from '../core/object_pool';
import { Gfx2BoundingRect } from '../gfx2/gfx2_bounding_rect';
/**
 * A 2D drawable object.
 */
declare class Gfx2Drawable implements Poolable<Gfx2Drawable> {
    position: vec2;
    rotation: number;
    scale: vec2;
    flip: [boolean, boolean];
    offset: vec2;
    visible: boolean;
    opacity: number;
    z: number;
    elevation: number;
    boundingRect: Gfx2BoundingRect;
    constructor();
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * This method is called during the render phase (after transforms).
     */
    onRender(): void;
    /**
     * The render function.
     */
    render(): void;
    /**
     * The draw function.
     */
    draw(): void;
    /**
     * Returns the position.
     */
    getPosition(): vec2;
    /**
     * Returns the x-coordinate of the position.
     */
    getPositionX(): number;
    /**
     * Returns the y-coordinate of the position.
     */
    getPositionY(): number;
    /**
     * Set the position with the given x and y coordinates.
     *
     * @param {number} x - The X coordinate of the position.
     * @param {number} y - The Y coordinate of the position.
     */
    setPosition(x: number, y: number): void;
    /**
     * Translate the position.
     *
     * @param {number} x - The amount of translation in the x-axis direction.
     * @param {number} y - The amount of translation in the y-axis direction.
     */
    translate(x: number, y: number): void;
    /**
     * Returns the rotation.
     */
    getRotation(): number;
    /**
     * Sets the rotation angle (in radians).
     *
     * @param {number} rotation - The rotation angle in radians.
     */
    setRotation(rotation: number): void;
    /**
     * Add rotation value to current angle.
     *
     * @param {number} a - The rotation angle to add in radians.
     */
    rotate(a: number): void;
    /**
     * Returns the scale as a 2D vector.
     */
    getScale(): vec2;
    /**
     * Returns the scale factor on x-axis.
     */
    getScaleX(): number;
    /**
     * Returns the scale factor on y-axis.
     */
    getScaleY(): number;
    /**
     * Sets the scale with the given x and y factors.
     *
     * @param {number} x - The x factor in the x-axis direction.
     * @param {number} y - The y factor in the y-axis direction.
     */
    setScale(x: number, y: number): void;
    /**
     * Add scale values.
     *
     * @param {number} x - The x factor in the x-axis direction.
     * @param {number} y - The y factor in the y-axis direction.
     */
    zoom(x: number, y: number): void;
    /**
     * Returns the flip flag on x-axis.
     */
    getFlipX(): boolean;
    /**
     * Returns the flip flag on y-axis.
     */
    getFlipY(): boolean;
    /**
     * Returns two booleans, first is the x-axis flip flag, second is the y-axis flip flag.
     */
    getFlip(): [boolean, boolean];
    /**
     * Set flipX.
     *
     * @param {boolean} x - The x-axis flip flag.
     */
    setFlipX(x: boolean): void;
    /**
     * Set flipY.
     *
     * @param {boolean} y - The y-axis flip flag.
     */
    setFlipY(y: boolean): void;
    /**
     * Returns the origin offset.
     */
    getOffset(): vec2;
    /**
     * Returns the offset in x-axis direction.
     */
    getOffsetX(): number;
    /**
     * Returns the offset in y-axis direction.
     */
    getOffsetY(): number;
    /**
     * Set the origin offset value.
     *
     * @param {number} x - The x-offset.
     * @param {number} y - The y-offset.
     */
    setOffset(x: number, y: number): void;
    /**
     * Check if is visible or not.
     */
    isVisible(): boolean;
    /**
     * Set the visibility.
     *
     * @param {boolean} visible - The visibility.
     */
    setVisible(visible: boolean): void;
    /**
     * Returns the opacity value.
     */
    getOpacity(): number;
    /**
     * Sets the opacity.
     *
     * @param {number} opacity - The opacity value.
     */
    setOpacity(opacity: number): void;
    /**
     * Set the z-depth value.
     *
     * @param {number} z - The z-depth value.
     */
    setPositionZ(z: number): void;
    /**
     * Returns the z-depth value.
     */
    getPositionZ(): number;
    /**
     * Set the elevation.
     * Only used for rendering 2D isometric tiles.
     *
     * @param {number} elevation - The elevation value.
     */
    setElevation(elevation: number): void;
    /**
     * Returns the elevation.
     * Only used for rendering 2D isometric tiles.
     */
    getElevation(): number;
    /**
     * Set the bounding rect.
     *
     * @param {Gfx2BoundingRect} boundingRect - The bounding rectangle.
     */
    setBoundingRect(boundingRect: Gfx2BoundingRect): void;
    /**
     * Returns the bounding rect.
     */
    getBoundingRect(): Gfx2BoundingRect;
    /**
     * Returns the bounding rect in the world space coordinates.
     */
    getWorldBoundingRect(): Gfx2BoundingRect;
    /**
     * Clone the object.
     *
     * @param {Gfx2Drawable} drawable - The copy object.
     */
    clone(drawable?: Gfx2Drawable): Gfx2Drawable;
}
export { Gfx2Drawable };
