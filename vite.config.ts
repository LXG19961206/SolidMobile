import { defineConfig, type Plugin } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve, relative, dirname } from 'path';
import { existsSync } from 'fs';

const __dirname = resolve();

/**
 * Vite plugin that redirects resolved `src/` imports to `dist-dev/` (or `dist/`),
 * swapping `.tsx`/`.ts` extensions for `.js`.  Only active when the resolved
 * absolute path falls under `<root>/src`.
 *
 * Together with a `preserveModules` build this lets the docs site run against
 * the *built* output — the same code that ships to npm — without a single
 * import change in the docs source.
 */
function redirectSrcToDist(): Plugin {
  const root = resolve(__dirname);
  const srcDir = resolve(root, 'src');
  // Prefer dist-dev (preserveModules) if it exists, fall back to dist
  const distDevDir = resolve(root, 'dist-dev');
  const distDir = resolve(root, 'dist');
  const targetDir = existsSync(distDevDir) ? distDevDir : distDir;

  return {
    name: 'redirect-src-to-dist',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      // Only handle relative imports from within the project
      if (!importer || !source.startsWith('.')) return null;

      const basedir = dirname(importer);
      const candidate = resolve(basedir, source);

      // Not inside src/ — skip
      if (!candidate.startsWith(srcDir)) return null;

      const relToSrc = relative(srcDir, candidate);

      // Try the equivalent path inside targetDir, replacing extensions
      const tryPath = (p: string) => {
        if (existsSync(p)) return p;
        return null;
      };

      // 1) Direct file mapping: src/components/Button/Button.tsx → dist-dev/components/Button/Button.js
      const withJs = resolve(targetDir, relToSrc.replace(/\.(tsx?|jsx?)$/, '.js'));
      const direct = tryPath(withJs);
      if (direct) return direct;

      // 2) Directory index: src/components/Button → dist-dev/components/Button/index.js
      const indexJs = resolve(targetDir, relToSrc.replace(/\.(tsx?|jsx?)$/, ''), 'index.js');
      const idx = tryPath(indexJs);
      if (idx) return idx;

      // 3) Also try without extension change (for non-TS assets)
      const same = resolve(targetDir, relToSrc);
      const sameFile = tryPath(same);
      if (sameFile) return sameFile;

      return null;
    },
  };
}

export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'production' || process.env.BUILD_MODE === 'lib';
  const isLocalBuild = process.env.BUILD_LOCAL === '1';
  const useDist = process.env.USE_DIST === '1';

  if (isLibrary || isLocalBuild) {
    const outDir = isLocalBuild ? 'dist-dev' : 'dist';
    return {
      plugins: [solidPlugin()],
      publicDir: false,
      build: {
        lib: {
          // Local build uses internal.ts to pull in doc-utils & design-tokens
          // so the docs site can resolve them from dist-dev.
          entry: resolve(__dirname, isLocalBuild ? 'src/internal.ts' : 'src/index.ts'),
          name: 'SolidComponent',
          formats: ['es', 'cjs'],
          fileName: isLocalBuild
            ? undefined // preserveModules sets own paths
            : (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
        },
        outDir,
        cssCodeSplit: false,
        sourcemap: true,
        rollupOptions: {
          external: ['solid-js', 'solid-js/web', 'solid-js/store'],
          output: isLocalBuild
            ? {
                preserveModules: true,
                preserveModulesRoot: 'src',
                entryFileNames: '[name].js',
                globals: {
                  'solid-js': 'Solid',
                  'solid-js/web': 'SolidWeb',
                  'solid-js/store': 'SolidStore',
                },
              }
            : {
                globals: {
                  'solid-js': 'Solid',
                  'solid-js/web': 'SolidWeb',
                  'solid-js/store': 'SolidStore',
                },
              },
        },
      },
    };
  }

  // Docs / dev mode
  return {
    root: 'docs-dev',
    plugins: [
      solidPlugin(),
      ...(useDist ? [redirectSrcToDist()] : []),
    ],
    resolve: {
      alias: {
        'solid-component': resolve(__dirname, useDist ? 'dist' : 'src'),
      },
    },
    base: './',
    build: {
      outDir: resolve(__dirname, 'docs'),
      emptyOutDir: false,
      rollupOptions: {
        treeshake: {
          moduleSideEffects: (id) => {
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
