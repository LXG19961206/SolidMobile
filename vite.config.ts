import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'production' || process.env.BUILD_MODE === 'lib';

  if (isLibrary) {
    return {
      plugins: [solidPlugin()],
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
    server: {
      port: 3000,
    },
  };
});
