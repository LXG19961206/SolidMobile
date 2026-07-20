import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useStepperTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const StepperDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useStepperTableData();

  const demos: DemoCode[] = [
    { title: t('stepper.demo.basic'), code: 'const [val, setVal] = createSignal(0);\n\n<Stepper value={val()} onChange={setVal} />', desc: t('stepper.demoDesc.basic') },
    { title: t('stepper.demo.range'), code: '<Stepper value={val()} onChange={setVal} min={1} max={10} />', desc: t('stepper.demoDesc.range') },
    { title: t('stepper.demo.step'), code: '<Stepper value={val()} onChange={setVal} step={0.5} decimalLength={1} />', desc: t('stepper.demoDesc.step') },
    { title: t('stepper.demo.disabled'), code: '<Stepper value={5} disabled />\n<Stepper value={5} inputDisabled />', desc: t('stepper.demoDesc.disabled') },
    { title: t('stepper.demo.form'), code: '<Form controlAlign="right" onSubmit={(v) => console.log(v)}>\n  <FormItem name="count" label="Quantity">\n    <Stepper />\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\' }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>', desc: t('stepper.demoDesc.form') },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Stepper</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('stepper.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
