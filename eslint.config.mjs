import path from "node:path";
import pluginVue from "eslint-plugin-vue";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import stylistic from "@stylistic/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default defineConfigWithVueTs([
  vueTsConfigs.recommendedTypeChecked,
  includeIgnoreFile(gitignorePath),
  {
    files: ["**/*.vue", "**/*.js", "**/*.ts", "**/*.mjs"],
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs["flat/recommended"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
      ...pluginVue.configs["flat/strongly-recommended"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
      ...pluginVue.configs["flat/essential"].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
      "camelcase": ["error", { properties: "never", ignoreDestructuring: true }],
      "no-console": ["error", { allow: ["info", "warn", "error"] }],
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
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/block-spacing": ["error", "always"],
      "@stylistic/comma-spacing": ["error", { after: true, before: false }],
      "@stylistic/comma-style": ["error", "last"],
      "@stylistic/key-spacing": ["error", { afterColon: true, beforeColon: false }],
      "@stylistic/keyword-spacing": ["error", { after: true, before: true }],
      "@stylistic/object-curly-newline": "off",
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }],
      "@stylistic/one-component-per-file": "off",
      "@stylistic/require-default-prop": "off",
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/template-curly-spacing": "error",
      "@stylistic/quote-props": ["error", "consistent-as-needed"],
      "vue/first-attribute-linebreak": ["error", { singleline: "ignore", multiline: "ignore" }],
      "vue/max-attributes-per-line": ["error", { singleline: 100 }],
      "vue/singleline-html-element-content-newline": ["off"]
    }
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
]);
