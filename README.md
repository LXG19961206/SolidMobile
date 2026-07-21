<p align="center">
  <img src="./public/logo.jpg" alt="Solid Mobile" width="80" height="80" style="border-radius:12px" />
</p>

<h1 align="center">Solid Mobile</h1>

<p align="center">
  A 50+ component mobile UI library for <a href="https://www.solidjs.com/">Solid.js</a> — theme system, i18n, dark mode, TypeScript.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/solid-mobile"><img src="https://img.shields.io/npm/v/solid-mobile?color=1677ff" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/solid-mobile"><img src="https://img.shields.io/npm/dm/solid-mobile" alt="npm downloads"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/npm/l/solid-mobile" alt="license"></a>
  <a href="https://lxg19961206.github.io/SolidMobile/"><img src="https://img.shields.io/badge/docs-online-22c55e" alt="docs"></a>
</p>

---

## Installation

```bash
npm install solid-mobile
# or
pnpm add solid-mobile
# or
yarn add solid-mobile
```

## Quick Start

```tsx
import { render } from 'solid-js/web';
import { ProviderConfig, Button, Toast } from 'solid-mobile';

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

## Why Solid Mobile?

| | |
|---|---|
| 🧩 **50+ Components** | Everything you need: forms, nav, pickers, feedback, display |
| 🎨 **Theme System** | CSS variables + ProviderConfig — light/dark, custom colors, auto-derived states |
| 🌍 **i18n Built-in** | zh-CN & en-US out of the box. Add any language via `localeMessages` |
| 📦 **Tree Shakable** | `import { Button, Input } from 'solid-mobile'` — only what you use gets bundled |
| ⌨️ **TypeScript** | Full type definitions. Every prop, every callback |
| ⚡ **Solid.js Reactive** | Zero virtual DOM overhead. Components are compiled to real DOM nodes |

## Components

| Category | Components |
|---|---|
| **Basic** | Button, Icon, Center, Divider, Card, Layout (Row, Col), SafeArea, ScrollBar, Sidebar |
| **Display** | Avatar, Badge, Tag, Image, Empty, Lazyload, List, SwipeCell, Swiper, Ellipsis, Tooltip, FloatingBall, BackTop, Marquee, PullRefresh |
| **Navigation** | Tabs, TabBar, NavBar, Cell |
| **Picker** | Picker, Calendar, Cascader, DatePicker, CityPicker, TimePicker, Select |
| **Feedback** | Toast, Notify, Dialog, Overlay, ActionSheet, Loading |
| **Form** | Form, Input, Textarea, Radio, Checkbox, Switch, Rate, Stepper, Slider, Upload |

## Examples

### Theme & Dark Mode

```tsx
import { ProviderConfig } from 'solid-mobile';

// Custom brand color
const theme = {
  colors: { light: { primary: '#6366f1' } },
};

<ProviderConfig config={theme}>
  <App />
</ProviderConfig>

// Dark mode via CSS class
document.documentElement.classList.toggle('dark');

// Or follow system preference
<ProviderConfig config={{ darkMode: 'media' }}>
  <App />
</ProviderConfig>
```

### i18n

```tsx
import { ProviderConfig, setGlobalLocale } from 'solid-mobile';

// Built-in: zh-CN, en-US
setGlobalLocale('en-US');

// Add a custom language
const messages = {
  'ja-JP': {
    component: {
      picker: { cancel: 'キャンセル', confirm: '確認' },
    },
  },
};

<ProviderConfig config={{ locale: 'ja-JP' }} localeMessages={messages}>
  <App />
</ProviderConfig>
```

### Event Bus

```tsx
import { setEventBusHandler } from 'solid-mobile';

// Intercept all component events (telemetry, logging, analytics)
setEventBusHandler(({ component, type, payload }) => {
  console.log(`[${component}] ${type}`, payload);
});
```

---

## Development

```bash
git clone https://github.com/LXG19961206/SolidMobile.git
cd SolidMobile
npm install

npm run dev:docs    # Docs site at localhost:5173
npm run build       # Build library → dist/
npm run test        # Run 480+ tests
```

## License

MIT © [LXG19961206](https://github.com/LXG19961206)
