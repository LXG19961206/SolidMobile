import { createSignal, type Component } from 'solid-js';


import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface SliderMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Slider } from '../../../src/components/Slider';

const propsData = [
  { name: 'value', type: 'number | number[]', desc: 'componentProps.slider.value' },
  { name: 'onChange', type: '(value: number | number[]) => void', desc: 'componentProps.slider.onChange' },
  { name: 'min', type: 'number', desc: 'componentProps.slider.min' },
  { name: 'max', type: 'number', desc: 'componentProps.slider.max' },
  { name: 'step', type: 'number', desc: 'componentProps.slider.step' },
  { name: 'count', type: 'number', desc: 'componentProps.slider.count' },
  { name: 'barHeight', type: 'number | string', desc: 'componentProps.slider.barHeight' },
  { name: 'buttonSize', type: 'number | string', desc: 'componentProps.slider.buttonSize' },
  { name: 'activeColor', type: 'string', desc: 'componentProps.slider.activeColor' },
  { name: 'inactiveColor', type: 'string', desc: 'componentProps.slider.inactiveColor' },
  { name: 'reverse', type: 'boolean', desc: 'componentProps.slider.reverse' },
  { name: 'disabled', type: 'boolean', desc: 'componentProps.slider.disabled' },
  { name: 'readonly', type: 'boolean', desc: 'componentProps.slider.readonly' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-direction': 'column' as const, gap: '16px' },
};

export const SliderMobile: Component<SliderMobileProps> = (props) => {
  const t = useT();
  const [val1, setVal1] = createSignal(50);
  const [val2, setVal2] = createSignal(30);
  const [rangeVal, setRangeVal] = createSignal([20, 60]);

  return (
    <MobilePreview title={t('nav.slider')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Basic */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.sliderBasic')}</div>
        <div style={CARD.desc}>{t('demo.sliderBasicDesc')}</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
            <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'min-width': '24px' }}>0</span>
            <div style={{ flex: 1 }}>
              <Slider value={val1()} onChange={setVal1} />
            </div>
            <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'min-width': '24px' }}>100</span>
          </div>
          <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'text-align': 'center' }}>Current Value: {val1()}</span>
        </div>
      </div>

      {/* Dual Slider */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.sliderDual')}</div>
        <div style={CARD.desc}>{t('demo.sliderDualDesc')}</div>
        <div style={CARD.body}>
          <div style={{ padding: '0 12px' }}>
            <Slider value={rangeVal()} onChange={(v) => setRangeVal(v as number[])} count={2} />
          </div>
          <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'text-align': 'center' }}>
            Range: {rangeVal()[0]} - {rangeVal()[1]}
          </span>
        </div>
      </div>

      {/* Step & Color */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.sliderStepColor')}</div>
        <div style={CARD.desc}>{t('demo.sliderStepColorDesc')}</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px' }}>
            <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Step: 5</span>
            <div style={{ flex: 1 }}>
              <Slider value={val2()} onChange={setVal2} step={5} />
            </div>
            <span style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-text, #374151)', 'min-width': '28px' }}>{val2()}</span>
          </div>
          <div style={{ padding: '0 12px' }}>
            <Slider value={70} activeColor="#22c55e" />
          </div>
          <div style={{ padding: '0 12px' }}>
            <Slider value={40} activeColor="#ef4444" barHeight={6} />
          </div>
        </div>
      </div>

      {/* Disabled / Readonly */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.sliderDisabledReadonly')}</div>
        <div style={CARD.body}>
          <div style={{ padding: '0 12px' }}>
            <Slider value={60} disabled />
          </div>
          <div style={{ padding: '0 12px' }}>
            <Slider value={30} readonly />
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
