import { Plugin } from "obsidian";
import { WireframeBlock } from "./block";

export default class TsquarePlugin extends Plugin {
  onload() {
    // ```tsquare blocks, in reading view and live preview. Obsidian calls this again when the
    // block's text changes; the old WireframeBlock unloads when its element leaves the page.
    this.registerMarkdownCodeBlockProcessor("tsquare", (source, el, ctx) => {
      ctx.addChild(new WireframeBlock(el, source, this.app));
    });
  }
}
