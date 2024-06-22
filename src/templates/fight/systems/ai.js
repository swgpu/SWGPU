import { dnaManager } from '@lib/dna/dna_manager';
import { UT } from '@lib/core/utils';
import { DNASystem } from '@lib/dna/dna_system';
import { DNAComponent } from '@lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { PositionComponent } from './position';
import { MoveComponent } from './move';
import { DownComponent } from './down';
import { IdleComponent } from './idle';
import { JumpComponent } from './jump';
import { RunComponent } from './run';
import { DamageComponent } from './damage';
import { CASComponent } from './combo';
import { FighterComponent } from './fighter';
// ---------------------------------------------------------------------------------------

export class AIComponent extends DNAComponent {
  constructor(tick = 100, patterns = []) {
    super('AI');
    this.patterns = patterns.sort((a, b) => b.tick - a.tick);
    this.tick = tick;
    this.then = 0;
  }
}

export class AISystem extends DNASystem {
  constructor() {
    super();
    super.addRequiredComponentTypename('AI');
    this.commandRegister = {};
    this.conditionRegister = {};

    this.commandRegister['CMD_WAKEUP'] = function(eid) {
      if (dnaManager.hasComponent(eid, DownComponent)) {
        dnaManager.removeComponentIfExist(eid, DownComponent);
        dnaManager.removeComponentIfExist(eid, IdleComponent);
        dnaManager.addComponent(eid, new IdleComponent());
        return true;
      }

      return false;
    }

    this.commandRegister['CMD_JUMP'] = function(eid) {
      if (dnaManager.hasComponent(eid, IdleComponent) || dnaManager.hasComponent(eid, RunComponent)) {
        dnaManager.removeComponentIfExist(eid, IdleComponent);
        dnaManager.removeComponentIfExist(eid, RunComponent);
        dnaManager.addComponent(eid, new JumpComponent(-25, 10));
        return true;
      }

      return false;
    }

    this.commandRegister['CMD_RUN'] = function(eid, enemyId) {
      if (dnaManager.hasComponent(eid, IdleComponent) || dnaManager.hasComponent(eid, RunComponent)) {
        const position = dnaManager.getComponent(eid, PositionComponent);
        const move = dnaManager.getComponent(eid, MoveComponent);
        const positionEnemy = dnaManager.getComponent(enemyId, PositionComponent);
        const delta = positionEnemy.x - position.x;
  
        if (delta > 0) {
          move.direction = +1;
        }
        else if (delta < 0) {
          move.direction = -1;
        }
  
        dnaManager.removeComponentIfExist(eid, IdleComponent);
        dnaManager.removeComponentIfExist(eid, RunComponent);
        dnaManager.addComponent(eid, new RunComponent(6, 0));
        return true;
      }

      return false;
    }

    this.commandRegister['CMD_IDLE'] = function(eid) {
      if (dnaManager.hasComponent(eid, RunComponent)) {
        dnaManager.removeComponentIfExist(eid, RunComponent);
        dnaManager.removeComponentIfExist(eid, IdleComponent);
        dnaManager.addComponent(eid, new IdleComponent());
        return true;
      }

      return false;
    }

    this.commandRegister['CMD_COMBO'] = function(eid, enemyId, comboName) {
      if (dnaManager.hasComponent(enemyId, DownComponent)) {
        return false;
      }

      if (dnaManager.hasComponent(enemyId, DamageComponent)) {
        return false;
      }

      if (dnaManager.hasComponent(eid, IdleComponent) || dnaManager.hasComponent(eid, RunComponent)) {
        const move = dnaManager.getComponent(eid, MoveComponent);
        const cas = dnaManager.getComponent(eid, CASComponent);
        const combo = cas.comboComponents.find(c => c.name == comboName);
  
        if (combo) {
          move.velocityX = 0;
          cas.currentActionAge = 0;
          cas.currentAction = '';
          dnaManager.removeComponentIfExist(eid, IdleComponent);
          dnaManager.removeComponentIfExist(eid, RunComponent);
          dnaManager.addComponent(eid, combo);
        }
  
        return true;
      }

      return false;
    }

    this.conditionRegister['COND_HEALTH_LESS_THAN'] = function(eid, enemyId, health) {
      const fighter = dnaManager.getComponent(eid, FighterComponent);
      return fighter.health < health;
    } 
  }

  onEntityUpdate(ts, eid) {
    const ai = dnaManager.getComponent(eid, AIComponent);
    const position = dnaManager.getComponent(eid, PositionComponent);

    let enemyId = null;
    let enemyDistance = Infinity;

    for (const targetId of dnaManager.findEntities(FighterComponent)) {
      if (eid == targetId) {
        continue;
      }

      const targetPos = dnaManager.getComponent(targetId, PositionComponent);
      const distance = UT.VEC2_DISTANCE([targetPos.x, targetPos.y], [position.x, position.y]);
      if (distance < enemyDistance) {
        enemyDistance = distance;
        enemyId = targetId;
      }
    }

    for (const pattern of ai.patterns) {
      if (pattern.then < pattern.tick) {
        continue;
      }

      if (pattern.agentHasComponent && !dnaManager.hasComponent(eid, pattern.agentHasComponent)) {
        continue;
      }

      if (pattern.enemyMinDistance && pattern.enemyMinDistance > enemyDistance) {
        continue;
      }

      if (pattern.enemyMaxDistance && pattern.enemyMaxDistance < enemyDistance) {
        continue;
      }

      const condition = this.conditionRegister[pattern.conditionName];
      if (condition && !condition.apply(this, [eid, enemyId, ...pattern.conditionArgs])) {
        continue;
      }

      const cas = dnaManager.getComponent(enemyId, CASComponent);
      if (pattern.enemyAction && cas.currentAction.search(new RegExp(pattern.enemyAction + '$')) == -1) {
        continue;
      }

      const rand = Math.random();
      if (rand > (pattern.percentSuccess / 100)) {
        continue;
      }

      const cmd = this.commandRegister[pattern.commandName];
      if (cmd && cmd.apply(this, [eid, enemyId, ...pattern.commandArgs])) {
        pattern.then = 0;
        break;
      }
    }

    for (const pattern of ai.patterns) {
      if (pattern.then >= pattern.tick) {
        pattern.then = 0;
      }
      else {
        pattern.then += ts;
      }
    }
  }
}