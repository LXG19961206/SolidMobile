export default {
  i18n: {
    title: 'i18n Internationalization',
    intro: 'solid-mobile ships with zh-CN / en-US bilingual support. Component runtime text switches automatically via locale. For business copy, use useT() or plug in any third-party i18n solution — the library imposes no restrictions.',
    runtimeTitle: 'Runtime Switch',
    runtimeDesc: 'Call setGlobalLocale() to switch component internal text. Business copy reads via useT().',
    dictTitle: 'Extending the Dictionary',
    dictDesc: 'Use registerLocale() to register custom translations — deep-merged into the built-in dictionary. Useful for doc sites, admin panels, and any scenario with substantial business copy.',
    phoneTitle: 'Phone Preview — Live Switch',
    phoneDesc: 'Click the buttons below to switch between Chinese and English. The Picker component below updates its title and button text live:',
    components: 'Component Text',
    business: 'Business Copy',
    pickerTitle: 'Select Date',
    zh: 'Chinese',
    en: 'English',
    switchLang: 'Switch Language',
    greeting: 'Hello, World!',
  },
};
