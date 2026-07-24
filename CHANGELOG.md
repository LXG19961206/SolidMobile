# Changelog

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
