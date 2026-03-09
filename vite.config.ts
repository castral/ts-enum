/// <reference types="vitest/config" />
import { defineConfig, type UserConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext',
    lib: {
      entry: './lib/index.ts',
      fileName: 'index',
      formats: ['es'],
    }
  },
  test: {
    name: 'ts-enum',
    root: './test',
    globals: true,
    environment: 'node',
  },
} satisfies UserConfig);
