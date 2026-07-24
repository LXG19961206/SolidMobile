import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useChatMessageTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'position', type: "'left' | 'right'", def: '—', desc: 'chatMessage.props.position' },
      { name: 'messageType', type: "'plainText' | 'richText' | 'image' | 'video' | 'file' | 'custom'", def: "'plainText'", desc: 'chatMessage.props.messageType' },
      { name: 'content', type: 'string', def: '—', desc: 'chatMessage.props.content' },
      { name: 'src', type: 'string', def: '—', desc: 'chatMessage.props.src' },
      { name: 'fileName', type: 'string', def: '—', desc: 'chatMessage.props.fileName' },
      { name: 'fileSize', type: 'string', def: '—', desc: 'chatMessage.props.fileSize' },
      { name: 'iconMap', type: "Record<string, string | JSX.Element>", def: '—', desc: 'chatMessage.props.iconMap' },
      { name: 'progress', type: 'number', def: '—', desc: 'chatMessage.props.progress' },
      { name: 'onDownload', type: '() => void', def: '—', desc: 'chatMessage.props.onDownload' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'chatMessage.props.children' },
      { name: 'renderSlot', type: 'JSX.Element', def: '—', desc: 'chatMessage.props.renderSlot' },
      { name: 'avatar', type: 'string', def: '—', desc: 'chatMessage.props.avatar' },
      { name: 'avatarSize', type: 'number', def: '36', desc: 'chatMessage.props.avatarSize' },
      { name: 'avatarShape', type: "'circle' | 'rounded' | 'square'", def: "'circle'", desc: 'chatMessage.props.avatarShape' },
      { name: 'showAvatar', type: 'boolean', def: 'true', desc: 'chatMessage.props.showAvatar' },
      { name: 'avatarSlot', type: 'JSX.Element', def: '—', desc: 'chatMessage.props.avatarSlot' },
      { name: 'tail', type: 'boolean', def: 'true', desc: 'chatMessage.props.tail' },
      { name: 'maxWidth', type: 'string', def: "'72%'", desc: 'chatMessage.props.maxWidth' },
      { name: 'bgColor', type: 'string', def: '—', desc: 'chatMessage.props.bgColor' },
      { name: 'borderRadius', type: 'string', def: "'12px'", desc: 'chatMessage.props.borderRadius' },
      { name: 'name', type: 'string', def: '—', desc: 'chatMessage.props.name' },
      { name: 'time', type: 'string', def: '—', desc: 'chatMessage.props.time' },
      { name: 'status', type: "'sending' | 'sent' | 'read' | 'failed'", def: '—', desc: 'chatMessage.props.status' },
      { name: 'statusPosition', type: "'meta' | 'bubble' | 'side'", def: "'meta'", desc: 'chatMessage.props.statusPosition' },
      { name: 'statusIcon', type: "Partial<Record<...>>", def: '—', desc: 'chatMessage.props.statusIcon' },
      { name: 'onRetry', type: '() => void', def: '—', desc: 'chatMessage.props.onRetry' },
      { name: 'onAvatarClick', type: '() => void', def: '—', desc: 'chatMessage.props.onAvatarClick' },
      { name: 'longPressMenu', type: "{ title: string; action: () => void }[] | JSX.Element", def: '—', desc: 'chatMessage.props.longPressMenu' },
      { name: 'onContentClick', type: '() => void', def: '—', desc: 'chatMessage.props.onContentClick' },
      { name: 'class', type: 'string', def: '—', desc: 'chatMessage.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'chatMessage.props.style' },
    ],
  }];

  return { propsTables };
}
