# Release Notes

## 0.2.5 (2026-08-31)

### Internal

- **CSS variable prefix frozen to `sc`**: the `prefix` config option is removed from the type surface. It could never take effect (component styles reference `--sc-*` literally), and changing it silently broke theming; it's now an internal constant. Type-level change only — behavior unchanged.
- Docs-only `designTokens` i18n strings removed from the library dictionaries (docs site owns them now).
- Removed legacy `public/old/` directory (old project source remnants).
- README logo path fixed after the docs split removed `docs-dev/`.

## 0.2.4 (2026-08-17)

### Bug Fixes

- **7 components were missing from the public API since 0.1**: `Card`, `SafeArea`, `BackTop`, `Ellipsis`, `FloatingBall`, `Popup`, `Tooltip` existed, were documented and tested, but were never re-exported from `src/index.ts` — so npm consumers couldn't `import { Card } from 'solid-mobile'`. Surfaced by migrating the docs site to consume the published package instead of source code.

### Internal

- Docs site split into an independent project that consumes the published package (`file:` tarball in development, registry in CI). Removed the docs site, `src/internal.ts`, the `merge-doc-i18n` script, the `dictionaries.ts.backup` hack, and the `redirectSrcToDist` Vite plugin from the library repo.

## 0.2.3 (2026-08-14)

### New / Enhanced Components

- **TreeSelect** — selection UX & API round
  - Parent checkboxes now show an **indeterminate** (half-checked) state when only some leaves are selected — also applied to the Select All control
  - `onConfirm` / `onCancel` callbacks — distinguish "confirmed" from "dismissed", consistent with Picker/Select
  - Empty state (`emptyText`) when the tree is empty or a search returns no results
  - Async-load error handling: `onLoadChildren` failures show a per-node retry control (`loadErrorText`)
  - `checkStrictly` — checking a parent selects the node itself instead of cascading to all its leaves
  - `onlyLeafCheckable` — only leaf nodes can be checked; tapping a parent row navigates into its children
  - Trigger enhancements: `clearable`, `format`, `readonly`, `renderTrigger`
  - `ref` imperative handle (`TreeSelectHandle`): `open` / `close` / `setValue` / `getValue` / `clear` / `resetNavigation` — for uncontrolled usage, consistent with the Form ref API
  - Body scroll lock while the sheet is open (instance-safe across multiple TreeSelects)
  - Disabled nodes are now excluded from parent toggles, Select All, remote search results, and the `renderItem` toggle callback
  - i18n: `treeselect.empty` / `treeselect.loadError` (zh-CN & en-US)

### Bug Fixes

- Disabled options could previously be selected via Select All, remote search results, or the `renderItem` toggle
- Search keyword and remote results persisted across open/close; they are now cleared on open
- `deepMerge` signature fixed to recursive `DeepPartial` — nested partial configs now type-check correctly (implementation already merged deeply)
- `.test.tsx` no longer errors with "react/jsx-runtime" in editors — test files are now included in `tsconfig.json` (solid-js JSX + `vitest/globals` types); stale type errors in test files fixed

### Docs

- **TreeSelect** & **Form** ref methods now shown in dedicated "Ref Methods" tables
- TreeSelect docs: new demos (checkStrictly, trigger customization, Ref API) with matching mobile simulator instances
- Docs site rebuilt; stale build assets cleaned (1,095 → 60 files)

## 0.1.9 (2026-08-04)

### Bug Fixes

- `import 'solid-mobile/styles.css'` no longer triggers a TS/VSCode "cannot find module or its type declarations" error — the `./styles.css` export now ships a `types` declaration (`dist/styles.css.d.ts`)
- Types emitted at dist root; icons exported from the main entry

## 0.1.8 (2026-08-04)

### New / Enhanced Components

- **TreeSelect** — async loading & search
  - `onLoadChildren` lazy loading with per-node loading state and cache
  - `onSearch` async remote search with stale-guard and loading indicator
  - Controlled `show`/`onUpdateShow`/`onClose`, `closeable`, `teleport`, `zIndex`, `maxHeight`
  - `renderItem` gains optional toggle callback so custom rows can select nodes
  - Global search results capped at 100, big-data search demo
  - i18n search placeholder (zh/en)

### Docs

- TreeSelect WIP badge/banner removed (production-ready)
- English demo mock data, custom render live demo, prop tables + translations expanded
- GitHub icon link added to toolbar, nav typo fix
- Docs site rebuilt

### Internal

- Remove flaky tests from CI, add pre-commit hook for passing tests

## 0.1.7 (2026-07-31)

### New / Enhanced Components

- **TreeSelect** — push-based multi-select tree
  - Push navigation with breadcrumb tabs
  - Dual mode: `select` (click to select, arrow to expand) / `expand` (click to expand, checkbox to select)
  - `fieldNames` for custom data mapping (value/label/children/leaf)
  - `renderItem` for full custom row rendering
  - `searchable` + `searchMode` ('local' | 'global') with toolbar layout
  - Select All with checkbox, max selection limit
  - Round checkbox/expand button per row, dark mode, `--sc-treeselect-*` CSS variables

### Bug Fixes

- Button: `touch-action: manipulation` + tap-highlight to prevent sticky `:active` on mobile
- Button: `:hover` wrapped in `@media (hover: hover)` to prevent sticky hover on mobile
- TreeSelect: `createMemo` + `stopPropagation` to prevent event coupling

### Docs

- About page auto-counts components via `import.meta.glob`; Config page Chinese → English
- Docs site rebuilt

## 0.1.6 (2026-07-29)

### Known Issues

