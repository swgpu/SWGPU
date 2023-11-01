interface JSCBlock {
  id: string;
  description: string;
  calls: Array<JSCBlockCall>;
}

interface JSCBlockCall {
  commandName: string;
  commandArgs: Array<any>;
}

/**
 * The `ScriptMachine` is a class that represents a script machine for executing script blocks and commands.
 * It let you create your game scene scripting with methods to execute a sequences of asynchronous commands and
 * handle derivation story with block jumping.
 */
class ScriptMachine {
  blocks: Array<JSCBlock>;
  commandRegister: Map<string, Function>;
  enabled: boolean;
  currentBlockId: string;
  currentCallIndex: number;
  onBeforeBlockExec: (block: JSCBlock) => void;
  onAfterBlockExec: (block: JSCBlock) => void;
  onBeforeCommandExec: (command: Function) => void;
  onAfterCommandExec: (command: Function) => void;

  /**
   * The constructor.
   */
  constructor() {
    this.blocks = [];
    this.commandRegister = new Map<string, Function>();
    this.enabled = true;
    this.currentBlockId = '';
    this.currentCallIndex = 0;
    this.onBeforeBlockExec = () => { };
    this.onAfterBlockExec = () => { };
    this.onBeforeCommandExec = () => { };
    this.onAfterCommandExec = () => { };
  }

  /**
   * The "update" function.
   * @param {number} ts - The `ts` parameter stands for "timestep".
   */
  update(ts: number): void {
    if (!this.enabled) {
      return;
    }

    const currentBlock = this.blocks.find(block => block.id == this.currentBlockId);
    if (!currentBlock) {
      return;
    }

    if (this.currentCallIndex == currentBlock.calls.length) {
      this.onAfterBlockExec(currentBlock);
      this.currentBlockId = '';
      this.currentCallIndex = 0;
      return;
    }

    if (this.currentCallIndex == 0) {
      this.onBeforeBlockExec(currentBlock);
    }

    const currentCall = currentBlock.calls[this.currentCallIndex];
    const jumpto = this.runCommand(currentCall.commandName, currentCall.commandArgs);
    if (typeof jumpto === 'string') {
      this.currentBlockId = jumpto;
      this.currentCallIndex = 0;
      return;
    }

    if (this.currentCallIndex < currentBlock.calls.length) {
      this.currentCallIndex++;
    }
  }

  /**
   * The "loadFromFile" function asynchronously loads script data from a json file (jsc).
   * @param {string} path - The `path` parameter is the file path.
   */
  async loadFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    this.blocks = [];
    for (const obj of json) {
      const block: JSCBlock = { id: obj['Id'], description: obj['Description'], calls: [] };
      for (const objCall of obj['Calls']) {
        block.calls.push({
          commandName: objCall['Name'],
          commandArgs: objCall['Args']
        });
      }

      this.blocks.push(block);
    }
  }

  /**
   * The "registerCommand" function registers a command with a unique key and associates it with a
   * function.
   * @param {string} key - The `key` parameter is a string that represents the unique identifier for the
   * command. It is used to register and retrieve the command function from the command register.
   * @param {Function} commandFunc - The `commandFunc` parameter is a function that represents the
   * command to be registered. It can be any valid JavaScript function that will be executed when the
   * registered command is called.
   */
  registerCommand(key: string, commandFunc: Function) {
    if (this.commandRegister.has(key)) {
      throw new Error('ScriptMachine::registerCommand: key already exist !')
    }

    this.commandRegister.set(key, commandFunc);
  }

  /**
   * The "runCommand" function executes a registered command with the given key and arguments, and
   * returns the result.
   * @param {string} key - A string representing the key of the command to be executed.
   * @param args - An array of arguments that will be passed to the command function and coming from
   * the script file.
   * @returns The block identifier to jump.
   */
  runCommand(key: string, args: Array<any> = []): string | undefined {
    const command = this.commandRegister.get(key);
    if (!command) {
      throw new Error('ScriptMachine::runCommand: try to call an not existant command ' + key + ' !');
    }

    this.onBeforeCommandExec(command);
    const jumpto = command.call(this, ...args);
    this.onAfterCommandExec(command);
    return jumpto;
  }

  /**
   * The "clearCommandRegister" function flush the command register.
   */
  clearCommandRegister(): void {
    this.commandRegister.clear();
  }

  /**
   * The "isEnabled" function returns the enabled property.
   * @returns The `enabled`property.
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * The "setEnabled" function sets the enabled property indicating whether the script machine is enabled or
   * disabled.
   * @param {boolean} enabled - A boolean value indicating whether the script machine is enabled or
   * disabled.
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * The "jump" function sets the script machine on the specified commands block.
   * @param {string} blockId - The `blockId` parameter is a string that represents the ID of a block.
   */
  jump(blockId: string) {
    this.currentBlockId = blockId;
    this.currentCallIndex = 0;
  }
}

export { ScriptMachine };