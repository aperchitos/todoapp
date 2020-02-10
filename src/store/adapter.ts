export interface IAdapterItem<T> {
    id: T
}

export class Adapter<T extends IAdapterItem<string>> {
    setOne = (item: T, map: Map<string, T>) => map.set(item.id, item);

    removeOne = (id: string, map: Map<string, T>) => {
        map.delete(id);
        return map;
    }
}