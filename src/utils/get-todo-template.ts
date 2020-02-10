import { ElementsIdentificators } from "../const/elements-identificators.enum";

export function getTodoTemplate(text: string) {
    return `
        <span class="${ElementsIdentificators.ContentClass}">
            <span class="toggle">
                <i class="fa fa-check"></i>
            </span>
            <input 
                disabled
                class="${ElementsIdentificators.TodoInputClass}"
                type="text" 
                value="${text}"
                placeholder="${text}">
        </span>

        <span class="todos-element-actions">
            <span class="todos-element-toggle">
                <button class="${ElementsIdentificators.EditButtonClass} button-icon button-colored--gray">
                    <i class="icon fa fa-edit"></i>
                </button>
                <button class="${ElementsIdentificators.DeleteButtonClass} button-icon button-colored--red">
                    <i class="icon fa fa-trash"></i>
                </button>
            </span>
            <span class="todos-element-edit">
                <button class="${ElementsIdentificators.UpdateButtonClass} button-icon button-colored--gray">
                    <i class="icon fa fa-check"></i>
                </button>
                <button class="${ElementsIdentificators.CancelButtonClass} button-icon button-colored--red">
                    <i class="icon fa fa-times"></i>
                </button>
            </span>
        </span>
    `;
}