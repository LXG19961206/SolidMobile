import { mergeProps, splitProps, Show, type Component, type JSX } from 'solid-js';
import type { ChatMessageProps } from './types';
import { cn, scopedStyle } from '../../utils';
import { Image } from '../Image';
import rawStyles from './ChatMessage.module.css';
const styles = scopedStyle(rawStyles, 'sc-chat-message');

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileExt(name: string): string {
  const i = name.lastIndexOf('.');
  return i > 0 ? name.slice(i + 1).toLowerCase() : '';
}

function mimeCategory(type: string): string {
  if (!type) return '';
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  if (type.startsWith('audio/')) return 'audio';
  return '';
}

const defaultProps: Partial<ChatMessageProps> = {
  showAvatar: true,
  avatarSize: 36,
  avatarShape: 'circle',
  tail: true,
  maxWidth: '72%',
};

export const ChatMessage: Component<ChatMessageProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'position', 'messageType', 'content', 'src', 'file', 'fileName', 'fileSize',
    'iconMap', 'children', 'renderSlot',
    'avatar', 'avatarSize', 'avatarShape', 'showAvatar', 'avatarSlot',
    'tail', 'maxWidth', 'bgColor', 'borderRadius',
    'name', 'time', 'status',
    'onRetry', 'onAvatarClick', 'onLongPress', 'onContentClick',
    'class', 'style',
  ]);

  const isSelf = () => local.position === 'right';

  const displayName = () => local.fileName ?? local.file?.name;
  const displaySize = () => local.fileSize ?? (local.file ? formatSize(local.file.size) : undefined);

  const resolveFileIcon = (): JSX.Element => {
    const map = local.iconMap;
    const f = local.file;
    // no file object → show generic icon
    const name = displayName() || '';
    const type = f?.type ?? '';
    if (!map) {
      const ext = fileExt(name);
      return <span class={styles.fileIconLabel}>{ext.toUpperCase() || 'FILE'}</span>;
    }
    const ext = fileExt(name);
    const cat = mimeCategory(type);
    const key = map[ext] ?? (cat ? map[cat] : undefined) ?? map['*'];
    if (key == null) return <span class={styles.fileIconLabel}>{ext.toUpperCase() || 'FILE'}</span>;
    if (typeof key === 'string') {
      // icon name or emoji string
      return <span class={styles.fileIconLabel}>{key}</span>;
    }
    // JSX element
    return key;
  };

  const avatarRadius = () =>
    local.avatarShape === 'circle' ? '50%' : local.avatarShape === 'rounded' ? '8px' : '4px';

  const bubbleStyle = (): Record<string, any> => {
    const s: Record<string, any> = {};
    if (local.maxWidth) s['--cm-max-width'] = local.maxWidth;
    if (local.bgColor) s['--cm-bg'] = local.bgColor;
    if (local.borderRadius) {
      s['--cm-radius'] = local.borderRadius;
      s['--cm-tail-radius'] = local.borderRadius;
    }
    return s;
  };

  const statusIcon = () => {
    const st = local.status;
    if (!st || !isSelf()) return null;
    if (st === 'sending') return <span class={styles.statusSending}>⏳</span>;
    if (st === 'sent') return <span class={styles.statusSent}>✓</span>;
    if (st === 'read') return <span class={styles.statusRead}>✓✓</span>;
    if (st === 'failed')
      return (
        <span class={styles.statusFailed} onClick={local.onRetry} title="Retry">
          <svg class={styles.retryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </span>
      );
    return null;
  };

  const renderBubble = () => {
    // custom slot — highest priority
    if (local.renderSlot) return local.renderSlot;

    switch (local.messageType) {
      case 'image':
        return (
          <Show when={local.src} fallback={<div class={styles.bubble}>🖼️</div>}>
            <Image
              src={local.src!}
              preview
              class={styles.imgBubble}
              onClick={local.onContentClick}
              style={local.borderRadius ? { 'border-radius': local.borderRadius } : undefined}
            />
          </Show>
        );

      case 'video':
        return (
          <div class={styles.videoBubble} onClick={local.onContentClick}>
            <Show when={local.src}>
              <video src={local.src} />
            </Show>
            <div class={styles.videoOverlay}>
              <svg viewBox="0 0 36 36" fill="white"><polygon points="14,10 14,26 27,18" /></svg>
            </div>
          </div>
        );

      case 'file':
        return (
          <div class={styles.fileBubble} onClick={local.onContentClick}>
            <div class={styles.fileIcon}>{resolveFileIcon()}</div>
            <div style={{ 'min-width': 0, flex: 1 }}>
              <div class={styles.fileName}>{displayName() || 'Unknown file'}</div>
              <Show when={displaySize()}><div class={styles.fileSize}>{displaySize()}</div></Show>
            </div>
          </div>
        );

      case 'custom':
        return local.children ?? <div class={styles.bubble}> </div>;

      case 'richText':
      case 'plainText':
      default:
        return (
          <div class={styles.bubble} style={bubbleStyle()}>
            <Show when={local.tail}>
              <span class={styles.tail} classList={{ [styles.left!]: !isSelf(), [styles.right!]: isSelf() }} />
            </Show>
            {local.content ?? ''}
          </div>
        );
    }
  };

  return (
    <div
      class={cn(styles.wrapper, styles[local.position], local.class)}
      style={typeof local.style === 'object' ? { ...bubbleStyle(), ...local.style as Record<string, any> } : bubbleStyle()}
      onTouchStart={() => {}} // placeholder for long-press detection
    >
      {/* Avatar */}
      <Show when={local.showAvatar}>
        <div
          class={styles.avatar}
          style={{ width: `${local.avatarSize}px`, height: `${local.avatarSize}px`, 'border-radius': avatarRadius() }}
          onClick={local.onAvatarClick}
        >
          <Show
            when={local.avatarSlot}
            fallback={
              <Show
                when={local.avatar}
                fallback={
                  <div class={styles.avatarPlaceholder} style={{ width: '100%', height: '100%' }}>
                    {isSelf() ? 'Me' : '?'}
                  </div>
                }
              >
                <img src={local.avatar} alt="avatar" />
              </Show>
            }
          >
            {local.avatarSlot}
          </Show>
        </div>
      </Show>

      {/* Body */}
      <div class={styles.body}>
        <Show when={local.name}>
          <div class={styles.name} classList={{ [styles.left!]: !isSelf(), [styles.right!]: isSelf() }}>
            {local.name}
          </div>
        </Show>

        {renderBubble()}

        <Show when={local.time || (isSelf() && local.status)}>
          <div class={styles.meta} classList={{ [styles.left!]: !isSelf(), [styles.right!]: isSelf() }}>
            <span>{local.time}</span>
            {statusIcon()}
          </div>
        </Show>
      </div>
    </div>
  );
};
