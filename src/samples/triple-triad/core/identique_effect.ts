import { EffectAbstract } from './effect_abstract';
import { Direction, TypeEffect, PriorityEffect } from './enums';
import { GameState } from './game_state';

//
// on vérifie si le nombre de fois que la valeur de la carte posée est identique à celle de son voisin est supérieur a 2
//
class IdentiqueEffect extends EffectAbstract {
  constructor() {
    super(PriorityEffect.IDENTIQUE, TypeEffect.IN_BATTLE);
  }

  apply(gameState: GameState, pos: vec2): number {
    let cptPlayer1Gain = 0;
    const listCoord = new Array<vec2>();
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
      if (neighbourCard != null && currentCard.getValue(dir) == neighbourCard.getOpposedValue(dir)) {
        listCoord.push(neighbourPos);
      }
    }

    //si il y a des sommes identiques, toutes les cartes sont vaincu
    for (let i = 0; i < listCoord.length; i++) {
      const neighbourCard = gameState.getCardFromBoard(listCoord[i]);
      if (neighbourCard == null) {
        continue;
      }

      // si la carte voisine est une carte ennemi, elle devient une carte allié
      if (neighbourCard.getOwner() != currentCard.getOwner()) {
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

export { IdentiqueEffect };