# tsquare for Obsidian

Draw UI wireframes in your notes with [tsquare](https://tsquare.dev), a small text language for wireframe boards: screens side by side, notes, flow arrows, in clean grayscale. It's easy for AI models to write, so you can paste in what one wrote and see it right away.

## Use it

Write a `tsquare` code block in any note:

````
```tsquare
board "Sign in"
  screen phone "Sign in"
    stack gap=12 padding=24
      text lg bold "Welcome back"
      input "Email" placeholder="you@example.com"
      input password "Password"
      button primary "Sign in" fullWidth
```
````

In reading view and live preview, the block shows the board, sized to fit the note. Select the board (or its expand button) to open it full size: zoom with the buttons, a pinch or Ctrl/Cmd + scroll, drag to pan, and select a screen's name to zoom to it. Keys in that view: `+` and `-` zoom, `0` fits the board, Esc closes it.

If the text has a mistake, the block lists each problem with its line number, with a "did you mean" when there's a close match.

The [docs](https://tsquare.dev/docs) cover the language and every component; the [playground](https://tsquare.dev/playground) has examples to start from.

## Privacy

Wireframes are drawn on your device, by the tsquare library bundled into the plugin. The plugin makes no network requests and collects nothing.

## Install

From **Settings → Community plugins → Browse**, search for "tsquare" (once it's listed). Until then, copy `main.js`, `manifest.json` and `styles.css` from the [latest release](https://github.com/individual11/tsquare-obsidian-plugin/releases) to `<your vault>/.obsidian/plugins/tsquare/`, then turn it on under **Settings → Community plugins**. Works on desktop and mobile.

## License

MIT. `main.js` bundles the tsquare library and its dependencies (including satori, MPL-2.0, and the Inter font, OFL-1.1); their license notices are at the end of `main.js`.
