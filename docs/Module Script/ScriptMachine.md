# ScriptMachine

Is a script machine that parse and execute blocks from a JSON file.
## Constructors
- **new ScriptMachine**(): ScriptMachine   
## Methods
- **$delay**(ms: number): void   
   - **ms**

- **$execIf**(varloc: string, cond: string, value: any, cmd): void   
   - **varloc**
   - **cond**
   - **value**
   - **cmd**

- **$goto**(jumpto: string): string   
   - **jumpto**

- **$gotoIf**(varloc: string, cond: string, value: any, jumpto: string)   
   - **varloc**
   - **cond**
   - **value**
   - **jumpto**

- **$varAdd**(varloc: string, value: any): void   
   - **varloc**
   - **value**

- **$varSet**(varloc: string, value: any): void   
   - **varloc**
   - **value**

- **$varSub**(varloc: string, value: any): void   
   - **varloc**
   - **value**

- **$waitPad**(): void   

- **addVariant**(varloc: string, value: any): void   
Add a new variable.
   - **varloc**: The var name.
   - **value**: The value.

- **clearCommandRegister**(): void   
Flush the command register.

- **getVariant**(varloc: string): any   
Returns variable value.
   - **varloc**: The var name.

- **hasVariant**(varloc: string): boolean   
Check variable existing.
   - **varloc**: The var name.

- **isEnabled**(): boolean   
Check if the script machine is enabled or not.

- **jump**(blockId: string): void   
Jump to the specified script file block.
   - **blockId**: The block identifier.

- **loadFromFile**(path: string): Promise   
Load asynchronously script data from a json file (jsc).
   - **path**: The file path.

- **loadVariantFromData**(data: any): void   
Load variants from data object.
   - **data**: The data object.

- **loadVariantFromFile**(path: string): Promise   
Load asynchronously variants data from a json file (jsv).
   - **path**: The file path.

- **registerCommand**(key: string, commandFunc: Function): void   
Registers a command.
   - **key**: The unique identifier for the command (aka the command name).
   - **commandFunc**: The command function to be registered.

- **removeVariant**(varloc: string): void   
Remove a variable.
   - **varloc**: The var name.

- **runCommand**(key: string, args: any[])   
Executes a registered command and returns the block to jump.
   - **key**: The command identifier.
   - **args**: A list of arguments that will be passed to the command function.

- **setEnabled**(enabled: boolean): void   
Set the enable flag.
   - **enabled**: Indicating whether the script machine is enabled or disabled.

- **setVariant**(varloc: string, value: any): void   
Set variable value.
   - **varloc**: The var name.
   - **value**: The value.

- **update**(ts: number): void   
The update function.
   - **ts**: The timestep.
