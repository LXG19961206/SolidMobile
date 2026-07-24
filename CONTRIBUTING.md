# Contributing to Solid Mobile

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/LXG19961206/SolidMobile.git
cd SolidMobile
npm install
```

## Useful Commands

| Command | What it does |
|---------|-------------|
| `npm run dev:docs` | Start docs site at `localhost:3000` |
| `npm test` | Run 480+ tests (vitest) |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run build` | Build library → `dist/` |
| `npm run build:docs` | Build docs site → `docs/` |

## Project Structure

```
src/           Library source (components, config, i18n, hooks, utils)
docs-dev/      Documentation site (Solid app, component demos, pages)
  components/  Per-component doc page + mobile demo + i18n
  doc-utils/   Shared docs UI (layout, code blocks, phone simulator)
  pages/       Route pages (guide, mobile home)
```

## Adding a Component

1. Create `src/components/YourComponent/` with `YourComponent.tsx`, `types.ts`, `index.ts`
2. Add tests in `src/components/YourComponent/YourComponent.test.tsx`
3. Create docs entries under `docs-dev/components/YourComponent/`:
   - `YourComponentDocPage.tsx` — desktop doc page (code demos)
   - `YourComponentMobile.tsx` — mobile demo (interactive)
   - `zh-CN.ts` / `en-US.ts` — i18n strings
   - `tableData.ts` — props & CSS vars tables
4. Add navigation entry to `docs-dev/nav.ts`
5. Run `npm test` to verify, then `npm run dev:docs` to preview

## Code Style

- TypeScript strict mode
- Components use `solid-js` primitives
- Styles use CSS Modules (`*.module.css`) with scoped class names
- Follow existing prop naming patterns and use `mergeProps` for defaults

## Pull Requests

1. Fork the repo and create a feature branch
2. Make your changes with tests where applicable
3. Run `npm test` and `npx tsc --noEmit` before committing
4. Open a PR with a clear description of what changed and why

## Reporting Bugs

Use the [Bug Report](https://github.com/LXG19961206/SolidMobile/issues/new?template=bug_report.md) template. Include:

- Solid Mobile version
- Solid.js version
- Browser / environment
- Minimal reproduction code
- Expected vs actual behavior

## License

By contributing, you agree that your code will be licensed under the MIT License.
