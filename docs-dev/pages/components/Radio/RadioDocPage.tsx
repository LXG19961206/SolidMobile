import { createSignal, type Component } from 'solid-js';
import { Radio, RadioGroup } from '../../../../src/components/Radio';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Input } from '../../../../src/components/Input';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';

const radioProps: PropRow[] = [
  { name: 'value', type: 'unknown', default: '—', required: true, desc: '标识符，选中时对应 RadioGroup 的 value。' },
  { name: 'label', type: 'string | JSX.Element', default: '—', required: false, desc: '标签文字。' },
  { name: 'checked', type: 'boolean', default: '—', required: false, desc: '独立使用是否选中（受控）。' },
  { name: 'onChange', type: '(checked: boolean) => void', default: '—', required: false, desc: '独立使用选中变化回调。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '禁用。' },
  { name: 'labelDisabled', type: 'boolean', default: 'false', required: false, desc: '禁用标签点击。' },
  { name: 'labelPosition', type: "'left' | 'right'", default: "'right'", required: false, desc: '标签位置。' },
  { name: 'iconSize', type: 'number | string', default: "'20px'", required: false, desc: '图标大小。' },
  { name: 'checkedColor', type: 'string', default: "'#1989fa'", required: false, desc: '选中态颜色。' },
  { name: 'shape', type: "'round' | 'square' | 'dot'", default: "'round'", required: false, desc: '形状。' },
  { name: 'checkedIcon', type: 'JSX.Element', default: '—', required: false, desc: '自定义选中图标。' },
  { name: 'uncheckedIcon', type: 'JSX.Element', default: '—', required: false, desc: '自定义未选中图标。' },
];

const groupProps: PropRow[] = [
  { name: 'value', type: 'unknown', default: '—', required: false, desc: '当前选中值（受控）。' },
  { name: 'defaultValue', type: 'unknown', default: '—', required: false, desc: '默认值（非受控）。' },
  { name: 'onChange', type: '(value) => void', default: '—', required: false, desc: '值变化回调。' },
  { name: 'direction', type: "'vertical' | 'horizontal'", default: "'vertical'", required: false, desc: '排列方向。' },
  { name: 'gap', type: 'string | number', default: "'12px'(横向) / '0'(纵向)", required: false, desc: '选项间距。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '全局禁用。' },
  { name: 'iconSize', type: 'number | string', default: "'20px'", required: false, desc: '图标大小（统一设置）。' },
  { name: 'checkedColor', type: 'string', default: "'#1989fa'", required: false, desc: '选中态颜色（统一设置）。' },
  { name: 'shape', type: "'round' | 'square' | 'dot'", default: "'round'", required: false, desc: '形状（统一设置）。' },
];

const radioCssVars: PropRow[] = [
  { name: '--sc-radio-text-color', type: 'color', default: '--sc-color-text', required: false, desc: '文字颜色。' },
  { name: '--sc-radio-disabled-text-color', type: 'color', default: '--sc-color-text-tertiary', required: false, desc: '禁用态文字颜色。' },
  { name: '--sc-radio-icon-size', type: 'length', default: '20px', required: false, desc: '图标大小。' },
  { name: '--sc-radio-border-color', type: 'color', default: '#c8c9cc', required: false, desc: '边框颜色。' },
  { name: '--sc-radio-checked-border-color', type: 'color', default: '#1989fa', required: false, desc: '选中态边框颜色。' },
  { name: '--sc-radio-checked-bg', type: 'color', default: '#1989fa', required: false, desc: '选中态背景色。' },
  { name: '--sc-radio-disabled-opacity', type: 'number', default: '0.5', required: false, desc: '禁用态透明度。' },
  { name: '--sc-radio-gap', type: 'length', default: '8px', required: false, desc: '图标与标签间距。' },
  { name: '--sc-radio-font-size', type: 'length', default: '0.9375rem', required: false, desc: '字号。' },
];

const codeBasic = `<RadioGroup value={basicVal()} onChange={setBasicVal}>
  <Radio value="a" label="选项 A" />
  <Radio value="b" label="选项 B" />
  <Radio value="c" label="选项 C" />
</RadioGroup>`;

const codeDisabled = `<RadioGroup value={disabledVal()} onChange={setDisabledVal}>
  <Radio value="a" label="正常" />
  <Radio value="b" label="禁用" disabled />
  <Radio value="c" label="也正常" />
</RadioGroup>`;

const codeShape = `<RadioGroup value={shapeVal()} onChange={setShapeVal}>
  <Radio value="a" label="Round（默认）" />
  <Radio value="b" label="Square" shape="square" />
  <Radio value="c" label="Dot" shape="dot" />
</RadioGroup>`;

const codeColor = `<RadioGroup value={colorVal()} onChange={setColorVal} checkedColor="#22c55e">
  <Radio value="a" label="绿色" />
  <Radio value="b" label="绿色" />
  <Radio value="c" label="绿色" />
</RadioGroup>`;

const codeHorizontal = `<RadioGroup direction="horizontal" value={hVal()} onChange={setHVal}>
  <Radio value="a" label="男" />
  <Radio value="b" label="女" />
</RadioGroup>`;

const codeCustomIcon = `<RadioGroup value={iconVal()} onChange={setIconVal}>
  <Radio value="like" label="好评"
    checkedIcon={<LikeIcon />}
    uncheckedIcon={<LikeIcon />} />
  <Radio value="normal" label="一般"
    checkedIcon={<MehIcon />}
    uncheckedIcon={<MehIcon />} />
  <Radio value="bad" label="差评"
    checkedIcon={<BadIcon />}
    uncheckedIcon={<BadIcon />} />
</RadioGroup>`;

/* ── Custom icons ── */

const LikeIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <path d="M8 15c0 0 1.5 2.5 4 2.5s4-2.5 4-2.5" />
  </svg>
);

const MehIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <line x1="8" y1="15" x2="16" y2="15" />
  </svg>
);

const BadIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="8" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <path d="M8 16.5c0 0 1.5-2.5 4-2.5s4 2.5 4 2.5" />
  </svg>
);

const codeForm = `<Form onSubmit={(v) => Toast.success(JSON.stringify(v))}>
  <FormItem name="gender" label="性别" contentFlex rules={[{
    validator: (v) => !!v,
    message: '请选择性别',
  }]}>
    <RadioGroup direction="horizontal" style={{ 'margin-left': 'auto' }}>
      <Radio value="male" label="男" />
      <Radio value="female" label="女" />
    </RadioGroup>
  </FormItem>
  <FormItem name="level" label="会员等级" contentFlex>
    <RadioGroup direction="horizontal" style={{ 'margin-left': 'auto' }}>
      <Radio value="bronze" label="青铜" />
      <Radio value="silver" label="白银" />
      <Radio value="gold" label="黄金" />
    </RadioGroup>
  </FormItem>
  <div style={{ padding: '12px 1rem' }}>
    <Button type="primary" block nativeType="submit" text="提交" />
  </div>
</Form>`;

/* ── Form Demo ── */

const FormDemo: Component = () => {
  const [formVal, setFormVal] = createSignal({});
  return (
    <>
      <Form onSubmit={(v) => { setFormVal(v); Toast.success('提交: ' + JSON.stringify(v)); }}>
        <FormItem
          name="gender"
          label="性别"
          contentFlex
          rules={[{
            validator: (v: unknown) => !!v,
            message: '请选择性别',
          }]}
        >
          <RadioGroup direction="horizontal" style={{ 'margin-left': 'auto' }}>
            <Radio value="male" label="男" />
            <Radio value="female" label="女" />
          </RadioGroup>
        </FormItem>
        <FormItem name="level" label="会员等级" contentFlex>
          <RadioGroup direction="horizontal" style={{ 'margin-left': 'auto' }}>
            <Radio value="bronze" label="青铜" />
            <Radio value="silver" label="白银" />
            <Radio value="gold" label="黄金" />
          </RadioGroup>
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

export const RadioDocPage: Component = () => {
  const t = useT();
  const [basicVal, setBasicVal] = createSignal('a');
  const [disabledVal, setDisabledVal] = createSignal('a');
  const [shapeVal, setShapeVal] = createSignal('a');
  const [colorVal, setColorVal] = createSignal('a');
  const [hVal, setHVal] = createSignal('a');
  const [iconVal, setIconVal] = createSignal('like');
  const [standaloneChecked, setStandaloneChecked] = createSignal(false);

  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Radio 单选框</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          {t('componentIntro.RadioIntro')}
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Radio Props</h2>
        <PropsTable rows={radioProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>RadioGroup Props</h2>
        <PropsTable rows={groupProps} />

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.cssVars')}</h2>
        <PropsTable rows={radioCssVars} />

        <DemoBlock title={t('demo.basic')} code={codeBasic}>
          <RadioGroup value={basicVal()} onChange={setBasicVal}>
            <Radio value="a" label="选项 A" />
            <Radio value="b" label="选项 B" />
            <Radio value="c" label="选项 C" />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前值: {basicVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.disabled')} desc={t('demo.disabledDesc')} code={codeDisabled}>
          <RadioGroup value={disabledVal()} onChange={setDisabledVal}>
            <Radio value="a" label="正常" />
            <Radio value="b" label="禁用" disabled />
            <Radio value="c" label="也正常" />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前值: {disabledVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.shape')} desc={t('demo.shapeDesc')} code={codeShape}>
          <RadioGroup value={shapeVal()} onChange={setShapeVal}>
            <Radio value="a" label="Round（默认）" />
            <Radio value="b" label="Square" shape="square" />
            <Radio value="c" label="Dot" shape="dot" />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前值: {shapeVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.customColor')} desc={t('demo.customColorDesc')} code={codeColor}>
          <RadioGroup value={colorVal()} onChange={setColorVal} checkedColor="#22c55e">
            <Radio value="a" label="绿色" />
            <Radio value="b" label="绿色" />
            <Radio value="c" label="绿色" />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前值: {colorVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.horizontal')} desc={t('demo.horizontalDesc')} code={codeHorizontal}>
          <RadioGroup direction="horizontal" value={hVal()} onChange={setHVal}>
            <Radio value="a" label="男" />
            <Radio value="b" label="女" />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前值: {hVal()}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.customIcon')} desc={t('demo.customIconDesc')} code={codeCustomIcon}>
          <RadioGroup value={iconVal()} onChange={setIconVal} iconSize="28px" checkedColor="#1677ff">
            <Radio
              value="like"
              label="好评"
              checkedIcon={<LikeIcon />}
              uncheckedIcon={<LikeIcon />}
            />
            <Radio
              value="normal"
              label="一般"
              checkedIcon={<MehIcon />}
              uncheckedIcon={<MehIcon />}
            />
            <Radio
              value="bad"
              label="差评"
              checkedIcon={<BadIcon />}
              uncheckedIcon={<BadIcon />}
            />
          </RadioGroup>
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前值: {iconVal() === 'like' ? '好评' : iconVal() === 'normal' ? '一般' : '差评'}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.standalone')} desc="Radio 脱离 RadioGroup 单独使用，自行管理选中态。" code={`const [checked, setChecked] = createSignal(false);
<Radio
  value="x"
  label="点击切换"
  checked={checked()}
  onChange={setChecked}
/>`}>
          <Radio
            value="standalone"
            label="点击我切换（独立模式）"
            checked={standaloneChecked()}
            onChange={setStandaloneChecked}
          />
          <div style={{ 'font-size': '0.8rem', color: '#6b7280', 'margin-top': '8px' }}>
            当前选中: {String(standaloneChecked())}
          </div>
        </DemoBlock>

        <DemoBlock title={t('demo.form')} desc={t('demo.formDesc')} code={codeForm}>
          <FormDemo />
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
