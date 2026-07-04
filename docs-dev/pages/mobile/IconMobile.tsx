import { createSignal, For, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface IconMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Icon } from '../../../src/components/Icon';
import type { IconName, IconVariant } from '../../../src/components/Icon/types';

const propsData = [
  { name: 'name', type: 'IconName', desc: 'componentProps.icon.name' },
  { name: 'variant', type: "'line' | 'fill'", desc: 'componentProps.icon.variant' },
  { name: 'size', type: 'string | number', desc: 'componentProps.icon.size' },
  { name: 'color', type: 'string', desc: 'componentProps.icon.color' },
  { name: 'aria-label', type: 'string', desc: 'componentProps.icon.aria-label' },
  { name: 'onClick', type: '(e: MouseEvent) => void', desc: 'componentProps.icon.onClick' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const },
};

const QUICK_ICONS: IconName[] = [
  'search', 'heart', 'star', 'check', 'close', 'information', 'edit', 'delete-bin',
  'add', 'arrow-left', 'arrow-right', 'menu', 'home', 'settings', 'user',
  'download', 'upload', 'share', 'refresh', 'calendar', 'notification', 'lock',
];

export const IconMobile: Component<IconMobileProps> = (props) => {
  const t = useT();
  const [variant, setVariant] = createSignal<IconVariant>('line');
  const [search, setSearch] = createSignal('');
  const [copiedName, setCopiedName] = createSignal('');

  const filteredIcons = () => {
    const q = search().toLowerCase();
    if (!q) return QUICK_ICONS;
    return QUICK_ICONS.filter(n => n.toLowerCase().includes(q));
  };

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<Icon name="${name}" />`);
    setCopiedName(name);
    setTimeout(() => setCopiedName(''), 1500);
  };

  return (
    <MobilePreview title="Icon 图标" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础使用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础使用</div>
        <div style={CARD.desc}>通过 name 属性指定图标，variant 切换线/填充风格</div>
        <div style={CARD.body}>
          <Icon name="search" size={24} />
          <Icon name="heart" variant="fill" color="#ff4d4f" size={24} />
          <Icon name="star" variant="fill" color="#f59e0b" size={24} />
          <Icon name="check" color="#22c55e" size={24} />
          <Icon name="close" color="#ef4444" size={24} />
          <Icon name="information" color="#3b82f6" size={24} />
        </div>
      </div>

      {/* Line vs Fill */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>Line vs Fill</div>
        <div style={CARD.desc}>同图标两种风格对比</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
            <Icon name="home" variant="line" size={32} />
            <span style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>line</span>
          </div>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
            <Icon name="home" variant="fill" size={32} />
            <span style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>fill</span>
          </div>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
            <Icon name="heart" variant="line" size={32} />
            <span style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>line</span>
          </div>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px' }}>
            <Icon name="heart" variant="fill" size={32} color="#ff4d4f" />
            <span style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>fill</span>
          </div>
        </div>
      </div>

      {/* 尺寸 & 颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>尺寸 & 颜色</div>
        <div style={CARD.desc}>size 支持数字（自动补px）或任意 CSS 单位；color 设置颜色</div>
        <div style={CARD.body}>
          <Icon name="star" variant="fill" color="#f59e0b" size={16} />
          <Icon name="star" variant="fill" color="#f59e0b" size={24} />
          <Icon name="star" variant="fill" color="#f59e0b" size={32} />
          <Icon name="star" variant="fill" color="#f59e0b" size="2.5rem" />
        </div>
        <div style={{ ...CARD.body, 'padding-top': 0 }}>
          <Icon name="star" variant="fill" size={28} color="#1677ff" />
          <Icon name="star" variant="fill" size={28} color="#22c55e" />
          <Icon name="star" variant="fill" size={28} color="#f59e0b" />
          <Icon name="star" variant="fill" size={28} color="#ef4444" />
          <Icon name="star" variant="fill" size={28} color="#6366f1" />
        </div>
      </div>

      {/* 图标库 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>图标库（部分预览）</div>
        <div style={CARD.desc}>点击复制 JSX 代码。共 129 个图标，此处展示常用图标。</div>
        <div style={{ padding: '0 16px 12px', display: 'flex' as const, gap: '8px' }}>
          <button
            style={{ padding: '6px 12px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '6px', background: variant() === 'line' ? '#1677ff' : '#fff', color: variant() === 'line' ? '#fff' : '#374151', cursor: 'pointer', 'font-size': '0.8rem' }}
            onClick={() => setVariant('line')}
          >线性</button>
          <button
            style={{ padding: '6px 12px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '6px', background: variant() === 'fill' ? '#1677ff' : '#fff', color: variant() === 'fill' ? '#fff' : '#374151', cursor: 'pointer', 'font-size': '0.8rem' }}
            onClick={() => setVariant('fill')}
          >填充</button>
          <input
            style={{ flex: 1, padding: '6px 12px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '6px', 'font-size': '0.8rem' }}
            placeholder="搜索图标..."
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
        </div>
        <div style={{ padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px' }}>
          <For each={filteredIcons()}>
            {(name) => (
              <div
                style={{ display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '4px', padding: '8px', border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px', cursor: 'pointer', 'min-width': '56px' }}
                onClick={() => handleCopy(name)}
              >
                <Icon name={name} variant={variant()} size={22} />
                <span style={{ 'font-size': '0.6rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'max-width': '56px', overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }}>{name}</span>
              </div>
            )}
          </For>
        </div>
      </div>
    </MobilePreview>
  );
};
