import { DownComponent } from '../systems/down';
// ---------------------------------------------------------------------------------------

const AIPatternFactory = {
  BASE: () => {
    return [{
      name: 'WAKE_UP',
      agentHasComponent: DownComponent,
      enemyAction: null,
      enemyMinDistance: 0,
      enemyMaxDistance: Infinity,
      tick: 100,
      then: 0,
      percentSuccess: 100,
      commandName: 'CMD_WAKEUP',
      commandArgs: [],
      conditionName: null,
      conditionArgs: []
    },{
      name: 'PUNCH',
      agentHasComponent: null,
      enemyAction: null,
      enemyMinDistance: 0,
      enemyMaxDistance: 90,
      tick: 500,
      then: 0,
      percentSuccess: 50,
      commandName: 'CMD_COMBO',
      commandArgs: ['PUNCH'],
      conditionName: null,
      conditionArgs: []
    },{
      name: 'SPECIAL',
      agentHasComponent: null,
      enemyAction: null,
      enemyMinDistance: 10,
      enemyMaxDistance: 90,
      tick: 1000,
      then: 0,
      percentSuccess: 50,
      commandName: 'CMD_COMBO',
      commandArgs: ['SPECIAL'],
      conditionName: null,
      conditionArgs: []
    },{
      name: 'IDLE',
      agentHasComponent: null,
      enemyAction: null,
      enemyMinDistance: 0,
      enemyMaxDistance: 90,
      tick: 50,
      then: 0,
      percentSuccess: 100,
      commandName: 'CMD_IDLE',
      commandArgs: [],
      conditionName: null,
      conditionArgs: []
    },{
      name: 'RUN',
      agentHasComponent: null,
      enemyAction: null,
      enemyMinDistance: 80,
      enemyMaxDistance: Infinity,
      tick: 1500,
      then: 0,
      percentSuccess: 100,
      commandName: 'CMD_RUN',
      commandArgs: [],
      conditionName: null,
      conditionArgs: []
    }];
  }
};

export { AIPatternFactory };