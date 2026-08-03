I've been working on this after hours for a while now, and figured it's time to share it with people who know more than I do.

**solid-mobile** is a mobile-first UI component library — buttons, dialogs, pickers, forms, tabs, calendars, that kind of thing. The visual design and component APIs are heavily inspired by [Vant](https://vant-ui.github.io/) (a Vue mobile library with a design language I've always really liked), but the implementation is written from the ground up for Solid's reactivity model.

Why I think it's worth a look:

* **50+ components** across 6 categories (Form, Picker, Feedback, Navigation, Display, Basic)
* **Theme system** — CSS custom properties throughout, light/dark mode, runtime brand color config
* **i18n** — English & Chinese built in, extensible
* **Fully typed** — TypeScript from day one
* **Tree-shakable** — `import { Button } from 'solid-mobile'` only bundles what you use
* **480+ tests** running in CI
* **Live docs** with an interactive phone simulator so you can try before installing

**Links:**

* Docs: https://lxg19961206.github.io/SolidMobile/
* GitHub: https://github.com/LXG19961206/SolidMobile
* npm: `npm install solid-mobile`

**A quick word about Solid.js —** I picked it because its reactivity model is genuinely fun to work with. Signals, no virtual DOM, tiny runtime. It feels like what React hooks wanted to be. If you've only used React or Vue, honestly — give Solid a weekend. It keeps the familiar JSX syntax but strips away a ton of complexity, and the performance is no joke (no VDOM diffing, components run once). The ecosystem is still young, which is exactly why projects like this one need to exist.

That said, a lot of the design work here — the component APIs, the theme architecture, the CSS patterns — is framework-agnostic. If someone wanted to port this to Vue or React, the hard part (the visual design and interaction details) is already done.

**State of the project:** Early beta. I wouldn't ship production with it tomorrow — some components like TreeSelect are still WIP. But the core (Button, Form, Dialog, Toast, Picker, etc.) is solid enough to build a real demo app with.

This was first sketched back in 2023, but as a solo dev I didn't have the bandwidth to pull it off. Fast forward to 2026 and with a lot of help from Claude, it finally came together.

**What I'm looking for:** Honest feedback. If you look at an API and think "that's wrong" — I want to hear it. If `npm install` breaks on your machine — please open an issue. If you like the idea and want to contribute — PRs are very welcome. This is a solo project right now and fresh eyes would make a huge difference.

Cheers :)
