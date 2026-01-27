module.exports = function gruntConfig(grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            default: {
                tsconfig: './tsconfig.json',
                outDir: "dist",
                src: ["**/*.ts", "!**/*.spec.ts", "!node_modules/**"]
            },
            tests: {
                tsconfig: './tsconfig.json',
                outDir: 'tests',
                src: ["**/*.ts", "!node_modules/**"]

            }
        },
        eslint: {
            target: [
                "**/*.ts",
                "!**/*.spec.ts",
                "!node_modules/**/*.ts"
            ],
            options: {
                format: grunt.option('format') || 'stylish',
                outputFile: grunt.option('output-file') || '',
                overrideConfigFile: 'eslint.config.mjs'
            }
        },
        watch: {
            ts: {
                files: ["**/*.ts", "!node_modules/**/*.ts"],
                tasks: ["ts", "tslint"]
            }
        },
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-eslint");

    grunt.registerTask("default", [
        "ts",
        "eslint"
    ]);
};
