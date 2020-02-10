import TodoWorker = require("worker-loader?name=js/[name].js!./worker");

import './assets/scss/style.scss';

import { TodoActionTypes } from "./store/actions";
import { Action } from "./store/types/action.model";
import { IWorkerResponse } from "./types/worker-response.model";
import { ITodo } from "./types/todo.model";
import { DOMManager } from "./DOM-manager";
import { ElementsIdentificators } from "./const/elements-identificators.enum";

class TodoApp {
    private readonly worker = new TodoWorker();
    private readonly domManager = new DOMManager(); 

    // Save todo old value to restore on cancel edit
    private oldTodoValue = '';

    constructor() {
        // Update DOM after action
        this.worker.onmessage = (result: MessageEvent) => this.updateDOM(result.data);

        this.addBasicEventListeners();
    }

    addTodo() {
        const text = <string>this.domManager.addTodoInput['value']; 

        if (text && text.length) {
            // Disable input and button during sending request
            this.domManager.toggleAddTodoDisabled();

            this.postMessage(TodoActionTypes.AddTodo, {
                text,
                done: false
            });
        } else {
            this.domManager.showModal('Please let me know what you want to do :)', true); 
        }
    }

    removeTodo(id: string) {
        this.domManager.modalConfirmButton.onclick = () => {
            this.postMessage<string>(TodoActionTypes.RemoveTodo, id);
            this.domManager.closeModal();
        }

        this.domManager.showModal('Are you sure you want to delete this item?'); 
    }

    updateTodo(todo: ITodo) {
        this.postMessage(TodoActionTypes.UpdateTodo, todo);
    }

    toggleTodo(id: string) {
        this.postMessage<string>(TodoActionTypes.ToggleTodo, id);
    }

    // Send message to the worker
    private postMessage<T = ITodo>(type: TodoActionTypes, payload: T) {
        this.worker.postMessage({ type, payload } as Action);
    }

    // Update DOM depends on action
    private updateDOM(response: IWorkerResponse) {
        if (response) {
            const todo = response.payload;

            switch(response.type) {
                case TodoActionTypes.AddTodo:
                    return (
                        // Enable input and button after response 
                        this.domManager.toggleAddTodoDisabled(),

                        // Add todo to DOM
                        this.domManager.addTodo(todo),

                        // Add event listeners to edit and delete button
                        this.addMainEventListeners(todo),

                        // Add keys event listeners to edit input
                        this.addKeyupEventListeners(todo.id)
                    );

                case TodoActionTypes.RemoveTodo:
                    return this.domManager.removeTodo(todo); 

                case TodoActionTypes.UpdateTodo:
                    return this.domManager.toggleEditMode(todo);

                case TodoActionTypes.ToggleTodo:
                    return  this.domManager.toggleTodo(todo.id, todo.done);
            }
        }
    }

    private addBasicEventListeners() {
        // Event listener for add todo button
        const addTodoButton = this.domManager.addTodoButton;
        if (addTodoButton) {
            addTodoButton.onclick = () => this.addTodo();
        }

        // Trigger click event if enter was pressed while input is on focus
        const addTodoInput = this.domManager.addTodoInput;
        addTodoInput.addEventListener('keyup', function(event: KeyboardEvent) {
            if (event.keyCode === 13) {
              event.preventDefault();
              addTodoButton.click();
            }
        });

        // Add close event listeners to modal times icon and cancel button
        const closeModalButtons = this.domManager.modalCancelButtons;
        for (let button of closeModalButtons) {
            if (button) {
                button.onclick = () => this.domManager.closeModal();
            }
        }
    }

    // Add keys event listener to edit todo input
    private addKeyupEventListeners(id: string) {
        const element = this.domManager.getElementById(id);
        const nameInput = this.domManager.getEditTodoInput(id);
        const updateButton = <HTMLButtonElement>this.domManager.getUpdateTodoButton(element);
        const cancelButton = <HTMLButtonElement>this.domManager.getCancelEditButton(element);

        nameInput.addEventListener('keyup', function(event: KeyboardEvent) {
            // Trigger update todo if Enter was pressed while input had been on focus
            if (event.keyCode === 13) {
              event.preventDefault();
              updateButton.click();
            }

            // Trigger cancel edit if ESC was pressed while input had been on focus
            if (event.keyCode === 27) {
              event.preventDefault();
              cancelButton.click();
            }
        });
    }

    // Add event listeners to the main buttons
    private addMainEventListeners(todo: ITodo) {
        const element = this.domManager.getElementById(todo.id);
        const nameInput = this.domManager.getEditTodoInput(todo.id);

        if (element) {
            // Event listener for toggle completed/not completed
            (<HTMLButtonElement>this.domManager.getElementsByClassName(
                element, 
                ElementsIdentificators.ContentClass
            )[0]).onclick = () => {
                if (!element.classList.contains('is-edit')) {
                    this.toggleTodo(todo.id);
                }
            }

            // Event listener for edit button
            (<HTMLButtonElement>this.domManager.getElementsByClassName(
                element, 
                ElementsIdentificators.EditButtonClass
            )[0]).onclick = () => {
                this.oldTodoValue = nameInput['value'];
                this.domManager.toggleEditMode(todo);
                this.addEditEventListeners(todo);
            };

            // Event listener for remove button
            (<HTMLButtonElement>this.domManager.getElementsByClassName(
                element, 
                ElementsIdentificators.DeleteButtonClass
            )[0]).onclick = () => this.removeTodo(todo.id);
        }
    }

    // Add event listeners to the edit mode buttons
    private addEditEventListeners(todo: ITodo) {
        const element = this.domManager.getElementById(todo.id);
        const nameInput = this.domManager.getEditTodoInput(todo.id);

        if (element) {
            // Event listener for update button
            (<HTMLButtonElement>this.domManager.getUpdateTodoButton(element)).onclick = () => {
                this.oldTodoValue = '';
                todo.text = nameInput['value'];
                this.updateTodo(todo);
            }

            // Event listener for cancel edit button
            (<HTMLButtonElement>this.domManager.getCancelEditButton(element)).onclick = () => {
                todo.text = this.oldTodoValue;
                this.oldTodoValue = '';
                this.domManager.toggleEditMode(todo);
            };
        }
    }
}

const todoApp = new TodoApp();
export = todoApp;