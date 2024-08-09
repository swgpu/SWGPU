import { FormatJTMObject } from './format_jtm';

/**
 * A tile object.
 */
class Gfx2TileObject {
  id: string;
  position: vec2;
  name: string;
  type: string;
  visible: boolean;
  size: vec2;
  properties: Map<string, any>;

  constructor() {
    this.id = '';
    this.position = [0, 0];
    this.name = '';
    this.type = '';
    this.visible = true;
    this.size = [0, 0];
    this.properties = new Map<string, any>();
  }

  /**
   * Load data from data object.
   * 
   * @param {FormatJTMObject} data - The data object.
   */
  loadFromData(data: FormatJTMObject): void {
    this.id = data['Id'] ?? '';
    this.position = data['Position'] ?? [0, 0];
    this.name = data['Name'] ?? '';
    this.type = data['Type'] ?? '';
    this.visible = data['Visible'] ? true : false;
    this.size = data['Size'] ?? [0, 0];

    for (const key in data['Properties']) {
      this.properties.set(key, data['Properties'][key]);
    }
  }

  /**
   * Returns the id.
   */
  getId(): string {
    return this.id;
  }

  /**
   * Returns the position (location or canvas position).
   */
  getPosition(): vec2 {
    return this.position;
  }

  /**
   * Returns the name.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Returns the type.
   */
  getType(): string {
    return this.type;
  }

  /**
   * Returns the visible flag.
   */
  isVisible(): boolean {
    return this.visible;
  }

  /**
   * Returns the size.
   */
  getSize(): vec2 {
    return this.size;
  }

  /**
   * Returns the property list.
   */
  getProperties(): Map<string, any> {
    return this.properties;
  }
}

export { Gfx2TileObject };