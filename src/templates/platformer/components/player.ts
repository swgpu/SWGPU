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
    this.accel = 0.03;
    this.maxSpeed = 0.1;
    this.jumpStrenght = 30;
    this.wallJumpStrenght = 0.2;
  }
}