- **WeChat on HarmonyOS / OpenHarmony**: keyboard open/close causes viewport flicker on Input and Textarea. This is a WeChat ArkWeb bug (native `<input>` reproduces the issue; system browser works fine). Not fixable from the component layer.

## 0.1.5 (2026-07-29)

### New Components

- **ChatMessage** — chat bubble with 5 message types, avatar, tail, status, long press menu, 30 tests
- **Skeleton** — placeholder component with shimmer animation, 3 sizes, 3 shapes, 7 tests

### Enhancements

- Docs navbar brand redesign: SVG logo, favicon, cleaner typography
- Sidebar nav items: fuller font-size/weight/padding for English mode
- Theme color picker presets: modern Tailwind palette (indigo, violet, emerald, sky)
- Default locale `en-US`, EN/CN button order swapped
- Dark mode: `--sc-color-surface` variable unifying all component surface backgrounds
- Phone simulator: notch enlarged (30→34px), safe-area tuned, navbar height 44px
- About page: auto-count components via `import.meta.glob`, no more manual numbers
- `import.meta.glob` auto-discovery for DocPage/Mobile pages in docs registry

### Bug Fixes

- Doc page flash on navigation: Suspense + shimmer skeleton fallback
- Phone simulator padding-top strip scoped to iframe only
- iframe locale default synced with app
- Config page: all hardcoded Chinese translated to English
- Design Tokens showcase: full dark mode styles
- Static assets: relative paths for GitHub Pages compatibility
- `@testing-library/user-event` moved to devDependencies (0 runtime deps)
- Long press menu: only one open at a time across ChatMessage instances

### Docs

- ChatMessage: 18 code blocks + mobile simulator, props table + 17 CSS vars, designer's note
- Skeleton: 6 code blocks + mobile demo with Switch toggle, 8 CSS vars
- README updated with SVG logo, community post drafts

## 0.1.1 (2026-07-22)

### New Components

- **Marquee** — Seamless horizontal scrolling marquee, with speed/direction/pause control
- **Sidebar** — Vertical group navigation, with JSX title, icon, compact mode, dark mode

### Enhancements

- **Notify**: `closeable` prop (✕ button), `marquee` prop (auto-wraps message in Marquee)
- **MobilePropsSheet**: redesigned with left Sidebar + right table layout, higher ActionSheet (70vh)
- **ScrollBar**: refactored as abstract component (no DOM, injects class into child), renamed class prefix to `sc-scrollbar-*`
- **PhoneSimulator**: default to button page when no hash
- **Mobile prev/next nav**: fixed iframe navigation, updated key list, translated names
- **DesignTokens**: PC/mobile unified using AllTokens component, compact swatch grid
- **SearchBar**: extracted to standalone component
- **Guide pages**: I18n, EventBus, DesignTokens all i18n-ified

### Bug Fixes

- List virtual scroll height fix + dark mode scrollbar
- Card inset DOM attribute leak resolved
- Marquee/Sidebar: splitProps rest spread + unit tests
- Mobile CN/EN toggle: segmented switch design

### Docs

- Marquee, Sidebar, ScrollBar docs with i18n + dark mode
- README + About page component list updated

---

## 0.1.0 (2026-07-21)

### New Components

- **Card** — Content container with inset/divider/shadow/border control
- **FloatingBall** — Draggable floating action button
- **BackTop** — Scroll-to-top button
- **Ellipsis** — Multi-line text truncation
- **Tooltip** — Popup tooltip with positioning

### Picker Enhancements

- Picker auto mode: renders its own Cell trigger when `show` not passed
- Picker CSS height fix: `--sc-picker-visible-height` fallback prevents sheet collapse
- Picker PC bug fix: `pointerDown` guard prevents hover-triggered scroll
- Picker close animation fix: `internalShow` prevents premature Portal unmount
- TimePicker: `showUnit` + `units` props for h/m/s column labels
- DatePicker / CityPicker / TimePicker / Cascader: migrated to new doc paradigm
- Select: new dropdown selector built on Picker

### Form System

- Form ref API: `setFormValue`, `resetFormValue`, `submit`, `validateAll`
- Form validation: sync + async validators, `validateOnBlur` support
- All form controls (Input, Textarea, Radio, Checkbox, Switch, Rate, Stepper, Slider, Select, Upload) migrated

### Documentation

- **50+ component docs** migrated to unified structure (per-component directory with zh-CN/en-US/tableData/DocPage/Mobile)
- **7 guide pages** i18n-ified: Quick Start, Config, Design Tokens, i18n, EventBus, About Solid.js, About Project
- Design philosophy cards for CityPicker, Select, Upload
- Upload IoC design card: "Component does not make HTTP requests"
- **Global search** in top nav — indexes all i18n entries, supports CN/EN
- PC/mobile content parity across all pages

### Icons & UI

- Eye / Eye-Off icons added (simplified eye-off: eye + slash)
- Password toggle UX: icon size 16→20, logic corrected
- Mobile CN/EN toggle switched to segmented control (matching PC)
- Card `inset` prop (transparent embed mode) + `divider` prop

### Bug Fixes

- Picker sheet height collapse when used standalone (missing CSS var fallback)
- Picker PC hover-triggered scrolling (added `pointerDown` guard)
- Picker close animation flash (restored `internalShow` timing)
- Card `inset` DOM attribute leak (prop name collision)
- Password toggle icon logic reversed
- eye-off icon too complex (replaced with simple eye + slash)
- Various dark mode fixes across docs and search dropdown

### Internal

- `docs-dev/components/` directory for new doc paradigm
- `docs-dev/pages/guide/` with per-page i18n directories
- SearchBar component extracted from App.tsx
- Vite caching workaround documented
- 480+ tests passing
