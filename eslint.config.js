// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import rxjs from "@smarttools/eslint-plugin-rxjs";
import rxjsAngular from 'eslint-plugin-rxjs-angular';
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { fixupPluginRules } from '@eslint/compat';
import typescriptParser from '@typescript-eslint/parser';

export default tseslint.config(
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser, // Use @typescript-eslint/parser
      parserOptions: {
        project: './tsconfig.json', // Link ESLint to your TypeScript config
      },
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      rxjs.configs.recommended,
    ],
    plugins: {
      rxjs: {},
      "rxjs-angular": fixupPluginRules(rxjsAngular),
      "simple-import-sort": simpleImportSort
    },
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/prefer-on-push-component-change-detection": [
        "error"
      ],
      "rxjs-angular/prefer-takeuntil": [
        "error",
        {
          "alias": ["takeUntilDestroyed"],
          "checkDecorators": ["Component", "Injectable"],
        }
      ],
      "simple-import-sort/imports": [
        "error",
        {
          "groups": [
            // Anything that start with @angular
            ["^@angular"],
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ["^@?\\w"],
            // Anything that starts with a dot.
            ["^\\."]
          ]
        }
      ],
      "simple-import-sort/exports": "error",
      "@typescript-eslint/array-type": ["error", {default: "generic"}],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
