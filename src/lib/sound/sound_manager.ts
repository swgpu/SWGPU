interface Sound {
  buffer: AudioBuffer;
  groupId: string;
};

interface SoundGroup {
  muted: boolean;
  volume: number;
};

const DEFAULT_GROUP_ID = 'default';
const DEFAULT_GROUP = { muted: false, volume: 1 };

/**
 * Singleton sound manager using Web Audio API.
 */
class SoundManager {
  audioContext: AudioContext;
  sounds: Map<string, Sound>;
  soundGroups: Map<string, SoundGroup>;
  activeSources: Map<string, { source: AudioBufferSourceNode, gainNode: GainNode }[]>;

  constructor() {
    this.audioContext = new AudioContext();
    this.sounds = new Map<string, Sound>();
    this.soundGroups = new Map<string, SoundGroup>();
    this.activeSources = new Map<string, { source: AudioBufferSourceNode, gainNode: GainNode }[]>();
  }

  /**
   * Load asynchronously a sound from a given path and returns it as a `Sound`, caching it for future use.
   * 
   * @param {string} path - The file path.
   * @param {string} groupId - The group identifier.
   * @param {string} storePath - The optional store file path.
   */
  async loadSound(path: string, groupId: string = DEFAULT_GROUP_ID, storePath: string = ''): Promise<Sound> {
    storePath = storePath ? storePath : path;

    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

    const sound: Sound = {
      buffer: audioBuffer,
      groupId: groupId
    };

    this.sounds.set(storePath, sound);
    if (!this.soundGroups.has(groupId)) {
      this.soundGroups.set(groupId, { ...DEFAULT_GROUP });
    }

    return sound;
  }

  /**
   * Deletes a sound if it exists, otherwise it throws an error.
   * 
   * @param {string} path - The file path.
   */
  deleteSound(path: string): void {
    if (!this.sounds.has(path)) {
      throw new Error('SoundManager::deleteSound(): The sound file doesn\'t exist, cannot delete!');
    }

    this.sounds.delete(path);
  }

  /**
   * Plays a sound if it exists, otherwise it throws an error.
   * Multiple instances of the same sound can play simultaneously.
   * 
   * @param {string} path - The file path.
   * @param {boolean} looped - Determine if sound plays in loop or not.
   */
  playSound(path: string, looped: boolean = false): void {
    if (!this.sounds.has(path)) {
      throw new Error('SoundManager::playSound(): The sound file doesn\'t exist, cannot play!');
    }

    const sound = this.sounds.get(path)!;
    const group = this.soundGroups.get(sound.groupId);

    const source = this.audioContext.createBufferSource();
    source.buffer = sound.buffer;
    source.loop = looped;

    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = group ? (group.muted ? 0 : group.volume) : 1;

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    if (!this.activeSources.has(sound.groupId)) {
      this.activeSources.set(sound.groupId, []);
    }
    this.activeSources.get(sound.groupId)!.push({ source, gainNode });

    source.start(0);
  }

  /**
   * Stops a sound if it is currently playing.
   * 
   * @param {string} path - The file path.
   */
  stopSound(path: string): void {
    if (!this.sounds.has(path)) {
      throw new Error('SoundManager::stopSound(): The sound file doesn\'t exist, cannot stop!');
    }

    const sound = this.sounds.get(path)!;
    const activeSources = this.activeSources.get(sound.groupId) || [];

    this.activeSources.set(sound.groupId, activeSources.filter(({ source }) => {
      if (source.buffer === sound.buffer) {
        source.stop();
        return false;
      }
      return true;
    }));
  }

  /**
   * Deletes all stored sounds.
   */
  releaseSounds() {
    this.sounds.clear();
    this.activeSources.clear();
  }

  /**
   * Mute or unmute a group.
   * 
   * @param {boolean} muted - Determines whether the sounds should be muted or not.
   * @param {string} groupId - The group identifier.
   */
  mute(muted: boolean, groupId: string = DEFAULT_GROUP_ID): void {
    const group = this.soundGroups.get(groupId);
    if (!group) {
      throw new Error('SoundManager::mute(): Group not found!');
    }

    group.muted = muted;

    const sources = this.activeSources.get(groupId) || [];
    for (const { gainNode } of sources) {
      gainNode.gain.value = muted ? 0 : group.volume;
    }
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
      throw new Error('SoundManager::setVolume(): Group not found!');
    }

    group.volume = volume;

    const sources = this.activeSources.get(groupId) || [];
    for (const { gainNode } of sources) {
      if (!group.muted) {
        gainNode.gain.value = volume;
      }
    }
  }

  /**
   * Check if the group is currently muted or not.
   */
  isMuted(groupId: string = DEFAULT_GROUP_ID): boolean {
    const group = this.soundGroups.get(groupId);
    if (!group) {
      throw new Error('SoundManager::isMuted(): Group not found!');
    }

    const sources = this.activeSources.get(groupId) || [];
    for (const { gainNode } of sources) {
      gainNode.gain.value = group.muted ? 0 : group.volume;
    }

    return group.muted;
  }

  /**
   * Pause all sounds.
   */
  pause(): void {
    this.audioContext.suspend();
  }

  /**
   * Resume all sounds.
   */
  resume(): void {
    this.audioContext.resume();
  }
}

export type { Sound };
export { SoundManager };
export const soundManager = new SoundManager();
