interface JSCBlock {
  id: string;
  description: string;
  calls: Array<JSCBlockCall>;
}

interface JSCBlockCall {
  commandName: string;
  commandArgs: Array<any>;
}
//@todo: add continue & pause
/**
 * Is a script machine that parse and execute blocks from a JSON file.
 */
class ScriptMachine {
  variants: any;
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
    this.variants = {};
    this.blocks = [];
    this.commandRegister = new Map<string, Function>();
    this.enabled = true;
    this.currentBlockId = '';
    this.currentCallIndex = 0;
    this.onBeforeBlockExec = () => { };
    this.onAfterBlockExec = () => { };
    this.onBeforeCommandExec = () => { };
    this.onAfterCommandExec = () => { };

    this.registerCommand('WAITPAD', this.#waitPad.bind(this));
    this.registerCommand('GOTO', this.#goto.bind(this));
    this.registerCommand('GOTO_IF', this.#gotoIf.bind(this));
    this.registerCommand('EXEC_IF', this.#execIf.bind(this));
    this.registerCommand('VAR_SET', this.#varSet.bind(this));
    this.registerCommand('VAR_ADD', this.#varAdd.bind(this));
    this.registerCommand('VAR_SUB', this.#varSub.bind(this));
    this.registerCommand('DELAY', this.#delay.bind(this));
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
   * Load asynchronously variants data from a json file (jsv).
   * 
   * @param {string} path - The file path.
   */
  async loadVariantFromFile(path: string): Promise<void> {
    const response = await fetch(path);
    const json = await response.json();

    for (const key in json) {
      this.addVariant(key, json[key]);
    }
  }

  /**
   * Load variants from data object.
   * 
   * @param {any} data - The data object.
   */
  loadVariantFromData(data: any): void {
    for (const key in data) {
      this.addVariant(key, data[key]);
    }
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

  /**
   * Add a new variable.
   * 
   * @param {string} varloc - The var name.
   * @param {any} value - The value.
   */
  addVariant(varloc: string, value: any): void {
    if (this.variants.hasOwnProperty(varloc)) {
      throw new Error('ScriptMachine::addVariant: varloc already exist in variants dictionnary');
    }

    this.variants[varloc] = value;
  }

  /**
   * Remove a variable.
   * 
   * @param {string} varloc - The var name.
   */
  removeVariant(varloc: string): void {
    if (!this.variants.hasOwnProperty(varloc)) {
      throw new Error('ScriptMachine::removeVariant: varloc not exist in variants dictionnary');
    }

    delete this.variants[varloc];
  }

  /**
   * Set variable value.
   * 
   * @param {string} varloc - The var name.
   * @param {any} value - The value.
   */
  setVariant(varloc: string, value: any): void {
    if (!this.variants.hasOwnProperty(varloc)) {
      throw new Error('ScriptMachine::setVariant: varloc not exist in variants dictionnary');
    }

    this.variants[varloc] = value;
  }

  /**
   * Check variable existing.
   * 
   * @param {string} varloc - The var name.
   */
  hasVariant(varloc: string): boolean {
    return this.variants.hasOwnProperty(varloc);
  }

  /**
   * Returns variable value.
   * 
   * @param {string} varloc - The var name.
   */
  getVariant(varloc: string): any {
    if (!this.variants.hasOwnProperty(varloc)) {
      throw new Error('ScriptMachine::getVariant: varloc not exist in variants dictionnary');
    }

    return this.variants[varloc];
  }

  #waitPad(): void {
    this.setEnabled(false);
    document.addEventListener('keydown', (e) => e.key == 'Enter' ? this.setEnabled(true) : '', { once: true });
  }

  #goto(jumpto: string): string {
    return jumpto;
  }

  #gotoIf(varloc: string, cond: string, value: any, jumpto: string): string | null {
    if (CHECK_CONDITION(this.getVariant(varloc), cond, value)) {
      return jumpto;
    }

    return null;
  }

  #execIf(varloc: string, cond: string, value: any, cmd: { CommandName: string, CommandArgs: Array<any> } = { CommandName: '', CommandArgs: [] }): void {
    if (CHECK_CONDITION(this.getVariant(varloc), cond, value)) {
      this.runCommand(cmd['CommandName'], cmd['CommandArgs']);
    }
  }

  #varSet(varloc: string, value: any): void {
    this.setVariant(varloc, value);
  }

  #varAdd(varloc: string, value: any): void {
    const variant = this.getVariant(varloc);
    this.setVariant(varloc, variant + value);
  }

  #varSub(varloc: string, value: any): void {
    const variant = this.getVariant(varloc);
    this.setVariant(varloc, variant - value);
  }

  #delay(ms: number): void {
    this.setEnabled(false);
    window.setTimeout(() => this.setEnabled(true), ms);
  }
}

export { ScriptMachine };

// -------------------------------------------------------------------------------------------
// HELPFUL
// -------------------------------------------------------------------------------------------

function CHECK_CONDITION(value1: any, cond: string, value2: any): boolean {
  return (cond == 'not equal' && value1 != value2) ||
         (cond == 'equal' && value1 == value2) ||
         (cond == 'is less than' && value1 < value2) ||
         (cond == 'is greater than' && value1 > value2);
}