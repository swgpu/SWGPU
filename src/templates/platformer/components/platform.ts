import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class Platform extends DNAComponent {
  from: vec2;
  to: vec2;
  direction: boolean;
  speed: number;

  constructor(from: vec2, to: vec2, direction: boolean, speed: number = 3) {
		super('Platform');
    this.from = from;
    this.to = to;
    this.direction = direction;
    this.speed = speed;
	}
}