# Changelog

## 0.2.0

- **Uses tsquare 0.13.2** (it was 0.10.0). Boards get tsquare's renderer fixes since then: content taller than its screen no longer hides a toast or tab bar or pushes a modal or bottom sheet down, a screen name wider than its screen ends in "…" instead of pushing the screens after it off the board, and notes on the board are laid out at the height they're drawn at (a row of notes in a grid no longer moves the screens below it or sends a flow arrow across a screen). The language hasn't changed.
- **A board's size and its viewer's screen chips match the board** on boards with notes: they come from tsquare's `measureBoardLayout`, which measures notes as drawn, instead of an estimate that could be a line or more off.

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
