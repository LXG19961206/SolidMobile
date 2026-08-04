/**
 * Ambient declaration for the package's stylesheet side-effect import.
 *
 * Consumers import it as `import 'solid-mobile/styles.css'` — the CSS itself
 * is emitted by Vite at `dist/solid-mobile.css`.  Without this declaration
 * TypeScript (and the VSCode language server) reports
 * "Cannot find module ... or its corresponding type declarations".
 *
 * This file compiles to `dist/styles.css.d.ts` (tsc appends the `.d.ts`
 * extension), which `package.json` exports wire up via the `types` condition.
 */
declare module 'solid-mobile/styles.css';
