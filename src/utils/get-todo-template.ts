import { ElementsIdentificators } from "../const/elements-identificators.enum";

export function getTodoTemplate(text: string, id: string) {
    return `
        <span class="${ElementsIdentificators.ContentClass}">
            <span class="toggle">
                <i class="fa fa-check"></i>
            </span>
            
            <input 
                disabled
                id="input-${id}"
                class="${ElementsIdentificators.TodoInputClass}"
                type="text" 
                value="${text}"
                placeholder="${text}">
            <label for="input-${id}">Edit todo</label>
        </span>

        <span class="todos-element-actions">
            <span class="todos-element-toggle">
                <button 
                    aria-label="Edit todo"
                    class="${ElementsIdentificators.EditButtonClass} button-icon button-colored--gray">
                    <i aria-hidden="true" class="icon fa fa-edit"></i>
                </button>
                <button 
                    aria-label="Remove todo"
                    class="${ElementsIdentificators.DeleteButtonClass} button-icon button-colored--red">
                    <i aria-hidden="true" class="icon fa fa-trash"></i>
                </button>
            </span>
            <span class="todos-element-edit">
                <button 
                    aria-label="Confirm todo"
                    class="${ElementsIdentificators.UpdateButtonClass} button-icon button-colored--gray">
                    <i aria-hidden="true" class="icon fa fa-check"></i>
                </button>
                <button 
                    aria-label="Close edit"
                    class="${ElementsIdentificators.CancelButtonClass} button-icon button-colored--red">
                    <i aria-hidden="true" class="icon fa fa-times"></i>
                </button>
            </span>
        </span>
    `;
}