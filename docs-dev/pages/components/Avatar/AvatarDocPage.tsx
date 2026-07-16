import zhCN from '../../../i18n/avatar/zh-CN';
import enUS from '../../../i18n/avatar/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { Avatar } from '../../../../src/components/Avatar';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow, TOCItem } from '../../../doc-utils';
import css from './AvatarDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'src', type: 'string', default: '—', required: false, desc: 'componentProps.avatar.src' },
  { name: 'alt', type: 'string', default: '—', required: false, desc: 'componentProps.avatar.alt' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", default: "'md'", required: false, desc: 'componentProps.avatar.size' },
  { name: 'round', type: 'boolean', default: 'true', required: false, desc: 'componentProps.avatar.round' },
  { name: 'square', type: 'boolean | number', default: 'false', required: false, desc: 'componentProps.avatar.square' },
  { name: 'icon', type: 'IconName', default: '—', required: false, desc: 'componentProps.avatar.icon' },
  { name: 'text', type: 'string', default: '—', required: false, desc: 'componentProps.avatar.text' },
  { name: 'color', type: 'string', default: '—', required: false, desc: 'componentProps.avatar.color' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: 'Props' },
  { id: 'basic', title: 'Basic Usage' },
  { id: 'fallback', title: 'Fallback Strategy' },
  { id: 'shape', title: 'Shape & Size' },
];

const SRC = 'https://picsum.photos/seed/avatar/100/100';

export const AvatarDocPage = () => {
  const t = useT();
  return (
  <DocLayout>

    <div class={css.page}>
      <h1 class={css.h1}>Avatar</h1>
      <p class={css.intro}>
        {t('componentIntro.AvatarIntro')}
      </p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="basic" class={css.h2}>{t('demo.basic')}</h2>
      <DemoBlock title={t('demo.avatarImage')} code={'<Avatar src="user.jpg" size="lg" />\n<Avatar src="user.jpg" size="md" />\n<Avatar src="user.jpg" size="sm" />\n<Avatar src="user.jpg" size="xs" />'}>
        <div class={css.row}>
          <Avatar src={SRC} size="lg" />
          <Avatar src={SRC} size="md" />
          <Avatar src={SRC} size="sm" />
          <Avatar src={SRC} size="xs" />
        </div>
      </DemoBlock>

      <h2 id="fallback" class={css.h2}>{t('section.fallback')}</h2>
      <DemoBlock title={t('demo.avatarIcon')} desc={t('demoDesc.avatar_icon_fallback')} code={'<Avatar icon="user" size="md" color="#1677ff" />\n<Avatar icon="star" size="md" color="#f59e0b" />\n<Avatar icon="settings" size="md" color="#22c55e" />'}>
        <div class={css.row}>
          <Avatar icon="user" size="md" color="var(--sc-color-primary, #1677ff)" />
          <Avatar icon="star" size="md" color="#f59e0b" />
          <Avatar icon="settings" size="md" color="#22c55e" />
        </div>
      </DemoBlock>
      <DemoBlock title={t('demo.avatarText')} desc={t('demoDesc.avatar_text_fallback')} code={'<Avatar text="Alice" color="#f59e0b" />\n<Avatar text="Bob" color="#22c55e" />\n<Avatar text="Carol" color="#ef4444" />\n<Avatar text="D" color="#8b5cf6" size="xl" />'}>
        <div class={css.row}>
          <Avatar text="Alice" color="#f59e0b" />
          <Avatar text="Bob" color="#22c55e" />
          <Avatar text="Carol" color="#ef4444" />
          <Avatar text="D" color="#8b5cf6" size="xl" />
        </div>
      </DemoBlock>

      <h2 id="shape" class={css.h2}>{t('section.shapeSize')}</h2>
      <DemoBlock title={t('demo.avatarSquare')} desc={t('demoDesc.avatar_square')} code={'<Avatar src="./logo.png" square size="xl" />\n<Avatar text="B" square color="#1677ff" size="lg" />\n<Avatar icon="computer" square size="md" color="#8b5cf6" />'}>
        <div class={css.row}>
          <Avatar src={SRC} square size="xl" />
          <Avatar text="B" square color="var(--sc-color-primary, #1677ff)" size="lg" />
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
