import { Avatar } from '../../../../src/components/Avatar';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import css from './AvatarDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'src', type: 'string', default: '—', required: false, desc: '头像图片地址。' },
  { name: 'alt', type: 'string', default: '—', required: false, desc: '替代文本（无障碍）。' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", default: "'md'", required: false, desc: '尺寸，预设或自定义 px。' },
  { name: 'round', type: 'boolean', default: 'true', required: false, desc: '完全圆形（与 square 互斥）。' },
  { name: 'square', type: 'boolean | number', default: 'false', required: false, desc: '方形。传数字控制圆角大小。' },
  { name: 'icon', type: 'IconName', default: '—', required: false, desc: '无 src 或加载失败时显示的图标。' },
  { name: 'text', type: 'string', default: '—', required: false, desc: '无 src 且无 icon 时的文字（取首字符）。' },
  { name: 'color', type: 'string', default: '—', required: false, desc: '自定义背景色。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'basic', title: '基础用法' },
  { id: 'fallback', title: '降级策略' },
  { id: 'shape', title: '形状 & 尺寸' },
];

const SRC = 'https://picsum.photos/seed/avatar/100/100';

export const AvatarDocPage = () => {
  const t = useT();
  return (
  <DocLayout>

    <div class={css.page}>
      <h1 class={css.h1}>Avatar 头像</h1>
      <p class={css.intro}>
        用于用户、联系人等场景。优先级：src（图片）→ icon（图标）→ text（首字符）。
        src 加载失败自动降级。
      </p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="basic" class={css.h2}>基础用法</h2>
      <DemoBlock title={t('demo.avatarImage')} code={'<Avatar src="user.jpg" size="lg" />\n<Avatar src="user.jpg" size="md" />\n<Avatar src="user.jpg" size="sm" />\n<Avatar src="user.jpg" size="xs" />'}>
        <div class={css.row}>
          <Avatar src={SRC} size="lg" />
          <Avatar src={SRC} size="md" />
          <Avatar src={SRC} size="sm" />
          <Avatar src={SRC} size="xs" />
        </div>
      </DemoBlock>

      <h2 id="fallback" class={css.h2}>降级策略</h2>
      <DemoBlock title={t('demo.avatarIcon')} desc="不传 src 时显示 icon 图标。" code={'<Avatar icon="user" size="md" color="#1677ff" />\n<Avatar icon="star" size="md" color="#f59e0b" />\n<Avatar icon="settings" size="md" color="#22c55e" />'}>
        <div class={css.row}>
          <Avatar icon="user" size="md" color="#1677ff" />
          <Avatar icon="star" size="md" color="#f59e0b" />
          <Avatar icon="settings" size="md" color="#22c55e" />
        </div>
      </DemoBlock>
      <DemoBlock title={t('demo.avatarText')} desc="不传 src 和 icon 时，取 text 的第一个字符。" code={'<Avatar text="张三" color="#f59e0b" />\n<Avatar text="李四" color="#22c55e" />\n<Avatar text="王五" color="#ef4444" />\n<Avatar text="赵" color="#8b5cf6" size="xl" />'}>
        <div class={css.row}>
          <Avatar text="张三" color="#f59e0b" />
          <Avatar text="李四" color="#22c55e" />
          <Avatar text="王五" color="#ef4444" />
          <Avatar text="赵" color="#8b5cf6" size="xl" />
        </div>
      </DemoBlock>

      <h2 id="shape" class={css.h2}>形状 & 尺寸</h2>
      <DemoBlock title={t('demo.avatarSquare')} desc="square 替代 round，适合品牌 logo。" code={'<Avatar src="./logo.png" square size="xl" />\n<Avatar text="品" square color="#1677ff" size="lg" />\n<Avatar icon="computer" square size="md" color="#8b5cf6" />'}>
        <div class={css.row}>
          <Avatar src={SRC} square size="xl" />
          <Avatar text="品" square color="#1677ff" size="lg" />
          <Avatar icon="computer" square size="md" color="#8b5cf6" />
        </div>
      </DemoBlock>
      <DemoBlock title={t('demo.avatarSize')} desc="xs(24) / sm(32) / md(40) / lg(48) / xl(64)" code={'<Avatar text="A" size="xs" />\n<Avatar text="A" size="sm" />\n<Avatar text="A" size="md" />\n<Avatar text="A" size="lg" />\n<Avatar text="A" size="xl" />'}>
        <div class={css.row}>
          <Avatar text="A" size="xs" />
          <Avatar text="A" size="sm" />
          <Avatar text="A" size="md" />
          <Avatar text="A" size="lg" />
          <Avatar text="A" size="xl" />
        </div>
      </DemoBlock>
    </div>
  </DocLayout>
);
};
