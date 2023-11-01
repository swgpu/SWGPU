import { DNAComponent } from '../../../lib/dna/dna_component';

export class SpriteComponent extends DNAComponent {
  constructor(jas) {
    super('Sprite');
    this.jas = jas;
    this.visible = true;
    this.lastAnimationFrameIndex = -1;
  }
}