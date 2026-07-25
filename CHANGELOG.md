# Changelog

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
