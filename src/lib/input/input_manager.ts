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
 * Handle various sources such as keyboard, mouse and gamepad.
 * It emit 'E_ACTION_ONCE' on new action touch.
 * It emit 'E_ACTION' on action touch.
 * It emit 'E_ACTION_RELEASED' on action touch released.
 * It emit 'E_MOUSE_DOWN' on mouse buttons pressed.
 * It emit 'E_MOUSE_UP' on mouse buttons released.
 * It emit 'E_MOUSE_MOVE' on mouse moving.
 * It emit 'E_MOUSE_DRAG' on mouse dragging.
 * It emit 'E_MOUSE_WHEEL' on mouse wheeling.
 */
class InputManager {
  keymap: Map<string, boolean>;
  actionmap: Map<string, boolean>;
  actionRegister: Array<Action>;
  pads: Array<Pad>;
  padsInterval: number | undefined;
  mouseDown: boolean;
  mousePosition: vec2;
  mouseWheel: number;
  dragStartPosition: vec2;

  constructor() {
    this.keymap = new Map<string, boolean>;
    this.actionmap = new Map<string, boolean>;
    this.actionRegister = [];
    this.pads = [];
    this.padsInterval;
    this.mouseDown = false;
    this.mousePosition = [0, 0];
    this.mouseWheel = 0;
    this.dragStartPosition = [0, 0];

    document.addEventListener('keydown', (e) => this.$handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.$handleKeyUp(e));
    document.addEventListener('pointerdown', (e) => this.$handlePointerDown(e));
    document.addEventListener('pointerup', () => this.$handlePointerUp());
    document.addEventListener('pointermove', (e) => this.$handlePointerMove(e));
    document.addEventListener('wheel', (e) => this.$handleWheel(e), { passive: false });
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

  /**
   * Checks if mouse click is currently active.
   */
  isMouseDown(): boolean {
    return this.mouseDown;
  }

  /**
   * Returns the mouse position.
   */
  getMousePosition(): vec2 {
    return this.mousePosition;
  }

  /**
   * Returns the mouse wheel value.
   */
  getMouseWheel(): number {
    return this.mouseWheel;
  }

  /**
   * Returns the current drag movement.
   */
  getDragDelta(): vec2 {
    if (!this.mouseDown) {
      return [0, 0];
    }

    return [
      this.mousePosition[0] - this.dragStartPosition[0],
      this.mousePosition[1] - this.dragStartPosition[1]
    ];
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

  $addPad(pad: Pad): void {
    this.pads.push(pad);
    if (this.padsInterval === null) {
      this.padsInterval = setInterval(() => this.$updatePadsStatus(), 50);
    }
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

  $handlePointerDown(e: PointerEvent): void {
    this.mouseDown = true;
    this.dragStartPosition[0] = e.clientX;
    this.dragStartPosition[1] = e.clientY;
    eventManager.emit(this, 'E_MOUSE_DOWN', { buttons: e.buttons });
  }

  $handlePointerUp(): void {
    this.mouseDown = false;
    this.dragStartPosition[0] = 0;
    this.dragStartPosition[1] = 0;
    eventManager.emit(this, 'E_MOUSE_UP');
  }

  $handlePointerMove(e: PointerEvent): void {
    this.mouseDown = e.pointerType == 'mouse' ? (e.buttons & 1) !== 0 : true;
    this.mousePosition = [e.clientX, e.clientY];
    eventManager.emit(this, 'E_MOUSE_MOVE', { movementX: e.movementX, movementY: e.movementY });

    if (this.mouseDown) {
      eventManager.emit(this, 'E_MOUSE_DRAG', { movementX: e.movementX, movementY: e.movementY });
    }
  }

  $handleWheel(e: WheelEvent): void {
    this.mouseDown = (e.buttons & 1) !== 0;
    this.mouseWheel += Math.sign(e.deltaY);
    e.preventDefault();
    e.stopPropagation();
    eventManager.emit(this, 'E_MOUSE_WHEEL', { delta: Math.sign(e.deltaY) });
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
