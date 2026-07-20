import type { JSX } from 'solid-js';

const Code = (p: { children: string }) => <code style={{ background: '#f3f4f6', padding: '1px 4px', 'border-radius': '3px', 'font-size': '0.9em' }}>{p.children}</code>;
const Strong = (p: { children: JSX.Element }) => <strong>{p.children}</strong>;

export default {
  i18n: {
    title: 'i18n Internationalization',
    intro: 'solid-mobile ships with zh-CN / en-US bilingual support. Component runtime text switches automatically via locale. For business copy, use useT() or plug in any third-party i18n solution.',

    downloadTitle: 'Download Template',
    downloadDesc: <><Strong>Click the button below to download the component runtime dictionary template (JSON).</Strong> Contains only strings actually used by components (button labels, placeholders, status hints from Picker, Dialog, Calendar, etc.), excluding doc-site internal strings.</>,
    downloadSteps: 'Steps:',
    downloadStep1: '1. Download template → 2. Replace English values with your target language → 3. Pass via localeMessages',
    downloadNote: <><Strong>Note:</Strong> The JSON structure must be preserved. You can remove fields you don&apos;t need (missing keys fall back to English), but the nesting hierarchy must remain intact (e.g. <Code>component.picker.cancel</Code> must be {`{ component: { picker: { cancel: "..." } } }`}).</>,
    downloadBtn: 'Download English Template (JSON)',

    demoTitle: 'Multi-Language Demo',
    demoDesc: 'Select a language — the Picker below updates its title and button text live:',

    basicTitle: 'Basic Usage',
    overrideTitle: 'Override Built-in Entries',
    overrideDesc: <>You can also <Strong>override</Strong> specific keys in zh-CN / en-US. User values win on conflict.</>,

    fallbackTitle: 'Fallback Chain',
    fallbackDesc: 'When a key is missing in the current locale, the following chain is used:',
    fallback1: <><Strong>Current locale</Strong> (e.g. ja-JP, including user-provided dictionary)</>,
    fallback2: <><Strong>en-US</Strong> (built-in English, as universal fallback)</>,
    fallback3: <><Strong>Returns the key path</Strong> (e.g. component.picker.confirm), with a console.warn emitted (once per key)</>,
    fallbackNote: <>This means you <Strong>don&apos;t need to translate every key at once</Strong> — provide what you have, the rest falls back to English. The console warning helps you quickly find which keys still need coverage.</>,

    dictTitle: 'Dictionary Structure',
    dictDesc: 'Here is the top-level structure of the built-in dictionary. You can override any level as needed:',

    progTitle: 'Programmatic API',
    progDesc: <>Besides the <Code>ProviderConfig</Code> prop, you can call <Code>setUserMessages()</Code> at the app entry:</>,
  },
};
