interface PackItem<T> {
    name: string;
    ext: string;
    object: T;
    blobUrl: string;
}
declare class PackItemList<T> extends Array<PackItem<T>> {
    constructor();
    get(name: string): T;
}
export type { PackItem };
export { PackItemList };
