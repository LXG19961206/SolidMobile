import { createSignal, For, type Component } from 'solid-js';


import { useT } from '../../../doc-i18n';
import { Icon } from '../../../../src/components/Icon';
import { Button } from '../../../../src/components/Button';
import type { IconName, IconVariant } from '../../../../src/components/Icon/types';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import styles from './IconDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'name', type: 'IconName', default: '—', required: true, desc: 'componentProps.icon.name' },
  { name: 'variant', type: "'line' | 'fill'", default: "'line'", required: false, desc: 'componentProps.icon.variant' },
  { name: 'size', type: 'string | number', default: "'1em'", required: false, desc: 'componentProps.icon.size' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.icon.color' },
  { name: 'class', type: 'string', default: '—', required: false, desc: 'componentProps.icon.class' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: 'componentProps.icon.style' },
  { name: 'id', type: 'string', default: '—', required: false, desc: 'componentProps.icon.id' },
  { name: 'aria-label', type: 'string', default: '—', required: false, desc: 'componentProps.icon.aria-label' },
  { name: 'onClick', type: '(e: MouseEvent) => void', default: '—', required: false, desc: 'componentProps.icon.onClick' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'usage', title: 'Usage' },
  { id: 'gallery', title: 'Icon Library' },
];

interface Category {
  title: string;
  icons: IconName[];
}

const CATEGORIES: Category[] = [
  {
    title: '🧭 Navigation',
    icons: [
      'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
      'arrow-up-down', 'arrow-left-right', 'arrow-go-back', 'arrow-go-forward',
      'arrow-drop-down', 'arrow-drop-up', 'corner-up-left', 'corner-down-right',
      'home', 'home-2', 'menu', 'more', 'more-2',
    ],
  },
  {
    title: '⚡ Actions',
    icons: [
      'add', 'close', 'subtract', 'edit', 'delete-bin', 'search',
      'share', 'download', 'upload', 'refresh',
      'external-link', 'zoom-in', 'zoom-out', 'fullscreen', 'fullscreen-exit',
    ],
  },
  {
    title: '✅ Status',
    icons: [
      'check', 'close-circle', 'error-warning', 'information',
      'question', 'indeterminate-circle',
      'checkbox-circle', 'checkbox-blank-circle', 'radio-button',
      'star', 'heart',
    ],
  },
  {
    title: '👤 User & Communication',
    icons: [
      'user', 'user-3', 'group', 'team',
      'account-circle', 'account-box', 'user-add', 'user-follow',
      'chat', 'message', 'mail', 'phone', 'at',
      'notification', 'notification-off', 'send',
    ],
  },
  {
    title: '📁 Document & Editor',
    icons: [
      'file', 'folder', 'folder-open', 'file-text', 'file-copy',
      'file-download', 'file-upload', 'folder-add', 'clipboard', 'todo',
      'draft', 'article', 'attachment',
      'bold', 'italic', 'underline', 'strikethrough',
      'link', 'link-unlink', 'list-check', 'list-ordered', 'code',
    ],
  },
  {
    title: '📅 Time & Analytics',
    icons: [
      'calendar', 'calendar-2', 'time', 'history', 'dashboard',
      'bar-chart', 'line-chart', 'pie-chart',
    ],
  },
  {
    title: '💼 Business & Finance',
    icons: [
      'money', 'shopping-cart', 'shopping-bag', 'bank-card', 'wallet',
      'coupon', 'safe', 'bookmark', 'price-tag', 'percent',
      'exchange', 'filter', 'sort',
    ],
  },
  {
    title: '🎮 Media & Device',
    icons: [
      'play', 'pause', 'stop', 'volume-up', 'volume-mute',
      'camera', 'image', 'video', 'music', 'headphone',
      'computer', 'tablet', 'printer', 'keyboard', 'server',
    ],
  },
  {
    title: '🌐 General',
    icons: [
      'earth', 'map-pin', 'compass', 'sun', 'moon', 'cloud',
      'settings', 'settings-3', 'lock', 'unlock', 'shield', 'palette',
    ],
  },
];

