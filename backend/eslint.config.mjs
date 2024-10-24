import _import from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default [{
    plugins: {
        import: fixupPluginRules(_import),
        jsdoc,
        "@typescript-eslint": typescriptEslint,
    },
    files: ["**/*.ts"],

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
        },
    },

    rules: {
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/dot-notation": "off",

        "@typescript-eslint/explicit-member-accessibility": ["off", {
            accessibility: "explicit",
        }],


        "@typescript-eslint/member-ordering": "error",
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
        "brace-style": ["error", "1tbs"],
        "constructor-super": "error",
        curly: "error",
        "dot-notation": "off",
        "eol-last": "error",
        eqeqeq: ["error", "smart"],
        "guard-for-in": "error",
        "id-denylist": "off",
        "id-match": "off",
        "import/no-deprecated": "warn",
        indent: "error",
        "jsdoc/no-types": "error",

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
        radix: "error",
        semi: "error",

        "spaced-comment": ["error", "always", {
            markers: ["/"],
        }],
    },
}];
