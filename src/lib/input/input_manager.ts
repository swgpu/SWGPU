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
  inputSource: InputSource;
  eventKey: string;
}

type InputSource = 'keyboard' | 'gamepad0' | 'gamepad1' | 'gamepad2' | 'gamepad3';

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
 * It emit 'E_ACTION_ONCE' with data { actionId }.
 * It emit 'E_ACTION' with data { actionId }.
 * It emit 'E_ACTION_RELEASED' with data { actionId }
 * It emit 'E_MOUSE_DOWN' with data { buttons }
 * It emit 'E_MOUSE_UP'
 * It emit 'E_MOUSE_MOVE' with data { movementX, movementY }
 * It emit 'E_MOUSE_DRAG' with data { movementX, movementY }
 * It emit 'E_MOUSE_WHEEL' with data { delta }
 * It emit 'E_POINTER_LOCK_CHANGED' with data { lockChanged }
 * It emit 'E_GAMEPAD_CONNECTED' with data { id }
 * It emit 'E_GAMEPAD_DISCONNECTED' with data { id }
 * It emit 'E_GAMEPAD_REMOVED' with data { id }
 * 
 * Default actions table:
 * ■ ACTION => KEYBOARD => GAMEPAD
 * ■ OK => Enter => 0
 * ■ BACK => Escape => 1
 * ■ SELECT => Space => BtnSelect
 * ■ LEFT => ArrowLeft => PadLeft
 * ■ RIGHT => ArrowRight => PadRight
 * ■ UP => ArrowUp => PadTop
 * ■ DOWN => ArrowDown => PadBottom
 */
class InputManager {
  keyMap: Map<string, boolean>;
  actionMap: Map<string, boolean>;
  actionOnceMap: Map<string, number>;
  actionRegister: Map<string, Action>;
  pads: Array<Pad>;
  padsInterval: NodeJS.Timeout | number | undefined;
  mouseDown: boolean;
  mousePosition: vec2;
  mouseWheel: number;
  dragStartPosition: vec2;
  pointerLockEnabled: boolean;
  pointerLockCaptured: boolean;

