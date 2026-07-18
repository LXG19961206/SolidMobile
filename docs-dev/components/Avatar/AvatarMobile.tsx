import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Avatar } from '../../../src/components/Avatar';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useAvatarTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const AVATAR_URL = '/avatar-demo.svg';

const row = { display: 'flex', 'flex-wrap': 'wrap' as const, gap: '12px', 'align-items': 'center' as const };

export const AvatarMobile = () => {
  const t = useT();
  const { propsTables } = useAvatarTableData();

  return (
    <MobilePreview title="Avatar">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Sizes */}
        <Card title={t('avatar.demo.image')}>
          <div style={row}>
            <Avatar src={AVATAR_URL} size="xs" />
            <Avatar src={AVATAR_URL} size="sm" />
            <Avatar src={AVATAR_URL} size="md" />
            <Avatar src={AVATAR_URL} size="lg" />
            <Avatar src={AVATAR_URL} size="xl" />
          </div>
        </Card>

        {/* Round vs Square - use text to clearly show shape boundary */}
        <Card title="Round / Square" subtitle="round vs square vs square={8}">
          <div style={row}>
            <Avatar text="A" size="lg" round color="var(--sc-color-primary, #1677ff)" />
            <Avatar text="A" size="lg" square color="var(--sc-color-primary, #1677ff)" />
            <Avatar text="A" size="lg" square={8} color="var(--sc-color-primary, #1677ff)" />
          </div>
        </Card>

        {/* Text & Icon */}
        <Card title={t('avatar.demo.icon')}>
          <div style={row}>
            <Avatar size="lg" text="Tom" color="var(--sc-color-primary, #1677ff)" />
            <Avatar size="lg" text="Kim" color="#22c55e" />
            <Avatar size="lg" icon="user" color="#6366f1" />
            <Avatar size="lg" icon="user-3" color="#ec4899" />
          </div>
        </Card>

        {/* Custom colors */}
        <Card title={t('avatar.demo.custom')}>
          <div style={row}>
            <Avatar size="md" text="A" color="var(--sc-color-primary, #1677ff)" />
            <Avatar size="md" text="B" color="#22c55e" />
            <Avatar size="md" text="C" color="#ef4444" />
            <Avatar size="md" text="D" color="#f59e0b" />
            <Avatar size="md" text="E" color="#6366f1" />
            <Avatar size="md" text="F" color="#ec4899" />
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
