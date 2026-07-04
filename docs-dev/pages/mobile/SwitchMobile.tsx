import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface SwitchMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Switch } from '../../../src/components/Switch';

const propsData = [
  { name: 'checked (value)', type: 'boolean', desc: '是否打开（受控）' },
  { name: 'defaultChecked', type: 'boolean', desc: '默认打开（非受控）' },
  { name: 'onChange', type: '(checked: boolean) => void', desc: '状态变化回调' },
  { name: 'disabled', type: 'boolean', desc: '禁用' },
  { name: 'size', type: 'string | number', desc: '尺寸，默认 28' },
  { name: 'activeColor', type: 'string', desc: '打开时的背景色' },
  { name: 'inactiveColor', type: 'string', desc: '关闭时的背景色' },
  { name: 'activeText', type: 'string', desc: '打开时显示的文案' },
  { name: 'inactiveText', type: 'string', desc: '关闭时显示的文案' },
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
    <MobilePreview title="Switch 开关" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础开关</div>
        <div style={CARD.desc}>受控 / 非受控 / 默认值</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Switch checked={val1()} onChange={setVal1} />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>受控: {val1() ? '开' : '关'}</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Switch defaultChecked />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>默认开</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Switch checked={val2()} onChange={setVal2} />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>默认关</span>
          </div>
        </div>
      </div>

      {/* 颜色 & 文字 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义颜色 & 文字</div>
        <div style={CARD.desc}>activeColor / inactiveColor / activeText / inactiveText</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Switch defaultChecked activeColor="#22c55e" />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>绿色</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Switch defaultChecked activeText="开" inactiveText="关" />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>带文字</span>
          </div>
        </div>
      </div>

      {/* 尺寸 & 禁用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>尺寸 & 禁用</div>
        <div style={CARD.desc}>size 控制开关大小 / disabled 禁用</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Switch defaultChecked size={20} />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>20px</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Switch defaultChecked size={28} />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>28px</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Switch defaultChecked size={36} />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>36px</span>
          </div>
          <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '8px' }}>
            <Switch defaultChecked disabled />
            <span style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>禁用</span>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
