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
| `npm test` | Run 590+ tests (vitest) |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run build` | Build library → `dist/` |
| `npm pack` | Produce the tarball the docs site installs via `file:` |
| `npm run dev` (in the docs repo) | Start docs site at `localhost:3000` |

## Project Structure

```
src/           Library source (components, config, i18n, hooks, utils)
```
The docs site lives in its own repository (`SolidMobile-Docs`) and consumes
this package via `file:` tarball during development, registry after release.

## Adding a Component

1. Create `src/components/YourComponent/` with `YourComponent.tsx`, `types.ts`, `index.ts`
2. Add tests in `src/components/YourComponent/YourComponent.test.tsx`
3. Docs entries live in the separate docs repository
   (`SolidMobile-Docs/docs-dev/components/YourComponent/`):
   - `YourComponentDocPage.tsx` — desktop doc page (code demos)
   - `YourComponentMobile.tsx` — mobile demo (interactive)
   - `zh-CN.ts` / `en-US.ts` — i18n strings
   - `tableData.ts` — props & CSS vars tables
4. Add navigation entry to the docs repo's `nav.ts`
5. Run `npm test` to verify, then `npm run dev` in the docs repo to preview

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
