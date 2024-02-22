import { eventManager } from '../core/event_manager';

interface Pad {
  index: number;
  id: string;
  nButtons: number;
  nAxes: number;
  axes: Array<number>;
  pressed: Array<boolean>;
}

interface Action {
  id: string;
  inputSource: string;
  eventKey: string;
}

// standard mapping https://w3c.github.io/gamepad/#remapping
const GAME_PAD_KEY_MAPPING = new Map<string, string>();
GAME_PAD_KEY_MAPPING.set('0', '0');
GAME_PAD_KEY_MAPPING.set('1', '1');
GAME_PAD_KEY_MAPPING.set('BtnSelect', '8');
GAME_PAD_KEY_MAPPING.set('PadTop', '12');
GAME_PAD_KEY_MAPPING.set('PadBottom', '13');
GAME_PAD_KEY_MAPPING.set('PadLeft', '14');
GAME_PAD_KEY_MAPPING.set('PadRight', '15');

/**
 * Singleton input manager.
 * Handle various sources such as keyboard and gamepad.
 */
class InputManager {
  keymap: Map<string, boolean>;
  actionmap: Map<string, boolean>;
  actionRegister: Array<Action>;
  pads: Array<Pad>;
  padsInterval: number | undefined;

  constructor() {
    this.keymap = new Map<string, boolean>;
    this.actionmap = new Map<string, boolean>;
    this.actionRegister = [];
    this.pads = [];
    this.padsInterval;

    document.addEventListener('keydown', (e) => this.$handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.$handleKeyUp(e));
    window.addEventListener('gamepadconnected', (e) => this.$handleGamePadConnected(e));
    window.addEventListener('gamepaddisconnected', (e) => this.$handleGamePadDisconnected(e));

    this.registerAction('keyboard', 'Enter', 'OK');
    this.registerAction('keyboard', 'Escape', 'BACK');
    this.registerAction('keyboard', ' ', 'SELECT');
    this.registerAction('keyboard', 'ArrowLeft', 'LEFT');
    this.registerAction('keyboard', 'ArrowRight', 'RIGHT');
    this.registerAction('keyboard', 'ArrowUp', 'UP');
    this.registerAction('keyboard', 'ArrowDown', 'DOWN');

    this.registerAction('gamepad0', '0', 'OK');
    this.registerAction('gamepad0', '1', 'BACK');
    this.registerAction('gamepad0', 'BtnSelect', 'SELECT');
    this.registerAction('gamepad0', 'PadLeft', 'LEFT');
    this.registerAction('gamepad0', 'PadRight', 'RIGHT');
    this.registerAction('gamepad0', 'PadTop', 'UP');
    this.registerAction('gamepad0', 'PadBottom', 'DOWN');
  }

  /**
   * Returns a pad or undefined if not found.
   * Note: Pads are automatically added on plug-in.
   * 
   * @param {number} index - The index of the pad.
   */
  getPad(index: number): Pad | undefined {
    return this.pads.find(p => p.index == index);
  }

  /**
   * Removes a pad.
   * 
   * @param {string} id - The unique identifier of the pad
   */
  removePad(id: string): void {
    this.pads = this.pads.filter(p => p.id != id);
    if (this.pads.length <= 0) {
      clearInterval(this.padsInterval);
      this.padsInterval = undefined;
    }
  }

  /**
   * Add an action mapping.
   * 
   * @param {string} inputSource - The device from which the input is received.
   * @param {string} eventKey - The key or button that triggers the action.
   * @param {string} actionId - The unique action identifier.
   */
  registerAction(inputSource: string, eventKey: string, actionId: string): void {
    const found = this.actionRegister.find(a => {
      return a.inputSource == inputSource &&
        a.eventKey == eventKey &&
        a.id == actionId
    });

    if (found) {
      return;
    }

    this.actionRegister.push({
      id: actionId,
      inputSource: inputSource,
      eventKey: inputSource.startsWith('gamepad') ? GAME_PAD_KEY_MAPPING.get(eventKey)! : eventKey
    });
  }

