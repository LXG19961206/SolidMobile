import { createSignal, For, type Component } from 'solid-js';
import { Icon } from '../../../../src/components/Icon';
import { Button } from '../../../../src/components/Button';
import type { IconName, IconVariant } from '../../../../src/components/Icon/types';
import { useT } from '../../../doc-i18n';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import styles from './IconDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'name', type: 'IconName', default: '—', required: true, desc: '图标名称。' },
  { name: 'variant', type: "'line' | 'fill'", default: "'line'", required: false, desc: '线性 / 填充风格。' },
  { name: 'size', type: 'string | number', default: "'1em'", required: false, desc: '尺寸。数字自动补 px。' },
  { name: 'color', type: 'string', default: '—', required: false, desc: '图标颜色。' },
  { name: 'class', type: 'string', default: '—', required: false, desc: '自定义 CSS class。' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: '内联样式。' },
  { name: 'id', type: 'string', default: '—', required: false, desc: 'DOM id。' },
  { name: 'aria-label', type: 'string', default: '—', required: false, desc: '无障碍标签，功能性图标需设置。' },
  { name: 'onClick', type: '(e: MouseEvent) => void', default: '—', required: false, desc: '点击事件。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'usage', title: '使用方式' },
  { id: 'gallery', title: '图标库' },
];

interface Category {
  title: string;
  icons: IconName[];
}

