import { DNAComponent } from '../../../lib/dna/dna_component';

export class GravityComponent extends DNAComponent {
  constructor(gravityFactor = 1) {
    super('Gravity');
    this.gravityFactor = gravityFactor;
    this.onFloor = true;
  }
}