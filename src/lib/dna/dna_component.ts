/**
 * The `DNAComponent` class represents a component in a pure ECS data-driven implementation.
 */
class DNAComponent {
  typename: string;

  /**
   * The constructor.
   * @param {string} typename - The typename parameter is a string that represents the type of object
   * being created. It is used to easily retrieve a specific component inside an entity.
   */
  constructor(typename: string) {
    this.typename = typename;
  }

  /**
   * The "getTypename" function returns the typename as a string.
   * @returns The method is returning string that represents the name of a component type.
   */
  getTypename(): string {
    return this.typename;
  }
}

export { DNAComponent };