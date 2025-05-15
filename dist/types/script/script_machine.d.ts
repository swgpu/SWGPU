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
declare class ScriptMachine {
    #private;
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
    constructor();
    /**
     * Load asynchronously script data from a json file (jsc).
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
    /**
     * Load asynchronously variants data from a json file (jsv).
     *
     * @param {string} path - The file path.
     */
    loadVariantFromFile(path: string): Promise<void>;
    /**
     * Load variants from data object.
     *
     * @param {any} data - The data object.
     */
    loadVariantFromData(data: any): void;
    /**
     * The update function.
     *
     * @param {number} ts - The timestep.
     */
    update(ts: number): void;
    /**
     * Executes a registered command and returns the block to jump.
     *
     * @param {string} key - The command identifier.
     * @param args - A list of arguments that will be passed to the command function.
     */
    runCommand(key: string, args?: Array<any>): string | undefined;
    /**
     * Registers a command.
     *
     * @param {string} key - The unique identifier for the command (aka the command name).
     * @param {Function} commandFunc - The command function to be registered.
     */
    registerCommand(key: string, commandFunc: Function): void;
    /**
     * Flush the command register.
     */
    clearCommandRegister(): void;
    /**
     * Jump to the specified script file block.
     *
     * @param {string} blockId - The block identifier.
     */
    jump(blockId: string): void;
    /**
     * Check if the script machine is enabled or not.
     */
    isEnabled(): boolean;
    /**
     * Set the enable flag.
     *
     * @param {boolean} enabled - Indicating whether the script machine is enabled or disabled.
     */
    setEnabled(enabled: boolean): void;
    /**
     * Add a new variable.
     *
     * @param {string} varloc - The var name.
     * @param {any} value - The value.
     */
    addVariant(varloc: string, value: any): void;
    /**
     * Remove a variable.
     *
     * @param {string} varloc - The var name.
     */
    removeVariant(varloc: string): void;
    /**
     * Set variable value.
     *
     * @param {string} varloc - The var name.
     * @param {any} value - The value.
     */
    setVariant(varloc: string, value: any): void;
    /**
     * Check variable existing.
     *
     * @param {string} varloc - The var name.
     */
    hasVariant(varloc: string): boolean;
    /**
     * Returns variable value.
     *
     * @param {string} varloc - The var name.
     */
    getVariant(varloc: string): any;
}
export { ScriptMachine };
