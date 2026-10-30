import angularEslint from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      "**/*.js",
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**"
    ]
  },
  {
    files: ["**/*.ts"],
    plugins: {
      '@angular-eslint': angularEslint
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.eslint.json"
      }
    },
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          "prefix": "app",
          "style": "kebab-case",
          "type": "element"
        }
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          "prefix": "app",
          "style": "camelCase",
          "type": "attribute"
        }
      ]
    }
  },
  {
    files: ["**/*.html"],
    plugins: {
      '@angular-eslint/template': angularTemplate
    },
    languageOptions: {
      parser: angularTemplateParser
    },
    rules: {}
  }
];
