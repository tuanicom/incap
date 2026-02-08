import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['**/*.spec.ts', '**/*.spec.tsx', 'src/**/*.spec.ts'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      exclude: [
        'node_modules',
        'dist',
        'coverage',
        'tests',
        'tests-results',
        '**/*.js'
      ]
    }
  }
});
