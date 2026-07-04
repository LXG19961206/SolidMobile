import { createSignal, type Component } from 'solid-js';
import { Slider } from '../../../../src/components/Slider';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';

const sliderProps: PropRow[] = [
  { name: 'value', type: 'number | number[]', default: '0', required: false, desc: '当前值。count=1 时为数字，count>1 时为数组。' },
  { name: 'onChange', type: '(value) => void', default: '—', required: false, desc: '值变化回调。' },
  { name: 'min', type: 'number', default: '0', required: false, desc: '最小值。' },
  { name: 'max', type: 'number', default: '100', required: false, desc: '最大值。' },
  { name: 'step', type: 'number', default: '1', required: false, desc: '步长。' },
  { name: 'count', type: 'number', default: '1', required: false, desc: '滑块数量。1 为单滑块，2 为双滑块，以此类推。' },
  { name: 'barHeight', type: 'number | string', default: '2px', required: false, desc: '进度条高度。' },
  { name: 'buttonSize', type: 'number | string', default: '20px', required: false, desc: '滑块按钮大小。' },
  { name: 'thumbRender', type: '(value, index) => any', default: '—', required: false, desc: '自定义滑块按钮渲染。接收当前值和索引，返回字符串/元素则替换默认样式。' },
  { name: 'activeColor', type: 'string', default: '#1989fa', required: false, desc: '进度条激活态颜色。' },
  { name: 'inactiveColor', type: 'string', default: '#e5e5e5', required: false, desc: '进度条非激活态颜色。' },
  { name: 'reverse', type: 'boolean', default: 'false', required: false, desc: '是否反转。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: '只读。' },
];

const codeBasic = `const [val, setVal] = createSignal(30);
<Slider value={val()} onChange={setVal} />
当前: {val()}`;

const codeRange = `const [val, setVal] = createSignal([20, 60]);
<Slider count={2} value={val()} onChange={setVal} />
当前: [{val()[0]}, {val()[1]}]`;

const codeThree = `const [val, setVal] = createSignal([10, 50, 90]);
<Slider count={3} value={val()} onChange={setVal} />`;

const codeCustom = `const [v, setV] = createSignal(40);
<Slider value={v()} onChange={setV} activeColor="#22c55e" barHeight={4} buttonSize={28} />
当前: {v()}`;

const codeDisabled = `<Slider value={50} disabled />`;

const codeCustomThumb = `const [val, setVal] = createSignal(50);
<Slider value={val()} onChange={setVal} buttonSize={32} thumbRender={(v) => v} />
当前: {val()}`;

const codeForm = `<FormItem name="score" label="评分">
  <Slider />
</FormItem>`;

export const SliderDocPage: Component = () => {
  const t = useT();
  const [basicVal, setBasicVal] = createSignal(30);
  const [rangeVal, setRangeVal] = createSignal([20, 60]);
  const [threeVal, setThreeVal] = createSignal([10, 50, 90]);
  const [customVal, setCustomVal] = createSignal(50);
  const [styleVal, setStyleVal] = createSignal(40);
  const [formVal, setFormVal] = createSignal({});

  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Slider 滑块</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          滑块组件，支持单滑块、多滑块、自定义颜色和尺寸。
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Slider Props</h2>
        <PropsTable rows={sliderProps} />

        <DemoBlock title={t('demo.basic')} code={codeBasic}>
          <div style={{ padding: '0 4px' }}>
            <Slider value={basicVal()} onChange={setBasicVal} />
          </div>
          <div style={{ 'font-size': '0.85rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前: {basicVal()}
          </div>
        </DemoBlock>

        <DemoBlock title="双滑块（范围）" desc="count=2 时出现两个滑块，控制一个范围。" code={codeRange}>
          <div style={{ padding: '0 4px' }}>
            <Slider count={2} value={rangeVal()} onChange={setRangeVal} />
          </div>
          <div style={{ 'font-size': '0.85rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前: {rangeVal()[0]} ~ {rangeVal()[1]}
          </div>
        </DemoBlock>

        <DemoBlock title="三滑块" desc="count=3 三个滑块，value 为长度为 3 的数组。" code={codeThree}>
          <div style={{ padding: '0 4px' }}>
            <Slider count={3} value={threeVal()} onChange={setThreeVal} />
          </div>
          <div style={{ 'font-size': '0.85rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前: {threeVal().join(', ')}
          </div>
        </DemoBlock>

        <DemoBlock title="自定义样式" desc="自定义颜色、进度条高度、滑块大小。" code={codeCustom}>
          <div style={{ padding: '0 4px' }}>
            <Slider value={styleVal()} onChange={setStyleVal} activeColor="#22c55e" barHeight={4} buttonSize={28} />
          </div>
          <div style={{ 'font-size': '0.85rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前: {styleVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.disabled')} code={codeDisabled}>
          <div style={{ padding: '0 4px' }}>
            <Slider value={50} disabled />
          </div>
        </DemoBlock>

        <DemoBlock title="自定义滑块" desc="thumbRender 接收当前值，返回自定义内容渲染滑块按钮。" code={codeCustomThumb}>
          <div style={{ padding: '0 4px' }}>
            <Slider value={customVal()} onChange={setCustomVal} buttonSize={32} thumbRender={(v) => v} />
          </div>
          <div style={{ 'font-size': '0.85rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前: {customVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.form')} desc={t('demo.formDesc')} code={codeForm}>
          <Form onSubmit={(v) => { setFormVal(v); Toast.success('提交: ' + JSON.stringify(v)); }}>
            <FormItem name="score" label="评分" contentFlex>
              <div style={{ padding: '12px 4px', flex: '1', 'min-width': '0' }}>
                <Slider />
              </div>
            </FormItem>
            <div style={{ padding: '12px 1rem' }}>
              <Button type="primary" block nativeType="submit" text="提交" />
            </div>
          </Form>
          <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
            提交值: {JSON.stringify(formVal())}
          </div>
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
