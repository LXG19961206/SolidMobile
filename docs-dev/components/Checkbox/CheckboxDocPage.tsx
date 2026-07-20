import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCheckboxTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const CheckboxDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useCheckboxTableData();

  const demos: DemoCode[] = [
    {
      title: t('checkbox.demo.basic'),
      code: 'const [vals, setVals] = createSignal<unknown[]>([]);\n\n<CheckboxGroup value={vals()} onChange={setVals}>\n  <Checkbox value="code" label="Code" />\n  <Checkbox value="music" label="Music" />\n  <Checkbox value="read" label="Read" />\n</CheckboxGroup>',
      desc: t('checkbox.demoDesc.basic'),
    },
    {
      title: t('checkbox.demo.disabled'),
      code: '<CheckboxGroup value={vals()} onChange={setVals}>\n  <Checkbox value="a" label="Normal" />\n  <Checkbox value="b" label="Disabled" disabled />\n  <Checkbox value="c" label="Also Normal" />\n</CheckboxGroup>\n\n{/* Global disable */}\n<CheckboxGroup disabled value={vals()} onChange={setVals}>\n  <Checkbox value="x" label="All disabled" />\n</CheckboxGroup>',
      desc: t('checkbox.demoDesc.disabled'),
    },
    {
      title: t('checkbox.demo.shape'),
      code: '<CheckboxGroup value={vals()} onChange={setVals}>\n  <Checkbox value="a" label="Square (default)" />\n  <Checkbox value="b" label="Round" shape="round" />\n</CheckboxGroup>',
      desc: t('checkbox.demoDesc.shape'),
    },
    {
      title: t('checkbox.demo.color'),
      code: '<CheckboxGroup value={vals()} onChange={setVals} checkedColor="#22c55e">\n  <Checkbox value="a" label="Green" />\n  <Checkbox value="b" label="Green" />\n  <Checkbox value="c" label="Green" />\n</CheckboxGroup>',
      desc: t('checkbox.demoDesc.color'),
    },
    {
      title: t('checkbox.demo.horizontal'),
      code: '<CheckboxGroup direction="horizontal" value={vals()} onChange={setVals}>\n  <Checkbox value="a" label="Option A" />\n  <Checkbox value="b" label="Option B" />\n  <Checkbox value="c" label="Option C" />\n</CheckboxGroup>',
      desc: t('checkbox.demoDesc.horizontal'),
    },
    {
      title: t('checkbox.demo.max'),
      code: '<CheckboxGroup max={2} value={vals()} onChange={setVals}>\n  <Checkbox value="a" label="Option A" />\n  <Checkbox value="b" label="Option B" />\n  <Checkbox value="c" label="Option C" />\n  <Checkbox value="d" label="This one gets disabled when 2 selected" />\n</CheckboxGroup>',
      desc: t('checkbox.demoDesc.max'),
    },
    {
      title: t('checkbox.demo.indeterminate'),
      code: 'const [vals, setVals] = createSignal<unknown[]>([]);\nconst all = [\'a\', \'b\', \'c\'];\nconst isAll = () => vals().length === all.length;\nconst isIndeterminate = () => vals().length > 0 && vals().length < all.length;\n\n<div>\n  <Checkbox\n    label={isAll() ? \'Deselect All\' : \'Select All\'}\n    checked={isAll()}\n    indeterminate={isIndeterminate()}\n    onChange={(checked) => setVals(checked ? all : [])}\n  />\n  <CheckboxGroup value={vals()} onChange={setVals}>\n    <Checkbox value="a" label="Option A" />\n    <Checkbox value="b" label="Option B" />\n    <Checkbox value="c" label="Option C" />\n  </CheckboxGroup>\n</div>',
      desc: t('checkbox.demoDesc.indeterminate'),
    },
    {
      title: t('checkbox.demo.standalone'),
      code: 'const [checked, setChecked] = createSignal(false);\n\n<Checkbox\n  value="agree"\n  label="I agree to the terms"\n  checked={checked()}\n  onChange={setChecked}\n/>',
      desc: t('checkbox.demoDesc.standalone'),
    },
    {
      title: t('checkbox.demo.form'),
      code: '<Form controlAlign="right" onSubmit={(v) => Toast.success(JSON.stringify(v))}>\n  <FormItem name="hobbies" label="Hobbies" labelAlign="top" required\n    rules={[{\n      validator: (v) => (v as unknown[])?.length > 0,\n      message: \'Please select at least one\',\n    }]}>\n    <CheckboxGroup direction="horizontal">\n      <Checkbox value="code" label="Code" />\n      <Checkbox value="music" label="Music" />\n      <Checkbox value="read" label="Read" />\n    </CheckboxGroup>\n  </FormItem>\n  <div style={{ padding: \'12px 1rem\' }}>\n    <Button type="primary" block nativeType="submit" text="Submit" />\n  </div>\n</Form>',
      desc: t('checkbox.demoDesc.form'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Checkbox</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('checkbox.intro')}</p>
        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />
        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
