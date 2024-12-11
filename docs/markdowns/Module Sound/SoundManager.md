# SoundManager

Singleton sound manager.
## Constructors
* **new SoundManager**(): SoundManager   
## Methods
* **deleteSound**(path: string): void   
  * **path**: The file path.
* **isMuted**(groupId: string): boolean   
  * **groupId**
* **loadSound**(path: string, groupId: string, storePath: string): Promise   
  * **path**: The file path.
  * **groupId**: The group identifier.
  * **storePath**: The optionnal store file path.
* **mute**(muted: boolean, groupId: string): void   
  * **muted**: Determines whether the sounds should be muted or not.
  * **groupId**: The group identifier.
* **pauseSound**(path: string): void   
  * **path**: The file path.
* **playSound**(path: string, looped: boolean): Promise   
  * **path**: The file path.
  * **looped**: Determine if sound play in loop or not.
* **releaseSounds**(): void   
* **setVolume**(volume: number, groupId: string): void   
  * **volume**: The desired volume level.
  * **groupId**: The group identifier.
