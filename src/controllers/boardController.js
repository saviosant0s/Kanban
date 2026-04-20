import { COLUMNS, SORT_MODES } from "../config/constants.js";
import { formToObject } from "../utils/dom.js";

export class BoardController {
  constructor({
    boardService,
    boardView,
    modalView,
    importExportService,
    notificationService,
    fileInput,
  }) {
    this.boardService = boardService;
    this.boardView = boardView;
    this.modalView = modalView;
    this.importExportService = importExportService;
    this.notificationService = notificationService;
    this.fileInput = fileInput;
  }

  init() {
    this.boardService.initialize();
    this.render();
  }

  render() {
    const columnsByCards = Object.fromEntries(
      COLUMNS.map((column) => [column.id, this.boardService.getCardsByColumn(column.id)]),
    );

    this.boardView.render(columnsByCards);
    this.boardView.updateSortButtons(this.boardService.getSortMode());
  }

  openCreateModal(columnId = "todo") {
    this.modalView.openCreate(columnId);
  }

  openEditModal(cardId) {
    const card = this.boardService.getCardById(cardId);
    if (!card) {
      this.notificationService.show("A tarefa selecionada nao foi encontrada.", "error");
      return;
    }

    this.modalView.openEdit(card);
  }

  closeModal() {
    this.modalView.close();
  }

  submitForm(formElement) {
    const payload = formToObject(formElement);

    try {
      if (payload.id) {
        this.boardService.updateCard(payload.id, payload);
        this.notificationService.show("Tarefa atualizada com sucesso.");
      } else {
        this.boardService.createCard(payload);
        this.notificationService.show("Tarefa criada com sucesso.");
      }

      this.modalView.close();
      this.render();
    } catch (error) {
      this.notificationService.show(error.message, "error");
    }
  }

  deleteCard(cardId) {
    const card = this.boardService.getCardById(cardId);
    if (!card) {
      return;
    }

    const confirmed = window.confirm(`Excluir a tarefa "${card.title}"?`);
    if (!confirmed) {
      return;
    }

    this.boardService.deleteCard(cardId);
    this.render();
    this.notificationService.show("Tarefa excluida com sucesso.");
  }

  setSort(mode) {
    if (!Object.values(SORT_MODES).includes(mode)) {
      return;
    }

    this.boardService.setSortMode(mode);
    this.render();
  }

  exportCards() {
    const cards = this.boardService.getAllCards();
    this.importExportService.export(cards);
    const totalCards = cards.length;
    this.notificationService.show(`${totalCards} tarefa(s) exportada(s) com sucesso.`);
  }

  triggerImport() {
    this.fileInput.value = "";
    this.fileInput.click();
  }

  async importCards(file) {
    if (!file) {
      return;
    }

    try {
      const cards = await this.importExportService.import(file);
      const confirmed = window.confirm(
        `Importar ${cards.length} tarefa(s)? As tarefas atuais serao substituidas.`,
      );

      if (!confirmed) {
        return;
      }

      this.boardService.replaceAll(cards);
      this.render();
      this.notificationService.show(`${cards.length} tarefa(s) importada(s) com sucesso.`);
    } catch {
      this.notificationService.show("Arquivo invalido ou corrompido.", "error");
    }
  }

  startDrag(cardId) {
    this.boardService.setDraggedCardId(cardId);
    this.boardView.setDragging(cardId, true);
  }

  endDrag(cardId) {
    this.boardService.clearDraggedCardId();
    this.boardView.setDragging(cardId, false);
  }

  setDropZoneState(columnId, isActive) {
    this.boardView.setDropZoneState(columnId, isActive);
  }

  dropOnColumn(columnId) {
    const cardId = this.boardService.consumeDraggedCardId();
    if (!cardId) {
      return;
    }

    this.boardService.moveCard(cardId, columnId);
    this.render();
  }
}
