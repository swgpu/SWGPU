import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class Position extends DNAComponent {
  x: number;
  y: number;

	constructor(x: number, y: number){
		super('Position');
    this.x = x;
    this.y = y;
	}
}