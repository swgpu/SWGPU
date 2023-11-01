import { DNAComponent } from '../../../lib/dna/dna_component';

export class PlatformComponent extends DNAComponent {
  constructor(elevation, w, h) {
    super('Platform');
    this.elevation = elevation;
    this.w = w;
    this.h = h;
  }
}