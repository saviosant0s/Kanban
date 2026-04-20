import { COLUMNS, PRIORITY_LABELS } from "../config/constants.js";

const validColumns = new Set(COLUMNS.map((column) => column.id));
const validPriorities = new Set(Object.keys(PRIORITY_LABELS));

export class Card {
  constructor({ id, title, desc = "", priority = "med", date = "", col = "todo" }) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.priority = priority;
    this.date = date;
    this.col = col;
  }

  static create(payload) {
    const normalized = {
      id: payload.id ?? Card.createId(),
      title: String(payload.title ?? "").trim(),
      desc: String(payload.desc ?? "").trim(),
      priority: payload.priority ?? "med",
      date: payload.date ?? "",
      col: payload.col ?? "todo",
    };

    Card.validate(normalized);
    return new Card(normalized);
  }

  static validate(payload) {
    if (!payload.id) {
      throw new Error("O identificador da tarefa e obrigatorio.");
    }

    if (!payload.title) {
      throw new Error("O titulo da tarefa e obrigatorio.");
    }

    if (!validColumns.has(payload.col)) {
      throw new Error("A coluna informada nao existe.");
    }

    if (!validPriorities.has(payload.priority)) {
      throw new Error("A prioridade informada e invalida.");
    }
  }

  static createId() {
    return Math.random().toString(36).slice(2, 10);
  }
}
