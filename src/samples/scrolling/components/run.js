import { DNAComponent } from '../../../lib/dna/dna_component';

export class RunComponent extends DNAComponent {
  constructor(speed) {
    super('Run');
    this.speed = speed;
  }
}