  constructor() {
    this.keyMap = new Map<string, boolean>;
    this.actionMap = new Map<string, boolean>;
    this.actionOnceMap = new Map<string, number>;
    this.actionRegister = new Map<string, Action>;
    this.pads = [];
    this.padsInterval;
    this.mouseDown = false;
    this.mousePosition = [0, 0];
    this.mouseWheel = 0;
    this.dragStartPosition = [0, 0];
    this.pointerLockEnabled = false;
    this.pointerLockCaptured = false;

    document.addEventListener('keydown', (e) => this.#handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.#handleKeyUp(e));
    document.addEventListener('pointerdown', (e) => this.#handlePointerDown(e));
    document.addEventListener('pointerup', () => this.#handlePointerUp());
    document.addEventListener('pointermove', (e) => this.#handlePointerMove(e));
    document.addEventListener('wheel', (e) => this.#handleWheel(e), { passive: false });
    document.addEventListener('pointerlockchange', (e) => this.#handlePointerLockChanged(e), false);
    window.addEventListener('gamepadconnected', (e) => this.#handleGamePadConnected(e));
    window.addEventListener('gamepaddisconnected', (e) => this.#handleGamePadDisconnected(e));

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

    this.registerAction('gamepad1', '0', 'OK');
    this.registerAction('gamepad1', '1', 'BACK');
    this.registerAction('gamepad1', 'BtnSelect', 'SELECT');
    this.registerAction('gamepad1', 'PadLeft', 'LEFT');
    this.registerAction('gamepad1', 'PadRight', 'RIGHT');
    this.registerAction('gamepad1', 'PadTop', 'UP');
    this.registerAction('gamepad1', 'PadBottom', 'DOWN');

    this.registerAction('gamepad2', '0', 'OK');
    this.registerAction('gamepad2', '1', 'BACK');
    this.registerAction('gamepad2', 'BtnSelect', 'SELECT');
    this.registerAction('gamepad2', 'PadLeft', 'LEFT');
    this.registerAction('gamepad2', 'PadRight', 'RIGHT');
    this.registerAction('gamepad2', 'PadTop', 'UP');
    this.registerAction('gamepad2', 'PadBottom', 'DOWN');

    this.registerAction('gamepad3', '0', 'OK');
    this.registerAction('gamepad3', '1', 'BACK');
    this.registerAction('gamepad3', 'BtnSelect', 'SELECT');
    this.registerAction('gamepad3', 'PadLeft', 'LEFT');
    this.registerAction('gamepad3', 'PadRight', 'RIGHT');
    this.registerAction('gamepad3', 'PadTop', 'UP');
    this.registerAction('gamepad3', 'PadBottom', 'DOWN');
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {
    for (const actionId of this.actionOnceMap.keys()) {
      const state = this.actionOnceMap.get(actionId);
      if (state == 1) {
        this.actionOnceMap.delete(actionId);
      } else {
        this.actionOnceMap.set(actionId, 1);
      }
    }
  }

  /**
   * Add an action mapping.
   * 
   * @param {string} inputSource - The device from which the input is received.
   * @param {string} eventKey - The key or button that triggers the action.
   * @param {string} actionId - The unique action identifier.
   */
  registerAction(inputSource: InputSource, eventKey: string, actionId: string): void {
    const found = this.actionRegister.has(inputSource + eventKey);
    if (found) {
      throw new Error('InputManager::registerAction(): you cannot register action with same event source & key.');
    }

    this.actionRegister.set(inputSource + eventKey, {
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
   */
  unregisterAction(inputSource: InputSource, eventKey: string): void {
    this.actionRegister.delete(inputSource + eventKey);
  }

  /**
   * Checks if an action is currently active.
   * 
   * @param {string} actionId - The action identifier.
   */
  isActiveAction(actionId: string): boolean | undefined {
    return this.actionMap.get(actionId);
  }

  /**
   * Checks if an action is currently active.
   * 
   * @param {string} actionId - The action identifier.
   */
  isJustActiveAction(actionId: string): boolean {
    return this.actionOnceMap.get(actionId) == 1;
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
   * Checks if pointer lock is enabled.
   */
  isPointerLockEnabled(): boolean {
    return this.pointerLockEnabled;
  }

  /**
   * Checks if pointer lock is captured.
   */
  isPointerLockCaptured(): boolean {
    return this.pointerLockCaptured;
  }

  /**
   * Enable pointer lock state.
   * 
   * @param {boolean} enabled - The enabled flag.
   */
  setPointerLockEnabled(enabled: boolean): void {
    this.pointerLockEnabled = enabled;
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
   * Returns a pad axis value or zero if not found.
   * 
   * @param {number} index - The index of the pad.
   * @param {number} axis - The index of the pad.
   */
  getPadAxis(index: number, axis: number): number {
    const pad = this.pads.find(p => p.index == index);
    if (!pad) return 0;
    return pad.axes[axis];
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

    eventManager.emit(this, 'E_GAMEPAD_REMOVED', { id: id });
  }

  #addPad(pad: Pad): void {
    this.pads.push(pad);
    if (this.padsInterval === null) {
      this.padsInterval = setInterval(() => this.#updatePadsStatus(), 50);
    }
  }

  #handleKeyDown(e: KeyboardEvent): boolean {
    const action = this.actionRegister.get('keyboard' + e.code);

    if (!this.keyMap.get(e.code) && action) {      
      eventManager.emit(this, 'E_ACTION_ONCE', { actionId: action.id });
      this.actionMap.set(action.id, true);
      this.actionOnceMap.set(action.id, 0);
    }

    if (action) {
      eventManager.emit(this, 'E_ACTION', { actionId: action.id });
      this.actionMap.set(action.id, true);
    }

    this.keyMap.set(e.code, true);
    return false;
  }

  #handleKeyUp(e: KeyboardEvent): void {
    const action = this.actionRegister.get('keyboard' + e.code);

    if (action) {
      eventManager.emit(this, 'E_ACTION_RELEASED', { actionId: action.id });
      this.actionMap.set(action.id, false);  
    }

    this.keyMap.set(e.code, false);
  }

  async #handlePointerDown(e: PointerEvent): Promise<void> {
    if (this.pointerLockEnabled && !document.pointerLockElement) {
      await document.body.requestPointerLock();
    }

    this.mouseDown = true;
    this.dragStartPosition[0] = e.clientX;
    this.dragStartPosition[1] = e.clientY;
    eventManager.emit(this, 'E_MOUSE_DOWN', { buttons: e.buttons });
  }

  #handlePointerUp(): void {
    this.mouseDown = false;
    this.dragStartPosition[0] = 0;
    this.dragStartPosition[1] = 0;
    eventManager.emit(this, 'E_MOUSE_UP');
  }

  #handlePointerMove(e: PointerEvent): void {
    if (this.pointerLockEnabled && !this.pointerLockCaptured) {
      return;
    }

    this.mouseDown = e.pointerType == 'mouse' ? (e.buttons & 1) !== 0 : true;
    this.mousePosition = [e.clientX, e.clientY];
    eventManager.emit(this, 'E_MOUSE_MOVE', { movementX: e.movementX, movementY: e.movementY });

    if (this.mouseDown) {
      eventManager.emit(this, 'E_MOUSE_DRAG', { movementX: e.movementX, movementY: e.movementY });
    }
  }

  #handleWheel(e: WheelEvent): void {
    this.mouseDown = (e.buttons & 1) !== 0;
    this.mouseWheel += Math.sign(e.deltaY);
    eventManager.emit(this, 'E_MOUSE_WHEEL', { delta: Math.sign(e.deltaY) });
  }

  #handlePointerLockChanged(e: Event): void {
    if (!this.pointerLockEnabled) {
      return;
    }

    if (document.pointerLockElement == document.body) {
      this.pointerLockCaptured = true;
      eventManager.emit(this, 'E_POINTER_LOCK_CHANGED', { lockCaptured: true });
    }
    else {
      this.pointerLockCaptured = false;
      eventManager.emit(this, 'E_POINTER_LOCK_CHANGED', { lockCaptured: false });
    }
  }

  #handleGamePadDisconnected(e: GamepadEvent): void {
    this.removePad(e.gamepad.id);
    eventManager.emit(this, 'E_GAMEPAD_DISCONNECTED', { id: e.gamepad.id });
  }

  #handleGamePadConnected(e: GamepadEvent): void {
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

    this.#addPad(pad);
    eventManager.emit(this, 'E_GAMEPAD_CONNECTED', { id: e.gamepad.id });
  }

  #updatePadsStatus(): void {
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

          const action = this.actionRegister.get('gamepad' + gamepad.index + n.toString());

          if (action) {
            this.actionMap.set(action.id, gamepad.buttons[n].pressed);
            if (gamepad.buttons[n].pressed) {
              eventManager.emit(this, 'E_ACTION', { actionId: action.id });
            }
          }

          this.keyMap.set('gamepad' + gamepad.index + '-' + n, gamepad.buttons[n].pressed);
          pad.pressed[n] = gamepad.buttons[n].pressed;
        }
      }
    }
  }
}

export { InputManager };
export const inputManager = new InputManager();