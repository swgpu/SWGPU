import { DNAComponent } from '../../../lib/dna/dna_component';

export class PositionComponent extends DNAComponent {
  constructor(x, y) {
    super('Position');
    this.x = x;
    this.y = y;
  }
}