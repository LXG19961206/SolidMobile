# Release Notes

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
