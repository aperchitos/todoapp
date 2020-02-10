import { IState } from "./state.model";
import { Action } from "./action.model";

export interface IStore {
    getState: () => IState,
    dispatch: (action: Action) => Action
}