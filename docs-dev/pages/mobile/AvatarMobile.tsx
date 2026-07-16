import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface AvatarMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { useT, loadLocale } from '../../doc-i18n';
loadLocale('avatar');
import { Avatar } from '../../../src/components/Avatar';

const propsData = [
  { name: 'src', type: 'string', desc: 'componentProps.avatar.src' },
  { name: 'alt', type: 'string', desc: 'componentProps.avatar.alt' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", desc: 'componentProps.avatar.size' },
  { name: 'round', type: 'boolean', desc: 'componentProps.avatar.round' },
  { name: 'square', type: 'boolean | number', desc: 'componentProps.avatar.square' },
  { name: 'icon', type: 'IconName', desc: 'componentProps.avatar.icon' },
  { name: 'text', type: 'string', desc: 'componentProps.avatar.text' },
  { name: 'color', type: 'string', desc: 'componentProps.avatar.color' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const },
};

const AVATAR_URL = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix';

export const AvatarMobile: Component<AvatarMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title={t('nav.avatar')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 尺寸 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.avatarSizeTitle')}</div>
        <div style={CARD.desc}>{t('demo.avatarSizeMobileDesc')}</div>
        <div style={CARD.body}>
          <Avatar src={AVATAR_URL} size="xs" />
          <Avatar src={AVATAR_URL} size="sm" />
          <Avatar src={AVATAR_URL} size="md" />
          <Avatar src={AVATAR_URL} size="lg" />
          <Avatar src={AVATAR_URL} size="xl" />
        </div>
      </div>

      {/* 圆形 & 方形 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.avatarRoundSquare')}</div>
        <div style={CARD.desc}>{t('demo.avatarRoundSquareDesc')}</div>
        <div style={CARD.body}>
          <Avatar src={AVATAR_URL} size="lg" round />
          <Avatar src={AVATAR_URL} size="lg" square />
          <Avatar src={AVATAR_URL} size="lg" square={8} />
        </div>
      </div>

      {/* 文字 & 图标头像 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.avatarTextIcon')}</div>
        <div style={CARD.desc}>{t('demo.avatarTextIconDesc')}</div>
        <div style={CARD.body}>
          <Avatar size="lg" text="Tom" color="var(--sc-color-primary, #1677ff)" />
          <Avatar size="lg" text="Kim" color="#22c55e" />
          <Avatar size="lg" text="Wang" color="#f59e0b" />
          <Avatar size="lg" icon="user" color="#6366f1" />
          <Avatar size="lg" icon="user-3" color="#ec4899" />
        </div>
      </div>

      {/* 自定义颜色 & 尺寸 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customColor')}</div>
        <div style={CARD.desc}>{t('demo.customColorDesc')}</div>
        <div style={CARD.body}>
          <Avatar size="md" text="A" color="var(--sc-color-primary, #1677ff)" />
          <Avatar size="md" text="B" color="#22c55e" />
          <Avatar size="md" text="C" color="#ef4444" />
          <Avatar size="md" text="D" color="#f59e0b" />
          <Avatar size="md" text="E" color="#6366f1" />
          <Avatar size="md" text="F" color="#ec4899" />
          <Avatar size="md" text="G" color="#10b981" />
        </div>
      </div>
    </MobilePreview>
  );
};
