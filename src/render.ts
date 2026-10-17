/**
 * Wireframe text → SVG and board layout, with tsquare's browser build (SVG only, nothing read from
 * disk, no network). Results are cached by source text: Obsidian re-renders a block whenever its
 * section of the note redraws, and most of those times the text hasn't changed.
 */
import { boardLayout, compileWireframe, renderWireframeSvg } from "tsquare";
import type { BoardItem } from "tsquare/viewer";

export type Board = { svg: string; width: number; height: number; items: BoardItem[]; title?: string };
export type Problem = { line: number; message: string };
export type Rendered = { board: Board } | { problems: Problem[] };

const CACHE_SIZE = 32;
const cache = new Map<string, Promise<Rendered>>();

export function renderBoard(source: string): Promise<Rendered> {
  const hit = cache.get(source);
  if (hit) {
    cache.delete(source); // most recently used goes last
    cache.set(source, hit);
    return hit;
  }
  const result = render(source);
  cache.set(source, result);
  result.catch(() => cache.delete(source)); // an unexpected error: try again next time
  if (cache.size > CACHE_SIZE) cache.delete(cache.keys().next().value!);
  return result;
}

async function render(source: string): Promise<Rendered> {
  const { spec, issues } = compileWireframe(source);
  if (!spec || issues.length) return { problems: issues };
  const svg = await renderWireframeSvg(spec, { skipValidation: true }); // compileWireframe validated it
  const { width, height, items } = boardLayout(spec);
  const title = (spec.elements[spec.root]?.props as { title?: string } | undefined)?.title;
  return { board: { svg, width, height, items, title } };
}
