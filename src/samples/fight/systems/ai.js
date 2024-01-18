import { dnaManager } from '../../../lib/dna/dna_manager';
import { UT } from '../../../lib/core/utils';
import { DNASystem } from '../../../lib/dna/dna_system';
import { DNAComponent } from '../../../lib/dna/dna_component';
// ---------------------------------------------------------------------------------------
import { IdleComponent } from './idle';
import { JumpComponent } from './jump';
import { RunComponent } from './run';
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

    this.commandRegister['CMD_WAKEUP'] = function(entity) {
      if (!dnaManager.hasComponent(entity, 'Down')) {
        return false;
      }

      dnaManager.removeComponent(entity, 'Down');
      dnaManager.addComponent(entity, new IdleComponent());
      return true;
    }

    this.commandRegister['CMD_JUMP'] = function(entity) {
      if (dnaManager.hasComponent(entity, 'Combo')) {
        return false;
      }

      if (dnaManager.hasComponent(entity, 'Jump')) {
        return false;
      }

      if (dnaManager.hasComponent(entity, 'Damage')) {
        return false;
      }

      dnaManager.removeComponentIfExist(entity, 'Idle');
      dnaManager.removeComponentIfExist(entity, 'Run');
      dnaManager.addComponent(entity, new JumpComponent(-25, 10));
      return true;
    }

    this.commandRegister['CMD_RUN'] = function(entity, enemyEntity) {
      if (dnaManager.hasComponent(entity, 'Combo')) {
        return false;
      }

      if (dnaManager.hasComponent(entity, 'Jump')) {
        return false;
      }

      if (dnaManager.hasComponent(entity, 'Down')) {
        return false;
      }

      if (dnaManager.hasComponent(entity, 'Damage')) {
        return false;
      }

      const position = dnaManager.getComponent(entity, 'Position');
      const move = dnaManager.getComponent(entity, 'Move');
      const positionEnemy = dnaManager.getComponent(enemyEntity, 'Position');
      const delta = positionEnemy.x - position.x;

      if (delta > 0) {
        move.direction = +1;
      }
      else if (delta < 0) {
        move.direction = -1;
      }

      dnaManager.removeComponentIfExist(entity, 'Idle');
      dnaManager.removeComponentIfExist(entity, 'Run');
      dnaManager.addComponent(entity, new RunComponent(6, 0));
      return true;
    }

    this.commandRegister['CMD_IDLE'] = function(entity) {
      if (dnaManager.hasComponent(entity, 'Combo')) {
        return false;
      }

      if (dnaManager.hasComponent(entity, 'Idle')) {
        return false;
      }

      if (dnaManager.hasComponent(entity, 'Damage')) {
        return false;
      }

      dnaManager.removeComponentIfExist(entity, 'Run');
      dnaManager.removeComponentIfExist(entity, 'Idle');
      dnaManager.addComponent(entity, new IdleComponent());
      return true;
    }

    this.commandRegister['CMD_COMBO'] = function(entity, enemyEntity, comboName) {
      if (dnaManager.hasComponent(entity, 'Combo')) {
        return false;
      }

      if (dnaManager.hasComponent(enemyEntity, 'Down')) {
        return false;
      }

      if (dnaManager.hasComponent(entity, 'Damage')) {
        return false;
      }

      const move = dnaManager.getComponent(entity, 'Move');
      const cas = dnaManager.getComponent(entity, 'CAS');
      const combo = cas.comboComponents.find(c => c.name == comboName);

      if (combo) {
        move.velocityX = 0;
        cas.currentActionAge = 0;
        cas.currentAction = '';
        dnaManager.removeComponentIfExist(entity, 'Idle');
        dnaManager.removeComponentIfExist(entity, 'Run');
        dnaManager.addComponent(entity, combo);
        return true;
      }
    }

    this.conditionRegister['CND_HEALTH_LESS_THAN'] = function(entity, enemyEntity, health) {
      const fighter = dnaManager.getComponent(entity, 'Fighter');
      return fighter.health < health;
    } 
  }

  onEntityUpdate(ts, entity) {
    const ai = dnaManager.getComponent(entity, 'AI');
    const position = dnaManager.getComponent(entity, 'Position');

    let enemyEntity = null;
    let enemyDistance = Infinity;

    for (const targetEntity of dnaManager.findEntities('Fighter')) {
      if (entity != targetEntity) {
        const targetPos = dnaManager.getComponent(targetEntity, 'Position');
        const distance = UT.VEC2_DISTANCE([targetPos.x, targetPos.y], [position.x, position.y]);
        if (distance < enemyDistance) {
          enemyDistance = distance;
          enemyEntity = targetEntity;
        }
      }
    }

    const rand = Math.random();

    for (const pattern of ai.patterns) {
      if (pattern.then < pattern.tick) {
        continue;
      }

      if (pattern.agentHasComponent && !dnaManager.hasComponent(entity, pattern.agentHasComponent)) {
        continue;
      }

      if (pattern.enemyMinDistance && pattern.enemyMinDistance > enemyDistance) {
        continue;
      }

      if (pattern.enemyMaxDistance && pattern.enemyMaxDistance < enemyDistance) {
        continue;
      }

      const condition = this.conditionRegister[pattern.conditionName];
      if (pattern.conditionName && !condition.apply(this, [entity, enemyEntity, ...pattern.conditionArgs])) {
        continue;
      }

      const cas = dnaManager.getComponent(enemyEntity, 'CAS');
      if (pattern.enemyAction && cas.currentAction.search(new RegExp(pattern.enemyAction + '$')) == -1) {
        continue;
      }

      if (rand > (pattern.percentSuccess / 100)) {
        pattern.then = 0;
        continue;
      }

      const cmd = this.commandRegister[pattern.commandName];
      if (cmd && cmd.apply(this, [entity, enemyEntity, ...pattern.commandArgs])) {
        pattern.then = 0;
        break;
      }
    }

    for (const pattern of ai.patterns) {
      pattern.then += ts;
    }
  }
}