  /**
   * Remove an action mapping.
   * 
   * @param {string} inputSource - The device from which the input is received.
   * @param {string} eventKey - The key or button that triggers the action.
   * @param {string} actionId - The unique action identifier.
   */
  unregisterAction(inputSource: string, eventKey: string, actionId: string): void {
    const index = this.actionRegister.findIndex(a => {
      return a.inputSource == inputSource &&
        a.eventKey == eventKey &&
        a.id == actionId
    });

    if (index == -1) {
      throw new Error('InputManager::unregisterAction(): action not found !');
    }

    this.actionRegister.splice(index, 1);
  }

  /**
   * Returns the action list that match the given input source and event key.
   * 
   * @param {string} inputSource - The device from which the input is received.
   * @param {string} eventKey - The key or button that triggers the action.
   */
  findActionIds(inputSource: string, eventKey: string): Array<string> {
    const actionIds = []
    for (const action of this.actionRegister) {
      if (action.inputSource == inputSource && action.eventKey == eventKey) {
        actionIds.push(action.id);
      }
    }

    return actionIds;
  }

  /**
   * Checks if an action is currently active.
   * 
   * @param {string} actionId - The action identifier.
   */
  isActiveAction(actionId: string): boolean | undefined {
    return this.actionmap.get(actionId);
  }

  $addPad(pad: Pad): void {
    this.pads.push(pad);
    if (this.padsInterval === null) {
      this.padsInterval = setInterval(() => this.$updatePadsStatus(), 50);
    }
  }

  $handleGamePadDisconnected(e: GamepadEvent): void {
    this.removePad(e.gamepad.id);
  }

  $handleGamePadConnected(e: GamepadEvent): void {
    const pad: Pad = {
      index: e.gamepad.index,
      id: e.gamepad.id,
      nButtons: e.gamepad.buttons.length,
      nAxes: e.gamepad.axes.length,
      axes: e.gamepad.axes as Array<number>,
      pressed: []
    };

    for (let i = 0; i < e.gamepad.buttons.length; i++) {
      pad.pressed[i] = e.gamepad.buttons[i].pressed;
    }

    this.$addPad(pad);
  }

  $handleKeyDown(e: KeyboardEvent): boolean {
    if (!this.keymap.get(e.key)) {
      for (const actionId of this.findActionIds('keyboard', e.key)) {
        eventManager.emit(this, 'E_ACTION_ONCE', { actionId: actionId });
        this.actionmap.set(actionId, true);
      }
    }

    for (const actionId of this.findActionIds('keyboard', e.key)) {
      eventManager.emit(this, 'E_ACTION', { actionId: actionId });
      this.actionmap.set(actionId, true);
    }

    this.keymap.set(e.key, true);

    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  $handleKeyUp(e: KeyboardEvent): void {
    for (const actionId of this.findActionIds('keyboard', e.key)) {
      eventManager.emit(this, 'E_ACTION_RELEASED', { actionId: actionId });
      this.actionmap.set(actionId, false);
    }

    this.keymap.set(e.key, false);
  }

  $updatePadsStatus(): void {
    const navigator: any = window.navigator;
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);

    for (const gamepad of gamepads) {
      if (!gamepad) {
        continue;
      }

      const pad = this.getPad(gamepad.index);
      if (pad != null) {
        for (let n = 0; n < gamepad.buttons.length; n++) {
          if (gamepad.buttons[n].pressed == pad.pressed[n]) {
            continue;
          }

          for (const actionId of this.findActionIds('gamepad' + gamepad.index, n.toString())) {
            this.actionmap.set(actionId, gamepad.buttons[n].pressed);
            if (gamepad.buttons[n].pressed) {
              eventManager.emit(this, 'E_ACTION', { actionId: actionId });
            }
          }

          this.keymap.set('gamepad' + gamepad.index + '-' + n, gamepad.buttons[n].pressed);
          pad.pressed[n] = gamepad.buttons[n].pressed;
        }
      }
    }
  }
}

export { InputManager };
export const inputManager = new InputManager();
