import { DNAComponent } from '../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class CharacterComponent extends DNAComponent {
  x: number;
  y: number;
  z: number;
  moveDir: vec3;
  velocity: vec3;
  rotation: number;

  constructor() {
    super('Character');
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.moveDir = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.rotation = 0;
  }
}