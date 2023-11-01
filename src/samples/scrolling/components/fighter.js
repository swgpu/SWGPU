import { DNAComponent } from '../../../lib/dna/dna_component';

export class FighterComponent extends DNAComponent {
  constructor(health, dmgSprite) {
    super('Fighter');
    this.health = health;
    this.dmgSprite = dmgSprite;
  }
}