/**
 * One ```tsquare block in a note: the board as an image that fits the note's width, with an
 * expand button that opens it in the zoomable viewer. Problems are listed with line numbers.
 */
import { MarkdownRenderChild, setIcon, type App } from "obsidian";
import { BoardModal } from "./modal";
import { renderBoard, type Board, type Problem } from "./render";

export class WireframeBlock extends MarkdownRenderChild {
  private url: string | null = null;

  constructor(containerEl: HTMLElement, private source: string, private app: App) {
    super(containerEl);
  }

  onload() {
    this.containerEl.addClass("tsquare-block");
    const status = this.containerEl.createDiv({ cls: "tsquare-status", text: "Rendering wireframe…" });
    renderBoard(this.source).then(
      (r) => {
        status.remove();
        if ("board" in r) this.showBoard(r.board);
        else this.showProblems(r.problems);
      },
      (err: unknown) => {
        status.remove();
        this.showProblems([{ line: 0, message: `tsquare couldn't render this board: ${err instanceof Error ? err.message : String(err)}` }]);
      },
    );
  }

  onunload() {
    if (this.url) URL.revokeObjectURL(this.url);
  }

  private showBoard(board: Board) {
    this.url = URL.createObjectURL(new Blob([board.svg], { type: "image/svg+xml" }));
    const label = board.title ? `Wireframe: ${board.title}` : "Wireframe";
    const img = this.containerEl.createEl("img", { cls: "tsquare-board", attr: { src: this.url, alt: label, width: board.width, height: board.height } });
    const expand = this.containerEl.createEl("button", { cls: "tsquare-expand clickable-icon", attr: { "aria-label": "Open wireframe" } });
    setIcon(expand, "maximize-2");
    const open = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation(); // in live preview, a click on the block would otherwise put the cursor in it
      new BoardModal(this.app, board).open();
    };
    this.registerDomEvent(img, "click", open);
    this.registerDomEvent(expand, "click", open);
  }

  private showProblems(problems: Problem[]) {
    const box = this.containerEl.createDiv({ cls: "tsquare-problems" });
    box.createDiv({ cls: "tsquare-problems-title", text: problems.length === 1 ? "1 problem in this wireframe" : `${problems.length} problems in this wireframe` });
    const list = box.createEl("ul");
    for (const p of problems) list.createEl("li", { text: p.line ? `line ${p.line}: ${p.message}` : p.message });
  }
}
