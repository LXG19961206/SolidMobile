import { createSignal, For, Show } from 'solid-js';
import { useT } from '../../doc-i18n';
import { Icon } from '../../../src/components/Icon';
import type { IconName, IconVariant } from '../../../src/components/Icon/types';

interface Category {
  title: string;
  icons: IconName[];
}

const CATEGORIES: Category[] = [
  { title: '🧭 Navigation', icons: ['arrow-left','arrow-right','arrow-up','arrow-down','arrow-up-down','arrow-left-right','arrow-go-back','arrow-go-forward','arrow-drop-down','arrow-drop-up','corner-up-left','corner-down-right','home','home-2','menu','more','more-2'] },
  { title: '⚡ Actions', icons: ['add','close','subtract','edit','delete-bin','search','share','download','upload','refresh','external-link','zoom-in','zoom-out','fullscreen','fullscreen-exit'] },
  { title: '✅ Status', icons: ['check','close-circle','error-warning','information','question','indeterminate-circle','checkbox-circle','checkbox-blank-circle','radio-button','star','heart'] },
  { title: '👤 User & Communication', icons: ['user','user-3','group','team','account-circle','account-box','user-add','user-follow','chat','message','mail','phone','at','notification','notification-off','send'] },
  { title: '📁 Document & Editor', icons: ['file','folder','folder-open','file-text','file-copy','file-download','file-upload','folder-add','clipboard','todo','draft','article','attachment','bold','italic','underline','strikethrough','link','link-unlink','list-check','list-ordered','code'] },
  { title: '📅 Time & Analytics', icons: ['calendar','calendar-2','time','history','dashboard','bar-chart','line-chart','pie-chart'] },
  { title: '💼 Business & Finance', icons: ['money','shopping-cart','shopping-bag','bank-card','wallet','coupon','safe','bookmark','price-tag','percent','exchange','filter','sort'] },
  { title: '🎮 Media & Device', icons: ['play','pause','stop','volume-up','volume-mute','camera','image','video','music','headphone','computer','tablet','printer','keyboard','server'] },
  { title: '🌐 General', icons: ['earth','map-pin','compass','sun','moon','cloud','settings','settings-3','lock','unlock','shield','palette'] },
];

const ALL_ICONS = CATEGORIES.flatMap(c => c.icons);

export function IconLibrary() {
  const t = useT();
  const [search, setSearch] = createSignal('');
  const [variant, setVariant] = createSignal<IconVariant>('line');
  const [size, setSize] = createSignal(24);
  const [copiedName, setCopiedName] = createSignal('');

  const filtered = () => {
    const q = search().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES
      .map(c => ({ ...c, icons: c.icons.filter(n => n.includes(q)) }))
      .filter(c => c.icons.length > 0);
  };

  const handleCopy = (name: string) => {
    const code = `<Icon name="${name}"${variant() === 'fill' ? ' variant="fill"' : ''} />`;
    navigator.clipboard.writeText(code);
    setCopiedName(name);
    setTimeout(() => setCopiedName(''), 1500);
  };

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', 'flex-wrap': 'wrap', 'align-items': 'center', 'margin-bottom': '16px', padding: '12px', background: 'var(--sc-color-background-secondary, #f5f5f5)', 'border-radius': '8px' }}>
        <input
          type="text" placeholder={t("icon.library.search")} value={search()}
          onInput={e => setSearch(e.currentTarget.value)}
          style={{ flex: 1, 'min-width': '120px', padding: '6px 10px', border: '1px solid #e5e7eb', 'border-radius': '6px', 'font-size': '0.85rem', outline: 'none', background: '#fff' }}
        />
        <div style={{ display: 'flex', gap: '4px', background: '#fff', 'border-radius': '6px', padding: '2px', border: '1px solid #e5e7eb' }}>
          <button onClick={() => setVariant('line')} style={{
            padding: '4px 12px', border: 'none', 'border-radius': '4px', cursor: 'pointer', 'font-size': '0.8rem',
            background: variant() === 'line' ? '#1677ff' : 'transparent', color: variant() === 'line' ? '#fff' : '#6b7280',
          }}>{t("icon.library.line")}</button>
          <button onClick={() => setVariant('fill')} style={{
            padding: '4px 12px', border: 'none', 'border-radius': '4px', cursor: 'pointer', 'font-size': '0.8rem',
            background: variant() === 'fill' ? '#1677ff' : 'transparent', color: variant() === 'fill' ? '#fff' : '#6b7280',
          }}>{t("icon.library.fill")}</button>
        </div>
        <div style={{ display: 'flex', gap: '8px', 'align-items': 'center', 'font-size': '0.8rem', color: '#6b7280' }}>
          <span>{t("icon.library.size")}</span>
          <input type="range" min="16" max="48" value={size()} onInput={e => setSize(Number(e.currentTarget.value))} style={{ width: '80px' }} />
          <span>{size()}px</span>
        </div>
        <span style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>{filtered().reduce((s, c) => s + c.icons.length, 0)} / {ALL_ICONS.length}</span>
      </div>

      {/* Icon grid */}
      <For each={filtered()}>
        {category => (
          <div style={{ 'margin-bottom': '20px' }}>
            <h3 style={{ 'font-size': '0.9rem', 'font-weight': 600, margin: '0 0 8px', color: 'var(--sc-color-text, #374151)' }}>
              {category.title} ({category.icons.length})
            </h3>
            <div style={{ display: 'grid', 'grid-template-columns': 'repeat(auto-fill, minmax(72px, 1fr))', gap: '4px' }}>
              <For each={category.icons}>
                {name => (
                  <div
                    onClick={() => handleCopy(name)}
                    title={`<Icon name="${name}"${variant() === 'fill' ? ' variant="fill"' : ''} />`}
                    style={{
                      display: 'flex', 'flex-direction': 'column', 'align-items': 'center', gap: '4px',
                      padding: '8px 4px', cursor: 'pointer', 'border-radius': '6px',
                      transition: 'background 0.15s', background: copiedName() === name ? '#e0f2fe' : 'transparent',
                    }}
                    onMouseEnter={e => !copiedName() && (e.currentTarget.style.background = '#f5f5f5')}
                    onMouseLeave={e => !copiedName() && (e.currentTarget.style.background = 'transparent')}
                  >
                    <Icon name={name as IconName} variant={variant()} size={size()} />
                    <span style={{ 'font-size': '0.6rem', color: '#9ca3af', 'text-align': 'center', 'line-height': 1.2, 'word-break': 'break-all' }}>{name}</span>
                  </div>
                )}
              </For>
            </div>
          </div>
        )}
      </For>

      {/* Toast */}
      <Show when={copiedName()}>
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          padding: '8px 16px', background: '#1f2937', color: '#fff', 'border-radius': '8px',
          'font-size': '0.85rem', 'z-index': 1000,
        }}>
          {t("icon.library.copied")}: &lt;Icon name="{copiedName()}" /&gt;
        </div>
      </Show>
    </div>
  );
}
