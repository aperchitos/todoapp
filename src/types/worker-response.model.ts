import { Action } from "../store/types/action.model";
import { ITodo } from "./todo.model";

export interface IWorkerResponse extends Action {
    todos: Map<string, ITodo>
}