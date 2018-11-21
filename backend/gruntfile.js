module.exports = function (grunt) {
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
        tslint: {
            options: {
                configuration: "tslint.json"
            },
            files: {
                src: ["\*\*/\*.ts","!\*\*/\*.spec.ts", "!node_modules/\*\*/\*.ts"]
            }
        },
        watch: {
            ts: {
                files: ["\*\*/\*.ts", "!node_modules/\*\*/\*.ts"],
                tasks: ["ts", "tslint"]
            }
        },
        coveralls: {
            // Options relevant to all targets
            options: {
              // When true, grunt-coveralls will only print a warning rather than
              // an error, to prevent CI builds from failing unnecessarily (e.g. if
              // coveralls.io is down). Optional, defaults to false.
              force: false
            },
        
            backend: {
              // LCOV coverage file (can be string, glob or array)
              src: 'coverage/*.info',
              options: {
                // Any options for just this target
              }
            },
          },
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks('grunt-coveralls');

    grunt.registerTask("default", [
        "ts",
        "tslint"
    ]);

};