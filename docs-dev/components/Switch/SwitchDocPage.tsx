import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSwitchTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const SwitchDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSwitchTableData();

  const demos: DemoCode[] = [
    {
      title: t('switch.demo.basic'),
      code: '// ⚠ Import with alias to avoid SolidJS built-in <Switch>\nimport { Switch as Toggle } from "solid-component";\n\nconst [on, setOn] = createSignal(false);\n\n<Toggle checked={on()} onChange={setOn} />\n\n{/* Uncontrolled */}\n<Toggle defaultChecked onChange={(v) => console.log(v)} />',
      desc: t('switch.demoDesc.basic'),
    },
    {
      title: t('switch.demo.disabled'),
      code: '<Toggle disabled />\n<Toggle disabled checked />',
      desc: t('switch.demoDesc.disabled'),
    },
    {
      title: t('switch.demo.color'),
      code: '<Toggle activeColor="#22c55e" inactiveColor="#f3f4f6" />\n<Toggle activeColor="#ef4444" inactiveColor="#fee2e2" />',
      desc: t('switch.demoDesc.color'),
    },
    {
      title: t('switch.demo.size'),
      code: '<Toggle size={28} />   {/* default */}\n<Toggle size={36} />\n<Toggle size={48} />',
      desc: t('switch.demoDesc.size'),
    },
    {
      title: t('switch.demo.text'),
      code: '<Toggle activeText="ON" inactiveText="OFF" checked={on()} onChange={setOn} />',
      desc: t('switch.demoDesc.text'),
    },
    {
      title: t('switch.demo.form'),
      code: '<Form controlAlign="right" onSubmit={(v) => console.log(v)}>\n  <FormItem name="notify" label="Enable Notifications">\n    <Toggle />\n  </FormItem>\n  <FormItem name="darkMode" label="Dark Mode">\n    <Toggle />\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\' }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>',
      desc: t('switch.demoDesc.form'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Switch</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('switch.intro')}</p>
        <p style={{ padding: '8px 12px', background: '#fef3c7', 'border-radius': '6px', 'font-size': '0.85rem', color: '#92400e' }}>
          {t('switch.note')}
        </p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
