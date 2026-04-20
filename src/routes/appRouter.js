export class AppRouter {
  constructor({ boardController, boardRoot, modalElement, formElement, fileInput }) {
    this.boardController = boardController;
    this.boardRoot = boardRoot;
    this.modalElement = modalElement;
    this.formElement = formElement;
    this.fileInput = fileInput;
  }

  register() {
    document.addEventListener("click", (event) => this.handleClick(event));
    document.addEventListener("keydown", (event) => this.handleKeydown(event));
    document.addEventListener("dragstart", (event) => this.handleDragStart(event));
    document.addEventListener("dragend", (event) => this.handleDragEnd(event));
    this.boardRoot.addEventListener("dragover", (event) => this.handleDragOver(event));
    this.boardRoot.addEventListener("dragleave", (event) => this.handleDragLeave(event));
    this.boardRoot.addEventListener("drop", (event) => this.handleDrop(event));
    this.formElement.addEventListener("submit", (event) => this.handleSubmit(event));
    this.fileInput.addEventListener("change", (event) => this.handleImport(event));
  }

  handleClick(event) {
    const actionElement = event.target.closest("[data-action]");
    if (!actionElement) {
      if (event.target === this.modalElement) {
        this.boardController.closeModal();
      }
      return;
    }

    const { action, cardId, column, sort } = actionElement.dataset;

    switch (action) {
      case "set-sort":
        this.boardController.setSort(sort);
        break;
      case "open-create-modal":
        this.boardController.openCreateModal(column);
        break;
      case "open-edit-modal":
        this.boardController.openEditModal(cardId);
        break;
      case "delete-card":
        this.boardController.deleteCard(cardId);
        break;
      case "close-modal":
        this.boardController.closeModal();
        break;
      case "trigger-import":
        this.boardController.triggerImport();
        break;
      case "export-cards":
        this.boardController.exportCards();
        break;
      default:
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.boardController.submitForm(event.currentTarget);
  }

  handleImport(event) {
    const [file] = event.currentTarget.files;
    this.boardController.importCards(file);
  }

  handleKeydown(event) {
    if (event.key === "Escape") {
      this.boardController.closeModal();
    }
  }

  handleDragStart(event) {
    const card = event.target.closest("[data-card-id]");
    if (!card) {
      return;
    }

    this.boardController.startDrag(card.dataset.cardId);
    event.dataTransfer.effectAllowed = "move";
  }

  handleDragEnd(event) {
    const card = event.target.closest("[data-card-id]");
    if (!card) {
      return;
    }

    this.boardController.endDrag(card.dataset.cardId);
  }

  handleDragOver(event) {
    const dropZone = event.target.closest("[data-drop-zone]");
    if (!dropZone) {
      return;
    }

    event.preventDefault();
    this.boardController.setDropZoneState(dropZone.dataset.dropZone, true);
  }

  handleDragLeave(event) {
    const dropZone = event.target.closest("[data-drop-zone]");
    if (!dropZone) {
      return;
    }

    if (dropZone.contains(event.relatedTarget)) {
      return;
    }

    this.boardController.setDropZoneState(dropZone.dataset.dropZone, false);
  }

  handleDrop(event) {
    const dropZone = event.target.closest("[data-drop-zone]");
    if (!dropZone) {
      return;
    }

    event.preventDefault();
    this.boardController.setDropZoneState(dropZone.dataset.dropZone, false);
    this.boardController.dropOnColumn(dropZone.dataset.dropZone);
  }
}
