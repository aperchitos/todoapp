import { IState } from "./types/state.model";
import { TodoActionTypes } from "./actions";
import { ITodo } from "../types/todo.model";
import { Adapter } from "./adapter";
import { Action } from "./types/action.model";

const adapter = new Adapter<ITodo>();

export const initialState: IState = new Map<string, ITodo>();

export const reducer = (
    state: IState = initialState,
    action: Action
): IState => {
    switch (action.type) {
        case TodoActionTypes.AddTodo:
            return adapter.setOne(action.payload, state);

        case TodoActionTypes.RemoveTodo:
            return adapter.removeOne(action.payload, state);

        case TodoActionTypes.UpdateTodo:
            return adapter.setOne(action.payload, state);

        case TodoActionTypes.ToggleTodo:
            const item = state.get(action.payload);
            if (item) { 
                item.done = !item.done;
                return adapter.setOne(item, state);
            }
            
        default:
            return state;
    }
}

export default reducer;