<p align="center">
  <img src="./docs-dev/public/logo.svg" alt="Solid Mobile" width="80" height="80" />
</p>

<h1 align="center">Solid Mobile</h1>

<p align="center">
  A <b>55-component</b> mobile UI library for <a href="https://www.solidjs.com/">Solid.js</a><br/>
  Theme system · i18n · Dark mode · Tree-shakable · Fully typed
</p>

<p align="center">
  <a href="https://github.com/LXG19961206/SolidMobile/actions/workflows/ci.yml"><img src="https://github.com/LXG19961206/SolidMobile/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://www.npmjs.com/package/solid-mobile"><img src="https://img.shields.io/npm/v/solid-mobile?color=1677ff" alt="npm" /></a>
  <a href="https://www.npmjs.com/package/solid-mobile"><img src="https://img.shields.io/npm/dm/solid-mobile" alt="downloads" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/npm/l/solid-mobile" alt="license" /></a>
  <a href="https://www.npmjs.com/package/solid-mobile"><img src="https://img.shields.io/badge/TypeScript-5.0%2B-3178c6" alt="TypeScript" /></a>
  <a href="https://www.npmjs.com/package/solid-mobile"><img src="https://img.shields.io/badge/Solid.js-1.x-4fa6d3" alt="SolidJS" /></a>
</p>

<p align="center">
  🖥️ <a href="https://lxg19961206.github.io/SolidMobile/"><b>Live Docs →</b></a>
  &nbsp;|&nbsp;
  📱 <em>Docs site includes a phone simulator — preview every component on a virtual device</em>
</p>

---

## Installation

```bash
npm install solid-mobile   # or pnpm / yarn
```

## Quick Start

```tsx
import { render } from 'solid-js/web';
import { ProviderConfig, Button, Toast } from 'solid-mobile';
import 'solid-mobile/styles.css';

function App() {
  return (
    <ProviderConfig>
      <Button type="primary" onClick={() => Toast.success('Hello!')}>
        Click Me
      </Button>
    </ProviderConfig>
  );
}

render(() => <App />, document.getElementById('root')!);
```

## Components

| Category | Components |
|---|---|
| **Basic** | `Button` `Icon` `Center` `Divider` `Card` `Layout` `SafeArea` `ScrollBar` |
| **Display** | `Avatar` `Badge` `Tag` `Image` `Empty` `Lazyload` `List` `SwipeCell` `Swiper` `Ellipsis` `Tooltip` `FloatingBall` `BackTop` `Marquee` `PullRefresh` |
| **Navigation** | `Tabs` `TabBar` `NavBar` `Cell` |
| **Picker** | `Picker` `Calendar` `Cascader` `DatePicker` `CityPicker` `TimePicker` `Select` |
| **Feedback** | `Toast` `Notify` `Dialog` `Overlay` `ActionSheet` `Loading` |
| **Form** | `Form` `Input` `Textarea` `Radio` `Checkbox` `Switch` `Rate` `Stepper` `Slider` `Upload` |

> Full API reference, interactive demos, and a **phone simulator** are available on the [documentation site →](https://lxg19961206.github.io/SolidMobile/).

## Stability

**From v0.2.1 through 1.0.0**, the library will not undergo large-scale feature expansion. Our focus is on **thorough testing** and **more approachable documentation**.

Props and APIs are **additive-only** going forward — they may grow, but existing APIs will not be removed or broken (except to fix genuine design bugs). What works now will keep working in every subsequent release.

## Why Solid Mobile?

| | |
|---|---|
| 📱 **Mobile-first** | Every component is designed for touch — tap-friendly sizes, safe area support, slide gestures |
| 🎨 **Theme System** | CSS variables + `ProviderConfig`. Light/dark mode, custom brand colors, auto-derived hover/active states |
| 🌍 **i18n Built-in** | zh-CN & en-US out of the box. Extensible via `localeMessages` |
| 📦 **Tree-shakable** | `import { Button } from 'solid-mobile'` — only what you use lands in your bundle |
| ⌨️ **Fully Typed** | Every prop, callback, and config option has TypeScript definitions |
| ⚡ **Zero VDOM** | Built on Solid.js — components compile to real DOM, no diff overhead |

## Usage Examples

### Theme & Dark Mode

```tsx
import { ProviderConfig } from 'solid-mobile';

const theme = { colors: { light: { primary: '#6366f1' } } };

<ProviderConfig config={theme}>
  <App />
</ProviderConfig>

// Dark mode: toggle 'dark' class on <html>
document.documentElement.classList.toggle('dark');
```

### i18n

```tsx
import { setGlobalLocale } from 'solid-mobile';

setGlobalLocale('en-US'); // 'zh-CN' | 'en-US' built-in

// Custom locale
<ProviderConfig config={{ locale: 'ja-JP' }} localeMessages={{
  'ja-JP': { component: { picker: { cancel: 'キャンセル', confirm: '確認' } } }
}}>
  <App />
</ProviderConfig>
```

### Event Bus

```tsx
import { setEventBusHandler } from 'solid-mobile';

// Intercept component events for analytics / logging
setEventBusHandler(({ component, type, payload }) => {
  console.log(`[${component}] ${type}`, payload);
});
```

---

## Development

The library and the docs site are separate projects now.

```bash
# Library
git clone https://github.com/LXG19961206/SolidMobile.git
cd SolidMobile && npm install
npm run build       # Library → dist/  (also: npm pack → .tgz)
npm test            # 590+ tests

# Docs site (independent project, consumes the published package)
git clone <SolidMobile-Docs repo>   # separate repository
npm install
npm run dev         # Docs site at localhost:3000
```

## License

MIT © [LXG19961206](https://github.com/LXG19961206)
