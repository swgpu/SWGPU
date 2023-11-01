/**
 * The `Screen` is a class that represents a screen in a game, ex: "start-screen", "menu-screen", "game-screen" or "pause-screen.
 * It is your top-level classes with methods for updating, drawing, entering, exiting.
 */
class Screen {
  blocking: boolean;

  /**
   * The constructor.
   */
  constructor() {
    this.blocking = false;
  }

  /**
   * The "setBlocking" function sets the blocking property whether determine if the screen run the
   * update and draw phases.
   * @param {boolean} blocking - The `blocking` parameter is a boolean value that determines whether the
   * screen execution should be blocked or not.
   */
  setBlocking(blocking: boolean): void {
    this.blocking = blocking;
  }

  /**
   * The "isBlocking" function returns the `blocking` property.
   * @returns The `blocking`property.
   */
  isBlocking(): boolean {
    return this.blocking;
  }

  /**
   * The "update" is a virtual method used for the update phase.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    // virtual method called during update phase !
  }

  /**
   * The "draw" is a virtual method used for the draw phase.
   */
  draw(): void {
    // virtual method called during draw phase !
  }

  /**
   * The "onEnter" function is an asynchronous method that is called during the enter phase.
   * @param {any} args - The "args" parameter is of type "any", which means it can accept any data type.
   * It is used to pass any additional arguments or data to the "onEnter" method.
   */
  async onEnter(args: any): Promise<void> {
    // virtual method called during enter phase !
  }

  /**
   * The "onExit" function is a virtual method that is called during the exit phase.
   */
  onExit(): void {
    // virtual method called during exit phase !
  }

  /**
   * The "onBringToFront" function is a virtual method that is called when the top state level is
   * obtained.
   * @param {Screen} oldScreen - The old screen that represents the previous top level screen.
   */
  onBringToFront(oldScreen: Screen): void {
    // virtual method called when get the top state level !
  }

  /**
   * The "onBringToBack" function is a virtual method that is called when the top state level is lost.
   * @param {Screen} newScreen - The new screen that represents the new top level screen.
   */
  onBringToBack(newScreen: Screen): void {
    // virtual method called when lost the top state level !
  }
}

export { Screen };