import { DNAComponent } from '@lib/dna/dna_component';
import { UT } from '@lib/core/utils';
// ---------------------------------------------------------------------------------------

export class ColliderComponent extends DNAComponent {
  constructor(width, height) {
    super('Collider');
    this.width = width;
    this.height = height;
    this.min = [-width / 2, -height / 2];
    this.max = [+width / 2, +height / 2];
  }

  getBounds(x, y) {
    return {
      left: x + this.min[0],
      right: x + this.max[0],
      bottom: y + this.max[1],
      top: y + this.min[1]
    }
  }

  static isCollide(position1, collider1, position2, collider2) {
    const bounds1 = collider1.getBounds(position1.x, position1.y);
    const bounds2 = collider2.getBounds(position2.x, position2.y);
    return UT.COLLIDE_RECT_TO_RECT(
      [bounds1.left, bounds1.top],
      [bounds1.right, bounds1.bottom],
      [bounds2.left, bounds2.top],
      [bounds2.right, bounds2.bottom]
    );
  }
}