const CATEGORIES: Category[] = [
  {
    title: '🧭 导航 Navigation',
    icons: [
      'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
      'arrow-up-down', 'arrow-left-right', 'arrow-go-back', 'arrow-go-forward',
      'arrow-drop-down', 'arrow-drop-up', 'corner-up-left', 'corner-down-right',
      'home', 'home-2', 'menu', 'more', 'more-2',
    ],
  },
  {
    title: '⚡ 操作 Actions',
    icons: [
      'add', 'close', 'subtract', 'edit', 'delete-bin', 'search',
      'share', 'download', 'upload', 'refresh',
      'external-link', 'zoom-in', 'zoom-out', 'fullscreen', 'fullscreen-exit',
    ],
  },
  {
    title: '✅ 状态反馈 Status',
    icons: [
      'check', 'close-circle', 'error-warning', 'information',
      'question', 'indeterminate-circle',
      'checkbox-circle', 'checkbox-blank-circle', 'radio-button',
      'star', 'heart',
    ],
  },
  {
    title: '👤 用户 & 通讯 User & Communication',
    icons: [
      'user', 'user-3', 'group', 'team',
      'account-circle', 'account-box', 'user-add', 'user-follow',
      'chat', 'message', 'mail', 'phone', 'at',
      'notification', 'notification-off', 'send',
    ],
  },
  {
    title: '📁 文件 & 编辑 Document & Editor',
    icons: [
      'file', 'folder', 'folder-open', 'file-text', 'file-copy',
      'file-download', 'file-upload', 'folder-add', 'clipboard', 'todo',
      'draft', 'article', 'attachment',
      'bold', 'italic', 'underline', 'strikethrough',
      'link', 'link-unlink', 'list-check', 'list-ordered', 'code',
    ],
  },
  {
    title: '📅 时间 & 数据 Time & Analytics',
    icons: [
      'calendar', 'calendar-2', 'time', 'history', 'dashboard',
      'bar-chart', 'line-chart', 'pie-chart',
    ],
  },
  {
    title: '💼 商务 & 金融 Business & Finance',
    icons: [
      'money', 'shopping-cart', 'shopping-bag', 'bank-card', 'wallet',
      'coupon', 'safe', 'bookmark', 'price-tag', 'percent',
      'exchange', 'filter', 'sort',
    ],
  },
  {
    title: '🎮 媒体 & 设备 Media & Device',
    icons: [
      'play', 'pause', 'stop', 'volume-up', 'volume-mute',
      'camera', 'image', 'video', 'music', 'headphone',
      'computer', 'tablet', 'printer', 'keyboard', 'server',
    ],
  },
  {
    title: '🌐 通用 General',
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
        <h1 class={styles.h1}>Icon 图标</h1>
        <p class={styles.intro}>
          {t(\'componentIntro.IconIntro\')}
        </p>

        {/* ── Props ── */}
        <h2 id="props" class={styles.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        {/* ═══ Usage Examples ═══ */}
        <h2 id="usage" class={styles.h2}>{t('section.usage')}</h2>

        <DemoBlock
          title={t('demo.iconTreeShake')}
          desc="从 solid-component/icons 导入单个图标组件，打包工具自动 tree-shake，只打包实际使用的图标。"
          code={`import { Icon } from 'solid-component';\n\n<Icon name="search" size={24} />\n<Icon name="heart" variant="fill" color="#ff4d4f" size={24} />\n<Icon name="star" variant="fill" color="#f59e0b" size={24} />`}
        >
          <div class={styles.demoArea}>
            <Icon name="search" size={24} />
            <Icon name="heart" variant="fill" color="#ff4d4f" size={24} />
            <Icon name="star" variant="fill" color="#f59e0b" size={24} />
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.iconDynamic')}
          desc="使用 &lt;Icon name=&quot;...&quot; /&gt; 通过 name 属性动态指定图标，适合图标名来自变量、配置或数据库的场景。"
          code={`import { Icon } from 'solid-component';\n\n<Icon name="check" color="#22c55e" />\n<Icon name="close" color="#ef4444" />\n<Icon name="information" color="#3b82f6" />`}
        >
          <div class={styles.demoArea}>
            <Icon name="check" color="#22c55e" size={24} />
            <Icon name="close" color="#ef4444" size={24} />
            <Icon name="information" color="#3b82f6" size={24} />
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.iconLineFill')}
          desc="variant='line'（默认）为线性空心风格，variant='fill' 为填充实心风格。"
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
          desc="size 支持数字（自动补 px）或任意 CSS 单位字符串。"
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
          desc="color 属性设置图标颜色，不设置时继承父级文字颜色（currentColor）。"
          code={`<Icon name="star" variant="fill" color="#1677ff" />\n<Icon name="star" variant="fill" color="#22c55e" />\n<Icon name="star" variant="fill" color="#f59e0b" />\n<Icon name="star" variant="fill" color="#ef4444" />`}
        >
          <div class={styles.demoArea}>
            <Icon name="star" variant="fill" size={28} color="#1677ff" />
            <Icon name="star" variant="fill" size={28} color="#22c55e" />
            <Icon name="star" variant="fill" size={28} color="#f59e0b" />
            <Icon name="star" variant="fill" size={28} color="#ef4444" />
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.iconWithButton')}
          desc={`Button 的 icon 属性支持字符串形式，自动调用内置 Icon。`}
          code={`<Button icon="add" text="新建" />\n<Button icon="download" text="下载" variant="outline" />\n<Button icon="delete-bin" text="删除" type="danger" variant="outline" />\n{/* 也可以传 JSX: icon={<MyIcon />} */}`}
        >
          <div class={styles.demoArea}>
            <Button icon="add" text="新建" />
            <Button icon="download" text="下载" variant="outline" />
            <Button icon="delete-bin" text="删除" type="danger" variant="outline" />
          </div>
        </DemoBlock>

        <DemoBlock
          title={t('demo.iconClickable')}
          desc="设置 aria-label 和 style 将图标变为可交互按钮，配合 cursor:pointer 提示可点击。"
          code={`<Icon name="close" aria-label="关闭" size={24} style={{ cursor: 'pointer' }} />\n<Icon name="heart" variant="fill" aria-label="收藏" size={24} color="#ff4d4f" style={{ cursor: 'pointer' }} />`}
        >
          <div class={styles.demoArea}>
            <Icon name="close" aria-label="关闭" size={24} style={{ cursor: 'pointer' }} />
            <Icon name="heart" variant="fill" aria-label="收藏" size={24} color="#ff4d4f" style={{ cursor: 'pointer' }} />
            <Icon name="share" aria-label="分享" size={24} style={{ cursor: 'pointer' }} />
            <Icon name="refresh" aria-label="刷新" size={24} style={{ cursor: 'pointer' }} />
          </div>
        </DemoBlock>

        {/* ═══ Icon Gallery ═══ */}
        <h2 id="gallery" class={styles.h2}>{t('section.iconLibrary')}</h2>
        <p class={styles.intro} style="margin-bottom:1rem">
          共 129 个图标，点击即可复制 JSX 代码。支持搜索和线/填充风格切换。
        </p>

        {/* Controls */}
        <div class={styles.controls}>
          <input
            class={styles.searchInput}
            type="text"
            placeholder="搜索图标名称..."
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />

          <div class={styles.variantToggle}>
            <button
              class={styles.variantBtn}
              classList={{ [styles.variantBtnActive!]: variant() === 'line' }}
              onClick={() => setVariant('line')}
            >
              线性 Line
            </button>
            <button
              class={styles.variantBtn}
              classList={{ [styles.variantBtnActive!]: variant() === 'fill' }}
              onClick={() => setVariant('fill')}
            >
              填充 Fill
            </button>
          </div>

          <div class={styles.sizeSlider}>
            <span>尺寸</span>
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
            已复制: &lt;Icon name="{copiedName()}" /&gt;
          </div>
        )}
      </div>
    </DocLayout>
  );
};
