/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
      name: "ts-enum",
      root: "./test",
      globals: true,
      environment: "node",
    },
  }
);
