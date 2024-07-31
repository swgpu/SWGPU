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
  gravity: number;

  constructor() {
    super('Player');
    this.shooting = false;
    this.shootingDuration = 300;
    this.lastShot = null;
    this.accel = 16;
    this.maxSpeed = 32;
    this.jumpStrenght = 80;
    this.wallJumpStrenght = 80;
    this.gravity = 12;
  }
}