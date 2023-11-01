import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------
import { Config } from '../config';

class UIBackground extends UIWidget {
  constructor() {
    super({
      className: 'UIBackgroundTTT',
      template: `
      <img class="UIBackgroundTTT-picture js-background"/>`
    });

    this.node.querySelector<HTMLImageElement>('.js-background')!.src = Config.PATH_CARD + 'background.png';
  }
}

export { UIBackground };