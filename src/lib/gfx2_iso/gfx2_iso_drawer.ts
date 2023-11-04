import { Gfx2IsoDrawable } from './gfx2_iso_drawable';

/**
 * The `Gfx2IsoDrawer` class is a singleton manager responsible to display isometric drawables.
 */
class Gfx2IsoDrawer {
  static draw(drawables: Array<Gfx2IsoDrawable>, accuracyMin: number = -3, accuracyMax: number = 3): void {
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