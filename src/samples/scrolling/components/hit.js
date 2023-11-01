import { DNAComponent } from '../../../lib/dna/dna_component';

export class HitComponent extends DNAComponent {
  constructor(options = {}) {
    super('Hit');
    this.w = options.w;
    this.h = options.h;
    this.frameIndex = options.frameIndex;
    this.maxAge = options.maxAge;
    this.relativeX = options.relativeX;
    this.relativeY = options.relativeY;
    this.velocityTween = options.velocityTween ?? null;
    
    this.isCollide = options.isCollide ?? true;
    this.damageHP = options.damageHP ?? 1;
    this.damageMaxAge = options.damageMaxAge ?? 1;
    this.damageSpriteAnimation = options.damageSpriteAnimation ?? null;
    this.damageSpriteOffset = options.damageSpriteOffset ?? [0, 0];

    this.spriteAnimationOnLaunch = options.spriteAnimationOnLaunch ?? null;
    this.spriteAnimationOnImpact = options.spriteAnimationOnImpact ?? null;
    this.spriteOffsetX = options.spriteOffsetX ?? 0;
    this.spriteOffsetY = options.spriteOffsetY ?? 0;
    this.owner = options.owner ?? -1;
    this.direction = options.direction ?? 0;
    this.velocityImpact = options.velocityImpact ?? null;
    this.marked = false;
    this.age = 0;
  }
}