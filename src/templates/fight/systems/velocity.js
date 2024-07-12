import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class VelocityComponent extends DNAComponent {
  constructor(x = 0, y = 0) {
    super('Velocity');
    this.x = x;
    this.y = y;
  }
}