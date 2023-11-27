import { UIWidget } from '../../../lib/ui/ui_widget';
// ---------------------------------------------------------------------------------------
import { MAX_HEALTH } from '../enums';
// ---------------------------------------------------------------------------------------

class UIHealthBar extends UIWidget {
  constructor() {
    super({
      className: 'UIHealthBar',
      template: `
      <img class="UIHealthBar-picture js-picture"/>
      <div class="UIHealthBar-content">
        <div class="UIHealthBar-bar js-bar">
          <div class="UIHealthBar-bar-progress js-progress">
            <div class="UIHealthBar-bar-progress-life js-progress-life"></div>
          </div>
        </div>
        <div class="UIHealthBar-name js-name"></div>
      </div>`
    });
  }

  setHealth(health) {
    const progress = this.node.querySelector('.js-progress');
    const life = this.node.querySelector('.js-progress-life');
    const ratio = health / MAX_HEALTH;
    life.style.width = progress.clientWidth * ratio + 'px';
  }
  
  setPicture(picture) {
    const img = this.node.querySelector('.js-picture');
    img.src = picture;
  }

  setName(name) {
    this.node.querySelector('.js-name').textContent = name;
  }
}

export { UIHealthBar };