import { FormatJTMObject } from './format_jtm';
/**
 * A tile object.
 */
declare class Gfx2TileObject {
    id: string;
    position: vec2;
    name: string;
    type: string;
    visible: boolean;
    size: vec2;
    properties: Map<string, any>;
    constructor();
    /**
     * Load data from data object.
     *
     * @param {FormatJTMObject} data - The data object.
     */
    loadFromData(data: FormatJTMObject): void;
    /**
     * Returns the id.
     */
    getId(): string;
    /**
     * Returns the position (location or canvas position).
     */
    getPosition(): vec2;
    /**
     * Returns the name.
     */
    getName(): string;
    /**
     * Returns the type.
     */
    getType(): string;
    /**
     * Returns the visible flag.
     */
    isVisible(): boolean;
    /**
     * Returns the size.
     */
    getSize(): vec2;
    /**
     * Returns the property list.
     */
    getProperties(): Map<string, any>;
}
export { Gfx2TileObject };
