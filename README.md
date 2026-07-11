# Solid Mobile

> A Solid.js mobile UI component library with 40+ components, theme system, and i18n support.

[![npm version](https://img.shields.io/npm/v/solid-mobile)](https://www.npmjs.com/package/solid-mobile)
[![license](https://img.shields.io/npm/l/solid-mobile)](./LICENSE)
[![docs](https://img.shields.io/badge/docs-online-1677ff)](https://lxg19961206.github.io/SolidMobile/)

## Installation

```bash
npm install solid-mobile solid-js
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

## Features

- **40+ Components** — Buttons, forms, navigation, feedback, data display, and more
- **Theme System** — CSS variables with light/dark mode, auto-derived color states
- **i18n Built-in** — zh-CN & en-US dictionaries, extensible via `localeMessages`
- **Event Bus** — Global event interception for telemetry, audit logging, and debugging
- **Tree Shaking** — Import only what you need
- **TypeScript** — Full type definitions included

## Components

| Category | Components |
|----------|------------|
| **Basic** | Button, Icon, Center, Divider, Layout, SafeArea |
| **Display** | Avatar, Badge, Tag, Image, Empty, Lazyload, List, SwipeCell, Swiper, PullRefresh |
| **Navigation** | Tabs, TabBar, NavBar, Cell |
| **Picker** | Picker, Calendar, Cascader, DatePicker, CityPicker, TimePicker |
| **Feedback** | Toast, Notify, Dialog, Overlay, ActionSheet, Loading |
| **Form** | Form, Input, Textarea, Radio, Checkbox, Switch (Toggle), Rate, Stepper, Slider, Select, Upload |

## Usage Examples

### Theme Configuration

```tsx
import { ProviderConfig } from 'solid-mobile';

const theme = {
  colors: { light: { primary: '#6366f1' } },
};

<ProviderConfig config={theme}>
  <App />
</ProviderConfig>
```

### Internationalization

```tsx
import { ProviderConfig, setGlobalLocale } from 'solid-mobile';

// Switch locale globally
setGlobalLocale('en-US');

// Or pass custom dictionaries
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
import { setEventBusHandler, emitEvent } from 'solid-mobile';

// Listen to all component events
setEventBusHandler((event) => {
  console.log(event.component, event.type, event.payload);
  // → Button click MouseEvent
  // → Input change "hello"
});

// Emit custom events from your own components
emitEvent({
  component: 'MyChart',
  type: 'click',
  payload: { value: 42 },
  props: {},
  timestamp: Date.now(),
});
```

### Dark Mode

```tsx
// Toggle dark mode by adding/removing the .dark class on <html>
document.documentElement.classList.toggle('dark');

// Or use system preference:
<ProviderConfig config={{ darkMode: 'media' }}>
  <App />
</ProviderConfig>
```

## Import Note: Switch → Toggle

To avoid conflict with Solid.js built-in `Switch`/`Match`, a `Toggle` alias is provided:

```tsx
import { Toggle } from 'solid-mobile'; // ✅ Recommended

// Switch is still available but may conflict:
import { Switch as Toggle } from 'solid-mobile'; // also works
```

## Development

```bash
git clone https://github.com/LXG19961206/SolidMobile.git
cd SolidMobile
npm install
npm run dev:docs    # Start docs dev server
npm run build       # Build library
npm run test        # Run tests
```

## License

MIT
