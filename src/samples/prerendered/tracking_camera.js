import { gfx3Manager } from '../../lib/gfx3/gfx3_manager';
import { UT } from '../../lib/core/utils';
import { ProjectionMode } from '../../lib/gfx3/gfx3_view';
// ---------------------------------------------------------------------------------------

class TrackingCamera {
  constructor(viewIndex) {
    this.target = null;
    this.minClipOffset = [0, 0];
    this.maxClipOffset = [0, 0];
    this.view = gfx3Manager.getView(viewIndex);
    this.view.setProjectionMode(ProjectionMode.PERSPECTIVE);
  }

  async loadFromData(data) {
    this.minClipOffset[0] = data['MinClipOffsetX'];
    this.minClipOffset[1] = data['MinClipOffsetY'];
    this.maxClipOffset[0] = data['MaxClipOffsetX'];
    this.maxClipOffset[1] = data['MaxClipOffsetY'];
    this.view.setCameraMatrix(data['Matrix']);
    this.view.setPerspectiveFovy(UT.DEG_TO_RAD(parseInt(data['Fovy'])));
  }

  update(ts) {
    if (!this.target) {
      return;
    }

    let clipOffset = this.view.getClipOffset();
    let targetWorldPosition = this.target.getPosition();
    let targetScreenPosition = this.view.getScreenNormalizedPosition(targetWorldPosition[0], targetWorldPosition[1], targetWorldPosition[2]);

    this.view.setClipOffset(
      UT.CLAMP(targetScreenPosition[0] + clipOffset[0], this.minClipOffset[0], this.maxClipOffset[0]),
      UT.CLAMP(targetScreenPosition[1] + clipOffset[1], this.minClipOffset[1], this.maxClipOffset[1])
    );
  }

  setTarget(target) {
    this.target = target;
  }
}

export { TrackingCamera };