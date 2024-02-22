import { Gfx2IsoDrawable } from './gfx2_iso_drawable';

/**
 * The isometric drawables renderer.
 */
class Gfx2IsoDrawer {
  /**
   * Sort a list of drawable objects by elevation/position and draw them.
   * 
   * @param drawables - The list of drawables.
   */
  static draw(drawables: Array<Gfx2IsoDrawable>): void {
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