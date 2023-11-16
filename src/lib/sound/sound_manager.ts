interface Sound {
  audio: HTMLAudioElement;
  groupId: string;
};

interface SoundGroup {
  id: string;
  muted: boolean;
  volume: number;
};

const DEFAULT_GROUP_ID = 'default';
const DEFAULT_GROUP = { id: DEFAULT_GROUP_ID, muted: false, volume: 1 };

/**
 * The `SoundManager` class is a singleton responsible for managing, loading, caching and playing
 * sounds.
 */
class SoundManager {
  sounds: Map<string, Sound>;
  soundGroups: Array<SoundGroup>;

  /**
   * The constructor.
   */
  constructor() {
    this.sounds = new Map<string, Sound>();
    this.soundGroups = [DEFAULT_GROUP];
  }

  /**
   * The "loadSound" function asynchronously loads a sound from a given path and returns it as an
   * `Sound`, caching it for future use.
   * @param {string} path - The file path or URL of the sound that you want to load.
   * @returns a Promise that resolves when sound is loaded.
   */
  async loadSound(path: string, groupId: string = DEFAULT_GROUP_ID): Promise<Sound> {
    return new Promise(resolve => {
      const sound = {
        audio: new Audio(path),
        groupId: groupId
      };

      sound.audio.addEventListener('canplaythrough', () => {
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
    sound.audio.src = '';
    this.sounds.delete(path);
  }

  /**
   * The "playSound" function plays a sound file if it exists, otherwise it throws an error.
   * @param {string} path - The `path` parameter is a string that represents the file path of the sound
   * file that you want to play.
   */
  playSound(path: string, looped: boolean = false): Promise<void> {
    if (!this.sounds.has(path)) {
      throw new Error('SoundManager::play(): The sound file doesn\'t exist, cannot play !');
    }

    const sound = this.sounds.get(path)!;
    sound.audio.loop = looped;
    return sound.audio.play();
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
    sound.audio.pause();
  }

  /**
   * The "releaseSounds" function deletes all stored sounds.
   */
  releaseSounds() {
    for (const path of this.sounds.keys()) {
      const sound = this.sounds.get(path)!;
      sound.audio.src = '';
      this.sounds.delete(path);
    }
  }

  /**
   * The "mute" function mute/demute audio.
   * @param {boolean} muted - The `muted` parameter is a boolean value that determines whether the sounds
   * should be muted or not.
   */
  mute(muted: boolean, groupId: string = DEFAULT_GROUP_ID): void {
    const group = this.soundGroups.find(g => g.id == groupId);
    if (!group) {
      throw new Error('SoundManager::mute(): Group not found !');
    }

    for (const sound of this.sounds.values()) {
      if (sound.groupId == groupId) {
        sound.audio.muted = muted;
      }
    }

    group.muted = muted;
  }

  /**
   * The "setVolume" function sets the audio volume.
   * @param {number} volume - The volume parameter is a number that represents the desired volume level.
   */
  setVolume(volume: number, groupId: string = DEFAULT_GROUP_ID): void {
    const group = this.soundGroups.find(g => g.id == groupId);
    if (!group) {
      throw new Error('SoundManager::setVolume(): Group not found !');
    }

    for (const sound of this.sounds.values()) {
      if (sound.groupId == groupId) {
        sound.audio.volume = volume;
      }
    }

    group.volume = volume;
  }

  /**
   * The "isMuted" function returns a boolean value indicating whether the object is currently muted or
   * not.
   * @returns The muted flag.
   */
  isMuted(groupId: string = DEFAULT_GROUP_ID): boolean {
    const group = this.soundGroups.find(g => g.id == groupId);
    if (!group) {
      throw new Error('SoundManager::isMuted(): Group not found !');
    }

    return group.muted;
  }
}

export { SoundManager };
export const soundManager = new SoundManager();