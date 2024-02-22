/**
 * A component in a pure ECS data-driven implementation.
 */
class DNAComponent {
  typename: string;

  /**
   * @param {string} typename - The component identifier.
   */
  constructor(typename: string) {
    this.typename = typename;
  }

  /**
   * Returns the typename.
   */
  getTypename(): string {
    return this.typename;
  }
}

export { DNAComponent };