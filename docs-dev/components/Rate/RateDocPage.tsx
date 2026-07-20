import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useRateTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const RateDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useRateTableData();

  const demos: DemoCode[] = [
    {
      title: t('rate.demo.basic'),
      code: 'const [val, setVal] = createSignal(3);\n\n<Rate value={val()} onChange={setVal} />',
      desc: t('rate.demoDesc.basic'),
    },
    {
      title: t('rate.demo.half'),
      code: '<Rate value={3.5} allowHalf />',
      desc: t('rate.demoDesc.half'),
    },
    {
      title: t('rate.demo.count'),
      code: '<Rate count={7} value={5} icon="heart" voidIcon="heart" />',
      desc: t('rate.demoDesc.count'),
    },
    {
      title: t('rate.demo.color'),
      code: '<Rate value={3} color="#22c55e" voidColor="#e5e7eb" />\n<Rate value={4} color="#f59e0b" voidColor="#fef3c7" />',
      desc: t('rate.demoDesc.color'),
    },
    {
      title: t('rate.demo.clearable'),
      code: 'const [val, setVal] = createSignal(3);\n\n<Rate value={val()} onChange={setVal} clearable />',
      desc: t('rate.demoDesc.clearable'),
    },
    {
      title: t('rate.demo.readonly'),
      code: '<Rate value={4} readonly />\n<Rate value={2} disabled />',
      desc: t('rate.demoDesc.readonly'),
    },
    {
      title: t('rate.demo.form'),
      code: '<Form controlAlign="right" onSubmit={(v) => console.log(v)}>\n  <FormItem name="rating" label="Rating">\n    <Rate />\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\' }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>',
      desc: t('rate.demoDesc.form'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Rate</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('rate.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
