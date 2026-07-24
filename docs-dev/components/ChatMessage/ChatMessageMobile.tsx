import { useT, registerLocale } from '../../doc-i18n';
import { ChatMessage } from '../../../src/components/ChatMessage';
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
      <div style={{ padding: '10px 12px', display: 'flex', 'flex-direction': 'column', background: '#f8f9fb', 'min-height': '100%' }}>
        <ChatMessage position="left" messageType="plainText" bgColor="#dbeafe" content="Hey! Check out the new chat component 👋" avatar={A} name="Alice" time="10:32"
          longPressMenu={[{ title: 'Copy', action: () => alert('Copied!') }, { title: 'Reply', action: () => alert('Reply') }]} />
        <ChatMessage position="right" messageType="plainText" content="Looks great! The tail pointer is a nice touch ✨" time="10:33" status="read"
          longPressMenu={[{ title: 'Copy', action: () => alert('Copied!') }, { title: 'Recall', action: () => alert('Recalled') }, { title: 'Delete', action: () => alert('Deleted') }]} />
        <ChatMessage position="left" messageType="image" bgColor="#dbeafe" src={IMG} name="Alice" time="10:34" avatar={A} />
        <ChatMessage position="right" messageType="plainText" content="Can you send that design file?" time="10:35" status="read" />
        <ChatMessage position="left" messageType="file" bgColor="#dbeafe" fileName="design-spec.pdf" fileSize="2.4 MB" src="./logo.jpg" name="Alice" time="10:36" avatar={A} />
        <ChatMessage position="right" messageType="file" fileName="report.xlsx" fileSize="1.8 MB" progress={65} src="https://example.com/report.xlsx" time="10:37" status="sending" onDownload={() => alert('Custom download!')} />
        <ChatMessage position="right" messageType="custom" time="10:37" status="read">
          <div style={{ background: '#f0fdf4', border: '1px solid #22c55e', 'border-radius': '12px', padding: '12px 16px', 'font-size': '0.85rem' }}>
            ✅ Order #SC-2024 confirmed<br /><small style="color:#6b7280">Delivery by Friday</small>
          </div>
        </ChatMessage>
        <ChatMessage position="left" messageType="plainText" bgColor="#dbeafe" content="Perfect, thanks! 🙏" avatar={A} name="Alice" time="10:38" />
        <ChatMessage position="right" messageType="plainText" content="Sent ✓" time="10:39" status="sent" />
        <ChatMessage position="right" messageType="plainText" content="This one failed..." time="10:40" status="failed" onRetry={() => alert('Retry!')} />
      </div>
    </MobilePreview>
  );
};
