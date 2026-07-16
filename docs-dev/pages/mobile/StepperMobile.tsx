import { createSignal, type Component } from 'solid-js';


import zhCN from '../../i18n/stepper/zh-CN';
import enUS from '../../i18n/stepper/en-US';
import { registerLocale } from '../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface StepperMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Stepper } from '../../../src/components/Stepper';
import { Icon } from '../../../src/components/Icon';

const propsData = [
  { name: 'value', type: 'number', desc: 'componentProps.stepper.value' },
  { name: 'onChange', type: '(value: number) => void', desc: 'componentProps.stepper.onChange' },
  { name: 'defaultValue', type: 'number', desc: 'componentProps.stepper.defaultValue' },
  { name: 'min', type: 'number', desc: 'componentProps.stepper.min' },
  { name: 'max', type: 'number', desc: 'componentProps.stepper.max' },
  { name: 'step', type: 'number', desc: 'componentProps.stepper.step' },
  { name: 'decimalLength', type: 'number', desc: 'componentProps.stepper.decimalLength' },
  { name: 'size', type: 'number | string', desc: 'componentProps.stepper.size' },
  { name: 'buttonSize', type: 'number | string', desc: 'componentProps.stepper.buttonSize' },
  { name: 'inputWidth', type: 'number | string', desc: 'componentProps.stepper.inputWidth' },
  { name: 'disabled', type: 'boolean', desc: 'componentProps.stepper.disabled' },
  { name: 'inputDisabled', type: 'boolean', desc: 'componentProps.stepper.inputDisabled' },
  { name: 'integer', type: 'boolean', desc: 'componentProps.stepper.integer' },
  { name: 'placeholder', type: 'string', desc: 'componentProps.stepper.placeholder' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const },
};

export const StepperMobile: Component<StepperMobileProps> = (props) => {
  const t = useT();
  const [val, setVal] = createSignal(1);

  return (
    <MobilePreview title={t('nav.stepper')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.stepperBasic')}</div>
        <div style={CARD.desc}>{t('demo.stepperBasicDesc')}</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '16px' }}>
            <Stepper value={val()} onChange={setVal} />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-desc, #6b7280)' }}>Current: {val()}</span>
          </div>
        </div>
      </div>

      {/* 范围限制 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.range')}</div>
        <div style={CARD.desc}>{t('demo.rangeDesc')}</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, gap: '8px', width: '100%' }}>
            <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
              <Stepper defaultValue={5} min={1} max={10} />
              <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>1-10</span>
            </div>
            <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
              <Stepper defaultValue={0} step={5} min={0} max={50} />
              <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Step 5</span>
            </div>
            <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
              <Stepper defaultValue={1.5} step={0.5} decimalLength={1} />
              <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Decimal 0.5</span>
            </div>
          </div>
        </div>
      </div>

      {/* 禁用 & 只读 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.stepperDisabledReadonly')}</div>
        <div style={CARD.desc}>{t('demo.stepperDisabledReadonlyDesc')}</div>
        <div style={CARD.body}>
          <Stepper defaultValue={3} disabled />
          <Stepper defaultValue={3} readonly />
          <Stepper defaultValue={3} inputDisabled />
        </div>
      </div>

      {/* 自定义图标 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customIcon')}</div>
        <div style={CARD.desc}>{t('demoDesc.stepper_custom_icon')}</div>
        <div style={CARD.body}>
          <Stepper
            defaultValue={3}
            minusIcon={<span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon name="heart" variant="fill" color="#333" /></span>}
            plusIcon={<Icon name="heart" variant="fill" color="#ff4d4f" />}
          />
        </div>
      </div>

      {/* 尺寸 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customSizeMobile')}</div>
        <div style={CARD.desc}>{t('demoDesc.stepper_size')}</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
            <Stepper defaultValue={3} size={24} />
            <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>size=24</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
            <Stepper defaultValue={3} size={32} />
            <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>size=32 (default)</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
            <Stepper defaultValue={3} size={40} />
            <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>size=40</span>
          </div>
        </div>
      </div>

      {/* 整数模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.integerMode')}</div>
        <div style={CARD.desc}>{t('demoDesc.stepper_integer')}</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '16px' }}>
            <Stepper defaultValue={5} integer min={0} max={100} />
            <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>integer only</span>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