export const IconDocPage: Component = () => {
  const t = useT();
  const [search, setSearch] = createSignal('');
  const [variant, setVariant] = createSignal<IconVariant>('line');
  const [size, setSize] = createSignal(24);
  const [copiedName, setCopiedName] = createSignal('');

  const filteredCategories = (): Category[] => {
    const q = search().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES
      .map((c) => ({
        ...c,
        icons: c.icons.filter((n) => n.toLowerCase().includes(q)),
      }))
      .filter((c) => c.icons.length > 0);
  };

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(`<Icon name="${name}"${variant() === 'fill' ? ' variant="fill"' : ''} />`);
    setCopiedName(name);
    setTimeout(() => setCopiedName(''), 1500);
  };

  return (
    <DocLayout>

      <div class={styles.page}>
        <h1 class={styles.h1}>Icon</h1>
        <p class={styles.intro}>
          {t('componentIntro.IconIntro')}
        </p>

        {/* ── Props ── */}
        <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        {/* ═══ Usage Examples ═══ */}
        <h2 id="usage" class={styles.h2}>{t('section.usage')}</h2>

        <DemoBlock
          title={t('demo.iconTreeShake')}
          desc={t('demoDesc.icon_treeshake')}
          code={`import { Icon } from 'solid-mobile';\n\n<Icon name="search" size={24} />\n<Icon name="heart" variant="fill" color="#ff4d4f" size={24} />\n<Icon name="star" variant="fill" color="#f59e0b" size={24} />`}
        >
          <div class={styles.demoArea}>
            <Icon name="search" size={24} />
            <Icon name="heart" variant="fill" color="#ff4d4f" size={24} />
            <Icon name="star" variant="fill" color="#f59e0b" size={24} />
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.iconDynamic')}
          desc={t('demoDesc.使用__lt_icon_name__quot_____quo')}
          code={`import { Icon } from 'solid-mobile';\n\n<Icon name="check" color="#22c55e" />\n<Icon name="close" color="#ef4444" />\n<Icon name="information" color="#3b82f6" />`}
        >
          <div class={styles.demoArea}>
            <Icon name="check" color="#22c55e" size={24} />
            <Icon name="close" color="#ef4444" size={24} />
            <Icon name="information" color="#3b82f6" size={24} />
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.iconLineFill')}
          desc={t('demoDesc.icon_with_button')}
          code={`<Icon name="home" variant="line" size={24} />\n<Icon name="home" variant="fill" size={24} />\n<Icon name="heart" variant="line" size={24} />\n<Icon name="heart" variant="fill" size={24} color="#ff4d4f" />`}
        >
          <div class={styles.demoArea}>
            <Icon name="home" variant="line" size={24} />
            <Icon name="home" variant="fill" size={24} />
            <Icon name="heart" variant="line" size={24} />
            <Icon name="heart" variant="fill" size={24} color="#ff4d4f" />
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.size')}
          desc={t('demoDesc.icon_sizes')}
          code={`<Icon name="star" variant="fill" color="#f59e0b" size={16} />\n<Icon name="star" variant="fill" color="#f59e0b" size={24} />\n<Icon name="star" variant="fill" color="#f59e0b" size={32} />\n<Icon name="star" variant="fill" color="#f59e0b" size="2.5rem" />`}
        >
          <div class={styles.demoArea}>
            <Icon name="star" variant="fill" color="#f59e0b" size={16} />
            <Icon name="star" variant="fill" color="#f59e0b" size={24} />
            <Icon name="star" variant="fill" color="#f59e0b" size={32} />
            <Icon name="star" variant="fill" color="#f59e0b" size="2.5rem" />
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.color')}
          desc={t('demoDesc.icon_color')}
          code={`<Icon name="star" variant="fill" color="#1677ff" />\n<Icon name="star" variant="fill" color="#22c55e" />\n<Icon name="star" variant="fill" color="#f59e0b" />\n<Icon name="star" variant="fill" color="#ef4444" />`}
        >
          <div class={styles.demoArea}>
            <Icon name="star" variant="fill" size={28} color="var(--sc-color-primary, #1677ff)" />
            <Icon name="star" variant="fill" size={28} color="#22c55e" />
            <Icon name="star" variant="fill" size={28} color="#f59e0b" />
            <Icon name="star" variant="fill" size={28} color="#ef4444" />
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.iconWithButton')}
          desc={t('demoDesc.icon_color')}
          code={`<Button icon="add" text="New" />\n<Button icon="download" text="Download" variant="outline" />\n<Button icon="delete-bin" text="Delete" type="danger" variant="outline" />\n{/* 也可以传 JSX: icon={<MyIcon />} */}`}
        >
          <div class={styles.demoArea}>
            <Button icon="add" text="New" />
            <Button icon="download" text="Download" variant="outline" />
            <Button icon="delete-bin" text="Delete" type="danger" variant="outline" />
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.iconClickable')}
          desc={t('demoDesc.icon_clickable')}
          code={`<Icon name="close" aria-label="Close" size={24} style={{ cursor: 'pointer' }} />\n<Icon name="heart" variant="fill" aria-label="Favorite" size={24} color="#ff4d4f" style={{ cursor: 'pointer' }} />`}
        >
          <div class={styles.demoArea}>
            <Icon name="close" aria-label="Close" size={24} style={{ cursor: 'pointer' }} />
            <Icon name="heart" variant="fill" aria-label="Favorite" size={24} color="#ff4d4f" style={{ cursor: 'pointer' }} />
            <Icon name="share" aria-label="Share" size={24} style={{ cursor: 'pointer' }} />
            <Icon name="refresh" aria-label="Refresh" size={24} style={{ cursor: 'pointer' }} />
          </div>
        </DemoBlock>

        {/* ═══ Icon Gallery ═══ */}
        <h2 id="gallery" class={styles.h2}>{t('section.iconLibrary')}</h2>
        <p class={styles.intro} style="margin-bottom:1rem">
          129 icons total. Click to copy JSX code. Supports search and line/fill style switching.
        </p>

        {/* Controls */}
        <div class={styles.controls}>
          <input
            class={styles.searchInput}
            type="text"
            placeholder="Search icons..."
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />

          <div class={styles.variantToggle}>
            <button
              class={styles.variantBtn}
              classList={{ [styles.variantBtnActive!]: variant() === 'line' }}
              onClick={() => setVariant('line')}
            >
              Line Style
            </button>
            <button
              class={styles.variantBtn}
              classList={{ [styles.variantBtnActive!]: variant() === 'fill' }}
              onClick={() => setVariant('fill')}
            >
              Fill Style
            </button>
          </div>

          <div class={styles.sizeSlider}>
            <span>Size</span>
            <input
              type="range"
              min="16"
              max="48"
              value={size()}
              onInput={(e) => setSize(Number(e.currentTarget.value))}
            />
            <span>{size()}px</span>
          </div>
        </div>

        {/* Icon grid by category */}
        <For each={filteredCategories()}>
          {(category) => (
            <div class={styles.category}>
              <h3 class={styles.categoryTitle}>
                {category.title} ({category.icons.length})
              </h3>
              <div class={styles.grid}>
                <For each={category.icons}>
                  {(iconName) => (
                    <div
                      class={styles.iconCell}
                      onClick={() => handleCopy(iconName)}
                      title={`<Icon name="${iconName}"${variant() === 'fill' ? ' variant="fill"' : ''} />`}
                    >
                      <Icon name={iconName} variant={variant()} size={size()} />
                      <span class={styles.iconLabel}>{iconName}</span>
                    </div>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>

        {/* Copied toast */}
        {copiedName() && (
          <div class={styles.copiedToast}>
            Copied: &lt;Icon name="{copiedName()}" /&gt;
          </div>
        )}
      </div>
    </DocLayout>
  );
};
