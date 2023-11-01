import { UISprite } from '../../lib/ui_sprite/ui_sprite';

const AVATAR_LOCATION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  CENTER: 'CENTER',
  MIDDLE: 'MIDDLE'
};

class UIAvatar extends UISprite {
  constructor() {
    super({
      className: 'UIAvatar'
    });
  }

  changeLocation(location) {
    if (location == AVATAR_LOCATION.MIDDLE) {
      this.node.classList.add('u-middle');
    }
    else if (location == AVATAR_LOCATION.LEFT) {
      this.node.classList.add('u-left');
    }
    else if (location == AVATAR_LOCATION.CENTER) {
      this.node.classList.add('u-center');
    }
    else if (location == AVATAR_LOCATION.RIGHT) {
      this.node.classList.add('u-right');
    }
  }
}

export { AVATAR_LOCATION };
export { UIAvatar };