import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'production' || process.env.BUILD_MODE === 'lib';

  if (isLibrary) {
    return {
      plugins: [solidPlugin()],
      publicDir: false,
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'SolidComponent',
          formats: ['es', 'cjs'],
          fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
        },
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
        cssCodeSplit: false,
        sourcemap: true,
      },
    };
  }

  // Docs / dev mode
  return {
    root: 'docs-dev',
    plugins: [solidPlugin()],
    resolve: {
      alias: {
        'solid-component': resolve(__dirname, 'src'),
      },
    },
    base: '/SolidMobile/',
    build: {
      outDir: resolve(__dirname, 'docs'),
      emptyOutDir: false,
      rollupOptions: {
        treeshake: {
          moduleSideEffects: (id) => {
            // doc-i18n merges doc keys into the library's messages object
            // at import time — Rollup must not tree-shake it.
            if (id.includes('doc-i18n')) return 'no-treeshake';
          },
        },
      },
    },
    server: {
      host: true,
      port: 3000,
    },
  };
});
