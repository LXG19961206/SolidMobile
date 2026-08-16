import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';

const __dirname = resolve();

/**
 * solid-mobile library build.
 *
 * The docs site is an independent project now (it consumes this package via
 * `file:` tarball / registry) — there is no docs mode here anymore.
 */
export default defineConfig({
  plugins: [solidPlugin()],
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SolidComponent',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    outDir: 'dist',
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      external: ['solid-js', 'solid-js/web', 'solid-js/store'],
      output: {
        globals: {
          'solid-js': 'Solid',
          'solid-js/web': 'SolidWeb',
          'solid-js/store': 'SolidStore',
        },
      },
    },
  },
});
