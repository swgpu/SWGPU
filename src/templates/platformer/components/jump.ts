import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class Jump extends DNAComponent {
  jumping: boolean;
  wallJumping: boolean;
  isGrounded: boolean;
  platform: number;
  dropDown: number;

  constructor() {
    super('Jump');
    this.jumping = false;
    this.wallJumping = false;
    this.isGrounded = false;
    this.platform = -1;
    this.dropDown = -1;
  }
}