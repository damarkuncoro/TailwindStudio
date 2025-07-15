// vitest.workspace.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'src/**/*.test.ts',
      'tests/**/*.test.ts',
      'tests/**/*.spec.ts', // opsional: dukung .spec.ts juga
    ],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
