import path from "node:path";
import pluginVue from "eslint-plugin-vue";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import stylistic from "@stylistic/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default defineConfigWithVueTs(
  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommendedTypeChecked,
  [
    includeIgnoreFile(gitignorePath),
    {
      files: ["**/*.vue", "**/*.js", "**/*.ts", "**/*.mjs"],
      plugins: {
        "@stylistic": stylistic
      },
      rules: {
        "camelcase": ["error", { properties: "never", ignoreDestructuring: true }],
        "no-console": ["error", { allow: ["info", "warn"] }],
        "@stylistic/indent": ["error", 2, { SwitchCase: 1 }],
        "@stylistic/linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
        "@stylistic/quotes": ["error", "double"],
        "@stylistic/semi": ["error", "always"],
        "@stylistic/no-extra-semi": "error",
        "@stylistic/comma-dangle": ["error", "never"],
        "@stylistic/space-before-function-paren": ["error", "always"],
        "@stylistic/multiline-ternary": ["error", "never"],
        "@stylistic/member-delimiter-style": ["error", { multiline: { delimiter: "semi" }, singleline: { delimiter: "comma" } }],
        "@stylistic/arrow-spacing": ["error", { before: true, after: true }],
        "@stylistic/brace-style": ["error", "stroustrup", { allowSingleLine: true }],
        "@stylistic/no-multi-spaces": "error",
        "@stylistic/space-before-blocks": "error",
        "@stylistic/no-trailing-spaces": "error",
        "vue/first-attribute-linebreak": ["error", { singleline: "ignore", multiline: "ignore" }],
        "vue/max-attributes-per-line": ["error", { singleline: 100 }],
        "vue/singleline-html-element-content-newline": ["off"],
        "vue/no-multiple-template-root": ["off"],
        "vue/html-closing-bracket-spacing": ["error", { selfClosingTag: "always" }],
        "vue/html-indent": ["error", 2],
        "vue/multiline-html-element-content-newline": ["error", { ignores: [] }]
      }
    }
  ]
);
