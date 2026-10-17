// npm version <x.y.z>: copies the version into manifest.json, and records it in versions.json
// with the manifest's minAppVersion (Obsidian offers each user the newest version their app supports).
import { readFileSync, writeFileSync } from "node:fs";

const version = process.env.npm_package_version;
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
manifest.version = version;
writeFileSync("manifest.json", JSON.stringify(manifest, null, 2) + "\n");

const versions = JSON.parse(readFileSync("versions.json", "utf8"));
if (!(version in versions)) {
  versions[version] = manifest.minAppVersion;
  writeFileSync("versions.json", JSON.stringify(versions, null, 2) + "\n");
}
