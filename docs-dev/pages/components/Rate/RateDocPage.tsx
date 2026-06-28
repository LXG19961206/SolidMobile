import { createSignal, type Component } from 'solid-js';
import { Rate } from '../../../../src/components/Rate';
import { Cell, CellGroup } from '../../../../src/components/Cell';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../../src/doc-utils';

const rateProps: PropRow[] = [
  { name: 'value', type: 'number', default: '0', required: false, desc: '当前分值。' },
  { name: 'onChange', type: '(value: number) => void', default: '—', required: false, desc: '分值变化回调。' },
  { name: 'count', type: 'number | string', default: '5', required: false, desc: '图标总数。' },
  { name: 'size', type: 'number | string', default: '20px', required: false, desc: '图标大小。' },
  { name: 'gutter', type: 'number | string', default: '4px', required: false, desc: '图标间距。' },
  { name: 'color', type: 'string', default: '#ee0a24', required: false, desc: '选中时的颜色。' },
  { name: 'voidColor', type: 'string', default: '#c8c9cc', required: false, desc: '未选中时的颜色。' },
  { name: 'disabledColor', type: 'string', default: '#c8c9cc', required: false, desc: '禁用时的颜色。' },
  { name: 'icon', type: 'string', default: "'star'", required: false, desc: '选中时的图标名，对应 Icon 的 name 属性。' },
  { name: 'voidIcon', type: 'string', default: "'star'", required: false, desc: '未选中时的图标名。' },
  { name: 'allowHalf', type: 'boolean', default: 'false', required: false, desc: '是否允许半选。' },
  { name: 'clearable', type: 'boolean', default: 'false', required: false, desc: '是否允许再次点击后清除。' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: '只读。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '禁用。' },
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
          评分组件，支持半选、清除、自定义图标和颜色。
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Rate Props</h2>
        <PropsTable rows={rateProps} />

        <DemoBlock title="基础用法" desc="默认 5 颗星，受控模式。" code={codeBasic}>
          <Rate value={basicVal()} onChange={setBasicVal} />
          {Value(basicVal)}
        </DemoBlock>

        <DemoBlock title="自定义颜色" desc="通过 color / voidColor 修改选中/未选中颜色。" code={codeColor}>
          <Rate value={colorVal()} onChange={setColorVal} color="#ff7d00" voidColor="#eee" />
          {Value(colorVal)}
        </DemoBlock>

        <DemoBlock title="自定义数量" desc="count 控制图标总数。" code={codeCount}>
          <Rate value={countVal()} onChange={setCountVal} count={8} />
          {Value(countVal)}
        </DemoBlock>

        <DemoBlock title="自定义大小" desc="size 图标大小，gutter 间距。" code={codeSize}>
          <Rate value={sizeVal()} onChange={setSizeVal} size={28} gutter={8} />
          {Value(sizeVal)}
        </DemoBlock>

        <DemoBlock title="半选" desc="allowHalf 开启半选，点击左侧半区为 0.5 分。" code={codeHalf}>
          <Rate value={halfVal()} onChange={setHalfVal} allowHalf />
          {Value(halfVal)}
        </DemoBlock>

        <DemoBlock title="可清除" desc="clearable 开启后再次点击已选中的星会重置为 0。" code={codeClearable}>
          <Rate value={clearVal()} onChange={setClearVal} clearable />
          {Value(clearVal)}
        </DemoBlock>

        <DemoBlock title="禁用状态" code={codeDisabled}>
          <Rate value={disableVal()} onChange={setDisableVal} disabled />
          {Value(disableVal)}
        </DemoBlock>

        <DemoBlock title="只读" desc="readonly 状态无法交互。" code={codeReadonly}>
          <Rate value={readonlyVal()} onChange={setReadonlyVal} readonly />
          {Value(readonlyVal)}
        </DemoBlock>

        <DemoBlock title="自定义图标" desc="icon / voidIcon 传入 Icon 组件支持的图标名。" code={codeCustom}>
          <Rate value={customVal()} onChange={setCustomVal} icon="heart" voidIcon="heart" color="#ff4d4f" voidColor="#f5d0d0" />
          {Value(customVal)}
        </DemoBlock>

        <DemoBlock title="表单中使用" desc="Rate 放在 FormItem 中自动集成表单的值管理。" code={codeForm}>
          <FormDemo />
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
