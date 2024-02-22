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
 * Is a script machine that parse and execute blocks from a JSON file.
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
   * The update function.
   * 
   * @param {number} ts - The timestep.
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
   * Load asynchronously script data from a json file (jsc).
   * 
   * @param {string} path - The file path.
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
   * Executes a registered command and returns the block to jump.
   * 
   * @param {string} key - The command identifier.
   * @param args - A list of arguments that will be passed to the command function.
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
   * Registers a command.
   * 
   * @param {string} key - The unique identifier for the command (aka the command name).
   * @param {Function} commandFunc - The command function to be registered.
   */
  registerCommand(key: string, commandFunc: Function) {
    if (this.commandRegister.has(key)) {
      throw new Error('ScriptMachine::registerCommand: key already exist !')
    }

    this.commandRegister.set(key, commandFunc);
  }

  /**
   * Flush the command register.
   */
  clearCommandRegister(): void {
    this.commandRegister.clear();
  }

  /**
   * Jump to the specified script file block.
   * 
   * @param {string} blockId - The block identifier.
   */
  jump(blockId: string) {
    this.currentBlockId = blockId;
    this.currentCallIndex = 0;
  }

  /**
   * Check if the script machine is enabled or not.
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Set the enable flag.
   * 
   * @param {boolean} enabled - Indicating whether the script machine is enabled or disabled.
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

export { ScriptMachine };