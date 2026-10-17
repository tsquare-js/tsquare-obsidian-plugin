// Obsidian's own lint rules (eslint-plugin-obsidianmd): the same checks the community plugin review runs.
import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";
import { globalIgnores, defineConfig } from "eslint/config";

export default defineConfig(
  globalIgnores(["node_modules", "main.js", "esbuild.config.mjs", "licenses.mjs", "version-bump.mjs", "versions.json", "package.json", "package-lock.json", "tsconfig.json"]),
  {
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        projectService: { allowDefaultProject: ["eslint.config.mts", "manifest.json"] },
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: [".json"],
      },
    },
  },
  ...obsidianmd.configs.recommended,
);
