import { eventManager } from '@lib/core/event_manager';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------

export class Health extends DNAComponent {
  maxHealth: number;
  currentHealth: number;
  lastDamage: null | number;

  constructor(maxHealth: number) {
    super('Health');
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.lastDamage = null;
  }

	takeDamage() {
    if (!this.lastDamage || this.lastDamage + 1000 < Date.now()) {
      this.currentHealth = Math.max(0, this.currentHealth - 1);
      this.lastDamage = Date.now();
      eventManager.emit(this, 'E_DAMAGE', this);
    }
  }
}