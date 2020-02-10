import TodoWorker = require("worker-loader*");

import { IWorkerMessage } from "./types/worker-message.model";
import { reducer, initialState } from "./store/reducer";
import { createStore } from "./store/create-store";
import { Action } from "./store/types/action.model";
import { TodoActionTypes } from "./store/actions";
import { generateId } from "./utils/generate-id";
import { ITodo } from "./types/todo.model";

const worker: TodoWorker = self as any;
const store = createStore(reducer, initialState);

worker.onmessage = (message: IWorkerMessage) => {
    let action: Action = message.data;

    if (action.type === TodoActionTypes.AddTodo) {
        // Generate id for todo
        action.payload.id = getId(store.getState());
    }

    action = store.dispatch(action);

    if (action.type === TodoActionTypes.ToggleTodo) {
        action.payload = store.getState().get(action.payload);
    }

    if (action.type === TodoActionTypes.AddTodo) {
        // Imitate request/response delay on add todo
        return setTimeout(() => worker.postMessage(action), .5);
    } 

    return worker.postMessage(action);
};

function getId(todos: Map<string, ITodo>): string {
    let id = generateId();

    while(todos.has(id)) {
        id = generateId();
    }

    return id;
}


