// Bundles src/main.ts and everything it uses (tsquare included) into main.js, the one script
// Obsidian loads. tsquare resolves to its browser build ("browser" condition): SVG only, Inter
// embedded, no Node APIs, so the plugin runs on mobile too.
//
//   node esbuild.config.mjs              watch, with source maps
//   node esbuild.config.mjs production   minified, once, with the bundled packages' license notices at the end
import esbuild from "esbuild";
import { appendFileSync } from "node:fs";
import { builtinModules } from "node:module";
import { licenseNotices } from "./licenses.mjs";

const production = process.argv[2] === "production";

const context = await esbuild.context({
  banner: { js: "/* Bundled by esbuild. Source: https://github.com/individual11/tsquare-obsidian-plugin */" },
  entryPoints: ["src/main.ts"],
  bundle: true,
  // Provided by Obsidian at runtime
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtinModules,
  ],
  format: "cjs",
  platform: "browser",
  target: "es2021",
  logLevel: "info",
  sourcemap: production ? false : "inline",
  treeShaking: true,
  outfile: "main.js",
  minify: production,
  metafile: production,
});

if (production) {
  const { metafile } = await context.rebuild();
  appendFileSync("main.js", licenseNotices(metafile));
  process.exit(0);
} else {
  await context.watch();
}
