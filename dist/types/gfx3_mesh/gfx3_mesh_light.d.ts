import { Gfx3Transformable } from '../gfx3/gfx3_transformable';
export declare enum LightType {
    POINT = "POINT",
    SPOT = "SPOT"
}
/**
 * A 3D light.
 */
declare class Gfx3MeshLight extends Gfx3Transformable {
    type: LightType;
    diffuse: vec3;
    specular: vec3;
    intensity: number;
    constant: number;
    linear: number;
    exp: number;
    radius: number;
    meshId: number;
    cutoff: number;
    direction: vec3;
    constructor();
    /**
     * Load asynchronously point light data from a json file (jlt).
     *
     * @param {string} path - The file path.
     */
    loadFromFile(path: string): Promise<void>;
    /**
     * The draw function.
     */
    draw(): void;
    /**
     * Set the light type.
     *
     * @param {LightType} type - The type.
     */
    setType(type: LightType): void;
    /**
     * Set diffuse color.
     *
     * @param {number} r - The red channel.
     * @param {number} g - The green channel.
     * @param {number} b - The blue channel.
     */
    setDiffuse(r: number, g: number, b: number): void;
    /**
     * Set specular color.
     *
     * @param {number} r - The red channel.
     * @param {number} g - The green channel.
     * @param {number} b - The blue channel.
     */
    setSpecular(r: number, g: number, b: number): void;
    /**
     * Set intensity value.
     *
     * @param {number} intensity - The intensity value.
     */
    setIntensity(intensity: number): void;
    /**
     * Set constant attenuation.
     *
     * @param {number} constant - The constant value.
     */
    setConstant(constant: number): void;
    /**
     * Set linear attenuation.
     *
     * @param {number} linear - The linear value.
     */
    setLinear(linear: number): void;
    /**
     * Set exp attenuation.
     *
     * @param {number} exp - The exp value.
     */
    setExp(exp: number): void;
    /**
     * Set radius value.
     * Note: radius is not directly used by the engine but is here
     * to let you deal with it if needed.
     *
     * @param {number} radius - The radius.
     */
    setRadius(radius: number): void;
    /**
     * Set mesh id targeted.
     * Note: 0 affect all mesh
     *
     * @param {number} meshId - The mesh id.
     */
    setMeshId(meshId: number): void;
    /**
     * Set the spot cutoff angle.
     *
     * @param {number} cutoff - The cutoff angle.
     */
    setCutoff(cutoff: number): void;
    /**
     * Set the spot direction.
     *
     * @param {number} x - The x direction.
     * @param {number} y - The y direction.
     * @param {number} z - The z direction.
     */
    setDirection(x: number, y: number, z: number): void;
    /**
     * Returns the type.
     */
    getType(): LightType;
    /**
     * Returns the diffuse color.
     */
    getDiffuse(): vec3;
    /**
     * Returns the specular color.
     */
    getSpecular(): vec3;
    /**
     * Returns the intensity.
     */
    getIntensity(): number;
    /**
     * Returns the constant attenuation value.
     */
    getConstant(): number;
    /**
     * Returns the linear attenuation value.
     */
    getLinear(): number;
    /**
     * Returns the exponent attenuation value.
     */
    getExp(): number;
    /**
     * Returns the influence radius.
     */
    getRadius(): number;
    /**
     * Returns the mesh id affected by the light.
     * Note: 0 affect all mesh
     */
    getMeshId(): number;
    /**
     * Returns the spot cutoff angle.
     */
    getCutoff(): number;
    /**
     * Returns the spot direction.
     */
    getDirection(): vec3;
}
export { Gfx3MeshLight };
