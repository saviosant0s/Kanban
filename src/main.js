import { STORAGE_KEYS } from "./config/constants.js";
import { BoardController } from "./controllers/boardController.js";
import { AppRouter } from "./routes/appRouter.js";
import { BoardService } from "./services/boardService.js";
import { ImportExportService } from "./services/importExportService.js";
import { NotificationService } from "./services/notificationService.js";
import { StorageService } from "./services/storageService.js";
import { BoardView } from "./views/boardView.js";
import { ModalView } from "./views/modalView.js";

const boardRoot = document.querySelector("#board-root");
const modalElement = document.querySelector("#task-modal");
const formElement = document.querySelector("#task-form");
const fileInput = document.querySelector("#import-input");
const toastRoot = document.querySelector("#toast-root");

const storageService = new StorageService(STORAGE_KEYS.cards);
const boardService = new BoardService(storageService);
const boardView = new BoardView(boardRoot);
const modalView = new ModalView(modalElement, formElement);
const importExportService = new ImportExportService();
const notificationService = new NotificationService(toastRoot);

const boardController = new BoardController({
  boardService,
  boardView,
  modalView,
  importExportService,
  notificationService,
  fileInput,
});

const appRouter = new AppRouter({
  boardController,
  boardRoot,
  modalElement,
  formElement,
  fileInput,
});

boardController.init();
appRouter.register();
