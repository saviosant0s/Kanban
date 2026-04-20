import { PRIORITY_LABELS } from "../config/constants.js";
import { formatDate, getDateStatus } from "../utils/date.js";
import { escapeHtml } from "../utils/dom.js";

export function createColumnTemplate(column, cards) {
  return `
    <section class="column" data-column="${column.id}">
      <header class="column-header">
        <div class="column-heading">
          <span class="column-dot" aria-hidden="true"></span>
          <span class="column-title">${column.title}</span>
          <span class="column-count">${cards.length}</span>
        </div>
        <button class="column-add" data-action="open-create-modal" data-column="${column.id}" type="button" aria-label="Adicionar tarefa na coluna ${column.title}">
          +
        </button>
      </header>

      <div class="cards-list" data-drop-zone="${column.id}">
        ${cards.length ? cards.map(createCardTemplate).join("") : createEmptyStateTemplate()}
      </div>
    </section>
  `;
}

export function createCardTemplate(card) {
  const dateStatus = getDateStatus(card.date);
  const dateClass = dateStatus ? ` ${dateStatus}` : "";
  const overduePrefix = dateStatus === "overdue" ? "Atrasada - " : "";

  return `
    <article class="card" draggable="true" data-card-id="${card.id}" data-priority="${card.priority}">
      <h3 class="card-title">${escapeHtml(card.title)}</h3>
      ${card.desc ? `<p class="card-desc">${escapeHtml(card.desc)}</p>` : ""}

      <div class="card-footer">
        <span class="priority-badge ${card.priority}">${PRIORITY_LABELS[card.priority]}</span>
        ${card.date ? `<span class="card-date${dateClass}">${overduePrefix}${formatDate(card.date)}</span>` : ""}
      </div>

      <div class="card-actions">
        <button class="card-action-btn" data-action="open-edit-modal" data-card-id="${card.id}" type="button">Editar</button>
        <button class="card-action-btn delete" data-action="delete-card" data-card-id="${card.id}" type="button">Excluir</button>
      </div>
    </article>
  `;
}

export function createEmptyStateTemplate() {
  return `
    <div class="empty-state">
      <p>Sem tarefas nesta coluna.</p>
    </div>
  `;
}
