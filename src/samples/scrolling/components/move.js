import { DNAComponent } from '../../../lib/dna/dna_component';

export class MoveComponent extends DNAComponent {
  constructor(direction) {
    super('Move');
    this.velocityX = 0;
    this.velocityY = 0;
    this.direction = direction;
  }
}