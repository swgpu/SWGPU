import { DNAComponent } from '../../../lib/dna/dna_component';

export class DamageComponent extends DNAComponent {
  constructor(velocityImpact = null, damageHP = 1, maxAge = 1, spriteAnimation = null, spriteOffset = [0, 0]) {
    super('Damage');
    this.velocityImpact = velocityImpact;
    this.damageHP = damageHP;
    this.maxAge = maxAge;
    this.spriteAnimation = spriteAnimation;
    this.spriteOffset = spriteOffset;
    this.airDropped = false;
    this.age = 0;
  }
}