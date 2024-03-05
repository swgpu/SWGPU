import { Screen } from './screen';

/**
 * Singleton screen manager.
 * Note: requestPush, requestSet and requestPop are all asynchronously method and will be executed safely in the update loop.
 */
class ScreenManager {
  requests: Array<Function>;
  screens: Array<Screen>;

  constructor() {
    this.requests = [];
    this.screens = [];
  }

  /**
   * The update function.
   * 
   * @param {number} ts - The timestep.
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
   * The draw function.
   */
  draw(): void {
    for (let i = this.screens.length - 1; i >= 0; i--) {
      if (!this.screens[i].isBlocking()) {
        this.screens[i].draw();
      }
    }
  }

  /**
   * Pushes a new screen to the stack, throwing an error if the screen is already present.
   * Note: The screen is pushed just after the onEnter method done the job.
   * 
   * @param {Screen} newScreen - The screen.
   * @param {any} args - Arguments that are passed to the new screen onEnter method.
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
   * Set a new and unique screen to the stack (all screens are removed).
   * Note: The screen is pushed just after the onEnter method done the job.
   * 
   * @param {Screen} newScreen - The screen.
   * @param {any} args - Arguments that are passed to the new screen onEnter method.
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
   * Remove the top screen from the screen stack, previous screen become the top.
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