import { PriorityEffect, TypeEffect } from './enums';
import { GameState } from './game_state';

abstract class EffectAbstract {
  priority: PriorityEffect;
  type: TypeEffect;

  constructor(priority: PriorityEffect, type: TypeEffect) {
    this.priority = priority;
    this.type = type;
  }

  apply(gameState: GameState, targetPos: vec2): number {
    // virtual-pure method.
    return 0;
  }
}

export { EffectAbstract };