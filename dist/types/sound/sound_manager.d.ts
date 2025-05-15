interface Sound {
    buffer: AudioBuffer;
    groupId: string;
}
interface SoundGroup {
    muted: boolean;
    volume: number;
}
/**
 * Singleton sound manager using Web Audio API.
 */
declare class SoundManager {
    audioContext: AudioContext;
    sounds: Map<string, Sound>;
    soundGroups: Map<string, SoundGroup>;
    activeSources: Map<string, {
        source: AudioBufferSourceNode;
        gainNode: GainNode;
    }[]>;
    constructor();
    /**
     * Load asynchronously a sound from a given path and returns it as a `Sound`, caching it for future use.
     *
     * @param {string} path - The file path.
     * @param {string} groupId - The group identifier.
     * @param {string} storePath - The optional store file path.
     */
    loadSound(path: string, groupId?: string, storePath?: string): Promise<Sound>;
    /**
     * Deletes a sound if it exists, otherwise it throws an error.
     *
     * @param {string} path - The file path.
     */
    deleteSound(path: string): void;
    /**
     * Plays a sound if it exists, otherwise it throws an error.
     * Multiple instances of the same sound can play simultaneously.
     *
     * @param {string} path - The file path.
     * @param {boolean} looped - Determine if sound plays in loop or not.
     */
    playSound(path: string, looped?: boolean): void;
    /**
     * Stops a sound if it is currently playing.
     *
     * @param {string} path - The file path.
     */
    stopSound(path: string): void;
    /**
     * Deletes all stored sounds.
     */
    releaseSounds(): void;
    /**
     * Mute or unmute a group.
     *
     * @param {boolean} muted - Determines whether the sounds should be muted or not.
     * @param {string} groupId - The group identifier.
     */
    mute(muted: boolean, groupId?: string): void;
    /**
     * Set the audio volume of a group.
     *
     * @param {number} volume - The desired volume level.
     * @param {string} groupId - The group identifier.
     */
    setVolume(volume: number, groupId?: string): void;
    /**
     * Check if the group is currently muted or not.
     */
    isMuted(groupId?: string): boolean;
    /**
     * Pause all sounds.
     */
    pause(): void;
    /**
     * Resume all sounds.
     */
    resume(): void;
}
export type { Sound };
export { SoundManager };
export declare const soundManager: SoundManager;
