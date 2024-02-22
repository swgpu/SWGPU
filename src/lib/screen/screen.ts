/**
 * A screen in a game like "start-screen", "menu-screen", "game-screen" or "pause-screen.
 * It is your top-level classes with methods for updating, drawing, entering, exiting.
 */
class Screen {
  blocking: boolean;

  constructor() {
    this.blocking = false;
  }

  /**
   * Set the blocking state.
   * 
   * @param {boolean} blocking - Determines whether the screen execution should be blocked or not.
   */
  setBlocking(blocking: boolean): void {
    this.blocking = blocking;
  }

  /**
   * Check if the screen is blocking or not.
   */
  isBlocking(): boolean {
    return this.blocking;
  }

  /**
   * Virtual update function.
   * 
   * @param {number} ts - The timestep.
   */
  update(ts: number): void {}

  /**
   * Virtual draw function.
   */
  draw(): void {}

  /**
   * Virtual asynchronous method that is called when screen is pushed to the stack.
   * 
   * @param {any} args - Used to pass any additional arguments or data to the "onEnter" method.
   */
  async onEnter(args: any): Promise<void> {}

  /**
   * Virtual method that is called when screen is removed from the stack.
   */
  onExit(): void {}

  /**
   * Virtual method that is called when the top state level is obtained.
   * 
   * @param {Screen} oldScreen - The previous top level screen.
   */
  onBringToFront(oldScreen: Screen): void {}

  /**
   * Virtual method that is called when the top state level is lost.
   * 
   * @param {Screen} newScreen - The new top level screen.
   */
  onBringToBack(newScreen: Screen): void {}
}

export { Screen };