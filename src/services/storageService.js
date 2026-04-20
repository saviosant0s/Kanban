export class StorageService {
  constructor(storageKey, storage = window.localStorage) {
    this.storageKey = storageKey;
    this.storage = storage;
  }

  load() {
    const raw = this.storage.getItem(this.storageKey);
    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  save(cards) {
    this.storage.setItem(this.storageKey, JSON.stringify(cards));
  }
}
