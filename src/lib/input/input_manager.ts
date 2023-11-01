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
 * The `InputManager` class is a singleton responsible for managing input from various sources such as keyboard and
 * gamepad, registering actions, and emitting events based on user input.
 */
class InputManager {
  keymap: Map<string, boolean>;
  actionmap: Map<string, boolean>;
  actionRegister: Array<Action>;
  pads: Array<Pad>;
  padsInterval: number | undefined;

  /**
   * The constructor.
   */
  constructor() {
    this.keymap = new Map<string, boolean>;
    this.actionmap = new Map<string, boolean>;
    this.actionRegister = [];
    this.pads = [];
    this.padsInterval;

    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    window.addEventListener('gamepadconnected', (e) => this.handleGamePadConnected(e));
    window.addEventListener('gamepaddisconnected', (e) => this.handleGamePadDisconnected(e));

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
   * The "getPad" function returns the specified Pad.
   * @param {number} index - The `index` parameter is a number that represents the index of the pad we
   * want to retrieve.
   * @returns The pad or undefined if not found.
   */
  getPad(index: number): Pad | undefined {
    return this.pads.find(p => p.index == index);
  }

  /**
   * The "addPad" function adds a pad to the manager.
   * It update the pads' status every 50ms.
   * @param {Pad} pad - The new pad.
   */
  addPad(pad: Pad): void {
    this.pads.push(pad);
    if (this.padsInterval === null) {
      this.padsInterval = setInterval(() => this.$updatePadsStatus(), 50);
    }
  }

  /**
   * The "removePad" function removes a pad from the manager.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the pad
   * that needs to be removed.
   */
  removePad(id: string): void {
    this.pads = this.pads.filter(p => p.id != id);
    if (this.pads.length <= 0) {
      clearInterval(this.padsInterval);
      this.padsInterval = undefined;
    }
  }

  /**
   * The "registerAction" function registers an action with a unique ID, input source, and event key, and
   * adds it to the action register if it doesn't already exist.
   * @param {string} inputSource - The input source refers to the device or method from which the input
   * is received. It could be a keyboard, mouse, gamepad, or any other input device.
   * @param {string} eventKey - The `eventKey` parameter represents the key or button that triggers the
   * action. It could be a keyboard key, a mouse button, or a gamepad button.
   * @param {string} actionId - The `actionId` parameter is a string that represents the unique
   * identifier for the action being registered.
   * @returns void, which means it does not return any value.
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
   * The "unregisterAction" function removes an action for the specific input source and event key.
   * @param {string} inputSource - The input source refers to the device or method from which the input
   * is received. It could be a keyboard, mouse, touch screen, or any other input device.
   * @param {string} eventKey - The eventKey parameter is a string that represents the key or event that
   * triggers the action. It could be a keyboard key, a mouse button, or any other input event.
   * @param {string} actionId - The `actionId` parameter is a string that represents the unique
   * identifier of the action that needs to be unregistered.
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
   * The "findActionIds" function takes an input source and an event key, and returns an array of action
   * IDs that match the given input source and event key.
   * @param {string} inputSource - The `inputSource` parameter is a string that represents the source of
   * the input. It could be a device, such as a keyboard or mouse, or any other input source.
   * @param {string} eventKey - The `eventKey` parameter is a string that represents the key of the
   * event. It is used to filter the actions based on the event key.
   * @returns an array of strings, which are the action IDs that match the given inputSource and
   * eventKey.
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
   * The "isActiveAction" function checks if an action is currently active.
   * @param {string} actionId - A string representing the ID of the action.
   * @returns a boolean value indicating if action is active or not.
   */
  isActiveAction(actionId: string): boolean | undefined {
    return this.actionmap.get(actionId);
  }

  /**
   * The "handleGamePadDisconnected" function.
   * It removes a gamepad from the system when it is disconnected.
   * @param {GamepadEvent} e - GamepadEvent - This is an event object that contains information about the
   * gamepad that was disconnected.
   */
  handleGamePadDisconnected(e: GamepadEvent): void {
    this.removePad(e.gamepad.id);
  }

  /**
   * The "handleGamePadConnected" function.
   * It adds a gamepad to the system when it is connected.
   * @param {GamepadEvent} e - GamepadEvent - The event object that is triggered when a gamepad is
   * connected.
   */
  handleGamePadConnected(e: GamepadEvent): void {
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

    this.addPad(pad);
  }

  /**
   * The "handleKeyDown" function.
   * It handles keydown events by emitting action events and updating the keymap and actionmap.
   * @param {KeyboardEvent} e - The parameter "e" is of type KeyboardEvent, which represents a keyboard
   * event that occurs when a key is pressed or released.
   */
  handleKeyDown(e: KeyboardEvent): boolean {
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

  /**
   * The "handleKeyUp" function.
   * It handles key up events by emitting an action released event and updating the keymap and
   * actionmap.
   * @param {KeyboardEvent} e - KeyboardEvent - The event object that contains information about the
   * keyboard event that occurred.
   */
  handleKeyUp(e: KeyboardEvent): void {
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