import { ITodo } from "../types/todo.model";
import { Action } from "./types/action.model";

export enum TodoActionTypes {
    AddTodo = '[Todos] Add todo',
    RemoveTodo = '[Todos] Remove todo',
    UpdateTodo = '[Todos] Update todo',
    ToggleTodo = '[Todos] Toggle todo'
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.AddTodo;

  constructor(public payload: ITodo) {}
}

export class RemoveTodo implements Action {
  readonly type = TodoActionTypes.RemoveTodo;

  constructor(public payload: string) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoActionTypes.UpdateTodo;

  constructor(public payload: ITodo) {}
}

export class ToggleTodo implements Action {
  readonly type = TodoActionTypes.ToggleTodo;

  constructor(public payload: string) {}
}

export type TodoActions =
  | AddTodo
  | RemoveTodo
  | UpdateTodo
  | ToggleTodo
;
