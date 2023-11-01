import { eventManager } from './event_manager';

enum SizeMode {
  FIT = 0, // Fit the page with scale/distortion
  ADJUST = 1, // Fit the page without distortion (with borders)
  FIXED = 2, // Fixed size without scale/distortion
  FULL = 3 // Full page
};

/**
 * The `CoreManager` class is a singleton responsible for managing the size and resolution of the top-level
 * HTMLElement container.
 */
class CoreManager {
  container: HTMLElement;
  resWidth: number;
  resHeight: number;
  sizeMode: SizeMode;

  /**
   * The constructor.
   */
  constructor() {
    this.container = document.getElementById('APP')!;
    
    if (!this.container) {
      throw new Error('Application::Application: APP element not found !');
    }

    this.resWidth = this.container.clientWidth;
    this.resHeight = this.container.clientHeight;
    this.sizeMode = SizeMode.FIXED;
    window.addEventListener('resize', () => eventManager.emit(this, 'E_RESIZE'));
  }

  /**
   * The "setSize" function adjusts the size of a container element based on the specified width and
   * height, and applies different scaling and positioning transformations based on the specified size
   * mode.
   * It emit a 'E_RESIZE' event.
   * @param {number} resWidth - The width of the container in pixels.
   * @param {number} resHeight - The height of the container in pixels.
   * @param sizeMode - SizeMode is an optional parameter that determines how the container fit the browser window
   */
  setSize(resWidth: number, resHeight: number, sizeMode = SizeMode.FIXED): void {
    this.container.style.width = resWidth + 'px';
    this.container.style.height = resHeight + 'px';

    if (sizeMode == SizeMode.FIT) {
      this.container.style.transform = 'scale(' + window.innerWidth / resWidth + ',' + window.innerHeight / resHeight + ')';
    }
    else if (sizeMode == SizeMode.ADJUST) {
      this.container.style.transform = 'scale(' + Math.min(window.innerWidth / resWidth, window.innerHeight / resHeight) + ')';
    }
    else if (sizeMode == SizeMode.FIXED) {
      this.container.style.transform = 'none';
      this.container.style.margin = '0 auto';
    }
    else if (sizeMode == SizeMode.FULL) {
      this.container.style.width = '100vw';
      this.container.style.height = '100vh';
    }

    this.resWidth = resWidth;
    this.resHeight = resHeight;
    this.sizeMode = sizeMode;

    eventManager.emit(this, 'E_RESIZE');
  }

  /**
   * The "getSize" function returns the client-width and client-height of the container element.
   * @returns An array containing the width and height of the container.
   */
  getSize(): vec2 {
    return [
      this.container.clientWidth,
      this.container.clientHeight
    ];
  }

  /**
   * The "getResolution" function returns the size resolution of the game.
   * @returns An array containing the resolution width and resolution height.
   */
  getResolution(): vec2 {
    return [
      this.resWidth,
      this.resHeight
    ];
  }
}

const coreManager = new CoreManager();
export { CoreManager };
export { coreManager, SizeMode };
