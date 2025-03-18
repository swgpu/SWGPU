import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class EntityComponent extends DNAComponent {
  x: number;
  y: number;
  speed: number;
  velocity: vec2;
  rotation: number;

  constructor() {
    super('Entity');
    this.x = 0;
    this.y = 0;
    this.speed = 25;
    this.velocity = [0, 0];
    this.rotation = 0;
  }
}