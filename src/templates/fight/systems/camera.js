import { gfx2Manager } from '@lib/gfx2/gfx2_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { UT } from '@lib/core/utils';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { FighterComponent } from './fighter';
import { PositionComponent } from './position';
// ---------------------------------------------------------------------------------------

export class CameraComponent extends DNAComponent {
  constructor() {
    super('Camera');
  }
}

export class CameraSystem extends DNASystem {
  constructor(bgWidth, bgHeight) {
    super();
    this.bgWidth = bgWidth;
    this.bgHeight = bgHeight;
    super.addRequiredComponentTypename('Camera');
  }

  onEntityUpdate(ts, eid) {
    const fighters = dnaManager.findEntities(FighterComponent);
    let minX = Infinity, minY = Infinity;
    let maxX = 0, maxY = 0;

    for (let fighter of fighters) {
      const position = dnaManager.getComponent(fighter, PositionComponent);
      if (minX > position.x) minX = position.x;
      if (maxX < position.x) maxX = position.x;
      if (minY > position.y) minY = position.y;
      if (maxY < position.y) maxY = position.y;
    }

    const deltaX = (maxX - minX) + (88 * 2); // 88 * 2 is body margin
    const deltaY = (maxY - minY) + (88 * 2); // 88 * 2 is body margin

    const halfScreenWidth = gfx2Manager.getWidth() * 0.5;
    const halfScreenHeight = gfx2Manager.getHeight() * 0.5;

    const ratioDeltaWidth = UT.CLAMP(gfx2Manager.getWidth() / deltaX, 1, 1.3);
    const ratioDeltaHeight = UT.CLAMP(gfx2Manager.getHeight() / deltaY, 1, 1.3);
    const ratio = Math.min(ratioDeltaWidth, ratioDeltaHeight);

    let centerX = minX + ((maxX - minX) / 2);
    let centerY = minY + ((maxY - minY) / 2);

    if (centerX < (halfScreenWidth / ratio)) {
      centerX = halfScreenWidth / ratio;
    }
    else if (centerX > this.bgWidth - (halfScreenWidth / ratio)) {
      centerX = this.bgWidth - (halfScreenWidth / ratio);
    }

    if (centerY < halfScreenHeight / ratio) {
      centerY = halfScreenHeight / ratio;
    }
    else if (centerY > this.bgHeight - (halfScreenHeight / ratio)) {
      centerY = this.bgHeight - (halfScreenHeight / ratio);
    }

    gfx2Manager.setCameraScale(ratio, ratio);
    gfx2Manager.setCameraPosition(centerX, centerY);
  }
}