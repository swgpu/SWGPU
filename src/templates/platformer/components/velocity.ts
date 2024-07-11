import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class Velocity extends DNAComponent {
	x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
		super('Velocity');
    this.x = x;
    this.y = y;
	}
}