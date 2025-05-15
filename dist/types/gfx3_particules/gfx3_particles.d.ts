import { Tween } from '../core/tween';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
declare enum VelocityStyle {
    CLASSIC = "CLASSIC",
    EXPLODE = "EXPLODE"
}
declare enum PositionStyle {
    CUBE = "CUBE",
    SPHERE = "SPHERE"
}
declare class Particle {
    position: vec3;
    velocity: vec3;
    acceleration: vec3;
    accelerationTween: Tween<vec3>;
    angle: number;
    angleVelocity: number;
    angleAcceleration: number;
    size: number;
    sizeTween: Tween<number>;
    color: vec3;
    colorTween: Tween<vec3>;
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
    texture: Gfx3Texture;
    positionStyle: PositionStyle;
    positionBase: vec3;
    positionSpread: vec3;
    positionSphereRadiusBase: number;
    positionRadiusSpread: number;
    velocityStyle: VelocityStyle;
    velocityBase: vec3;
    velocitySpread: vec3;
    velocityExplodeSpeedBase: number;
    velocityExplodeSpeedSpread: number;
    colorBase: vec3;
    colorSpread: vec3;
    colorTween: Tween<vec3>;
    sizeBase: number;
    sizeSpread: number;
    sizeTween: Tween<number>;
    opacityBase: number;
    opacitySpread: number;
    opacityTween: Tween<number>;
    accelerationBase: vec3;
    accelerationSpread: vec3;
    accelerationTween: Tween<vec3>;
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
 * The 3D particles diffuser.
 */
declare class Gfx3Particles extends Gfx3Drawable {
    #private;
    textureChanged: boolean;
    positionStyle: PositionStyle;
    positionBase: vec3;
    positionSpread: vec3;
    positionSphereRadiusBase: number;
    positionRadiusSpread: number;
    velocityStyle: VelocityStyle;
    velocityBase: vec3;
    velocitySpread: vec3;
    velocityExplodeSpeedBase: number;
    velocityExplodeSpeedSpread: number;
    colorBase: vec3;
    colorSpread: vec3;
    colorTween: Tween<vec3>;
    sizeBase: number;
    sizeSpread: number;
    sizeTween: Tween<number>;
    opacityBase: number;
    opacitySpread: number;
    opacityTween: Tween<number>;
    accelerationBase: vec3;
    accelerationSpread: vec3;
    accelerationTween: Tween<vec3>;
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
    grp2: Gfx3StaticGroup;
    texture: Gfx3Texture;
    /**
     * @param options - Various options for configuring the behavior of the particles cloud.
     */
    constructor(options: Partial<ParticlesOptions>);
    /**
     * Free all resources.
     * Warning: You need to call this method to free allocation for this object.
     */
    delete(): void;
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
     * @param {Gfx3Texture} texture - The texture.
     */
    setTexture(texture: Gfx3Texture): void;
    /**
     * Returns the particle texture.
     */
    getTexture(): Gfx3Texture | null;
    /**
     * Returns the bindgroup(2).
     */
    getGroup02(): Gfx3StaticGroup;
}
export type { ParticlesOptions };
export { VelocityStyle, PositionStyle, Gfx3Particles };
