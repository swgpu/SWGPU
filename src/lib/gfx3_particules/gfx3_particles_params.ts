import { gfx3TextureManager } from '../gfx3/gfx3_texture_manager';
import { TweenNumber, TweenVEC3 } from '../core/tween';
import { ParticlesOptions, PositionStyle, VelocityStyle } from './gfx3_particles';

export const Fountain: Partial<ParticlesOptions> = {
  texture: await gfx3TextureManager.loadTexture('./textures/star.png'),
  positionStyle: PositionStyle.CUBE,
  positionBase: [0, 5, 0],
  positionSpread: [10, 0, 10],
  velocityStyle: VelocityStyle.CLASSIC,
  velocityBase: [0, 160, 0],
  velocitySpread: [100, 20, 100],
  colorTween: new TweenVEC3([0.5, 2], [[0, 1, 0.5], [0.8, 1, 0.5]]),
  sizeTween: new TweenNumber([0, 1], [1, 20]),
  opacityTween: new TweenNumber([2, 3], [1, 0]),
  accelerationBase: [0, -100, 0],
  angleBase: 0,
  angleSpread: 180,
  angleVelocityBase: 0,
  angleVelocitySpread: 360 * 4,
  particlesPerSecond: 200,
  particleDeathAge: 3.0,
  emitterDeathAge: 60
};

export const Fireball: Partial<ParticlesOptions> = {
  texture: await gfx3TextureManager.loadTexture('./textures/smokeparticle.png'),
  positionStyle: PositionStyle.SPHERE,
  positionBase: [0, 50, 0],
  positionSphereRadiusBase: 2,
  velocityStyle: VelocityStyle.EXPLODE,
  velocityExplodeSpeedBase: 40,
  velocityExplodeSpeedSpread: 8,
  colorBase: [0.02, 1, 0.4],
  sizeTween: new TweenNumber([0, 0.1], [1, 150]),
  opacityTween: new TweenNumber([0.7, 1], [1, 0]),
  particlesPerSecond: 60,
  particleDeathAge: 1.5,
  emitterDeathAge: 60
};

export const Smoke: Partial<ParticlesOptions> = {
  texture: await gfx3TextureManager.loadTexture('./textures/smokeparticle.png'),
  positionStyle: PositionStyle.CUBE,
  positionBase: [0, 0, 0],
  positionSpread: [10, 0, 10],
  velocityStyle: VelocityStyle.CLASSIC,
  velocityBase: [0, 150, 0],
  velocitySpread: [80, 50, 80],
  colorTween: new TweenVEC3([0.4, 1], [[0, 0, 0.2], [0, 0, 0.5]]),
  sizeTween: new TweenNumber([0, 1], [32, 128]),
  opacityTween: new TweenNumber([0.8, 2], [0.5, 0]),
  accelerationBase: [0, -10, 0],
  angleBase: 0,
  angleSpread: 720,
  angleVelocityBase: 0,
  angleVelocitySpread: 720,
  particlesPerSecond: 200,
  particleDeathAge: 2.0,
  emitterDeathAge: 60
};

export const Clouds: Partial<ParticlesOptions> = {
  texture: await gfx3TextureManager.loadTexture('./textures/smokeparticle.png'),
  positionStyle: PositionStyle.CUBE,
  positionBase: [-100, 100, 0],
  positionSpread: [0, 50, 60],
  velocityStyle: VelocityStyle.CLASSIC,
  velocityBase: [40, 0, 0],
  velocitySpread: [20, 0, 0],
  colorBase: [0.0, 0.0, 1.0],
  sizeBase: 80.0,
  sizeSpread: 100.0,
  opacityTween: new TweenNumber([0, 1, 4, 5], [0, 1, 1, 0]),
  particlesPerSecond: 50,
  particleDeathAge: 10.0,
  emitterDeathAge: 60
};

export const Snow: Partial<ParticlesOptions> = {
  texture: await gfx3TextureManager.loadTexture('./textures/snowflake.png'),
  positionStyle: PositionStyle.CUBE,
  positionBase: [0, 200, 0],
  positionSpread: [500, 0, 500],
  velocityStyle: VelocityStyle.CLASSIC,
  velocityBase: [0, -60, 0],
  velocitySpread: [50, 20, 50],
  colorBase: [0.66, 1.0, 0.9],
  sizeTween: new TweenNumber([0, 0.25], [1, 10]),
  opacityTween: new TweenNumber([2, 3], [0.8, 0]),
  accelerationBase: [0, -10, 0],
  angleBase: 0,
  angleSpread: 720,
  angleVelocityBase: 0,
  angleVelocitySpread: 60,
  particlesPerSecond: 200,
  particleDeathAge: 4.0,
  emitterDeathAge: 60
};

