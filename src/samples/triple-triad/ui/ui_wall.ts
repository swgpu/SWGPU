import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------
import { Config } from '../config';

enum WallPosition {
  VL = 'VL',
  VR = 'VR',
  HT = 'HT',
  HB = 'HB'
};

class UIWall extends UIWidget {
  constructor(position: WallPosition) {
    super({
      className: 'UIWall',
      template: `
      <img class="UIWall-picture js-wall"/>`
    });

    if (position == WallPosition.VL) {
      this.node.querySelector<HTMLImageElement>('.js-wall')!.src = Config.PATH_CARD + 'wall_vertical_left.png';
    }
    else if (position == WallPosition.VR) {
      this.node.querySelector<HTMLImageElement>('.js-wall')!.src = Config.PATH_CARD + 'wall_vertical_right.png';
    }
    else if (position == WallPosition.HT) {
      this.node.querySelector<HTMLImageElement>('.js-wall')!.src = Config.PATH_CARD + 'wall_horizontal_top.png';
    }
    else if (position == WallPosition.HB) {
      this.node.querySelector<HTMLImageElement>('.js-wall')!.src = Config.PATH_CARD + 'wall_horizontal_bottom.png';
    }
  }
}

export { WallPosition, UIWall };