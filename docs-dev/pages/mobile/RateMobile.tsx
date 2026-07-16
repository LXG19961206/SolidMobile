import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface RateMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Rate } from '../../../src/components/Rate';
import { useT, loadLocale } from '../../doc-i18n';
loadLocale('rate');

const propsData = [
  { name: 'value', type: 'number', desc: 'componentProps.rate.value' },
  { name: 'onChange', type: '(value: number) => void', desc: 'componentProps.rate.onChange' },
  { name: 'count', type: 'number | string', desc: 'componentProps.rate.count' },
  { name: 'size', type: 'number | string', desc: 'componentProps.rate.size' },
  { name: 'gutter', type: 'number | string', desc: 'componentProps.rate.gutter' },
  { name: 'color', type: 'string', desc: 'componentProps.rate.color' },
  { name: 'voidColor', type: 'string', desc: 'componentProps.rate.voidColor' },
  { name: 'allowHalf', type: 'boolean', desc: 'componentProps.rate.allowHalf' },
  { name: 'clearable', type: 'boolean', desc: 'componentProps.rate.clearable' },
  { name: 'readonly', type: 'boolean', desc: 'componentProps.rate.readonly' },
  { name: 'disabled', type: 'boolean', desc: 'componentProps.rate.disabled' },
  { name: 'icon', type: 'string', desc: 'componentProps.rate.icon' },
  { name: 'voidIcon', type: 'string', desc: 'componentProps.rate.voidIcon' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-direction': 'column' as const, gap: '12px', 'align-items': 'center' as const },
};

export const RateMobile: Component<RateMobileProps> = (props) => {
  const t = useT();
  const [val, setVal] = createSignal(3);
  const [halfVal, setHalfVal] = createSignal(3.5);

  return (
    <MobilePreview title="Rate 评分" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.rateBasic')}</div>
        <div style={CARD.desc}>{t('demo.rateBasicDesc')}</div>
        <div style={CARD.body}>
          <Rate value={val()} onChange={setVal} />
          <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-desc, #6b7280)' }}>Current: {val()} pts</span>
        </div>
      </div>

      {/* 半选 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.halfSelect')}</div>
        <div style={CARD.desc}>{t('demo.halfSelectDesc')}</div>
        <div style={CARD.body}>
          <Rate value={halfVal()} onChange={setHalfVal} allowHalf />
          <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-desc, #6b7280)' }}>Current: {halfVal()} pts</span>
        </div>
      </div>

      {/* 只读 & 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.readonlyDisabled')}</div>
        <div style={CARD.desc}>{t('demo.readonlyDisabledDesc')}</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
            <Rate value={4} readonly />
            <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Read-only (4 pts)</span>
          </div>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
            <Rate value={2} disabled />
            <span style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Disabled (2 pts)</span>
          </div>
        </div>
      </div>

      {/* 自定义 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customIconCount')}</div>
        <div style={CARD.desc}>{t('demo.customIconDesc')}</div>
        <div style={CARD.body}>
          <Rate value={4} count={3} size={32} color="#ef4444" icon="heart" voidIcon="heart" readonly />
          <Rate value={3} count={10} size={16} color="#f59e0b" readonly />
        </div>
      </div>
    </MobilePreview>
  );
};
