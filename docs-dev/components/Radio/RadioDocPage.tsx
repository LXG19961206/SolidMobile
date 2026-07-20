import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useRadioTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const RadioDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useRadioTableData();

  const demos: DemoCode[] = [
    {
      title: t('radio.demo.basic'),
      code: 'const [val, setVal] = createSignal(\'a\');\n\n<RadioGroup value={val()} onChange={setVal}>\n  <Radio value="a" label="Option A" />\n  <Radio value="b" label="Option B" />\n  <Radio value="c" label="Option C" />\n</RadioGroup>',
      desc: t('radio.demoDesc.basic'),
    },
    {
      title: t('radio.demo.disabled'),
      code: '<RadioGroup value={val()} onChange={setVal}>\n  <Radio value="a" label="Normal" />\n  <Radio value="b" label="Disabled" disabled />\n  <Radio value="c" label="Also Normal" />\n</RadioGroup>\n\n{/* Or disable the whole group */}\n<RadioGroup disabled value={val()} onChange={setVal}>\n  <Radio value="x" label="All disabled" />\n</RadioGroup>',
      desc: t('radio.demoDesc.disabled'),
    },
    {
      title: t('radio.demo.shape'),
      code: '<RadioGroup value={val()} onChange={setVal}>\n  <Radio value="a" label="Round (default)" />\n  <Radio value="b" label="Square" shape="square" />\n  <Radio value="c" label="Dot" shape="dot" />\n</RadioGroup>',
      desc: t('radio.demoDesc.shape'),
    },
    {
      title: t('radio.demo.color'),
      code: '<RadioGroup value={val()} onChange={setVal} checkedColor="#22c55e">\n  <Radio value="a" label="Green" />\n  <Radio value="b" label="Green" />\n  <Radio value="c" label="Green" />\n</RadioGroup>',
      desc: t('radio.demoDesc.color'),
    },
    {
      title: t('radio.demo.horizontal'),
      code: '<RadioGroup direction="horizontal" value={val()} onChange={setVal}>\n  <Radio value="a" label="Light" />\n  <Radio value="b" label="Dark" />\n</RadioGroup>',
      desc: t('radio.demoDesc.horizontal'),
    },
    {
      title: t('radio.demo.customIcon'),
      code: '// Custom face icons\nconst LikeIcon = () => (\n  <svg viewBox="0 0 24 24" width="1em" height="1em"\n    fill="none" stroke="currentColor" stroke-width="1.8">\n    <circle cx="12" cy="12" r="10" />\n    <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />\n    <circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />\n    <path d="M8 15c0 0 1.5 2.5 4 2.5s4-2.5 4-2.5" />\n  </svg>\n);\n\n<RadioGroup value={val()} onChange={setVal} iconSize="28px">\n  <Radio value="like" label="Good"\n    checkedIcon={<LikeIcon />}\n    uncheckedIcon={<LikeIcon />} />\n  {/* ... meh, bad variants */}\n</RadioGroup>',
      desc: t('radio.demoDesc.customIcon'),
    },
    {
      title: t('radio.demo.standalone'),
      code: 'const [checked, setChecked] = createSignal(false);\n\n<Radio\n  value="x"\n  label="Tap to toggle"\n  checked={checked()}\n  onChange={setChecked}\n/>',
      desc: t('radio.demoDesc.standalone'),
    },
    {
      title: t('radio.demo.form'),
      code: '<Form controlAlign="right" onSubmit={(v) => Toast.success(JSON.stringify(v))}>\n  <FormItem name="lang" label="Language" required\n    rules={[{ validator: (v) => !!v, message: \'Please select\' }]}>\n    <RadioGroup direction="horizontal">\n      <Radio value="zh" label="Chinese" />\n      <Radio value="en" label="English" />\n      <Radio value="ja" label="Japanese" />\n    </RadioGroup>\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\' }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>',
      desc: t('radio.demoDesc.form'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Radio</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('radio.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
