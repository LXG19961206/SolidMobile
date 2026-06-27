import { defineConfig } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    environment: 'happy-dom',
    globals: true,
  },
  resolve: {
    conditions: ['browser', 'development'],
    alias: {
      'solid-component': resolve(__dirname, 'src'),
    },
  },
});
