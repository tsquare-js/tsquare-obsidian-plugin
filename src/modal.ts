/**
 * The board full size in tsquare's viewer (the playground's, also in the VS Code preview): zoom,
 * pan, pinch, and a chip per screen. Wheel and drag would trap the note's scrolling inline, so the
 * viewer only runs here, where there's nothing else to scroll.
 */
import { Modal, setIcon, type App } from "obsidian";
import { createViewer } from "tsquare/viewer";
import type { Board } from "./render";

export class BoardModal extends Modal {
  constructor(app: App, private board: Board) {
    super(app);
  }

  onOpen() {
    this.modalEl.addClass("tsquare-modal");
    if (this.board.title) this.titleEl.setText(this.board.title);
    const { contentEl } = this;
    const bar = contentEl.createDiv({ cls: "tsquare-toolbar" });
    const screens = bar.createDiv({ cls: "tsquare-screens", attr: { "aria-label": "Zoom to a screen" } });
    const zoom = bar.createDiv({ cls: "tsquare-zoom" });
    const zoomOut = zoom.createEl("button", { cls: "clickable-icon", attr: { "aria-label": "Zoom out" } });
    const zoomFit = zoom.createEl("button", { cls: "tsquare-zoom-level", attr: { "aria-label": "Fit to window" } });
    const zoomIn = zoom.createEl("button", { cls: "clickable-icon", attr: { "aria-label": "Zoom in" } });
    setIcon(zoomOut, "minus");
    setIcon(zoomIn, "plus");
    const stage = contentEl.createDiv({ cls: "tsquare-stage" });
    const canvas = stage.createDiv();

    const viewer = createViewer({ stage, canvas, screens, zoomIn, zoomOut, zoomFit });
    viewer.show(this.board.svg, this.board.width, this.board.height, this.board.items);
    this.scope.register([], "=", () => { viewer.zoomIn(); return false; });
    this.scope.register([], "+", () => { viewer.zoomIn(); return false; });
    this.scope.register([], "-", () => { viewer.zoomOut(); return false; });
    this.scope.register([], "0", () => { viewer.fit(); return false; });
  }

  onClose() {
    // the viewer's board image is a blob: URL it made; nothing else holds it once the modal is gone
    const src = this.contentEl.querySelector("img")?.src;
    if (src?.startsWith("blob:")) URL.revokeObjectURL(src);
    this.contentEl.empty();
  }
}
