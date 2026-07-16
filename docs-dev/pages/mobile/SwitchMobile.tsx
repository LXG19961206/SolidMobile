import { createSignal, type Component } from 'solid-js';


import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface SwitchMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Switch as Toggle } from '../../../src/components/Switch';

const propsData = [
  { name: 'checked (value)', type: 'boolean', desc: 'componentProps.switch.checked (value)' },
  { name: 'defaultChecked', type: 'boolean', desc: 'componentProps.switch.defaultChecked' },
  { name: 'onChange', type: '(checked: boolean) => void', desc: 'componentProps.switch.onChange' },
  { name: 'disabled', type: 'boolean', desc: 'componentProps.switch.disabled' },
  { name: 'size', type: 'string | number', desc: 'componentProps.switch.size' },
  { name: 'activeColor', type: 'string', desc: 'componentProps.switch.activeColor' },
  { name: 'inactiveColor', type: 'string', desc: 'componentProps.switch.inactiveColor' },
  { name: 'activeText', type: 'string', desc: 'componentProps.switch.activeText' },
  { name: 'inactiveText', type: 'string', desc: 'componentProps.switch.inactiveText' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const },
};

export const SwitchMobile: Component<SwitchMobileProps> = (props) => {
  const t = useT();
  const [val1, setVal1] = createSignal(true);
  const [val2, setVal2] = createSignal(false);

  return (
    <MobilePreview title={t('nav.switch')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.switchBasic')}</div>
        <div style={CARD.desc}>{t('demo.switchBasicDesc')}</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Toggle checked={val1()} onChange={setVal1} />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>Controlled: {val1() ? 'On' : 'Off'}</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Toggle defaultChecked />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>Default On</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Toggle checked={val2()} onChange={setVal2} />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>Default Off</span>
          </div>
        </div>
      </div>

      {/* 颜色 & 文字 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.switchColorText')}</div>
        <div style={CARD.desc}>{t('demo.switchColorTextDesc')}</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Toggle defaultChecked activeColor="#22c55e" />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>Color Green</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Toggle defaultChecked activeText="On" inactiveText="Off" />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>With Text</span>
          </div>
        </div>
      </div>

      {/* 尺寸 & 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.switchSizeDisabled')}</div>
        <div style={CARD.desc}>{t('demo.switchSizeDisabledDesc')}</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Toggle defaultChecked size={20} />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>20px</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Toggle defaultChecked size={28} />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>28px</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Toggle defaultChecked size={36} />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>36px</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Toggle defaultChecked disabled />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Disabled</span>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
