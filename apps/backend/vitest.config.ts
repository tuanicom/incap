import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.spec.ts', '**/*.spec.tsx'],
    globals: true,
    isolate: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: '../../coverage/apps/backend',
      all: true,
      exclude: [
        'node_modules',
        'dist',
        'coverage',
        'tests',
        'tests-results',
        'frontend',
        '**/*.js'
      ]
    },
    exclude: ['**/tests/**', '**/coverage/**', '**/tests-results/**', '**/node_modules/**'],
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: 'tests-results/tests-results.xml'
        }
      ]
    ]
  }
});
