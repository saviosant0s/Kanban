export function toISODate(value) {
  return value.toISOString().split("T")[0];
}

export function addDays(baseDate, days) {
  const next = new Date(baseDate);
  next.setDate(next.getDate() + days);
  return next;
}

export function getDateStatus(dateString) {
  if (!dateString) {
    return "";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDate = new Date(`${dateString}T00:00:00`);
  const diffInDays = Math.ceil((taskDate - today) / 86400000);

  if (diffInDays < 0) {
    return "overdue";
  }

  if (diffInDays <= 3) {
    return "soon";
  }

  return "";
}

export function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}
