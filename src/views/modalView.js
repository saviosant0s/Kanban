import { COLUMNS } from "../config/constants.js";

export class ModalView {
  constructor(modalElement, formElement) {
    this.modalElement = modalElement;
    this.formElement = formElement;
    this.titleElement = modalElement.querySelector("#modal-title");
    this.columnSelect = formElement.querySelector("#task-col");

    this.populateColumns();
  }

  populateColumns() {
    this.columnSelect.innerHTML = COLUMNS.map(
      (column) => `<option value="${column.id}">${column.title}</option>`,
    ).join("");
  }

  openCreate(defaultColumn = "todo") {
    this.titleElement.textContent = "Nova Tarefa";
    this.formElement.reset();
    this.formElement.elements.id.value = "";
    this.formElement.elements.priority.value = "med";
    this.formElement.elements.col.value = defaultColumn;
    this.open();
    this.formElement.elements.title.focus();
  }

  openEdit(card) {
    this.titleElement.textContent = "Editar Tarefa";
    this.formElement.elements.id.value = card.id;
    this.formElement.elements.title.value = card.title;
    this.formElement.elements.desc.value = card.desc ?? "";
    this.formElement.elements.priority.value = card.priority;
    this.formElement.elements.date.value = card.date ?? "";
    this.formElement.elements.col.value = card.col;
    this.open();
    this.formElement.elements.title.focus();
  }

  close() {
    this.modalElement.classList.remove("open");
    this.modalElement.setAttribute("aria-hidden", "true");
  }

  isOpen() {
    return this.modalElement.classList.contains("open");
  }

  open() {
    this.modalElement.classList.add("open");
    this.modalElement.setAttribute("aria-hidden", "false");
  }
}
