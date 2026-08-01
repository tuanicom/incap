import angularEslint from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { fixupPluginRules } from '@eslint/compat';

export default [
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/coverage/**",
            ".tscache/**",
            "vitest.*.ts",
            "**/*.js",
            "**/*.spec.ts",
            "**/*.html"
        ]
    },
    {
        plugins: {
            '@angular-eslint': fixupPluginRules(angularEslint),
            '@typescript-eslint': typescriptEslint,
        },
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.app.json",
                ecmaVersion: 2022,
                sourceType: "module"
            },
        },
        rules: {
            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    prefix: "app",
                    style: "camelCase"
                }
            ],
            "@angular-eslint/component-selector": [
                "error",
                {
                    type: "element",
                    prefix: "app",
                    style: "kebab-case"
                }
            ],
            "@typescript-eslint/consistent-type-definitions": "error",
            "@typescript-eslint/dot-notation": "off",
            "@typescript-eslint/explicit-member-accessibility": ["off", {
                accessibility: "explicit",
            }],
            "@typescript-eslint/member-ordering": "off",
            "@typescript-eslint/naming-convention": "error",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-empty-interface": "error",
            "@typescript-eslint/no-inferrable-types": ["error", {
                ignoreParameters: true,
            }],
            "@typescript-eslint/no-misused-new": "error",
            "@typescript-eslint/no-non-null-assertion": "error",
            "@typescript-eslint/no-shadow": ["error", {
                hoist: "all",
            }],
            "@typescript-eslint/no-unused-expressions": "error",
            "@typescript-eslint/no-use-before-define": "off",
            "@typescript-eslint/prefer-function-type": "error",
            "@typescript-eslint/unified-signatures": "error",
            "arrow-body-style": "error",
            "brace-style": "off",
            "constructor-super": "error",
            "curly": "error",
            "dot-notation": "off",
            "eol-last": "error",
            "eqeqeq": ["error", "smart"],
            "guard-for-in": "error",
            "id-denylist": "off",
            "id-match": "off",
            "indent": "off",
            "max-len": ["error", {
                code: 140,
            }],
            "no-bitwise": "error",
            "no-caller": "error",
            "no-console": ["error", {
                allow: [
                    "log",
                    "warn",
                    "dir",
                    "timeLog",
                    "assert",
                    "clear",
                    "count",
                    "countReset",
                    "group",
                    "groupEnd",
                    "table",
                    "dirxml",
                    "error",
                    "groupCollapsed",
                    "Console",
                    "profile",
                    "profileEnd",
                    "timeStamp",
                    "context",
                ],
            }],
            "no-debugger": "error",
            "no-empty": "off",
            "no-empty-function": "off",
            "no-eval": "error",
            "no-fallthrough": "error",
            "no-new-wrappers": "error",
            "no-restricted-imports": ["error", "rxjs/Rx"],
            "no-shadow": "error",
            "no-throw-literal": "error",
            "no-trailing-spaces": "error",
            "no-undef-init": "error",
            "no-underscore-dangle": "off",
            "no-unused-expressions": "error",
            "no-unused-labels": "error",
            "no-use-before-define": "off",
            "no-var": "error",
            "prefer-const": "error",
            "radix": "error",
            "semi": "error",
            "spaced-comment": ["error", "always", {
                markers: ["/"],
            }],
        },
    },
    {
        plugins: {
            '@angular-eslint/template': fixupPluginRules(angularTemplate),
        },
        files: ["**/*.html"],
        languageOptions: {
            parser: angularTemplate.parser,
        },
        rules: {
            "@angular-eslint/template/banana-in-box": "error",
            "@angular-eslint/template/no-negated-async": "error",
            "@angular-eslint/template/no-call-expression": "error",
        },
    }
];
