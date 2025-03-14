import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class EntityComponent extends DNAComponent {
  x: number;
  y: number;
  z: number;
  speed: number;
  velocity: vec3;

  constructor() {
    super('Entity');
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.speed = 7;
    this.velocity = [0, 0, 0];
  }
}