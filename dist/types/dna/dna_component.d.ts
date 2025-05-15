/**
 * A component in a pure ECS data-driven implementation.
 */
declare class DNAComponent {
    typename: string;
    /**
     * @param {string} typename - The component identifier.
     */
    constructor(typename: string);
    /**
     * Returns the typename.
     */
    getTypename(): string;
}
export { DNAComponent };
