import { createSignal, type Component } from 'solid-js';
import { Checkbox, CheckboxGroup } from '../../../../src/components/Checkbox';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import { useT } from '../../../doc-i18n';
import type { PropRow } from '../../../../src/doc-utils';

const checkboxProps: PropRow[] = [
  { name: 'value', type: 'unknown', default: '—', required: true, desc: '标识符，选中时对应 CheckboxGroup 的 value。' },
  { name: 'label', type: 'string | JSX.Element', default: '—', required: false, desc: '标签文字。' },
  { name: 'checked', type: 'boolean', default: '—', required: false, desc: '独立使用是否选中（受控）。' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', required: false, desc: '默认选中（非受控）。' },
  { name: 'indeterminate', type: 'boolean', default: 'false', required: false, desc: '半选状态，选中态图标不覆盖。' },
  { name: 'onChange', type: '(checked: boolean) => void', default: '—', required: false, desc: '独立使用选中变化回调。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '禁用。' },
  { name: 'labelDisabled', type: 'boolean', default: 'false', required: false, desc: '禁用标签点击。' },
  { name: 'labelPosition', type: "'left' | 'right'", default: "'right'", required: false, desc: '标签位置。' },
  { name: 'iconSize', type: 'number | string', default: "'20px'", required: false, desc: '图标大小。' },
  { name: 'checkedColor', type: 'string', default: "'#1989fa'", required: false, desc: '选中态颜色。' },
  { name: 'shape', type: "'square' | 'round'", default: "'square'", required: false, desc: '形状。' },
  { name: 'checkedIcon', type: 'JSX.Element', default: '—', required: false, desc: '自定义选中图标。' },
  { name: 'uncheckedIcon', type: 'JSX.Element', default: '—', required: false, desc: '自定义未选中图标。' },
  { name: 'indeterminateIcon', type: 'JSX.Element', default: '—', required: false, desc: '自定义半选图标。' },
];

const groupProps: PropRow[] = [
  { name: 'value', type: 'unknown[]', default: '—', required: false, desc: '当前选中值列表（受控）。' },
  { name: 'defaultValue', type: 'unknown[]', default: '[]', required: false, desc: '默认值（非受控）。' },
  { name: 'onChange', type: '(values) => void', default: '—', required: false, desc: '值变化回调。' },
  { name: 'direction', type: "'vertical' | 'horizontal'", default: "'vertical'", required: false, desc: '排列方向。' },
  { name: 'gap', type: 'string | number', default: "'12px'(横向) / '0'(纵向)", required: false, desc: '选项间距。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '全局禁用。' },
  { name: 'max', type: 'number', default: '—', required: false, desc: '最大可选数。' },
  { name: 'min', type: 'number', default: '—', required: false, desc: '最少可选数。' },
  { name: 'iconSize', type: 'number | string', default: "'20px'", required: false, desc: '图标大小（统一设置）。' },
  { name: 'checkedColor', type: 'string', default: "'#1989fa'", required: false, desc: '选中态颜色（统一设置）。' },
  { name: 'shape', type: "'square' | 'round'", default: "'square'", required: false, desc: '形状（统一设置）。' },
  { name: 'checkedIcon', type: 'JSX.Element', default: '—', required: false, desc: '自定义选中图标。' },
  { name: 'uncheckedIcon', type: 'JSX.Element', default: '—', required: false, desc: '自定义未选中图标。' },
];

const checkboxCssVars: PropRow[] = [
  { name: '--sc-checkbox-text-color', type: 'color', default: '--sc-color-text', required: false, desc: '文字颜色。' },
  { name: '--sc-checkbox-disabled-text-color', type: 'color', default: '--sc-color-text-tertiary', required: false, desc: '禁用态文字颜色。' },
  { name: '--sc-checkbox-icon-size', type: 'length', default: '20px', required: false, desc: '图标大小。' },
  { name: '--sc-checkbox-border-color', type: 'color', default: '#c8c9cc', required: false, desc: '边框颜色。' },
  { name: '--sc-checkbox-checked-border-color', type: 'color', default: '#1989fa', required: false, desc: '选中态边框颜色。' },
  { name: '--sc-checkbox-checked-bg', type: 'color', default: '#1989fa', required: false, desc: '选中态背景色。' },
  { name: '--sc-checkbox-disabled-opacity', type: 'number', default: '0.5', required: false, desc: '禁用态透明度。' },
  { name: '--sc-checkbox-gap', type: 'length', default: '8px', required: false, desc: '图标与标签间距。' },
  { name: '--sc-checkbox-font-size', type: 'length', default: '0.9375rem', required: false, desc: '字号。' },
  { name: '--sc-checkbox-border-radius', type: 'length', default: '4px', required: false, desc: 'square 形状圆角。' },
];

const codeBasic = `<CheckboxGroup value={basicVal()} onChange={setBasicVal}>
  <Checkbox value="a" label="选项 A" />
  <Checkbox value="b" label="选项 B" />
  <Checkbox value="c" label="选项 C" />
</CheckboxGroup>`;

const codeDisabled = `<CheckboxGroup>
  <Checkbox value="a" label="正常" />
  <Checkbox value="b" label="禁用" disabled />
  <Checkbox value="c" label="也正常" checked />
</CheckboxGroup>`;

const codeShape = `<CheckboxGroup>
  <Checkbox value="a" label="Square（默认）" />
  <Checkbox value="b" label="Round" shape="round" />
</CheckboxGroup>`;

const codeCustomIcon = `<CheckboxGroup checkedColor="#e74c3c" defaultValue={['star']}>
  <Checkbox value="star" label="标星"
    checkedIcon={<StarIcon />}
    uncheckedIcon={<StarIcon />} />
  <Checkbox value="heart" label="红心"
    checkedIcon={<HeartIcon />}
    uncheckedIcon={<HeartIcon />} />
</CheckboxGroup>`;

/* ── Custom icons ── */

const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" stroke="none">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const codeColor = `<CheckboxGroup checkedColor="#22c55e" defaultValue={['a', 'c']}>
  <Checkbox value="a" label="绿色" />
  <Checkbox value="b" label="绿色" />
  <Checkbox value="c" label="绿色" />
</CheckboxGroup>`;

const codeHorizontal = `<CheckboxGroup direction="horizontal" defaultValue={['a']}>
  <Checkbox value="a" label="选项 A" />
  <Checkbox value="b" label="选项 B" />
  <Checkbox value="c" label="选项 C" />
</CheckboxGroup>`;

const codeIndeterminate = `<Checkbox indeterminate={indet()} onChange={setIndet}>
  全选
</Checkbox>
<CheckboxGroup value={items()} onChange={setItems}>
  ...
</CheckboxGroup>`;

const codeMaxMin = `<CheckboxGroup max={2} min={1} defaultValue={['a']}>
  <Checkbox value="a" label="至少选 1 个，最多 2 个" />
  <Checkbox value="b" label="选项 B" />
  <Checkbox value="c" label="选项 C" />
</CheckboxGroup>`;

const codeForm = `<Form onSubmit={(v) => Toast.success(JSON.stringify(v))}>
  <FormItem name="hobbies" label="爱好" contentFlex>
    <CheckboxGroup direction="horizontal" style={{ 'margin-left': 'auto' }}>
      <Checkbox value="coding" label="写代码" />
      <Checkbox value="reading" label="阅读" />
      <Checkbox value="gaming" label="游戏" />
    </CheckboxGroup>
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="提交" />
  </div>
</Form>`;

/* ── Indeterminate Demo ── */

const IndeterminateDemo: Component = () => {
  const [checkedList, setCheckedList] = createSignal<unknown[]>(['a']);
  const all = ['a', 'b', 'c'];
  const allChecked = () => checkedList().length === all.length;
  const someChecked = () => checkedList().length > 0 && !allChecked();

  function toggleAll(checked: boolean) {
    setCheckedList(checked ? [...all] : []);
  }

  return (
    <>
      <Checkbox
        value="all"
        label="全选"
        indeterminate={someChecked()}
        checked={allChecked()}
        onChange={toggleAll}
      />
      <div style={{ height: '8px' }} />
      <CheckboxGroup value={checkedList()} onChange={setCheckedList}>
        <Checkbox value="a" label="选项 A" />
        <Checkbox value="b" label="选项 B" />
        <Checkbox value="c" label="选项 C" />
      </CheckboxGroup>
    </>
  );
};

/* ── Form Demo ── */

const FormDemo: Component = () => {
  const [formVal, setFormVal] = createSignal({});
  return (
    <>
      <Form onSubmit={(v) => { setFormVal(v); Toast.success('提交: ' + JSON.stringify(v)); }}>
        <FormItem name="hobbies" label="爱好" contentFlex>
          <CheckboxGroup direction="horizontal" style={{ 'margin-left': 'auto' }}>
            <Checkbox value="coding" label="写代码" />
            <Checkbox value="reading" label="阅读" />
            <Checkbox value="gaming" label="游戏" />
          </CheckboxGroup>
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

export const CheckboxDocPage: Component = () => {
  const t = useT();
  const [basicVal, setBasicVal] = createSignal<unknown[]>([]);
  const [items, setItems] = createSignal<unknown[]>(['a', 'b']);
  const [indet, setIndet] = createSignal(false);

  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Checkbox 复选框</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          {t(\'componentIntro.CheckboxIntro\')}
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Checkbox Props</h2>
        <PropsTable rows={checkboxProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>CheckboxGroup Props</h2>
        <PropsTable rows={groupProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.cssVars')}</h2>
        <PropsTable rows={checkboxCssVars} />

        <DemoBlock title={t('demo.basic')} code={codeBasic}>
          <CheckboxGroup value={basicVal()} onChange={setBasicVal}>
            <Checkbox value="a" label="选项 A" />
            <Checkbox value="b" label="选项 B" />
            <Checkbox value="c" label="选项 C" />
          </CheckboxGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前值: {JSON.stringify(basicVal())}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.disabled')} desc={t('demo.disabledDesc')} code={codeDisabled}>
          <CheckboxGroup>
            <Checkbox value="a" label="正常" />
            <Checkbox value="b" label="禁用" disabled />
            <Checkbox value="c" label="也正常" checked />
          </CheckboxGroup>
        </DemoBlock>

        <DemoBlock title={t('demo.shape')} desc={t('demo.shapeDesc')} code={codeShape}>
          <CheckboxGroup>
            <Checkbox value="a" label="Square（默认）" />
            <Checkbox value="b" label="Round" shape="round" />
          </CheckboxGroup>
        </DemoBlock>

        <DemoBlock title={t('demo.customIcon')} desc={t('demo.customIconDesc')} code={codeCustomIcon}>
          <CheckboxGroup checkedColor="#e74c3c" defaultValue={['star']}>
            <Checkbox
              value="star"
              label="标星"
              checkedIcon={<StarIcon />}
              uncheckedIcon={<StarIcon />}
            />
            <Checkbox
              value="heart"
              label="红心"
              checkedIcon={<HeartIcon />}
              uncheckedIcon={<HeartIcon />}
            />
          </CheckboxGroup>
        </DemoBlock>

        <DemoBlock title={t('demo.customColor')} desc={t('demo.customColorDesc')} code={codeColor}>
          <CheckboxGroup checkedColor="#22c55e" defaultValue={['a', 'c']}>
            <Checkbox value="a" label="绿色" />
            <Checkbox value="b" label="绿色" />
            <Checkbox value="c" label="绿色" />
          </CheckboxGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            defaultValue={['a', 'c']} 默认选中 A 和 C
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.horizontal')} desc={t('demo.horizontalDesc')} code={codeHorizontal}>
          <CheckboxGroup direction="horizontal" defaultValue={['a']}>
            <Checkbox value="a" label="选项 A" />
            <Checkbox value="b" label="选项 B" />
            <Checkbox value="c" label="选项 C" />
          </CheckboxGroup>
        </DemoBlock>

        <DemoBlock title={t('demo.half')} desc={t('demo.halfDesc')} code={codeIndeterminate}>
          <IndeterminateDemo />
        </DemoBlock>

        <DemoBlock title={t('demo.minMaxCheck')} desc="max 限制最多可选数，min 限制最少可选数。" code={codeMaxMin}>
          <CheckboxGroup max={2} min={1} defaultValue={['a']}>
            <Checkbox value="a" label="至少选 1 个，最多 2 个" />
            <Checkbox value="b" label="选项 B" />
            <Checkbox value="c" label="选项 C" />
          </CheckboxGroup>
        </DemoBlock>

        <DemoBlock title={t('demo.standalone')} desc="Checkbox 脱离 CheckboxGroup 单独使用，支持受控和非受控。" code={`<Checkbox value="x" label="非受控" defaultChecked />
<Checkbox value="y" label="受控" checked={val()} onChange={setVal} />`}>
          <Checkbox value="x" label="点击我切换（非受控，defaultChecked）" defaultChecked />
          <div style={{ height: '8px' }} />
          <Checkbox value="y" label="受控模式" checked={indet()} onChange={setIndet} />
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            受控选中: {String(indet())}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.form')} desc={t('demo.formDesc')} code={codeForm}>
          <FormDemo />
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
