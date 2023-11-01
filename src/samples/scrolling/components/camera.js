import { DNAComponent } from '../../../lib/dna/dna_component';

export class CameraComponent extends DNAComponent {
  constructor(x, y) {
    super('Camera');
    this.x = x;
    this.y = y;
  }
}