import { gfx2Manager } from '../gfx2/gfx2_manager';
import { UT } from '../core/utils';
import { TweenNumber, TweenVEC2 } from '../core/tween';
import { Gfx2Drawable } from '../gfx2/gfx2_drawable';

enum VelocityStyle {
  CLASSIC = 'CLASSIC',
  EXPLODE = 'EXPLODE'
};

enum PositionStyle {
  SQUARE = 'SQUARE',
  CIRCLE = 'CIRCLE'
};

/**
 * A 2D particle.
 */
class Particle {
  position: vec2;
  velocity: vec2; // units per second
  acceleration: vec2;
  accelerationTween: TweenVEC2;
  angle: number;
  angleVelocity: number; // degrees per second
  angleAcceleration: number; // degrees per second, per second
  size: number;
  sizeTween: TweenNumber;
  opacity: number;
  opacityTween: TweenNumber;
  age: number;
  alive: number; // use float instead of boolean for shader purposes	

  constructor() {
    this.position = [0, 0];
    this.velocity = [0, 0];
    this.acceleration = [0, 0];
    this.accelerationTween = new TweenVEC2();
    this.angle = 0;
    this.angleVelocity = 0;
    this.angleAcceleration = 0;
    this.size = 16.0;
    this.sizeTween = new TweenNumber();
    this.opacity = 1.0;
    this.opacityTween = new TweenNumber();
    this.age = 0;
    this.alive = 0;
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number) {
    this.position = UT.VEC2_ADD(this.position, UT.VEC2_SCALE(this.velocity, ts / 1000.0));
    this.velocity = UT.VEC2_ADD(this.velocity, UT.VEC2_SCALE(this.acceleration, ts / 1000.0));

    this.angle += this.angleVelocity * UT.DEG_TO_RAD_RATIO * (ts / 1000.0);
    this.angleVelocity += this.angleAcceleration * UT.DEG_TO_RAD_RATIO * (ts / 1000.0);
    this.age += ts / 1000.0;

    if (!this.sizeTween.isEmpty()) {
      this.size = this.sizeTween.interpolate(this.age);
    }

    if (!this.opacityTween.isEmpty()) {
      this.opacity = this.opacityTween.interpolate(this.age);
    }

    if (!this.accelerationTween.isEmpty()) {
      this.acceleration = this.accelerationTween.interpolate(this.age);
    }
  }
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
  sizeTween: TweenNumber;
  opacityBase: number;
  opacitySpread: number;
  opacityTween: TweenNumber;
  accelerationBase: vec2;
  accelerationSpread: vec2;
  accelerationTween: TweenVEC2;
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
};

/**
 * The particles diffuser.
 */
class Gfx2Particles extends Gfx2Drawable {
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
  sizeTween: TweenNumber;
  opacityBase: number;
  opacitySpread: number;
  opacityTween: TweenNumber;
  accelerationBase: vec2;
  accelerationSpread: vec2;
  accelerationTween: TweenVEC2;
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
  constructor(options: Partial<ParticlesOptions>) {
    super();
    this.positionStyle = options.positionStyle ?? PositionStyle.SQUARE;
    this.positionBase = options.positionBase ?? [0, 0];
    this.positionSpread = options.positionSpread ?? [0, 0];
    this.positionCircleRadiusBase = options.positionCircleRadiusBase ?? 0.0;
    this.positionRadiusSpread = options.positionRadiusSpread ?? 0.0;
    this.velocityStyle = options.velocityStyle ?? VelocityStyle.CLASSIC;
    this.velocityBase = options.velocityBase ?? [0, 0];
    this.velocitySpread = options.velocitySpread ?? [0, 0];
    this.velocityExplodeSpeedBase = options.velocityExplodeSpeedBase ?? 0.0;
    this.velocityExplodeSpeedSpread = options.velocityExplodeSpeedSpread ?? 0.0;
    this.sizeBase = options.sizeBase ?? 1.0;
    this.sizeSpread = options.sizeSpread ?? 0.0;
    this.sizeTween = options.sizeTween ?? new TweenNumber();
    this.opacityBase = options.opacityBase ?? 1.0;
    this.opacitySpread = options.opacitySpread ?? 0.0;
    this.opacityTween = options.opacityTween ?? new TweenNumber();
    this.accelerationBase = options.accelerationBase ?? [0, 0];
    this.accelerationSpread = options.accelerationSpread ?? [0, 0];
    this.accelerationTween = options.accelerationTween ?? new TweenVEC2();
    this.angleBase = options.angleBase ?? 0.0;
    this.angleSpread = options.angleSpread ?? 0.0;
    this.angleVelocityBase = options.angleVelocityBase ?? 0.0;
    this.angleVelocitySpread = options.angleVelocitySpread ?? 0.0;
    this.angleAccelerationBase = options.angleAccelerationBase ?? 0.0;
    this.angleAccelerationSpread = options.angleAccelerationSpread ?? 0.0;
    this.particleDeathAge = options.particleDeathAge ?? 1.0;
    this.particlesPerSecond = options.particlesPerSecond ?? 30;
    this.particleQuantity = options.particleQuantity ?? 100;
    this.particleAlivedCount = 0;
    this.particleArray = [];
    this.emitterDeathAge = options.emitterDeathAge ?? 60;
    this.emitterAge = 0.0;
    this.emitterAlive = true;
    this.texture = options.texture ?? gfx2Manager.getDefaultTexture();

    for (let i = 0; i < this.particleQuantity; i++) {
      this.particleArray[i] = this.$createParticle();
    }
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    const recycleIndices = [];

    for (let i = 0; i < this.particleQuantity; i++) {
      if (this.particleArray[i].alive) {
        this.particleArray[i].update(ts);

        if (this.particleArray[i].age > this.particleDeathAge) { // check if particle should expire; could also use: death by size<0 or alpha < 0.
          this.particleArray[i].alive = 0.0;
          this.particleAlivedCount--;
          recycleIndices.push(i);
        }
      }
    }

    if (!this.emitterAlive) { // check if particle emitter is still running
      return;
    }

    if (this.emitterAge < this.particleDeathAge) { // if no particles have died yet, then there are still particles to activate
      let startIndex = Math.round(this.particlesPerSecond * (this.emitterAge + 0)); // determine indices of particles to activate
      let endIndex = Math.round(this.particlesPerSecond * (this.emitterAge + ts / 1000.0));
      if (endIndex > this.particleQuantity) {
        endIndex = this.particleQuantity;
      }

      for (let i = startIndex; i < endIndex; i++) {
        this.particleArray[i].alive = 1.0;
        this.particleAlivedCount++;
      }
    }

    for (let i = 0; i < recycleIndices.length; i++) { // if any particles have died while the emitter is still running, we imediately recycle them
      const idx = recycleIndices[i];
      this.particleArray[idx] = this.$createParticle();
      this.particleArray[idx].alive = 1.0; // activate right away
      this.particleAlivedCount++;
    }

    this.emitterAge += ts / 1000.0;

    if (this.emitterAge > this.emitterDeathAge) { // stop emitter ?
      this.emitterAlive = false;
    }
  }

