import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CheckboxMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Checkbox, CheckboxGroup } from '../../../src/components/Checkbox';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { useT } from '../../doc-i18n';
import { Toast, ToastRenderer } from '../../../src/components/Toast';

const propsData = [
  { name: 'Checkbox.value', type: 'unknown', desc: 'componentProps.checkbox.Checkbox.value' },
  { name: 'Checkbox.label', type: 'string | JSX.Element', desc: 'componentProps.checkbox.Checkbox.label' },
  { name: 'Checkbox.checked', type: 'boolean', desc: 'componentProps.checkbox.Checkbox.checked' },
  { name: 'Checkbox.defaultChecked', type: 'boolean', desc: 'componentProps.checkbox.Checkbox.defaultChecked' },
  { name: 'Checkbox.indeterminate', type: 'boolean', desc: 'componentProps.checkbox.Checkbox.indeterminate' },
  { name: 'Checkbox.disabled', type: 'boolean', desc: 'componentProps.checkbox.Checkbox.disabled' },
  { name: 'Checkbox.shape', type: "'square' | 'round'", desc: 'componentProps.checkbox.Checkbox.shape' },
  { name: 'Checkbox.checkedColor', type: 'string', desc: 'componentProps.checkbox.Checkbox.checkedColor' },
  { name: 'Checkbox.labelPosition', type: "'left' | 'right'", desc: 'componentProps.checkbox.Checkbox.labelPosition' },
  { name: 'Checkbox.checkedIcon / uncheckedIcon', type: 'JSX.Element', desc: 'componentProps.checkbox.Checkbox.checkedIcon / uncheckedIcon' },
  { name: 'CheckboxGroup.value', type: 'unknown[]', desc: 'componentProps.checkbox.CheckboxGroup.value' },
  { name: 'CheckboxGroup.onChange', type: '(values) => void', desc: 'componentProps.checkbox.CheckboxGroup.onChange' },
  { name: 'CheckboxGroup.max / min', type: 'number', desc: 'componentProps.checkbox.CheckboxGroup.max / min' },
  { name: 'CheckboxGroup.direction', type: "'vertical' | 'horizontal'", desc: 'componentProps.checkbox.CheckboxGroup.direction' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

/* ── Icons ── */
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

export const CheckboxMobile: Component<CheckboxMobileProps> = (props) => {
  const t = useT();
  const [basicVal, setBasicVal] = createSignal<unknown[]>([]);
  const [indetCheck, setIndetCheck] = createSignal(false);
  const [standaloneChecked, setStandaloneChecked] = createSignal(true);
  const [formVal, setFormVal] = createSignal({});

  /* ── 全选/半选 ── */
  const all = ['a', 'b', 'c'];
  const [checkedList, setCheckedList] = createSignal<unknown[]>(['a']);
  const allChecked = () => checkedList().length === all.length;
  const someChecked = () => checkedList().length > 0 && !allChecked();

  return (
    <MobilePreview title={t('nav.checkbox')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* 基础 & 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.checkboxBasicDisabled')}</div>
        <div style={CARD.desc}>{t('demo.checkboxBasicDisabledDesc')}</div>
        <div style={CARD.body}>
          <CheckboxGroup value={basicVal()} onChange={setBasicVal}>
            <Checkbox value="a" label={t('demo.optionA')} />
            <Checkbox value="b" label={t('demo.optionB')} />
            <Checkbox value="c" label={t('demo.optionC')} />
            <Checkbox value="d" label={t('demo.disabledLabel')} disabled />
          </CheckboxGroup>
          <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>{t('demo.selectedLabel')}: {JSON.stringify(basicVal())}</div>
        </div>
      </div>

      {/* 形状 & 颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.checkboxShapeColor')}</div>
        <div style={CARD.desc}>{t('demo.checkboxShapeColorDesc')}</div>
        <div style={CARD.body}>
          <CheckboxGroup direction="horizontal" gap={16} defaultValue={['a']}>
            <Checkbox value="a" label={t('demo.square')} />
            <Checkbox value="b" label={t('demo.circle')} shape="round" />
          </CheckboxGroup>
          <div style={{ height: '12px' }} />
          <CheckboxGroup checkedColor="#22c55e" defaultValue={['green']} direction="horizontal" gap={16}>
            <Checkbox value="green" label={t('demo.green')} />
            <Checkbox value="blue" label={t('demo.blue')} />
          </CheckboxGroup>
        </div>
      </div>

      {/* 全选/半选 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.checkboxIndeterminate')}</div>
        <div style={CARD.desc}>{t('demo.checkboxIndeterminateDesc')}</div>
        <div style={CARD.body}>
          <Checkbox value="all" label={t('demo.selectAll')} indeterminate={someChecked()} checked={allChecked()} onChange={(c) => setCheckedList(c ? [...all] : [])} />
          <div style={{ height: '8px' }} />
          <CheckboxGroup value={checkedList()} onChange={setCheckedList}>
            <Checkbox value="a" label={t('demo.optionA')} />
            <Checkbox value="b" label={t('demo.optionB')} />
            <Checkbox value="c" label={t('demo.optionC')} />
          </CheckboxGroup>
        </div>
      </div>

      {/* 最多可选 & 自定义图标 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.checkboxMaxCustomIcon')}</div>
        <div style={CARD.desc}>{t('demo.checkboxMaxCustomIconDesc')}</div>
        <div style={CARD.body}>
          <CheckboxGroup max={2} defaultValue={['a']}>
            <Checkbox value="a" label={t('demo.optionA')} />
            <Checkbox value="b" label={t('demo.optionB')} />
            <Checkbox value="c" label={t('demo.optionC')} />
          </CheckboxGroup>
          <div style={{ height: '12px' }} />
          <CheckboxGroup checkedColor="#e74c3c" defaultValue={['star']}>
            <Checkbox value="star" label={t('demo.star')} checkedIcon={<StarIcon />} uncheckedIcon={<StarIcon />} />
            <Checkbox value="heart" label={t('demo.heart')} checkedIcon={<HeartIcon />} uncheckedIcon={<HeartIcon />} />
          </CheckboxGroup>
        </div>
      </div>

      {/* 独立使用 & 表单 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.checkboxStandaloneForm')}</div>
        <div style={CARD.desc}>{t('demo.checkboxStandaloneFormDesc')}</div>
        <div style={CARD.body}>
          <Checkbox value="standalone" label={t('demo.controlledStandalone')} checked={standaloneChecked()} onChange={setStandaloneChecked} />
          <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin': '8px 0 12px' }}>{t('demo.checkedLabel')}: {String(standaloneChecked())}</div>
          <Form onSubmit={(v) => { setFormVal(v); Toast.success(JSON.stringify(v)); }}>
            <FormItem name="hobbies" label={t('demo.hobbies')}>
              <CheckboxGroup direction="horizontal">
                <Checkbox value="coding" label={t('demo.coding')} />
                <Checkbox value="reading" label={t('demo.reading')} />
                <Checkbox value="gaming" label={t('demo.gaming')} />
              </CheckboxGroup>
            </FormItem>
            <Button type="primary" size="sm" nativeType="submit" text={t('demo.submitBtn')} style={{ 'margin-top': '8px' }} />
          </Form>
          <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '4px' }}>{t('demo.submitValueLabel')}: {JSON.stringify(formVal())}</div>
        </div>
      </div>
    </MobilePreview>
  );
};
