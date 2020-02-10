import { IAdapterItem } from "../store/adapter";

export interface ITodo extends IAdapterItem<string> {
    text: string,
    done?: boolean
}
