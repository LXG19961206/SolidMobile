import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useChatMessageTableData } from './tableData';
import { ChatMessage } from '../../../src/components/ChatMessage';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const AVATAR_ALICE = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#6366f1"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">A</text></svg>');
const AVATAR_ME = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#1677ff"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">M</text></svg>');
const IMG = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120"><rect width="200" height="120" fill="#dbeafe"/><text x="100" y="68" text-anchor="middle" fill="#3b82f6" font-size="14" font-family="sans-serif">📷 Photo</text></svg>');

export const ChatMessageDocPage = () => {
  const t = useT();
  const { propsTables } = useChatMessageTableData();

  const demos: DemoCode[] = [
    {
      title: t('chatMessage.demo.basic'),
      code: '<ChatMessage position="left" messageType="plainText"\n  content="Hey! How are you doing?"\n  bgColor="#dbeafe"\n  avatar="alice.jpg" name="Alice" time="10:32" />\n\n<ChatMessage position="right" messageType="plainText"\n  content="I\'m good! Just finished the new chat UI component 🎉"\n  time="10:33" status="read" />',
      desc: t('chatMessage.demoDesc.basic'),
    },
    {
      title: t('chatMessage.demo.imageVideo'),
      code: '<ChatMessage position="left" messageType="image"\n  src="photo.jpg" name="Bob" time="11:05"\n  avatar="bob.jpg" />\n\n<ChatMessage position="right" messageType="video"\n  src="clip.mp4" time="11:07" status="read" />',
      desc: t('chatMessage.demoDesc.imageVideo'),
    },
    {
      title: t('chatMessage.demo.fileAndCustom'),
      code: '<ChatMessage position="left" messageType="file"\n  fileName="design-spec.pdf" fileSize="2.4 MB"\n  iconMap={{ pdf: \'📄\', doc: \'📝\', \'*\': \'📎\' }}\n  name="Alice" time="11:20" avatar="alice.jpg" />\n\n<ChatMessage position="right" messageType="custom" time="11:22">\n  <div style="background:#f0fdf4;border:1px solid #22c55e;\n    border-radius:12px;padding:12px 16px">\n    ✅ Order confirmed! Tracking #SC-2024\n    <br/><small>Estimated delivery: Friday</small>\n  </div>\n</ChatMessage>',
      desc: t('chatMessage.demoDesc.fileAndCustom'),
    },
    {
      title: t('chatMessage.demo.statusesAndMeta'),
      code: '// sending → sent → read progression\n<ChatMessage position="right" messageType="plainText"\n  content="Sending..." time="11:25" status="sending" />\n<ChatMessage position="right" messageType="plainText"\n  content="Sent ✓" time="11:26" status="sent" />\n<ChatMessage position="right" messageType="plainText"\n  content="Read ✓✓" time="11:30" status="read" />\n\n// failed with retry\n<ChatMessage position="right" messageType="plainText"\n  content="This message failed" time="11:32"\n  status="failed" onRetry={() => retry()} />',
      desc: t('chatMessage.demoDesc.statusesAndMeta'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>ChatMessage</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('chatMessage.intro')}</p>

        <PropsAttrs propsTables={propsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>

        <p style={{ 'font-size': '0.85rem', color: '#6b7280' }}>Play the msgs ↓</p>

        {/* ── Live Chat Demo ── */}
        <div style={{ background: '#f8f9fb', border: '1px solid #e5e7eb', 'border-radius': '12px', padding: '12px 0', 'margin-bottom': '24px', 'max-width': '520px' }}>
          {/* Basic text */}
          <ChatMessage position="left" messageType="plainText" bgColor="#dbeafe" content={t('chatMessage.demoDesc.basic')?.toString() || 'Hey! How are you doing?'} avatar={AVATAR_ALICE} name="Alice" time="10:32" />
          <ChatMessage position="right" messageType="plainText" content="I'm good! Just finished the new chat UI component 🎉" time="10:33" status="read" />

          {/* Image + Video */}
          <ChatMessage position="left" messageType="image" bgColor="#dbeafe" src={IMG} name="Bob" time="11:05" avatar={AVATAR_ALICE} />
          <ChatMessage position="right" messageType="plainText" content="Nice photo! 📷" time="11:06" status="read" />

          {/* File + Custom */}
          <ChatMessage position="left" messageType="file" bgColor="#dbeafe" iconMap={{ pdf: '📄', doc: '📝', image: '🖼️', '*': '📎' }} fileName="design-spec.pdf" fileSize="2.4 MB" name="Alice" time="11:20" avatar={AVATAR_ALICE} />
          <ChatMessage position="right" messageType="custom" time="11:22" status="read">
            <div style={{ background: '#f0fdf4', border: '1px solid #22c55e', 'border-radius': '12px', padding: '12px 16px', 'font-size': '0.85rem' }}>
              ✅ Order confirmed!<br /><small style="color:#6b7280">Tracking #SC-2024 · Friday delivery</small>
            </div>
          </ChatMessage>

          {/* Status progression */}
          <ChatMessage position="right" messageType="plainText" content="Sending..." time="11:25" status="sending" />
          <ChatMessage position="right" messageType="plainText" content="Message sent ✓" time="11:26" status="sent" />
          <ChatMessage position="right" messageType="plainText" content="Message read ✓✓" time="11:30" status="read" />
          <ChatMessage position="right" messageType="plainText" content="This one failed to send" time="11:32" status="failed" onRetry={() => alert('Retry!')} />
        </div>

        {/* Code blocks */}
        {demos.map(demo => <DemoCodeBlock demo={demo} />)}
      </div>
    </DocLayout>
  );
};
