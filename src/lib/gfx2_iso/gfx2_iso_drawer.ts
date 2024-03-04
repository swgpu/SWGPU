import { Gfx2Drawable } from '../gfx2/gfx2_drawable';

/**
 * The isometric drawables renderer.
 */
class Gfx2IsoDrawer {
  /**
   * Sort a list of drawable objects by elevation/position and draw them in the correct order.
   * 
   * @param drawables - The list of drawables.
   */
  static draw(drawables: Array<Gfx2Drawable>): void {
    drawables.sort((a, b) => {
      if (a.getElevation() < b.getElevation()) {
        return -1;
      }

      if (a.getElevation() > b.getElevation()) {
        return 1;
      }

      return a.getPositionY() - b.getPositionY();
    });

    for (const drawable of drawables) {
      drawable.draw();
    }
  }
}

export { Gfx2IsoDrawer };