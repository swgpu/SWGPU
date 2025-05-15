import { Tween } from '../core/tween';
import { Gfx2Drawable } from '../gfx2/gfx2_drawable';
declare enum VelocityStyle {
    CLASSIC = "CLASSIC",
    EXPLODE = "EXPLODE"
}
declare enum PositionStyle {
    SQUARE = "SQUARE",
    CIRCLE = "CIRCLE"
}
/**
 * A 2D particle.
 */
declare class Particle {
    position: vec2;
    velocity: vec2;
    acceleration: vec2;
    accelerationTween: Tween<vec2>;
    angle: number;
    angleVelocity: number;
    angleAcceleration: number;
    size: number;
    sizeTween: Tween<number>;
    opacity: number;
    opacityTween: Tween<number>;
    age: number;
    alive: number;
    constructor();
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
}
interface ParticlesOptions {
    texture: ImageBitmap | HTMLImageElement;
    positionStyle: PositionStyle;
    positionBase: vec2;
    positionSpread: vec2;
    positionCircleRadiusBase: number;
    positionRadiusSpread: number;
    velocityStyle: VelocityStyle;
    velocityBase: vec2;
    velocitySpread: vec2;
    velocityExplodeSpeedBase: number;
    velocityExplodeSpeedSpread: number;
    sizeBase: number;
    sizeSpread: number;
    sizeTween: Tween<number>;
    opacityBase: number;
    opacitySpread: number;
    opacityTween: Tween<number>;
    accelerationBase: vec2;
    accelerationSpread: vec2;
    accelerationTween: Tween<vec2>;
    angleBase: number;
    angleSpread: number;
    angleVelocityBase: number;
    angleVelocitySpread: number;
    angleAccelerationBase: number;
    angleAccelerationSpread: number;
    particleDeathAge: number;
    particlesPerSecond: number;
    particleQuantity: number;
    emitterDeathAge: number;
}
/**
 * The particles diffuser.
 */
declare class Gfx2Particles extends Gfx2Drawable {
    #private;
    positionStyle: PositionStyle;
    positionBase: vec2;
    positionSpread: vec2;
    positionCircleRadiusBase: number;
    positionRadiusSpread: number;
    velocityStyle: VelocityStyle;
    velocityBase: vec2;
    velocitySpread: vec2;
    velocityExplodeSpeedBase: number;
    velocityExplodeSpeedSpread: number;
    sizeBase: number;
    sizeSpread: number;
    sizeTween: Tween<number>;
    opacityBase: number;
    opacitySpread: number;
    opacityTween: Tween<number>;
    accelerationBase: vec2;
    accelerationSpread: vec2;
    accelerationTween: Tween<vec2>;
    angleBase: number;
    angleSpread: number;
    angleVelocityBase: number;
    angleVelocitySpread: number;
    angleAccelerationBase: number;
    angleAccelerationSpread: number;
    particleDeathAge: number;
    particlesPerSecond: number;
    particleQuantity: number;
    particleAlivedCount: number;
    particleArray: Array<Particle>;
    emitterDeathAge: number;
    emitterAge: number;
    emitterAlive: boolean;
    texture: ImageBitmap | HTMLImageElement;
    /**
     * @param options - Various options for configuring the behavior of the particles cloud.
     */
    constructor(options: Partial<ParticlesOptions>);
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * The draw function.
     */
    draw(): void;
    /**
     * Set the particle texture.
     *
     * @param {ImageBitmap | HTMLImageElement} texture - The texture.
     */
    setTexture(texture: ImageBitmap | HTMLImageElement): void;
    /**
     * Returns the particle texture.
     */
    getTexture(): ImageBitmap | HTMLImageElement | null;
}
export type { ParticlesOptions };
export { VelocityStyle, PositionStyle, Gfx2Particles };
