import { eventManager } from '@lib/core/event_manager';
import { uiManager } from '@lib/ui/ui_manager';
import { dnaManager } from '@lib/dna/dna_manager';
import { UIWidget } from '@lib/ui/ui_widget';
import { DNASystem } from '@lib/dna/dna_system';
// ---------------------------------------------------------------------------------------
import { Health } from '../components/health';
// ---------------------------------------------------------------------------------------

export class HealthSystem extends DNASystem {
  ui: UIHealth;

  constructor() {
    super();
    this.addRequiredComponentTypename('Health');
    this.addRequiredComponentTypename('Player');
    this.ui = new UIHealth();
    uiManager.addWidget(this.ui);
  }

  onEntityBind(eid: number) {
    const health = dnaManager.getComponent(eid, Health);
    this.ui.setNumberLives(health.currentHealth, health.maxHealth);
    eventManager.subscribe(health, 'E_DAMAGE', this, this.handleDamage);
  }

  handleDamage(health: Health) {
    this.ui.setNumberLives(health.currentHealth, health.maxHealth);
  }
}

class UIHealth extends UIWidget {
  constructor() {
    super({
      className: 'UIHealth',
      template: `<div style="display:flex; gap:10px; margin:10px;" class="js-container"></div>`
    });
  }

  setNumberLives(currentHealth: number, maxHealth: number) {
    const container = this.node.querySelector('.js-container')!;
    container.innerHTML = '';

    for (let i = 0; i < currentHealth; i++) {
      const img = document.createElement('img');
      img.src = 'templates/platformer/heart-full.png';
      img.style.width = '20px';
      img.style.imageRendering = 'pixelated';
      container.appendChild(img);
    }

    for (let i = 0; i < maxHealth - currentHealth; i++) {
      const img = document.createElement('img');
      img.src = 'templates/platformer/heart-empty.png';
      img.style.width = '20px';
      img.style.imageRendering = 'pixelated';
      container.appendChild(img);
    }
  }
}