# Changelog

## [Unreleased]

### Added
- **TreeSelect** — selection UX & API round
  - Parent checkboxes now show an **indeterminate** (half-checked) state when only some leaves are selected — also applied to the Select All control
  - `onConfirm` / `onCancel` callbacks — distinguish "confirmed" from "dismissed", consistent with Picker/Select
  - Empty state (`emptyText`) when the tree is empty or a search returns no results
  - Async-load error handling: `onLoadChildren` failures show a per-node retry control (`loadErrorText`)
  - `checkStrictly` — checking a parent selects the node itself instead of cascading to all leaves
  - `onlyLeafCheckable` — only leaf nodes can be checked; tapping a parent row navigates into its children
  - Trigger enhancements: `clearable` (clear button), `format` (custom selected text), `readonly`, `renderTrigger`
  - Body scroll lock while the sheet is open (instance-safe across multiple TreeSelects)
  - `ref` imperative handle (`TreeSelectHandle`): `open` / `close` / `setValue` / `getValue` / `clear` / `resetNavigation` — for uncontrolled usage, consistent with the Form ref API
- Disabled nodes are now excluded from parent toggles, Select All, remote search results, and the `renderItem` toggle callback
- i18n: `treeselect.empty` / `treeselect.loadError` (zh-CN & en-US)

### Fixed
- Disabled options could previously be selected via Select All, remote search results, or the `renderItem` toggle
- Search keyword and remote results persisted across open/close; they are now cleared on open

## [0.1.9] - 2026-08-04

### Fixed
- `import 'solid-mobile/styles.css'` no longer reports "cannot find module or its type declarations" in TS/VSCode — the package now ships a `types` declaration for the `./styles.css` export (`dist/styles.css.d.ts`)
- Types emitted at dist root; icons exported from the main entry

## [0.1.8] - 2026-08-04

### Added
- **TreeSelect** — async loading & search
  - `onLoadChildren` lazy loading with per-node loading state and cache
  - `onSearch` async remote search with stale-guard and loading indicator
  - Controlled `show`/`onUpdateShow`/`onClose`, `closeable`, `teleport`, `zIndex`, `maxHeight`
  - `renderItem` gains optional toggle callback so custom rows can select nodes
  - Global search results capped at 100, big-data search demo
- i18n search placeholder (zh/en)

### Fixed
- Docs: resolve TS error on badge property access in mobile drawer

### Internal
- Remove flaky tests from CI, add pre-commit hook for passing tests
- Docs: GitHub icon link to toolbar, nav typo fix, TreeSelect WIP badge/banner removed

### Docs
- TreeSelect docs: English demo mock data, custom render live demo, prop tables + translations expanded

## [0.1.7] - 2026-07-31

### Added
- **TreeSelect** — push-based multi-select tree
  - Push navigation with breadcrumb tabs
  - Dual mode: `select` (click to select, arrow to expand) / `expand` (click to expand, checkbox to select)
  - `fieldNames` for custom data mapping (value/label/children/leaf)
  - `renderItem` for full custom row rendering
  - `searchable` + `searchMode` ('local' | 'global') with toolbar layout
  - Select All with checkbox, max selection limit
  - Dark mode, CSS variables (`--sc-treeselect-*`)

### Fixed
- Button: `touch-action: manipulation` + tap-highlight to prevent sticky `:active` on mobile
- Button: `:hover` wrapped in `@media (hover: hover)` to prevent sticky hover on mobile
- TreeSelect: `createMemo` + `stopPropagation` to prevent event coupling

### Docs
- About page auto-counts components via `import.meta.glob`; Config page Chinese → English; docs site rebuilt

## [0.1.6] - 2026-07-29

### Known Issues
- **WeChat on HarmonyOS / OpenHarmony**: keyboard open/close causes viewport flicker on Input and Textarea (WeChat ArkWeb bug; system browser works fine). Not fixable from the component layer.

## [0.1.5] - 2026-07-29

### Added
- **ChatMessage** — chat bubble with 5 message types, avatar, tail, status, long press menu (30 tests)
- **Skeleton** — placeholder component with shimmer animation, 3 sizes, 3 shapes (7 tests)

