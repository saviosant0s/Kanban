export class NotificationService {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  show(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    this.rootElement.appendChild(toast);

    window.setTimeout(() => {
      toast.classList.add("fade-out");
      window.setTimeout(() => toast.remove(), 160);
    }, 2800);
  }
}
