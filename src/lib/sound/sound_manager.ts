interface Sound {
  audio: HTMLAudioElement;
  groupId: string;
};

interface SoundGroup {
  muted: boolean;
  volume: number;
};

const DEFAULT_GROUP_ID = 'default';
const DEFAULT_GROUP = { muted: false, volume: 1 };

/**
 * Singleton sound manager.
 */
class SoundManager {
  sounds: Map<string, Sound>;
  soundGroups: Map<string, SoundGroup>;

  constructor() {
    this.sounds = new Map<string, Sound>();
    this.soundGroups = new Map<string, SoundGroup>();
  }

  /**
   * Load asynchronously a sound from a given path and returns it as an `Sound`, caching it for future use.
   * Note: Use group for categorize your sounds and manage them easily.
   * 
   * @param {string} path - The file path.
   * @param {string} groupId - The group identifier.
   * @param {string} storePath - The optionnal store file path.
   */
  async loadSound(path: string, groupId: string = DEFAULT_GROUP_ID, storePath: string = ''): Promise<Sound> {
    storePath = storePath ? storePath : path;

    return new Promise(resolve => {
      const sound = {
        audio: new Audio(path),
        groupId: groupId
      };

      sound.audio.addEventListener('canplaythrough', () => {
        this.sounds.set(storePath, sound);
        this.soundGroups.set(groupId, {...DEFAULT_GROUP});
        resolve(sound);
      });
    });
  }

  /**
   * Deletes a sound if it exists, otherwise it throws an error.
   * 
   * @param {string} path - The file path.
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
   * Plays a sound if it exists, otherwise it throws an error.
   * 
   * @param {string} path - The file path.
   * @param {boolean} looped - Determine if sound play in loop or not.
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
   * Pause a sound if it exists, otherwise it throws an error.
   * 
   * @param {string} path - The file path.
   */
  pauseSound(path: string): void {
    if (!this.sounds.has(path)) {
      throw new Error('SoundManager::pause(): The sound file doesn\'t exist, cannot pause !');
    }

    const sound = this.sounds.get(path)!;
    sound.audio.pause();
  }

  /**
   * Deletes all stored sounds.
   */
  releaseSounds() {
    for (const path of this.sounds.keys()) {
      const sound = this.sounds.get(path)!;
      sound.audio.src = '';
      this.sounds.delete(path);
    }
  }

  /**
   * Mute or demute a group.
   * 
   * @param {boolean} muted - Determines whether the sounds should be muted or not.
   * @param {string} groupId - The group identifier.
   */
  mute(muted: boolean, groupId: string = DEFAULT_GROUP_ID): void {
    const group = this.soundGroups.get(groupId);
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
   * Set the audio volume of a group.
   * 
   * @param {number} volume - The desired volume level.
   * @param {string} groupId - The group identifier.
   */
  setVolume(volume: number, groupId: string = DEFAULT_GROUP_ID): void {
    const group = this.soundGroups.get(groupId);
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
   * Check if the group is currently muted or not.
   */
  isMuted(groupId: string = DEFAULT_GROUP_ID): boolean {
    const group = this.soundGroups.get(groupId);
    if (!group) {
      throw new Error('SoundManager::isMuted(): Group not found !');
    }

    return group.muted;
  }
}

export type { Sound };
export { SoundManager };
export const soundManager = new SoundManager();