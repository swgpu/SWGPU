import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class Player extends DNAComponent {
  shooting: boolean;
  shootingDuration: number;
  lastShot: number | null;
  accel: number;
  maxSpeed: number;
  jumpStrenght: number;
  wallJumpStrenght: number;

  constructor() {
    super('Player');
    this.shooting = false;
    this.shootingDuration = 300;
    this.lastShot = null;
    this.accel = 4;
    this.maxSpeed = 8;
    this.jumpStrenght = 20;
    this.wallJumpStrenght = 20;
  }
}