import { Card } from "../models/Card.js";
import { PRIORITY_ORDER, SORT_MODES } from "../config/constants.js";
import { addDays, toISODate } from "../utils/date.js";

export class BoardService {
  constructor(storageService) {
    this.storageService = storageService;
    this.cards = [];
    this.sortMode = SORT_MODES.none;
    this.draggedCardId = null;
  }

  initialize() {
    const persistedCards = this.storageService.load();

    if (persistedCards.length > 0) {
      try {
        this.cards = persistedCards.map((card) => Card.create(card));
        return;
      } catch {
        this.cards = [];
      }
    }

    this.cards = this.createSeedCards();
    this.persist();
  }

  createSeedCards() {
    const today = new Date();

    return [
      Card.create({
        title: "Redesign da homepage",
        desc: "Atualizar layout e paleta de cores",
        priority: "high",
        date: toISODate(addDays(today, 2)),
        col: "todo",
      }),
      Card.create({
        title: "Integracao com API de pagamentos",
        desc: "Implementar Stripe e testes",
        priority: "high",
        date: toISODate(addDays(today, 5)),
        col: "doing",
      }),
      Card.create({
        title: "Escrever documentacao",
        desc: "",
        priority: "low",
        date: toISODate(addDays(today, 14)),
        col: "todo",
      }),
      Card.create({
        title: "Corrigir bug no login",
        desc: "Usuarios nao conseguem redefinir senha",
        priority: "high",
        date: toISODate(addDays(today, 1)),
        col: "doing",
      }),
      Card.create({
        title: "Configurar CI/CD",
        desc: "Pipeline GitHub Actions",
        priority: "med",
        date: toISODate(addDays(today, 7)),
        col: "todo",
      }),
      Card.create({
        title: "Deploy v1.0",
        desc: "Publicar versao inicial em producao",
        priority: "med",
        date: toISODate(addDays(today, -2)),
        col: "done",
      }),
    ];
  }

  setSortMode(mode) {
    this.sortMode = mode;
  }

  getSortMode() {
    return this.sortMode;
  }

  getAllCards() {
    return [...this.cards];
  }

  getCardById(id) {
    return this.cards.find((card) => card.id === id) ?? null;
  }

  getCardsByColumn(columnId) {
    const columnCards = this.cards.filter((card) => card.col === columnId);

    if (this.sortMode === SORT_MODES.priority) {
      return [...columnCards].sort(
        (first, second) => PRIORITY_ORDER[first.priority] - PRIORITY_ORDER[second.priority],
      );
    }

    if (this.sortMode === SORT_MODES.date) {
      return [...columnCards].sort((first, second) => {
        if (!first.date && !second.date) {
          return 0;
        }

        if (!first.date) {
          return 1;
        }

        if (!second.date) {
          return -1;
        }

        return new Date(first.date) - new Date(second.date);
      });
    }

    return columnCards;
  }

  createCard(payload) {
    const card = Card.create(payload);
    this.cards.push(card);
    this.persist();
    return card;
  }

  updateCard(id, payload) {
    const cardIndex = this.cards.findIndex((card) => card.id === id);
    if (cardIndex === -1) {
      throw new Error("A tarefa informada nao foi encontrada.");
    }

    const updatedCard = Card.create({
      ...this.cards[cardIndex],
      ...payload,
      id,
    });

    this.cards[cardIndex] = updatedCard;
    this.persist();
    return updatedCard;
  }

  deleteCard(id) {
    this.cards = this.cards.filter((card) => card.id !== id);
    this.persist();
  }

  moveCard(id, columnId) {
    return this.updateCard(id, { col: columnId });
  }

  replaceAll(cards) {
    this.cards = cards.map((card) => Card.create(card));
    this.persist();
  }

  setDraggedCardId(id) {
    this.draggedCardId = id;
  }

  consumeDraggedCardId() {
    const currentId = this.draggedCardId;
    this.draggedCardId = null;
    return currentId;
  }

  clearDraggedCardId() {
    this.draggedCardId = null;
  }

  persist() {
    this.storageService.save(this.cards);
  }
}
