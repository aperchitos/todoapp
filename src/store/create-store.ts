import { IState } from "./types/state.model";
import { IStore } from "./types/store.model";
import { Action } from "./types/action.model";

export function createStore(
    reducer: (state: IState, action: Action) => IState, 
    initialState: IState
): IStore {
    let state = initialState;
  
    function getState(): IState {
      return state;
    }
  
    function dispatch(action: Action): Action {
      state = reducer(state, action);
  
      return action;
    }
  
    return {
      getState,
      dispatch
    }
};