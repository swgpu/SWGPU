/**
 * The `SoundManager` class is a singleton responsible for managing, loading, caching and playing
 * sounds.
 */
class SoundManager {
  sounds: Map<string, HTMLAudioElement>;

  /**
   * The constructor.
   */
  constructor() {
    this.sounds = new Map<string, HTMLAudioElement>();
  }

  /**
   * The "loadSound" function asynchronously loads a sound from a given path and returns it as an
   * `HTMLAudioElement`, caching it for future use.
   * @param {string} path - The file path or URL of the sound that you want to load.
   * @returns a Promise that resolves when sound is loaded.
   */
  async loadSound(path: string): Promise<HTMLAudioElement> {
    return new Promise(resolve => {
      const sound = new Audio();
      sound.src = path;
      sound.addEventListener('canplaythrough', () => {
        this.sounds.set(path, sound);
        resolve(sound);
      });
    });
  }

  /**
   * The "deleteSound" function deletes a sound if it exists, otherwise it throws an error.
   * @param {string} path - The path to the sound file.
   */
  deleteSound(path: string): void {
    if (!this.sounds.has(path)) {
      throw new Error('SoundManager::deleteSound(): The sound file doesn\'t exist, cannot delete !');
    }

    const sound = this.sounds.get(path)!;
    sound.src = '';
    this.sounds.delete(path);
  }

  /**
   * The "playSound" function plays a sound file if it exists, otherwise it throws an error.
   * @param {string} path - The `path` parameter is a string that represents the file path of the sound
   * file that you want to play.
   */
  playSound(path: string): void {
    if (!this.sounds.has(path)) {
      throw new Error('SoundManager::play(): The sound file doesn\'t exist, cannot play !');
    }

    const sound = this.sounds.get(path)!;
    sound.play();
  }

  /**
   * The "pauseSound" function pause a sound file if it exists, otherwise it throws an error.
   * @param {string} path - The path parameter is a string that represents the location or path of the
   * sound file that you want to pause.
   */
  pauseSound(path: string): void {
    if (!this.sounds.has(path)) {
      throw new Error('SoundManager::pause(): The sound file doesn\'t exist, cannot pause !');
    }

    const sound = this.sounds.get(path)!;
    sound.pause();
  }

  /**
   * The "releaseSounds" function deletes all the sounds stored in the manager.
   */
  releaseSounds() {
    for (let path in this.sounds) {
      const sound = this.sounds.get(path)!;
      sound.src = '';
      this.sounds.delete(path);
    }
  }
}

export { SoundManager };
export const soundManager = new SoundManager();