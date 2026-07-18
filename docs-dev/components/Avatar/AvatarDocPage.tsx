import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useAvatarTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const AvatarDocPage = () => {
  const t = useT();
  const { propsTables } = useAvatarTableData();

  const demos: DemoCode[] = [
    {
      title: t('avatar.demo.image'),
      code: '<Avatar src="user.jpg" size="lg" />\n<Avatar src="user.jpg" size="md" />\n<Avatar src="user.jpg" size="sm" />\n<Avatar src="user.jpg" size="xs" />',
      desc: t('avatar.demoDesc.image'),
    },
    {
      title: t('avatar.demo.icon'),
      code: '<Avatar icon="user" color="#1677ff" />\n<Avatar icon="star" color="#f59e0b" />\n<Avatar icon="settings" color="#22c55e" />',
      desc: t('avatar.demoDesc.icon'),
    },
    {
      title: t('avatar.demo.text'),
      code: '<Avatar text="Alice" color="#f59e0b" />\n<Avatar text="Bob" color="#22c55e" />\n<Avatar text="Carol" color="#ef4444" />',
      desc: t('avatar.demoDesc.text'),
    },
    {
      title: t('avatar.demo.shape'),
      code: '<Avatar text="A" size="xs" />\n<Avatar text="A" size="sm" />\n<Avatar text="A" size="md" />\n<Avatar text="A" size="lg" />\n<Avatar text="A" size="xl" />',
      desc: t('avatar.demoDesc.shape'),
    },
    {
      title: t('avatar.demo.custom'),
      code: '<Avatar text="A" color="#1677ff" />\n<Avatar text="B" color="#22c55e" />\n<Avatar text="C" color="#ef4444" />',
      desc: t('avatar.demoDesc.custom'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>Avatar</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('avatar.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
