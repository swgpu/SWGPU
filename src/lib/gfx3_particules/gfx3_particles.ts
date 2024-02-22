import { gfx3ParticlesRenderer } from './gfx3_particles_renderer';
import { gfx3Manager } from '../gfx3/gfx3_manager';
import { UT } from '../core/utils';
import { TweenNumber, TweenVEC3 } from '../core/tween';
import { Gfx3Drawable } from '../gfx3/gfx3_drawable';
import { Gfx3Texture } from '../gfx3/gfx3_texture';
import { Gfx3StaticGroup } from '../gfx3/gfx3_group';
import { SHADER_VERTEX_ATTR_COUNT } from './gfx3_particles_shader';

const PARTICULES_UV = [[0, 0], [0, 1], [1, 0], [1, 1]];
const PARTICULES_IDX = [0, 1, 2, 2, 1, 3];
const PARTICULES_PTS: Array<vec3> = [
  [-1, -1, 0],
  [-1, +1, 0],
  [+1, -1, 0],
  [+1, +1, 0]
];

enum VelocityStyle {
  CLASSIC = 'CLASSIC',
  EXPLODE = 'EXPLODE'
};

enum PositionStyle {
  CUBE = 'CUBE',
  SPHERE = 'SPHERE'
};

class Particle {
  position: vec3;
  velocity: vec3; // units per second
  acceleration: vec3;
  accelerationTween: TweenVEC3;
  angle: number;
  angleVelocity: number; // degrees per second
  angleAcceleration: number; // degrees per second, per second
  size: number;
  sizeTween: TweenNumber;
  color: vec3;
  colorTween: TweenVEC3;
  opacity: number;
  opacityTween: TweenNumber;
  age: number;
  alive: number; // use float instead of boolean for shader purposes	

