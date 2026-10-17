# Contributing

## How it relates to tsquare

The plugin depends on the [`tsquare`](https://www.npmjs.com/package/tsquare) package and gets everything from it: parsing and checking (`compileWireframe`), rendering (`renderWireframeSvg`, `boardLayout`) and the zoomable viewer (`tsquare/viewer`). esbuild picks tsquare's browser build (the `browser` export condition): SVG only, the Inter font embedded, no Node APIs, so the same `main.js` runs on desktop and mobile. The language lives in the [tsquare repo](https://github.com/tsquare-js/tsquare).

**For now `package.json` points at a local checkout** (`file:../wireframe`), because the browser build isn't released yet (tsquare-js/tsquare#23). Clone the library next to this repo as `wireframe/` and run `npm install && npm run build` there first. Once it's released, pin the version here like the VS Code extension does; CI can't install a `file:` dependency, so it fails until then.

## Develop

```bash
npm install
npm run dev     # rebuilds main.js on every change
```

Link the repo into a test vault's plugins folder (the folder name must be the plugin id, `tsquare`):

```bash
ln -s "$PWD" "<vault>/.obsidian/plugins/tsquare"
```

Turn the plugin on under **Settings → Community plugins**. After a rebuild, reload it: turn it off and on, or run **Reload app without saving** from the command palette. The [Hot-Reload](https://github.com/pjeby/hot-reload) plugin does this on every build.

On a phone or tablet, the simplest way to try a build is [BRAT](https://github.com/TfTHacker/obsidian42-brat) pointed at this repo (it installs from GitHub releases).

## Check

```bash
npm run build   # typecheck + minified main.js with the license notices appended
npm run lint    # Obsidian's own rules (eslint-plugin-obsidianmd), the ones the plugin review runs
```

## Release

1. `npm version <x.y.z>` updates `manifest.json` and `versions.json` (each version → the oldest Obsidian it needs, `minAppVersion`), commits and tags. Tags have no `v` prefix: Obsidian looks for a release named exactly like the manifest's version.
2. `git push --follow-tags`. The release workflow builds and creates a **draft** GitHub release with `main.js`, `manifest.json` and `styles.css` attached (with build provenance). Review it and publish.

`main.js` is never committed; Obsidian downloads it from the release. It checks `manifest.json` on the default branch to learn that a new version exists.