  /**
   * The draw function.
   */
  draw(): void {
    const ctx = gfx2Manager.getContext();

    ctx.save();
    ctx.translate(-this.offset[0], -this.offset[1]);
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale[0], this.scale[1]);

    for (let i = 0; i < this.particleQuantity; i++) {
      if (this.particleArray[i].alive) {
        const opacity = this.particleArray[i].opacity;
        const position = this.particleArray[i].position;
        const size = this.particleArray[i].size;
        const angle = this.particleArray[i].angle;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.rotate(angle);
        ctx.drawImage(this.texture, position[0] - size * 0.5, position[1] - size * 0.5, size, size);
        ctx.restore();
      }
    }

    ctx.restore();
  }

  /**
   * Set the particle texture.
   * 
   * @param {ImageBitmap | HTMLImageElement} texture - The texture.
   */
  setTexture(texture: ImageBitmap | HTMLImageElement): void {
    this.texture = texture;
  }

  /**
   * Returns the particle texture.
   */
  getTexture(): ImageBitmap | HTMLImageElement | null {
    return this.texture;
  }

  /**
   * Creates a particle with various properties such as position, velocity, size, opacity, acceleration, angle, and age.
   */
  $createParticle(): Particle {
    const particle = new Particle();

    if (this.positionStyle == PositionStyle.SQUARE) {
      particle.position = UT.VEC2_SPREAD(this.positionBase, this.positionSpread);
    }
    else if (this.positionStyle == PositionStyle.CIRCLE) {
      const positionRadius = UT.SPREAD(this.positionCircleRadiusBase, this.positionRadiusSpread);
      const a = Math.PI * 2 * Math.random();
      particle.position = UT.VEC2_ADD(this.positionBase, [positionRadius * Math.cos(a), positionRadius * Math.sin(a)]);
    }

    if (this.velocityStyle == VelocityStyle.CLASSIC) {
      particle.velocity = UT.VEC2_SPREAD(this.velocityBase, this.velocitySpread);
    }
    else if (this.velocityStyle == VelocityStyle.EXPLODE) {
      const direction = UT.VEC2_SUBSTRACT(particle.position, this.positionBase);
      const velocitySpeed = UT.SPREAD(this.velocityExplodeSpeedBase, this.velocityExplodeSpeedSpread);
      particle.velocity = UT.VEC2_SCALE(UT.VEC2_NORMALIZE(direction), velocitySpeed);
    }

    particle.size = UT.SPREAD(this.sizeBase, this.sizeSpread);
    particle.sizeTween = this.sizeTween;
    particle.opacity = UT.SPREAD(this.opacityBase, this.opacitySpread);
    particle.opacityTween = this.opacityTween;
    particle.acceleration = UT.VEC2_SPREAD(this.accelerationBase, this.accelerationSpread);
    particle.accelerationTween = this.accelerationTween;
    particle.angle = UT.SPREAD(this.angleBase, this.angleSpread);
    particle.angleVelocity = UT.SPREAD(this.angleVelocityBase, this.angleVelocitySpread);
    particle.angleAcceleration = UT.SPREAD(this.angleAccelerationBase, this.angleAccelerationSpread);
    particle.age = 0;
    particle.alive = 0;
    return particle;
  }
}

export type { ParticlesOptions };
export { VelocityStyle, PositionStyle, Gfx2Particles };