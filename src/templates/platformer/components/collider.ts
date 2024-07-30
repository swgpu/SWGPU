import { DNAComponent } from '@lib/dna/dna_component';
import { UT } from '@lib/core/utils';
// ---------------------------------------------------------------------------------------

export class Collider extends DNAComponent {
  min: vec2;
  max: vec2;

  constructor(min: vec2, max: vec2) {
    super('Collider');
    this.min = min;
    this.max = max;
  }

  getBounds(position: vec2) {
    return {
      left: position[0] - this.min[0],
      right: position[0] + this.max[0],
      bottom: position[1] + this.max[1],
      top: position[1] - this.min[1]
    }
  }

  static isCollide(position1: vec2, collider1: Collider, position2: vec2, collider2: Collider): boolean {
    const bounds1 = collider1.getBounds(position1);
    const bounds2 = collider2.getBounds(position2);
    return UT.COLLIDE_RECT_TO_RECT(
      [bounds1.left, bounds1.top],
      [bounds1.right, bounds1.bottom],
      [bounds2.left, bounds2.top],
      [bounds2.right, bounds2.bottom]
    );
  }
}