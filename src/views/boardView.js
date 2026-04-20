import { COLUMNS } from "../config/constants.js";
import { createColumnTemplate } from "./templates.js";

export class BoardView {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  render(columnsByCards) {
    this.rootElement.innerHTML = COLUMNS.map((column) => {
      const cards = columnsByCards[column.id] ?? [];
      return createColumnTemplate(column, cards);
    }).join("");
  }

  updateSortButtons(mode) {
    document.querySelectorAll("[data-action='set-sort']").forEach((button) => {
      button.classList.toggle("active", button.dataset.sort === mode);
    });
  }

  setDragging(cardId, isDragging) {
    const card = document.querySelector(`[data-card-id="${cardId}"]`);
    if (!card) {
      return;
    }

    card.classList.toggle("dragging", isDragging);
  }

  setDropZoneState(columnId, isActive) {
    const column = document.querySelector(`[data-column="${columnId}"]`);
    if (!column) {
      return;
    }

    column.classList.toggle("drag-over", isActive);
  }
}
