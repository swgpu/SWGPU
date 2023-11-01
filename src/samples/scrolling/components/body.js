import { DNAComponent } from '../../../lib/dna/dna_component';

export class BodyComponent extends DNAComponent {
  constructor(w = 0, h = 0) {
    super('Body');
    this.w = w;
    this.h = h;
  }
}