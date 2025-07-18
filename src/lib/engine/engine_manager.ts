import Stats from 'stats.js';
// ---------------------------------------------------------------------------------------
import { coreManager } from '../core/core_manager';
import { inputManager } from '../input/input_manager';
import { gfx2Manager } from '../gfx2/gfx2_manager';
import { gfx3DebugRenderer } from '../gfx3/gfx3_debug_renderer';
import { screenManager } from '../screen/screen_manager';
import { uiManager } from '../ui/ui_manager';
import { soundManager } from '../sound/sound_manager';

/**
 * Singleton managing the main loop engine.
 */
class EngineManager {
  then: number;
  timeStamp: number;
  frameRate: number;
  paused: boolean;
  lastAnimationFrameId: number;
  pauseStartTime: number;
  stats: Stats;

  constructor() {
    this.then = 0;
    this.timeStamp = 0;
    this.frameRate = 60;
    this.paused = false;
    this.lastAnimationFrameId = 0;
    this.pauseStartTime = 0;
    this.stats = new Stats();

    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
    document.addEventListener('visibilitychange', () => this.#handleVisibilityChange());
  }

  /**
   * Start the engine with optional parameters and run the main loop.
   * 
   * @param {boolean} [enableScanlines=true] - Determines whether scanlines should be enabled or not.
   * @param {boolean} [showDebug=true] - Determines whether to display debug information.
   */
  startup(enableScanlines: boolean = true, showDebug: boolean = true): void {
    coreManager.enableScanlines(enableScanlines);
    gfx3DebugRenderer.setShowDebug(showDebug);
    this.run(0);
  }

  /**
   * The main loop.
   */
  run(timeStamp: number, state: 'pause' | 'resume' | 'normal' = 'normal'): void {
    this.stats.begin();
    this.timeStamp = timeStamp;

    if (state === 'pause') {
      this.pauseStartTime = timeStamp;
      cancelAnimationFrame(this.lastAnimationFrameId);
      return;
    }

    if (state === 'resume') {
      const pauseDuration = timeStamp - this.pauseStartTime;
      this.then = this.then + pauseDuration;
    }

    const frameDuration = 1000 / this.frameRate;
    const delta = timeStamp - this.then;

    if (delta >= frameDuration) {
      this.then = timeStamp - (delta % frameDuration);
      inputManager.update(frameDuration);

      gfx2Manager.update(frameDuration);

      uiManager.update(frameDuration);
      screenManager.update(frameDuration);

      screenManager.draw();
      screenManager.render(frameDuration);

      this.stats.end();
    }

    this.lastAnimationFrameId = requestAnimationFrame(timeStamp => this.run(timeStamp));
  }

  /**
   * Set the frame rate value.
   * 
   * @param {number} value - The fps value.
   */
  setFrameRate(value: number): void {
    this.frameRate = value;
  }

  /**
   * Get the frame rate value.
   */
  getFrameRate(): number {
    return this.frameRate;
  }

  /**
   * Set the actual timestamp since the app is running.
   */
  getTimeStamp(): number {
    return this.timeStamp;
  }

  /**
   * Make the update loop paused.
   */
  pause(): void {
    if (this.paused) {
      return;
    }

    this.paused = true;
    this.run(performance.now(), 'pause');
    soundManager.pause();
  }

  /**
   * Make the update loop running.
   */
  resume(): void {
    if (!this.paused) {
      return;
    }

    this.paused = false;
    this.run(performance.now(), 'resume');
    soundManager.resume();
  }

  #handleVisibilityChange() {
    if (document.hidden) {
      this.pause();
    }
    else {
      this.resume();
    }
  }
}

export { EngineManager };
export const em = new EngineManager();