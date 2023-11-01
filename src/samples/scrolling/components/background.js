import { DNAComponent } from '../../../lib/dna/dna_component';

export class BackgroundComponent extends DNAComponent {
  constructor(texture) {
    super('Background');
    this.texture = texture;
  }
}