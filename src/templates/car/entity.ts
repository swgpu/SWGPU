import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class EntityComponent extends DNAComponent {
  x: number;
  y: number;
  z: number;
  dir: vec3;
  jump: boolean;

  constructor() {
    super('Entity');
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.dir = [0, 0, 0];
    this.jump = false;
  }
}