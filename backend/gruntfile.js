module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            default: {
                tsconfig: './tsconfig.json',
                outDir: "dist",
                src: ["**/*.ts", "!**/*.specs.ts", "!node_modules/**"]
            },
            tests: {
                tsconfig: './tsconfig.json',
                outDir: 'tests',
                src: ["**/*.ts", "!node_modules/**"]

            }
        },
        tslint: {
            options: {
                configuration: "tslint.json"
            },
            files: {
                src: ["\*\*/\*.ts","!\*\*/\*.specs.ts", "!node_modules/\*\*/\*.ts"]
            }
        },
        watch: {
            ts: {
                files: ["\*\*/\*.ts", "!node_modules/\*\*/\*.ts"],
                tasks: ["ts", "tslint"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");

    grunt.registerTask("default", [
        "ts",
        "tslint"
    ]);

};