import { EffectAbstract } from './effect_abstract';
import { Direction, TypeEffect, PriorityEffect } from './enums';
import { GameState } from './game_state';

//
// on calcule la somme de la valeur de la carte entrée en jeu avec la valeur vis à vis de son voisin et ceux pour chaque voisin
//
class PlusEffect extends EffectAbstract {
  constructor() {
    super(PriorityEffect.IDENTIQUE, TypeEffect.IN_BATTLE);
  }

  apply(gameState: GameState, pos: vec2): number {
    let cptPlayer1Gain = 0;
    const listSum = new Array<number>();
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
      if (neighbourCard == null) {
        continue;
      }

      listSum.push(currentCard.getValue(dir) + neighbourCard.getOpposedValue(dir));
      listCoord.push(neighbourPos);
    }

    //on regarde s'il y a deux sommes identique
    let flagPlus = false;

    loop1: for (let i = 0; i < listSum.length - 1; i++) {
      for (let j = i + 1; j < listSum.length; j++) {
        if (listSum[i] == listSum[j]) {
          flagPlus = true;
          break loop1;
        }
      }
    }

    //si il y a des sommes identiques, toutes les cartes sont vaincu
    if (flagPlus) {
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
    }

    return cptPlayer1Gain;
  }
}

export { PlusEffect };