import { useT, registerLocale } from '../../doc-i18n';
import { ChatMessage } from '../../../src/components/ChatMessage';
import { Toast, ToastRenderer } from '../../../src/components/Toast';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useChatMessageTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const A = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#6366f1"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">A</text></svg>');
const M = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#1677ff"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif">M</text></svg>');
const IMG = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120"><rect width="200" height="120" fill="#dbeafe"/><text x="100" y="68" text-anchor="middle" fill="#3b82f6" font-size="14" font-family="sans-serif">📷 Photo</text></svg>');

export const ChatMessageMobile = () => {
  const t = useT();
  const { propsTables } = useChatMessageTableData();

  return (
    <MobilePreview title="ChatMessage">
      <MobilePropsSheet propsTables={propsTables} />
      <div style={{ padding: '10px 12px', display: 'flex', 'flex-direction': 'column', 'min-height': '100%' }}>

        {/* ── Content Types ── */}
        <ChatMessage position="left" messageType="plainText" bgColor="#dbeafe" content="Hey! How are you doing? 👋" avatar={A} name="Alice" time="10:30" />
        <ChatMessage position="right" messageType="plainText" bgColor="#95ec69" content="I'm good! Just shipped a new component 🎉" time="10:31" status="read" />
        <ChatMessage position="left" messageType="image" bgColor="#dbeafe" src={IMG} name="Alice" time="10:32" avatar={A} />
        <ChatMessage position="left" messageType="file" bgColor="#dbeafe" fileName="design-spec.pdf" fileSize="2.4 MB" src="./logo.jpg" name="Alice" time="10:33" avatar={A} />
        <ChatMessage position="right" messageType="file" bgColor="#95ec69" fileName="report.xlsx" fileSize="1.8 MB" progress={65} src="https://example.com/report.xlsx" time="10:34" status="sending" onDownload={() => Toast.info('Custom download handler fired')} />
        <ChatMessage position="right" messageType="custom" bgColor="#95ec69" time="10:35" status="read">
          <div style={{ background: '#f0fdf4', border: '1px solid #22c55e', 'border-radius': '12px', padding: '12px 16px', 'font-size': '0.85rem' }}>
            ✅ Order #SC-2024 confirmed<br /><small style="color:#6b7280">Delivery by Friday</small>
          </div>
        </ChatMessage>

        {/* ── Status ── */}
        <ChatMessage position="right" messageType="plainText" bgColor="#95ec69" content="Sent ✓" time="10:36" status="sent" />
        <ChatMessage position="right" messageType="plainText" bgColor="#95ec69" content="Read ✓" time="10:37" status="read" />
        <ChatMessage position="right" messageType="plainText" bgColor="#95ec69" content="Sending..." time="10:38" status="sending" />
        <ChatMessage position="right" messageType="plainText" bgColor="#95ec69" content="This one failed..." time="10:39" status="failed" onRetry={() => Toast.info('Retrying...')} />

        {/* ── Status Positions ── */}
        <ChatMessage position="right" messageType="plainText" bgColor="#95ec69" content="status after time (default)" time="10:40" status="read" />
        <ChatMessage position="right" messageType="plainText" bgColor="#95ec69" content="status inside bubble" time="10:41" status="sending" statusPosition="bubble" />
        <ChatMessage position="right" messageType="plainText" bgColor="#95ec69" content="status next to bubble" time="10:42" status="read" statusPosition="side" />

        {/* ── Long Press: Array Menu ── */}
        <ChatMessage position="left" messageType="plainText" bgColor="#dbeafe" content="Long-press me (array menu)" avatar={A} name="Alice" time="10:43"
          longPressMenu={[{ title: 'Copy', action: () => Toast.success('Copied!') }, { title: 'Reply', action: () => Toast.info('Reply') }]} />
        <ChatMessage position="right" messageType="plainText" bgColor="#95ec69" content="Long-press me too 👆" time="10:44" status="read"
          longPressMenu={[{ title: 'Copy', action: () => { navigator.clipboard.writeText('Long-press me too 👆').catch(() => {}); Toast.success('Copied'); } }, { title: 'Recall', action: () => Toast.info('Recalled') }, { title: 'Delete', action: () => Toast.success('Deleted') }]} />

        {/* ── Long Press: Custom JSX ── */}
        <ChatMessage position="right" messageType="plainText" bgColor="#95ec69" content="Custom JSX menu" time="10:45"
          longPressMenu={<div style="background:#fff;border-radius:10px;padding:8px 12px;box-shadow:0 4px 12px rgba(0,0,0,.12);display:flex;gap:8px">
            <span onClick={() => Toast.success('❤️')} style="cursor:pointer;font-size:1.2rem">❤️</span>
            <span onClick={() => Toast.success('👍')} style="cursor:pointer;font-size:1.2rem">👍</span>
            <span onClick={() => Toast.success('😂')} style="cursor:pointer;font-size:1.2rem">😂</span>
          </div>} />

        {/* ── Long Press: Text Selection ── */}
        <ChatMessage position="left" messageType="plainText" bgColor="#dbeafe"
          content="Hold to select this text — no menu, just selection." avatar={A} name="Alice" time="10:46"
          selectOnLongPress />
      </div>
      <ToastRenderer />
    </MobilePreview>
  );
};
