# Changelog

## 0.1.1

Fixes from the community directory's review:

- `LICENSE` is the plain MIT text, so GitHub recognizes it (the note about the Inter font's license is in the README; the full notices stay at the end of `main.js`).
- Release assets have GitHub artifact attestations from this repo (0.1.0's were made before the repo moved to tsquare-js).
- The screen chips in the full-size view no longer hide their scrollbar (`scrollbar-width`, which older Obsidian versions only partly support).

## 0.1.0

- `tsquare` code blocks render as boards in reading view and live preview, sized to fit the note.
- Select a board to open it full size in tsquare's viewer: zoom buttons, pinch and scroll zoom, pan, a chip per screen, keyboard zoom.
- Problems are listed under the block with line numbers.
- Uses tsquare 0.10.0 (its browser build), so it runs on desktop and mobile.
