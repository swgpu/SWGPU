interface EnginePackItem<T> {
    name: string;
    ext: string;
    object: T;
    blobUrl: string;
}
declare class EnginePackItemList<T> extends Array<EnginePackItem<T>> {
    constructor();
    get(name: string): T;
}
export type { EnginePackItem };
export { EnginePackItemList };