  constructor() {
    this.position = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.acceleration = [0, 0, 0];
    this.accelerationTween = new TweenVEC3();
    this.angle = 0;
    this.angleVelocity = 0;
    this.angleAcceleration = 0;
    this.size = 16.0;
    this.sizeTween = new TweenNumber();
    this.color = [0, 0, 0];
    this.colorTween = new TweenVEC3();
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
    this.position = UT.VEC3_ADD(this.position, UT.VEC3_SCALE(this.velocity, ts / 1000.0));
    this.velocity = UT.VEC3_ADD(this.velocity, UT.VEC3_SCALE(this.acceleration, ts / 1000.0));

    this.angle += this.angleVelocity * UT.DEG_TO_RAD_RATIO * (ts / 1000.0);
    this.angleVelocity += this.angleAcceleration * UT.DEG_TO_RAD_RATIO * (ts / 1000.0);

    this.age += ts / 1000.0;

    if (!this.sizeTween.isEmpty()) {
      this.size = this.sizeTween.interpolate(this.age);
    }

    if (!this.colorTween.isEmpty()) {
      this.color = this.colorTween.interpolate(this.age);
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
  colorTween: TweenVEC3;
  sizeBase: number;
  sizeSpread: number;
  sizeTween: TweenNumber;
  opacityBase: number;
  opacitySpread: number;
  opacityTween: TweenNumber;
  accelerationBase: vec3;
  accelerationSpread: vec3;
  accelerationTween: TweenVEC3;
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
 * The 3D particles diffuser.
 */
class Gfx3Particles extends Gfx3Drawable {
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
  colorTween: TweenVEC3;
  sizeBase: number;
  sizeSpread: number;
  sizeTween: TweenNumber;
  opacityBase: number;
  opacitySpread: number;
  opacityTween: TweenNumber;
  accelerationBase: vec3;
  accelerationSpread: vec3;
  accelerationTween: TweenVEC3;
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
  constructor(options: Partial<ParticlesOptions>) {
    super(SHADER_VERTEX_ATTR_COUNT);
    this.textureChanged = false;
    this.positionStyle = options.positionStyle ?? PositionStyle.CUBE;
    this.positionBase = options.positionBase ?? [0, 0, 0];
    this.positionSpread = options.positionSpread ?? [0, 0, 0];
    this.positionSphereRadiusBase = options.positionSphereRadiusBase ?? 0.0;
    this.positionRadiusSpread = options.positionRadiusSpread ?? 0.0;
    this.velocityStyle = options.velocityStyle ?? VelocityStyle.CLASSIC;
    this.velocityBase = options.velocityBase ?? [0, 0, 0];
    this.velocitySpread = options.velocitySpread ?? [0, 0, 0];
    this.velocityExplodeSpeedBase = options.velocityExplodeSpeedBase ?? 0.0;
    this.velocityExplodeSpeedSpread = options.velocityExplodeSpeedSpread ?? 0.0;
    this.colorBase = options.colorBase ?? [0.0, 1.0, 0.5];
    this.colorSpread = options.colorSpread ?? [0.0, 0.0, 0.0];
    this.colorTween = options.colorTween ?? new TweenVEC3();
    this.sizeBase = options.sizeBase ?? 1.0;
    this.sizeSpread = options.sizeSpread ?? 0.0;
    this.sizeTween = options.sizeTween ?? new TweenNumber();
    this.opacityBase = options.opacityBase ?? 1.0;
    this.opacitySpread = options.opacitySpread ?? 0.0;
    this.opacityTween = options.opacityTween ?? new TweenNumber();
    this.accelerationBase = options.accelerationBase ?? [0, 0, 0];
    this.accelerationSpread = options.accelerationSpread ?? [0, 0, 0];
    this.accelerationTween = options.accelerationTween ?? new TweenVEC3();
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
    this.grp2 = gfx3Manager.createStaticGroup('PARTICLES_PIPELINE', 2);
    this.texture = this.grp2.setTexture(0, 'TEXTURE', options.texture ?? gfx3Manager.createTextureFromBitmap());

    for (let i = 0; i < this.particleQuantity; i++) {
      this.particleArray[i] = this.$createParticle();
    }

    this.grp2.allocate();
  }

  /**
   * Free all resources.
   * Warning: You need to call this method to free allocation for this object.
   */
  delete(): void {
    this.grp2.delete();
    super.delete();
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    this.$updateLifeCycle(ts);
    this.$updateGeometry(ts);
  }

  /**
   * The draw function.
   */
  draw(): void {
    gfx3ParticlesRenderer.drawParticles(this);
  }

  /**
   * Set the particle texture.
   * 
   * @param {Gfx3Texture} texture - The texture.
   */
  setTexture(texture: Gfx3Texture): void {
    this.texture = texture;
    this.textureChanged = true;
  }

  /**
   * Returns the particle texture.
   */
  getTexture(): Gfx3Texture | null {
    return this.texture;
  }

  /**
   * Returns the bindgroup(2).
   */
  getGroup02(): Gfx3StaticGroup {
    if (this.textureChanged) {
      this.grp2.setTexture(0, 'TEXTURE', this.texture);
      this.grp2.allocate();
      this.textureChanged = false;
    }

    return this.grp2;
  }

  $updateLifeCycle(ts: number): void {
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

  $updateGeometry(ts: number): void {
    this.beginVertices(this.particleAlivedCount * 6);

    for (let i = 0; i < this.particleQuantity; i++) {
      if (this.particleArray[i].alive) {
        const pos = this.particleArray[i].position;
        const color = this.particleArray[i].color;
        const size = this.particleArray[i].size;
        const opacity = this.particleArray[i].opacity;
        const angle = this.particleArray[i].angle;
        const alive = this.particleArray[i].alive;

        for (let j = 0; j < 6; j++) {
          const v = PARTICULES_PTS[PARTICULES_IDX[j]];
          const uv = PARTICULES_UV[PARTICULES_IDX[j]];
          this.defineVertex(v[0], v[1], v[2], pos[0], pos[1], pos[2], uv[0], uv[1], color[0], color[1], color[2], size, opacity, angle, alive);
        }
      }
    }

    this.endVertices();
  }

  $createParticle(): Particle {
    const particle = new Particle();

    if (this.positionStyle == PositionStyle.CUBE) {
      particle.position = UT.VEC3_SPREAD(this.positionBase, this.positionSpread);
    }
    else if (this.positionStyle == PositionStyle.SPHERE) {
      const positionRadius = UT.SPREAD(this.positionSphereRadiusBase, this.positionRadiusSpread);
      const a1 = Math.PI * 2 * Math.random();
      const a2 = Math.PI * 2 * Math.random();
      const r = positionRadius * Math.cos(a1);
      particle.position = UT.VEC3_ADD(this.positionBase, [r * Math.cos(a2), positionRadius * Math.sin(a1), r * Math.sin(a2)]);
    }

    if (this.velocityStyle == VelocityStyle.CLASSIC) {
      particle.velocity = UT.VEC3_SPREAD(this.velocityBase, this.velocitySpread);
    }
    else if (this.velocityStyle == VelocityStyle.EXPLODE) {
      const direction = UT.VEC3_SUBSTRACT(particle.position, this.positionBase);
      const velocitySpeed = UT.SPREAD(this.velocityExplodeSpeedBase, this.velocityExplodeSpeedSpread);
      particle.velocity = UT.VEC3_SCALE(UT.VEC3_NORMALIZE(direction), velocitySpeed);
    }

    particle.color = UT.VEC3_SPREAD(this.colorBase, this.colorSpread);
    particle.colorTween = this.colorTween;
    particle.size = UT.SPREAD(this.sizeBase, this.sizeSpread);
    particle.sizeTween = this.sizeTween;
    particle.opacity = UT.SPREAD(this.opacityBase, this.opacitySpread);
    particle.opacityTween = this.opacityTween;
    particle.acceleration = UT.VEC3_SPREAD(this.accelerationBase, this.accelerationSpread);
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
export { VelocityStyle, PositionStyle, Gfx3Particles };