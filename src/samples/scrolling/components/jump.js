import { DNAComponent } from '../../../lib/dna/dna_component';

export class JumpComponent extends DNAComponent {
  constructor(accelerationY, doubleJumpGapTime = 10, numJump = 1) {
    super('Jump');
    this.doubleJumpGapTime = doubleJumpGapTime;
    this.numJump = numJump;
    this.accelerationY = accelerationY;
    this.createdAt = Date.now();
  }
}