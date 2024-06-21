/**
 * A component in a pure ECS data-driven implementation.
 */
class DNAComponent {
  static typename: string;

  /**
   * @param {string} typename - The component identifier.
   */
  constructor(typename: string) {
    DNAComponent.typename = typename;
  }

  /**
   * Returns the typename.
   */
  getTypename(): string {
    return DNAComponent.typename;
  }
}

export { DNAComponent };