import { mergeProps, splitProps, Show, For, createSignal, onCleanup, type Component, type JSX } from 'solid-js';
import type { ChatMessageProps } from './types';
import { cn, scopedStyle } from '../../utils';
import { Image } from '../Image';
import { Tooltip } from '../Tooltip';
import { Loading } from '../Loading';
import rawStyles from './ChatMessage.module.css';
const styles = scopedStyle(rawStyles, 'sc-chat-message');

function fileExt(name: string): string {
  const i = name.lastIndexOf('.');
  return i > 0 ? name.slice(i + 1).toLowerCase() : '';
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
    'position', 'messageType', 'content', 'src', 'fileName', 'fileSize',
    'iconMap', 'progress', 'onDownload', 'children',
    'avatar', 'avatarSize', 'avatarShape', 'showAvatar',
    'tail', 'maxWidth', 'bgColor', 'borderRadius',
    'name', 'time', 'status',
    'onRetry', 'onAvatarClick', 'longPressMenu', 'selectOnLongPress', 'statusPosition', 'statusIcon',
    'header', 'footer', 'onContentClick',
    'class', 'style',
  ]);

  const isSelf = () => local.position === 'right';

  const displayName = () => local.fileName || '';
  const displaySize = () => local.fileSize || '';

const DEFAULT_ICON_MAP: Record<string, string> = {
  pdf: '📄', doc: '📝', docx: '📝', xls: '📊', xlsx: '📊', ppt: '📽️', pptx: '📽️',
  zip: '📦', rar: '📦', '7z': '📦', gz: '📦',
  mp4: '🎬', mov: '🎬', avi: '🎬', mkv: '🎬',
  mp3: '🎵', wav: '🎵', flac: '🎵', aac: '🎵',
  jpg: '🖼️', jpeg: '🖼️', png: '🖼️', gif: '🖼️', svg: '🖼️', webp: '🖼️',
  image: '🖼️', video: '🎬', audio: '🎵', '*': '📎',
};

  const resolveFileIcon = (): JSX.Element => {
    const ext = fileExt(displayName());
    const map = { ...DEFAULT_ICON_MAP, ...local.iconMap };
    const key = (ext ? map[ext] : undefined) ?? map['*'];
    if (key != null) return <span class={styles.fileIconLabel}>{key}</span>;
    return <span class={styles.fileIconLabel}>{ext || 'FILE'}</span>;
  };

  const avatarRadius = () =>
    local.avatarShape === 'circle' ? '50%' : local.avatarShape === 'rounded' ? '8px' : '4px';

  const bubbleStyle = (): Record<string, any> => {
    const s: Record<string, any> = {};
    if (local.maxWidth) s['--sc-chat-max-width'] = local.maxWidth;
    if (local.bgColor) {
      s['--sc-chat-bubble-bg'] = local.bgColor;
      s['--sc-chat-bubble-bg-left'] = local.bgColor;
      s['--sc-chat-bubble-bg-self'] = local.bgColor;
      s['--sc-chat-bg'] = local.bgColor; // legacy
    }
    if (local.borderRadius) {
      s['--sc-chat-radius'] = local.borderRadius;
      s['--sc-chat-tail-radius'] = local.borderRadius;
    }
    return s;
  };

  const isBubbleStatus = () => local.statusPosition === 'bubble';

  const statusIcon = () => {
    const st = local.status;
    if (!st || !isSelf()) return null;
    const custom = local.statusIcon?.[st];
    if (custom) return custom;
    if (st === 'sending') return <Loading type="spinner" size={14} />;
    if (st === 'sent') return <span class={styles.statusSent}>✓</span>;
    if (st === 'read') return <span class={styles.statusRead} style="color:#22c55e">✓</span>;
    if (st === 'failed')
      return (
        <span class={styles.statusFailed} onClick={local.onRetry} title="Tap to retry">
          <svg class={styles.retryIcon} viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
        </span>
      );
    return null;
  };

  const renderBubble = () => {
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
          <div
            class={styles.videoBubble}
            onClick={e => {
              const vid = (e.currentTarget as HTMLElement).querySelector('video');
              if (!vid) return;
              vid.paused ? vid.play() : vid.pause();
            }}
          >
            <Show when={local.src}>
              <video src={local.src} controls playsinline />
            </Show>
          </div>
        );

      case 'file':
        return (
          <div
            class={styles.fileBubble}
            classList={{ [styles.fileBubbleClickable!]: !!(local.src || local.onDownload) }}
            onClick={() => {
              if (local.onDownload) { local.onDownload(); return; }
              if (local.src) window.open(local.src, '_blank');
              local.onContentClick?.();
            }}
          >
            <div class={styles.fileIcon}>{resolveFileIcon()}</div>
            <div style={{ 'min-width': 0, flex: 1 }}>
              <div class={styles.fileName}>{displayName() || 'Unknown file'}</div>
              <Show when={displaySize()}><div class={styles.fileSize}>{displaySize()}</div></Show>
            </div>
            <Show when={local.progress != null}>
              <div class={styles.progressTrack}>
                <div class={styles.progressBar} style={{ width: `${Math.min(100, Math.max(0, local.progress!))}%` }} />
              </div>
            </Show>
          </div>
        );

      case 'custom':
        return local.children ?? <div class={styles.bubble}> </div>;

      case 'plainText':
      default:
        return (
          <div class={styles.bubble} classList={{ [styles.bubbleInteractive!]: hasMenu() && !local.selectOnLongPress }} style={{ ...bubbleStyle(), ...(isBubbleStatus() ? { 'padding-right': '28px' } : {}) }} ref={bubbleRef}>
            <Show when={local.tail}>
              <span class={styles.tail} classList={{ [styles.left!]: !isSelf(), [styles.right!]: isSelf() }} />
            </Show>
            {local.content ?? ''}
            <Show when={isBubbleStatus() && isSelf()}><span class={styles.bubbleStatus}>{statusIcon()}</span></Show>
          </div>
        );
    }
  };

  /* ── Long press ── */
  const [menuOpen, setMenuOpen] = createSignal(false);
  let longPressTimer: ReturnType<typeof setTimeout> | null = null;
  let bubbleRef: HTMLDivElement | undefined;
  const hasMenu = () => local.longPressMenu != null;
  // selectOnLongPress only works WITHOUT longPressMenu (mutually exclusive)
  const canSelect = () => !hasMenu() && local.selectOnLongPress &&
    local.messageType === 'plainText';

  const startLongPress = () => {
    if (menuOpen()) return;
    if (!hasMenu() && !canSelect()) return;
    longPressTimer = setTimeout(() => {
      if (canSelect() && bubbleRef) {
        const range = document.createRange();
        range.selectNodeContents(bubbleRef);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      } else if (hasMenu()) {
        setMenuOpen(true);
        if (typeof document !== 'undefined') document.documentElement.style.setProperty('--sc-tooltip-bg', 'transparent');
      }
    }, 500);
  };
  const cancelLongPress = () => {
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  };
  const dismissMenu = () => {
    setMenuOpen(false);
    if (typeof document !== 'undefined') document.documentElement.style.removeProperty('--sc-tooltip-bg');
  };
  onCleanup(() => { if (longPressTimer) clearTimeout(longPressTimer); });

  // Click outside → dismiss
  const handleOutsideClick = (e: MouseEvent) => {
    if (!menuOpen()) return;
    const el = e.target as HTMLElement;
    if (!el.closest(`.${styles.menu}`) && !el.closest(`.${styles.wrapper}`)) dismissMenu();
  };
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleOutsideClick);
    onCleanup(() => document.removeEventListener('click', handleOutsideClick));
  }

  // Build menu content for Tooltip
  const menuContent = () => {
    if (!hasMenu()) return null;
    if (Array.isArray(local.longPressMenu)) {
      return (
        <div class={styles.menu}>
          <For each={local.longPressMenu as { title: string; action: () => void }[]}>
            {item => (
              <div
                class={styles.menuItem}
                onClick={() => { item.action(); dismissMenu(); }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--sc-chat-menu-item-hover-bg, #f3f4f6)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; }}
                onMouseDown={e => { (e.currentTarget as HTMLElement).style.background = 'var(--sc-chat-menu-item-active-bg, #d1d5db)'; }}
              >{item.title}</div>
            )}
          </For>
        </div>
      );
    }
    return <div class={styles.menu}>{local.longPressMenu as JSX.Element}</div>;
  };

  return (
    <div
      class={cn(styles.wrapper, styles[local.position], local.class)}
      style={typeof local.style === 'object' ? { ...bubbleStyle(), ...local.style as Record<string, any> } : bubbleStyle()}
    >
      {/* Avatar */}
      <Show when={local.showAvatar}>
        <div
          class={styles.avatar}
          style={{ width: `${local.avatarSize}px`, height: `${local.avatarSize}px`, 'border-radius': avatarRadius() }}
          onClick={local.onAvatarClick}
        >
          {typeof local.avatar === 'string' ? (
            <img src={local.avatar} alt="avatar" />
          ) : local.avatar ? (
            local.avatar
          ) : (
            <div class={styles.avatarPlaceholder} style={{ width: '100%', height: '100%' }}>
              {isSelf() ? 'Me' : '?'}
            </div>
          )}
        </div>
      </Show>

      {/* Body */}
      <div class={styles.body}
        onTouchStart={startLongPress}
        onTouchEnd={cancelLongPress}
        onTouchMove={cancelLongPress}
        onMouseDown={startLongPress}
        onMouseUp={cancelLongPress}
        onMouseLeave={cancelLongPress}
      >
        <Show when={local.header}>
          {local.header}
        </Show>
        <Show when={!local.header && local.name}>
          <div class={styles.name} classList={{ [styles.left!]: !isSelf(), [styles.right!]: isSelf() }}>
            {local.name}
          </div>
        </Show>

        <div style={{ display: 'flex', 'align-items': 'center', gap: '4px' }}>
          <Show when={local.statusPosition === 'side' && isSelf()}>{statusIcon()}</Show>
          {hasMenu() && menuOpen() ? (
            <Tooltip trigger="manual" open={true} placement="top" content={menuContent()}>
              {renderBubble()}
            </Tooltip>
          ) : (
            renderBubble()
          )}
          <Show when={local.statusPosition === 'side' && !isSelf()}>{statusIcon()}</Show>
        </div>

        <Show when={local.footer}>
          {local.footer}
        </Show>
        <Show when={!local.footer && (local.time || (isSelf() && local.status && local.statusPosition !== 'bubble' && local.statusPosition !== 'side'))}>
          <div class={styles.meta} classList={{ [styles.left!]: !isSelf(), [styles.right!]: isSelf() }}>
            <span>{local.time}</span>
            {local.statusPosition !== 'bubble' && local.statusPosition !== 'side' && statusIcon()}
          </div>
        </Show>
      </div>

    </div>
  );
};
