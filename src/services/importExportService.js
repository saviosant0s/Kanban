export class ImportExportService {
  export(cards) {
    const payload = {
      version: 2,
      exportedAt: new Date().toISOString(),
      cards,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const date = new Date().toLocaleDateString("pt-BR").replaceAll("/", "-");

    anchor.href = url;
    anchor.download = `kanban-backup-${date}.json`;
    anchor.click();

    URL.revokeObjectURL(url);
  }

  async import(file) {
    const content = await file.text();
    const data = JSON.parse(content);

    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.cards)) {
      return data.cards;
    }

    throw new Error("Formato de importacao invalido.");
  }
}