export const Rain: Partial<ParticlesOptions> = {
  texture: await gfx3TextureManager.loadTexture('./textures/raindrop2flip.png'),
  positionStyle: PositionStyle.CUBE,
  positionBase: [0, 200, 0],
  positionSpread: [600, 0, 600],
  velocityStyle: VelocityStyle.CLASSIC,
  velocityBase: [0, -400, 0],
  velocitySpread: [10, 50, 10],
  colorBase: [0.66, 1.0, 0.7],
  colorSpread: [0.00, 0.0, 0.2],
  sizeBase: 8.0,
  sizeSpread: 4.0,
  opacityBase: 0.6,
  accelerationBase: [0, -10, 0],
  particlesPerSecond: 1000,
  particleDeathAge: 1.0,
  emitterDeathAge: 60
};

export const Starfield: Partial<ParticlesOptions> = {
  texture: await gfx3TextureManager.loadTexture('./textures/spikey.png'),
  positionStyle: PositionStyle.CUBE,
  positionBase: [0, 200, 0],
  positionSpread: [600, 400, 600],
  velocityStyle: VelocityStyle.CLASSIC,
  velocityBase: [0, 0, 0],
  velocitySpread: [0.5, 0.5, 0.5],
  colorBase: [0.15, 1.0, 0.9],
  colorSpread: [0.00, 0.0, 0.2],
  sizeBase: 10.0,
  sizeSpread: 2.0,
  opacityBase: 1,
  angleBase: 0,
  angleSpread: 720,
  angleVelocityBase: 0,
  angleVelocitySpread: 4,
  particlesPerSecond: 20000,
  particleDeathAge: 60.0,
  emitterDeathAge: 0.1
};

export const Fireflies: Partial<ParticlesOptions> = {
  texture: await gfx3TextureManager.loadTexture('./textures/spark.png'),
  positionStyle: PositionStyle.CUBE,
  positionBase: [0, 100, 0],
  positionSpread: [400, 200, 400],
  velocityStyle: VelocityStyle.CLASSIC,
  velocityBase: [0, 0, 0],
  velocitySpread: [60, 20, 60],
  colorBase: [0.30, 1.0, 0.6],
  colorSpread: [0.3, 0.0, 0.0],
  sizeBase: 30.0,
  sizeSpread: 2.0,
  opacityTween: new TweenNumber([0.0, 1.0, 1.1, 2.0, 2.1, 3.0, 3.1, 4.0, 4.1, 5.0, 5.1, 6.0, 6.1], [0.2, 0.2, 1.0, 1.0, 0.2, 0.2, 1.0, 1.0, 0.2, 0.2, 1.0, 1.0, 0.2]),
  particlesPerSecond: 20,
  particleDeathAge: 6.1,
  emitterDeathAge: 600
};

export const Startunnel: Partial<ParticlesOptions> = {
  texture: await gfx3TextureManager.loadTexture('./textures/spikey.png'),
  positionStyle: PositionStyle.CUBE,
  positionBase: [0, 0, 0],
  positionSpread: [10, 10, 10],
  velocityStyle: VelocityStyle.CLASSIC,
  velocityBase: [0, 100, 200],
  velocitySpread: [40, 40, 80],
  colorBase: [0.15, 1.0, 0.8],
  sizeBase: 4.0,
  sizeSpread: 2.0,
  opacityBase: 1,
  angleBase: 0,
  angleSpread: 720,
  angleVelocityBase: 10,
  angleVelocitySpread: 0,
  particlesPerSecond: 500,
  particleDeathAge: 4.0,
  emitterDeathAge: 60
};

export const Firework: Partial<ParticlesOptions> = {
  texture: await gfx3TextureManager.loadTexture('./textures/spark.png'),
  positionStyle: PositionStyle.SPHERE,
  positionBase: [0, 100, 0],
  positionSphereRadiusBase: 2,
  velocityStyle: VelocityStyle.EXPLODE,
  velocityExplodeSpeedBase: 10,
  velocityExplodeSpeedSpread: 10,
  colorTween: new TweenVEC3([0.4, 0.8, 1.0], [[0, 1, 1], [0, 1, 0.6], [0.8, 1, 0.6]]),
  sizeTween: new TweenNumber([0.5, 0.7, 1.3], [2, 3, 1]),
  opacityTween: new TweenNumber([0.2, 0.7, 2.5], [0.75, 1, 0]),
  accelerationBase: [0, -80, 0],
  particlesPerSecond: 3000,
  particleDeathAge: 2.5,
  emitterDeathAge: 600.0
};

export const Candle: Partial<ParticlesOptions> = {
  texture: await gfx3TextureManager.loadTexture('./textures/smokeparticle.png'),
  positionStyle: PositionStyle.SPHERE,
  positionBase: [0, 5, 0],
  positionSphereRadiusBase: 1,
  velocityStyle: VelocityStyle.CLASSIC,
  velocityBase: [0, 30, 0],
  velocitySpread: [20, 0, 20],
  colorTween: new TweenVEC3([0.5, 1.0], [[1, 0, 0], [0, 1, 0]]),
  sizeTween: new TweenNumber([0, 0.3, 1.2], [2, 6, 2]),
  opacityTween: new TweenNumber([0.9, 1.5], [1, 0]),
  particleDeathAge: 1.5,
  emitterDeathAge: 600.0
};