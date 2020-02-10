import { TodoActionTypes } from "../actions";
import { ITodo } from "../../types/todo.model";

export interface Action<T = TodoActionTypes, V = ITodo> {
    type: T | any,
    payload?: V | any
}