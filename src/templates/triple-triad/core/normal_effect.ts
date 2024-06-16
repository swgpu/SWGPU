import { EffectAbstract } from './effect_abstract';
import { Direction, TypeEffect, PriorityEffect } from './enums';
import { GameState } from './game_state';

class NormalEffect extends EffectAbstract {
  constructor() {
    super(PriorityEffect.NORMAL, TypeEffect.IN_BATTLE);
  }

  apply(gameState: GameState, pos: vec2): number {
    let cptPlayer1Gain = 0; 
    const currentCard = gameState.getCardFromBoard(pos);
    if (currentCard == null) {
      throw new Error('NormalEffect::apply(): target pos empty !');
    }

    for (let dir = 0; dir < Object.keys(Direction).length; dir++) {
      const neighbourPos = gameState.getCoordinateNeighbourCardFromBoard(pos, dir);
      if (neighbourPos == null) {
        continue;
      }

      const neighbourCard = gameState.getCardFromBoard(neighbourPos);
      if (neighbourCard == null) {
        continue;
      }

      if (neighbourCard.getOwner() != currentCard.getOwner() && currentCard.getValue(dir) > neighbourCard.getOpposedValue(dir)) {
        neighbourCard.flipPlayerOwner();
        if (neighbourCard.getOwner() == 1) {
          cptPlayer1Gain += 1;
        }
        else {
          cptPlayer1Gain -= 1;
        }
      }
    }

    return cptPlayer1Gain;
  }
}

export { NormalEffect };