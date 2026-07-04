import { createSignal, type Component } from 'solid-js';
import { Rate } from '../../../../src/components/Rate';
import { Cell, CellGroup } from '../../../../src/components/Cell';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';

const rateProps: PropRow[] = [
  { name: 'value', type: 'number', default: '0', required: false, desc: 'componentProps.rate.value' },
  { name: 'onChange', type: '(value: number) => void', default: '—', required: false, desc: 'componentProps.rate.onChange' },
  { name: 'count', type: 'number | string', default: '5', required: false, desc: 'componentProps.rate.count' },
  { name: 'size', type: 'number | string', default: '20px', required: false, desc: 'componentProps.rate.size' },
  { name: 'gutter', type: 'number | string', default: '4px', required: false, desc: 'componentProps.rate.gutter' },
  { name: 'color', type: 'string', default: '#ee0a24', required: false, desc: 'componentProps.rate.color' },
  { name: 'voidColor', type: 'string', default: '#c8c9cc', required: false, desc: 'componentProps.rate.voidColor' },
  { name: 'disabledColor', type: 'string', default: '#c8c9cc', required: false, desc: 'componentProps.rate.disabledColor' },
  { name: 'icon', type: 'string', default: "'star'", required: false, desc: 'componentProps.rate.icon' },
  { name: 'voidIcon', type: 'string', default: "'star'", required: false, desc: 'componentProps.rate.voidIcon' },
  { name: 'allowHalf', type: 'boolean', default: 'false', required: false, desc: 'componentProps.rate.allowHalf' },
  { name: 'clearable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.rate.clearable' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: 'componentProps.rate.readonly' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.rate.disabled' },
];

const codeBasic = `const [val, setVal] = createSignal(3);
<Rate value={val()} onChange={setVal} />
当前: {val()}`;

const codeColor = `const [val, setVal] = createSignal(3);
<Rate value={val()} onChange={setVal} color="#ff7d00" voidColor="#eee" />
当前: {val()}`;

const codeCount = `const [val, setVal] = createSignal(2);
<Rate value={val()} onChange={setVal} count={8} />
当前: {val()}`;

const codeSize = `const [val, setVal] = createSignal(3);
<Rate value={val()} onChange={setVal} size={28} gutter={8} />
当前: {val()}`;

const codeHalf = `const [val, setVal] = createSignal(3.5);
<Rate value={val()} onChange={setVal} allowHalf />
当前: {val()}`;

const codeClearable = `const [val, setVal] = createSignal(3);
<Rate value={val()} onChange={setVal} clearable />
当前: {val()}`;

const codeDisabled = `const [val, setVal] = createSignal(3);
<Rate value={val()} onChange={setVal} disabled />
当前: {val()}`;

const codeReadonly = `const [val, setVal] = createSignal(4);
<Rate value={val()} onChange={setVal} readonly />
当前: {val()}`;

const codeCustom = `const [val, setVal] = createSignal(3);
<Rate value={val()} onChange={setVal} icon="heart" voidIcon="heart" color="#ff4d4f" voidColor="#f5d0d0" />
当前: {val()}`;

const codeForm = `const [formVal, setFormVal] = createSignal({});

<Form onSubmit={(v) => Toast.success(JSON.stringify(v))}>
  <FormItem name="score" label="评分">
    <Rate />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="提交" />
</Form>`;

/* ── Form Demo ── */

const FormDemo: Component = () => {
  const [formVal, setFormVal] = createSignal({});
  return (
    <>
      <Form onSubmit={(v) => { setFormVal(v); Toast.success('提交: ' + JSON.stringify(v)); }}>
        <FormItem name="score" label="评分">
          <Rate />
        </FormItem>
        <div style={{ padding: '12px 1rem' }}>
          <Button type="primary" block nativeType="submit" text="提交" />
        </div>
      </Form>
      <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
        提交值: {JSON.stringify(formVal())}
      </div>
    </>
  );
};

export const RateDocPage: Component = () => {
  const t = useT();
  const [basicVal, setBasicVal] = createSignal(3);
  const [colorVal, setColorVal] = createSignal(3);
  const [countVal, setCountVal] = createSignal(2);
  const [sizeVal, setSizeVal] = createSignal(3);
  const [halfVal, setHalfVal] = createSignal(3.5);
  const [clearVal, setClearVal] = createSignal(3);
  const [disableVal, setDisableVal] = createSignal(3);
  const [readonlyVal, setReadonlyVal] = createSignal(4);
  const [customVal, setCustomVal] = createSignal(3);

  const Value = (v: () => number) => (
    <div style={{ 'font-size': '0.85rem', color: '#6b7280', 'margin-top': '8px' }}>
      当前: {v()}
    </div>
  );

  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Rate 评分</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          {t('componentIntro.RateIntro')}
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Rate Props</h2>
        <PropsTable rows={rateProps} />

        <DemoBlock title={t('demo.basic')} desc={t('demo.basicDesc')} code={codeBasic}>
          <Rate value={basicVal()} onChange={setBasicVal} />
          {Value(basicVal)}
        </DemoBlock>

        <DemoBlock title={t('demo.customColor')} desc={t('demo.customColorDesc')} code={codeColor}>
          <Rate value={colorVal()} onChange={setColorVal} color="#ff7d00" voidColor="#eee" />
          {Value(colorVal)}
        </DemoBlock>

        <DemoBlock title={t('demo.rateCount')} desc="count 控制图标总数。" code={codeCount}>
          <Rate value={countVal()} onChange={setCountVal} count={8} />
          {Value(countVal)}
        </DemoBlock>

        <DemoBlock title={t('demo.customSizeDemo')} desc="size 图标大小，gutter 间距。" code={codeSize}>
          <Rate value={sizeVal()} onChange={setSizeVal} size={28} gutter={8} />
          {Value(sizeVal)}
        </DemoBlock>

        <DemoBlock title={t('demo.half')} desc={t('demo.halfDesc')} code={codeHalf}>
          <Rate value={halfVal()} onChange={setHalfVal} allowHalf />
          {Value(halfVal)}
        </DemoBlock>

        <DemoBlock title={t('demo.clearable')} desc={t('demo.clearableDesc')} code={codeClearable}>
          <Rate value={clearVal()} onChange={setClearVal} clearable />
          {Value(clearVal)}
        </DemoBlock>

        <DemoBlock title={t('demo.disabled')} code={codeDisabled}>
          <Rate value={disableVal()} onChange={setDisableVal} disabled />
          {Value(disableVal)}
        </DemoBlock>

        <DemoBlock title={t('demo.readonly')} desc="readonly 状态无法交互。" code={codeReadonly}>
          <Rate value={readonlyVal()} onChange={setReadonlyVal} readonly />
          {Value(readonlyVal)}
        </DemoBlock>

        <DemoBlock title={t('demo.customIcon')} desc={t('demo.customIconDesc')} code={codeCustom}>
          <Rate value={customVal()} onChange={setCustomVal} icon="heart" voidIcon="heart" color="#ff4d4f" voidColor="#f5d0d0" />
          {Value(customVal)}
        </DemoBlock>

        <DemoBlock title={t('demo.form')} desc={t('demo.formDesc')} code={codeForm}>
          <FormDemo />
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
