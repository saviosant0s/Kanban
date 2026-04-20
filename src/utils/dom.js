export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function formToObject(formElement) {
  const formData = new FormData(formElement);
  return Object.fromEntries(formData.entries());
}
