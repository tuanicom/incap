import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.spec.ts', '**/*.spec.tsx'],
    globals: true,
    isolate: true,
    threads: false,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      all: true,
      src: ['.'],
      exclude: [
        'node_modules',
        'dist',
        'coverage',
        'tests',
        'tests-results',
        'frontend',
        'src',
        '**/*.js'
      ]
    },
    exclude: ['**/tests/**', '**/coverage/**', '**/tests-results/**', '**/node_modules/**']
  }
});
