import { ITodo } from "./types/todo.model";
import { getTodoTemplate } from "./utils/get-todo-template";
import { ElementsIdentificators } from "./const/elements-identificators.enum";
import { States } from "./const/states.enum";

// Class for DOM manipulations (get/set/add/remove elements/props)
export class DOMManager {
    public get addTodoInput() {
        return <HTMLInputElement>this.getElementById('addTodoInput');
    }

    public get addTodoButton() {
        return <HTMLButtonElement>this.getElementById('addTodoButton');
    }

    public get modal() {
        return <HTMLDivElement>this.getElementById('modal');
    }

    public get modalConfirmButton() {
        return <HTMLButtonElement>this.getElementById('modal-button-confirm');
    }

    public get modalCancelButtons() {
        return <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('modal-button-cancel');
    }

    public get modalText() {
        return <HTMLDivElement>this.getElementById('modal-text');
    }

    private get todoListWrapper() {
        return <HTMLElement>this.getElementById('todos');
    }

    private get todoCompletedListWrapper() {
        return <HTMLElement>this.getElementById('todos-completed');
    }

    getElementById(id: string) {
        return <HTMLElement>document.getElementById(id);
    }

    getElementsByClassName(element: Element, className: string) {
        return element.getElementsByClassName(className);
    }

    getUpdateTodoButton(element: HTMLElement) {
        return this.getButtonByIdentificator(element, ElementsIdentificators.UpdateButtonClass);
    }

    getCancelEditButton(element: HTMLElement) {
        return this.getButtonByIdentificator(element, ElementsIdentificators.CancelButtonClass);
    }

    getButtonByIdentificator(element: HTMLElement, identificator: string) {
        return this.getElementsByClassName(
            element, 
            identificator
        )[0];
    }

    addTodo(todo: ITodo) {
        // Create todo element
        const element = <HTMLElement>document.createElement('li');
        element.id = todo.id;
        element.innerHTML = getTodoTemplate(todo.text);
        element.classList.add('todos-element');

        // Append block to the parent element
        this.todoListWrapper.appendChild(element);

        this.addTodoInput['value'] = '';
        this.addTodoInput.focus();
    }

    removeTodo(id: string) {
        const element = <HTMLDivElement>this.getElementById(id);
        if (element) { element.remove(); }
    }

    updateTodo(todo: ITodo) {
        const input = this.getEditTodoInput(todo.id);
        input['value'] = todo.text;
        input.disabled = !input.disabled;
        input.focus();
    }

    toggleTodo(id: string, done: boolean) {
        const element = <HTMLDivElement>this.getElementById(id);
        if (element) {
            done
                ? this.todoCompletedListWrapper.appendChild(element)
                : this.todoListWrapper.appendChild(element);
        }
    }

    toggleEditMode(todo: ITodo) {
        const element = <HTMLDivElement>this.getElementById(todo.id);
        element.classList.toggle('is-edit');
        this.updateTodo(todo);
    }

    getEditTodoInput(id: string) {
        return (<HTMLInputElement>this.getElementsByClassName(
            <HTMLDivElement>this.getElementById(id), 
            ElementsIdentificators.TodoInputClass
        )[0]);
    }

    toggleAddTodoDisabled() {
        this.addTodoInput.disabled = !this.addTodoInput.disabled;
        this.addTodoButton.disabled = !this.addTodoButton.disabled;
    }

    showModal(text: string, isCancelModal?: boolean) {
        this.modalText.innerHTML = text;
        this.modal.classList.remove(States.isCancelModal);
        this.modal.classList.add(States.isActive);

        if (isCancelModal) {
            this.modal.classList.add(States.isCancelModal);
        }

        this.modal.focus();
    }

    closeModal() {
        this.modal.classList.remove(States.isActive);
        setTimeout(() => {
            this.modalText.innerHTML = '';
            this.modal.classList.remove(States.isCancelModal);
        }, 300);
    }
}