import { Screen } from './screen';

/**
 * The `ScreenManager` class is a singleton responsible for manages a stack of screens.
 * Nota bene: requestPush, requestSet and requestPop are all asynchronously method and will be
 * executed safely in the update loop.
 */
class ScreenManager {
  requests: Array<Function>;
  screens: Array<Screen>;

  /**
   * The constructor.
   */
  constructor() {
    this.requests = [];
    this.screens = [];
  }

  /**
   * The "update" function.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    while (this.requests.length > 0) {
      let request = this.requests.pop()!;
      request();
    }

    for (let i = this.screens.length - 1; i >= 0; i--) {
      if (!this.screens[i].isBlocking()) {
        this.screens[i].update(ts);
      }
    }
  }

  /**
   * The "draw" function.
   */
  draw(): void {
    for (let i = this.screens.length - 1; i >= 0; i--) {
      if (!this.screens[i].isBlocking()) {
        this.screens[i].draw();
      }
    }
  }

  /**
   * The "requestPushScreen" function pushes a new screen to the stack, throwing an error if the
   * screen is already present.
   * Nota bene: it call `onEnter` virtual method on the new screen.
   * @param {Screen} newScreen - The new screen that you want to push onto the stack.
   * @param {any} args - args is an optional parameter of type any. It is used to pass additional
   * arguments to the new screen when it is being pushed onto the stack. The default value is an empty
   * object ({}).
   */
  requestPushScreen(newScreen: Screen, args: any = {}): void {
    this.requests.push(() => {
      if (this.screens.indexOf(newScreen) != -1) {
        throw new Error('ScreenManager::requestPushScreen(): You try to push an existing screen to the stack !');
      }

      let topScreen = this.screens[this.screens.length - 1];
      topScreen.onBringToBack(newScreen);

      let promise = newScreen.onEnter(args);
      promise.then(() => this.screens.push(newScreen));
    });
  }

  /**
   * The "requestSetScreen" function remove all screens and sets a unique new screen to the stack.
   * Nota bene: it call the `onEnter` virtual method on the new screen.
   * @param {Screen} newScreen - The new screen that you want to set as the current screen.
   * @param {any} args - The `args` parameter is an optional object that can be passed to the `onEnter`
   * method of the `newScreen` object. It allows you to pass any additional data or configuration that
   * the `newScreen` may need when it is being entered.
   */
  requestSetScreen(newScreen: Screen, args: any = {}): void {
    this.requests.push(() => {
      this.screens.forEach(screen => screen.onExit());
      this.screens = [];
      let promise = newScreen.onEnter(args);
      promise.then(() => this.screens.push(newScreen));
    });
  }

  /**
   * The "requestPopScreen" function pops the top screen from the screen stack.
   * Nota bene: it call the `onExit` virtual method on the popped screen.
   */
  requestPopScreen(): void {
    this.requests.push(() => {
      if (this.screens.length == 0) {
        throw new Error('ScreenManager::requestPopScreen: You try to pop an empty state stack !');
      }

      let topScreen = this.screens[this.screens.length - 1];
      topScreen.onExit();
      this.screens.pop();

      if (this.screens.length > 0) {
        let newTopScreen = this.screens[this.screens.length - 1];
        newTopScreen.onBringToFront(topScreen);
      }
    });
  }
}

export { ScreenManager };
export const screenManager = new ScreenManager();