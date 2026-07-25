# Hello, Solid Community 👋

I've been quietly working on something for the past month that I'd love to share with you.

## First — Solid is incredible.

The reactivity model, the zero-VDOM performance, the small bundle size, the simplicity of the API surface. It's genuinely one of the best frameworks I've used, and it deserves a much richer ecosystem than it currently has. Which brings me to why I'm here.

## solid-mobile — a mobile UI component library for Solid

**53 components** across 6 categories (Form, Picker, Feedback, Nav, Display, Basic), with:

- 🎨 **Theme system** — CSS custom properties driven, light/dark mode, custom brand colors via `ProviderConfig`
- 🌍 **i18n** — en-US / zh-CN built in, extensible
- 📦 **Tree-shakable** — `import { Button } from 'solid-mobile'` only bundles what you use
- ⌨️ **Fully typed** — TypeScript throughout
- 🧪 **480+ tests** — vitest, CI pipeline
- 📱 **Live docs** with a phone simulator: https://lxg19961206.github.io/SolidMobile/

The visual style draws inspiration from **Vant** (a popular Chinese mobile component library) — but the design philosophy is different. Vant is tightly coupled to Vue's reactivity; I've tried to build something that feels native to Solid.

> A note of honesty: this project was first sketched out back in **2023**, but as a solo developer I simply didn't have the capacity or skills to pull it off. It took until **2026**, with a lot of help from Claude, to finally bring it to life.

| | |
|---|---|
| 📦 npm | `npm install solid-mobile` |
| 🖥️ Docs | https://lxg19961206.github.io/SolidMobile/ |
| 🐙 GitHub | https://github.com/LXG19961206/SolidMobile |

## About me — and what this project needs

I'm not a top-tier open source developer. I'm a regular frontend engineer building things after work hours. I make mistakes. Some of the API decisions in this library might be wrong. But I'm pouring everything I have — every bit of technical judgment I've accumulated — into making this the best it can be.

**This is early beta.** I wouldn't recommend it for production just yet. I'm planning to spend the next month or so stabilizing APIs, improving accessibility, optimizing bundle size, and polishing rough edges.

If you try it out and find bugs — please open an issue. If you see a better way to design something — please open a PR. If you want to be part of building this — I'd genuinely love to collaborate. This is a solo project right now, but it doesn't have to stay that way.

## Wishing Solid the best

The framework deserves a thriving ecosystem. I hope solid-mobile can be a small piece of that puzzle. Thanks for reading.

---
*humbly,*
*LXG*
