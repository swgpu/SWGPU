interface PackItem<T> {
  name: string;
  ext: string;
  object: T;
  blobUrl: string;
};

class PackItemList<T> extends Array<PackItem<T>> {
  constructor() {
    super();
  }

  get(name: string): T {
    const item = this.find(i => i.name == name);
    if (!item) {
      throw new Error('EnginePack::PackItemList::get(): item not found !');
    }

    return item.object;
  }
}

export type { PackItem };
export { PackItemList };