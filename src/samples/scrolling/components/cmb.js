import { DNAComponent } from '../../../lib/dna/dna_component';

export class CMBComponent extends DNAComponent {
  constructor(animations, texture, comboComponents = []) {
    super('CMB');
    this.animations = animations;
    this.texture = texture;
    this.comboComponents = comboComponents;
    this.currentAction = [];
    this.currentActionAge = 0;
    
  }
}