### Changed
- Docs navbar brand redesign: SVG logo, favicon, cleaner typography
- Sidebar nav items fuller font-size/weight/padding for English mode
- Theme color picker presets: modern Tailwind palette (indigo, violet, emerald, sky)
- Default locale `en-US`, EN/CN button order swapped
- Dark mode: `--sc-color-surface` variable unifying component surface backgrounds
- Phone simulator: notch enlarged (30→34px), safe-area tuned, navbar height 44px
- About page auto-counts components via `import.meta.glob`; docs registry auto-discovery via `import.meta.glob`

### Fixed
- Doc page flash on navigation — Suspense + shimmer skeleton fallback
- Phone simulator padding-top strip scoped to iframe only
- iframe locale default synced with app
- Config page: all hardcoded Chinese translated to English
- Design Tokens showcase: full dark mode styles
- Static assets: relative paths for GitHub Pages compatibility
- Long press menu: only one open at a time across ChatMessage instances

### Docs
- ChatMessage: 18 code blocks + mobile simulator, props table + 17 CSS vars, designer's note
- Skeleton: 6 code blocks + mobile demo with Switch toggle, 8 CSS vars
- README updated with SVG logo, community post drafts

## [0.1.4] - 2026-07-25

### Fixed
- Move `@testing-library/user-event` from `dependencies` to `devDependencies` (0 runtime deps)

## [0.1.3] - 2026-07-25

### Added
- **ChatMessage** — chat bubble component (55th component)
  - 5 message types: plainText, image, video, file, custom
  - Left/right positioning with avatar (string | JSX), tail pointer, name, time
  - 4 delivery statuses with 3 position modes (meta / bubble / side)
  - Long press menu (array or custom JSX), 500ms hold via Tooltip
  - selectOnLongPress for text selection (mutually exclusive with menu)
  - File: iconMap + built-in DEFAULT_ICON_MAP + progress bar
  - Image reuses Image component with preview
  - Video: thumbnail + full-screen preview overlay
  - header / footer slots to replace name / time
  - 30 unit tests, full i18n (en-US / zh-CN), CSS vars documentation
  - All styles via `--sc-chat-*` CSS custom properties with :root defaults + dark mode

### Changed
- Docs navbar brand redesign — SVG logo, clean typography
- Default locale switched to en-US, EN/CN button order swapped
- Phone simulator notch enlarged (30→34px), safe-area tuned (38px)
- Mobile simulator navbar height set to 44px via `--sc-navbar-height`
- Dialog i18n notice: alert instead of confirm, English first

### Fixed
- Doc page flash on navigation — Suspense + shimmer skeleton
- Phone simulator padding-top strip scoped to iframe only
- iframe locale default synced with app (zh-CN→en-US)

## [0.1.2] - 2026-07-24

### Added
- New SVG logo — 3 cascading rounded tiles with gradient + spark accent
- TabBar: Path-draw icon demo using stroke-dasharray CSS transition
- TabBar: Custom single-path SVG icons (Pin, Pencil, Bookmark) for stroke animation

### Changed
- Mobile home page redesign with new logo and cleaner layout
- Docs site top-nav brand area polished: logo shadow, pixel wordmark experiment
- Phone simulator notch enlarged (30→34px), safe-area tuned (38px)
- Mobile sim iframe navbar height set to 44px via `--sc-navbar-height`

### Fixed
- Doc page flash on navigation — added Suspense + skeleton shimmer fallback
- Phone simulator padding-top strip scoped to iframe only (not native mobile)
- Skeleton fallback refined with proper 5×7 block structure
- Logo container transparency issue resolved

## [0.1.1] - 2026-07-23

### Added
- Initial release
- 53 mobile-first components across 6 categories
- Theme system with light/dark mode and custom brand colors
- Built-in i18n (zh-CN, en-US) with extensible locale support
- Tree-shakable imports, full TypeScript definitions
- Documentation site with phone simulator
- Phone simulator iframe preview mode
