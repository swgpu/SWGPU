import { Gfx2Drawable } from './gfx2_drawable';

/**
 * The 2D drawables renderer.
 */
class Gfx2Drawer {
  /**
   * Sort a list of drawable objects by z-index and draw them in the correct order.
   * 
   * @param drawables - The list of drawables.
   */
  static draw(drawables: Array<Gfx2Drawable>): void {
    drawables.sort((a, b) => {
      return a.getPositionZ() - b.getPositionZ();
    });

    for (const drawable of drawables) {
      drawable.draw();
    }
  }
}

export { Gfx2Drawer };