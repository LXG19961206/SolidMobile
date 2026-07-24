import { For } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { DocLayout, PropsAttrs } from '../../doc-utils';
import { DemoCodeBlock } from '../../doc-utils/ComponentDocLayout';
import type { DemoCode } from '../../doc-utils';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useChatMessageTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const ChatMessageDocPage = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useChatMessageTableData();

  const demos: DemoCode[] = [
    // ── Content Types ──
    {
      title: t('chatMessage.demo.basic'),
      code: '<ChatMessage position="left" messageType="plainText"\n  content="Hey! How are you doing? 👋"\n  avatar="alice.jpg" name="Alice" time="10:30" />\n\n<ChatMessage position="right" messageType="plainText"\n  content="I\'m good! Just shipped a new component 🎉"\n  time="10:31" status="read" />',
      desc: t('chatMessage.demoDesc.basic'),
    },
    {
      title: t('chatMessage.demo.imageVideo'),
      code: '<ChatMessage position="left" messageType="image"\n  src="photo.jpg" name="Alice" avatar="alice.jpg"\n  time="10:32" />\n\n<ChatMessage position="right" messageType="video"\n  src="./demo-video.mp4" time="10:32" status="read" />',
      desc: t('chatMessage.demoDesc.imageVideo'),
    },
    {
      title: t('chatMessage.demo.fileAndCustom'),
      code: '<ChatMessage position="left" messageType="file"\n  fileName="design-spec.pdf" fileSize="2.4 MB"\n  iconMap={{ pdf: \'📄\', \'*\': \'📎\' }}\n  name="Alice" time="10:33" avatar="alice.jpg" />\n\n<ChatMessage position="right" messageType="file"\n  fileName="report.xlsx" fileSize="1.8 MB"\n  progress={65}\n  time="10:34" status="sending" />\n\n<ChatMessage position="right" messageType="custom" time="10:35">\n  <div style="background:#f0fdf4;border:1px solid #22c55e;\n    border-radius:12px;padding:12px 16px">\n    ✅ Order confirmed!\n  </div>\n</ChatMessage>',
      desc: t('chatMessage.demoDesc.fileAndCustom'),
    },
    {
      title: t('chatMessage.demo.fileDownload'),
      code: '<ChatMessage position="left" messageType="file"\n  fileName="contract.pdf" fileSize="1.2 MB"\n  onContentClick={() => {\n    Toast.info(\'Starting download...\');\n    setTimeout(() => {\n      Toast.success(\'contract.pdf downloaded\');\n    }, 1500);\n  }}\n  name="Alice" time="10:35" avatar="alice.jpg" />',
      desc: t('chatMessage.demoDesc.fileDownload'),
    },
    // ── Status ──
    {
      title: t('chatMessage.demo.statusesAndMeta'),
      code: '<ChatMessage position="right" messageType="plainText"\n  content="Sent ✓" time="10:36" status="sent" />\n\n<ChatMessage position="right" messageType="plainText"\n  content="Read ✓" time="10:37" status="read" />\n\n<ChatMessage position="right" messageType="plainText"\n  content="Sending..." time="10:38" status="sending" />\n\n<ChatMessage position="right" messageType="plainText"\n  content="This message failed" time="10:39"\n  status="failed" onRetry={() => retry()} />',
      desc: t('chatMessage.demoDesc.statusesAndMeta'),
    },
    {
      title: t('chatMessage.demo.statusPosition'),
      code: '// meta (default): after time\n<ChatMessage position="right" content="status after time"\n  time="10:40" status="read" />\n\n// bubble: inside the bubble\n<ChatMessage position="right" content="status inside"\n  time="10:41" status="sending" statusPosition="bubble" />\n\n// side: between avatar and bubble\n<ChatMessage position="right" content="status next to bubble"\n  time="10:42" status="read" statusPosition="side" />',
      desc: t('chatMessage.demoDesc.statusPosition'),
    },
    // ── Long Press ──
    {
      title: t('chatMessage.demo.longPressArray'),
      code: '<ChatMessage position="left" messageType="plainText"\n  content="Long-press me (array menu)"\n  avatar="alice.jpg" name="Alice" time="10:43"\n  longPressMenu={[\n    { title: \'Copy\', action: () => copyText() },\n    { title: \'Recall\', action: () => recall() },\n    { title: \'Delete\', action: () => del() },\n  ]}\n/>',
      desc: t('chatMessage.demoDesc.longPressArray'),
    },
    {
      title: t('chatMessage.demo.longPressCustom'),
      code: '<ChatMessage position="right" messageType="plainText"\n  content="Custom JSX menu" time="10:45"\n  longPressMenu={\n    <div style="background:#fff;border-radius:10px;\n      padding:8px 12px;display:flex;gap:8px">\n      <span onClick={() => react("❤️")}>❤️</span>\n      <span onClick={() => react("👍")}>👍</span>\n      <span onClick={() => react("😂")}>😂</span>\n    </div>\n  }\n/>',
      desc: t('chatMessage.demoDesc.longPressCustom'),
    },
    {
      title: t('chatMessage.demo.longPressSelect'),
      code: '<ChatMessage position="left" messageType="plainText"\n  content="Hold to select this text — no menu."\n  avatar="alice.jpg" name="Alice" time="10:46"\n  selectOnLongPress\n/>',
      desc: t('chatMessage.demoDesc.longPressSelect'),
    },
  ];

  return (
    <DocLayout>
      <div style={{ padding: '24px 32px', 'max-width': '960px', margin: '0 auto' }}>
        <h1 style={{ 'font-size': '1.75rem', 'font-weight': 700, margin: '0 0 4px' }}>ChatMessage</h1>
        <p style={{ 'font-size': '0.9rem', color: '#6b7280', margin: '0 0 24px' }}>{t('chatMessage.intro')}</p>

        <PropsAttrs propsTables={propsTables} cssVarsTables={cssVarsTables} />

        <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '24px 0 12px' }}>Demos</h2>
        <For each={demos}>{(demo) => <DemoCodeBlock demo={demo} />}</For>
      </div>
    </DocLayout>
  );
};
