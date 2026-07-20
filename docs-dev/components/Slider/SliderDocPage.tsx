import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN'; import enUS from './en-US'; import { useSliderTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const SliderDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSliderTableData();
  const demos: DemoCode[] = [
    { title: t('slider.demo.basic'), code: 'const [val, setVal] = createSignal(50);\n\n<Slider value={val()} onChange={setVal} />', desc: t('slider.demoDesc.basic') },
    { title: t('slider.demo.range'), code: 'const [val, setVal] = createSignal([20, 80]);\n\n<Slider count={2} value={val()} onChange={setVal} />', desc: t('slider.demoDesc.range') },
    { title: t('slider.demo.step'), code: '<Slider value={50} step={10} />', desc: t('slider.demoDesc.step') },
    { title: t('slider.demo.color'), code: '<Slider value={40} activeColor="#22c55e" inactiveColor="#e5e7eb" />', desc: t('slider.demoDesc.color') },
    { title: t('slider.demo.disabled'), code: '<Slider value={60} disabled />\n<Slider value={60} readonly />', desc: t('slider.demoDesc.disabled') },
    { title: t('slider.demo.form'), code: '<Form controlAlign="right" onSubmit={(v) => console.log(v)}>\n  <FormItem name="range" label="Volume">\n    <Slider />\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\' }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>', desc: t('slider.demoDesc.form') },
  ];
  return (<DocLayout><div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
    <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Slider</h1>
    <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('slider.intro')}</p>
    <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
    <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
    <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
  </div></DocLayout>);
};
