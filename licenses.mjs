// The license notices for everything bundled into main.js, appended to it as a comment: Obsidian
// installs only main.js, manifest.json and styles.css, so the notices their licenses ask to ship
// with copies have to be inside main.js. tsquare's browser build bundles packages of its own
// (satori, the Inter font, …) and lists them in its THIRD_PARTY_LICENSES.txt, included here whole.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const tsquareDir = path.dirname(createRequire(import.meta.url).resolve("tsquare/package.json"));

export function licenseNotices(metafile) {
  const packages = new Map([[tsquareDir, "tsquare"]]); // directory → name
  for (const input of Object.keys(metafile.inputs)) {
    const m = input.match(/^(.*node_modules\/((?:@[^/]+\/)?[^/]+))\//);
    if (m && m[2] !== "tsquare") packages.set(m[1], m[2]);
  }
  const sections = [...packages].map(([dir, name]) => {
    const pkg = JSON.parse(readFileSync(path.join(dir, "package.json"), "utf8"));
    const file = readdirSync(dir).find((f) => /^(licen[cs]e|copying)(\.[\w-]+)?$/i.test(f));
    const vendored = `licenses/${name.replace("/", "__")}.txt`;
    if (!file && !existsSync(vendored)) throw new Error(`${name} ${pkg.version} ships no license file: add its notice to ${vendored} (with where it comes from) after checking upstream`);
    const text = readFileSync(file ? path.join(dir, file) : vendored, "utf8").trim();
    const noticeFile = readdirSync(dir).find((f) => /^notices?(\.[\w-]+)?$/i.test(f));
    const notice = noticeFile ? `\n\nNOTICE\n\n${readFileSync(path.join(dir, noticeFile), "utf8").trim()}` : "";
    const repo = (typeof pkg.repository === "string" ? pkg.repository : pkg.repository?.url)?.replace(/^git\+/, "").replace(/\.git$/, "").replace(/^git:\/\//, "https://");
    const source = `Source: ${repo ?? pkg.homepage ?? `https://www.npmjs.com/package/${name}/v/${pkg.version}`} (npm: ${name}@${pkg.version})`;
    return { name, version: pkg.version, text: `${name} ${pkg.version} (${pkg.license})\n${source}\n${"-".repeat(72)}\n${text}${notice}\n` };
  });
  sections.sort((a, b) => a.name.localeCompare(b.name) || a.version.localeCompare(b.version, undefined, { numeric: true }));
  const inner = readFileSync(path.join(tsquareDir, "dist/browser/THIRD_PARTY_LICENSES.txt"), "utf8").trim();
  const all = `Third-party software bundled into this file\n\n${sections.map((s) => s.text).join("\n\n")}\n\n${"=".repeat(72)}\n\n${inner}\n`;
  return `\n/*\n${all.replaceAll("*/", "* /")}*/\n`;
}
