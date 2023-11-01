import { DNAComponent } from '../../../lib/dna/dna_component';

export class FloorComponent extends DNAComponent {
  constructor(elevation) {
    super('Floor');
    this.elevation = elevation;
  }
}