import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
  test: {
    globals: true,
    setupFiles: ['reflect-metadata'],
    include: ['**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary'],
      include: ['modules/**'],
      exclude: [
        'modules/**/__tests__/**',
        'modules/**/index.ts',
        'modules/**/model.ts',
        'modules/**/*.port.ts',
        'modules/**/di/**',
        'modules/**/application/ports/**',
        'modules/auth/**',
      ],
    },
  },
});
