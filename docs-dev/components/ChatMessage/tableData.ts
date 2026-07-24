import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useChatMessageTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'position', type: "'left' | 'right'", def: '—', desc: 'chatMessage.props.position' },
      { name: 'messageType', type: "'plainText' | 'image' | 'video' | 'file' | 'custom'", def: "'plainText'", desc: 'chatMessage.props.messageType' },
      { name: 'content', type: 'string', def: '—', desc: 'chatMessage.props.content' },
      { name: 'src', type: 'string', def: '—', desc: 'chatMessage.props.src' },
      { name: 'fileName', type: 'string', def: '—', desc: 'chatMessage.props.fileName' },
      { name: 'fileSize', type: 'string', def: '—', desc: 'chatMessage.props.fileSize' },
      { name: 'iconMap', type: "Record<string, string | JSX.Element>", def: '—', desc: 'chatMessage.props.iconMap' },
      { name: 'progress', type: 'number', def: '—', desc: 'chatMessage.props.progress' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'chatMessage.props.children' },
      { name: 'avatar', type: 'string | JSX.Element', def: '—', desc: 'chatMessage.props.avatar' },
      { name: 'avatarSize', type: 'number', def: '36', desc: 'chatMessage.props.avatarSize' },
      { name: 'avatarShape', type: "'circle' | 'rounded' | 'square'", def: "'circle'", desc: 'chatMessage.props.avatarShape' },
      { name: 'showAvatar', type: 'boolean', def: 'true', desc: 'chatMessage.props.showAvatar' },
      { name: 'tail', type: 'boolean', def: 'true', desc: 'chatMessage.props.tail' },
      { name: 'maxWidth', type: 'string', def: "'72%'", desc: 'chatMessage.props.maxWidth' },
      { name: 'bgColor', type: 'string', def: '—', desc: 'chatMessage.props.bgColor' },
      { name: 'borderRadius', type: 'string', def: "'12px'", desc: 'chatMessage.props.borderRadius' },
      { name: 'name', type: 'string', def: '—', desc: 'chatMessage.props.name' },
      { name: 'header', type: 'JSX.Element', def: '—', desc: 'chatMessage.props.header' },
      { name: 'time', type: 'string', def: '—', desc: 'chatMessage.props.time' },
      { name: 'footer', type: 'JSX.Element', def: '—', desc: 'chatMessage.props.footer' },
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

  const cssVarsTables: TableSection[] = [{
    title: 'CSS Custom Properties',
    rows: [
      { name: '--sc-chat-gap', type: 'length', def: '8px', desc: 'chatMessage.cssVars.gap' },
      { name: '--sc-chat-wrapper-padding', type: 'padding', def: '6px 12px', desc: 'chatMessage.cssVars.wrapperPadding' },
      { name: '--sc-chat-max-width', type: 'percentage', def: '72%', desc: 'chatMessage.cssVars.maxWidth' },
      { name: '--sc-chat-bubble-padding', type: 'padding', def: '10px 14px', desc: 'chatMessage.cssVars.bubblePadding' },
      { name: '--sc-chat-font-size', type: 'size', def: 'var(--sc-font-size-sm, 0.875rem)', desc: 'chatMessage.cssVars.fontSize' },
      { name: '--sc-chat-line-height', type: 'ratio', def: 'var(--sc-line-height-tight, 1.25)', desc: 'chatMessage.cssVars.lineHeight' },
      { name: '--sc-chat-radius', type: 'length', def: 'var(--sc-border-radius-lg, 12px)', desc: 'chatMessage.cssVars.radius' },
      { name: '--sc-chat-bubble-bg-left', type: 'color', def: '#fff', desc: 'chatMessage.cssVars.bubbleBgLeft' },
      { name: '--sc-chat-bubble-bg-self', type: 'color', def: 'var(--sc-color-primary, #1677ff)', desc: 'chatMessage.cssVars.bubbleBgSelf' },
      { name: '--sc-chat-text-color', type: 'color', def: 'var(--sc-color-text, #1f2937)', desc: 'chatMessage.cssVars.textColor' },
      { name: '--sc-chat-text-color-self', type: 'color', def: 'var(--sc-color-text-inverse, #fff)', desc: 'chatMessage.cssVars.textColorSelf' },
      { name: '--sc-chat-muted-color', type: 'color', def: '#9ca3af', desc: 'chatMessage.cssVars.mutedColor' },
      { name: '--sc-chat-tail-width', type: 'length', def: '6px', desc: 'chatMessage.cssVars.tailWidth' },
      { name: '--sc-chat-tail-offset', type: 'length', def: '14px', desc: 'chatMessage.cssVars.tailOffset' },
      { name: '--sc-chat-file-icon-size', type: 'length', def: '36px', desc: 'chatMessage.cssVars.fileIconSize' },
      { name: '--sc-chat-menu-bg', type: 'color', def: '#fff', desc: 'chatMessage.cssVars.menuBg' },
      { name: '--sc-chat-menu-item-hover-bg', type: 'color', def: '#f3f4f6', desc: 'chatMessage.cssVars.menuItemHoverBg' },
      { name: '--sc-chat-progress-height', type: 'length', def: '3px', desc: 'chatMessage.cssVars.progressHeight' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
