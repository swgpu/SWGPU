import { DNAComponent } from '../../../lib/dna/dna_component';

export class ComboComponent extends DNAComponent {
  constructor(requiredComponent = '', actions = '', animationName = '', hits = []) {
    super('Combo');
    this.requiredComponent = requiredComponent;
    this.actions = actions;
    this.animationName = animationName;
    this.hits = hits;
    this.currentAttack = null;
  }
}