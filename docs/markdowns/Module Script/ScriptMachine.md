# ScriptMachine

Is a script machine that parse and execute blocks from a JSON file.
## Constructors
* **new ScriptMachine**(): ScriptMachine   
## Methods
* **addVariant**(varloc: string, value: any): void   
  * **varloc**: The var name.
  * **value**: The value.
* **clearCommandRegister**(): void   
* **getVariant**(varloc: string): any   
  * **varloc**: The var name.
* **hasVariant**(varloc: string): boolean   
  * **varloc**: The var name.
* **isEnabled**(): boolean   
* **jump**(blockId: string): void   
  * **blockId**: The block identifier.
* **loadFromFile**(path: string): Promise   
  * **path**: The file path.
* **loadVariantFromData**(data: any): void   
  * **data**: The data object.
* **loadVariantFromFile**(path: string): Promise   
  * **path**: The file path.
* **registerCommand**(key: string, commandFunc: Function): void   
  * **key**: The unique identifier for the command (aka the command name).
  * **commandFunc**: The command function to be registered.
* **removeVariant**(varloc: string): void   
  * **varloc**: The var name.
* **runCommand**(key: string, args: any[])   
  * **key**: The command identifier.
  * **args**: A list of arguments that will be passed to the command function.
* **setEnabled**(enabled: boolean): void   
  * **enabled**: Indicating whether the script machine is enabled or disabled.
* **setVariant**(varloc: string, value: any): void   
  * **varloc**: The var name.
  * **value**: The value.
* **update**(ts: number): void   
  * **ts**: The timestep.
