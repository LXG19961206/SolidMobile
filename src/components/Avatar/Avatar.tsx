import {
  createSignal,
  mergeProps,
  splitProps,
  Show,
  type Component,
  type JSX,
} from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import { Icon } from '../Icon';
import type { AvatarProps, AvatarSize } from './types';
import rawStyles from './Avatar.module.css';
const styles = scopedStyle(rawStyles, 'sc-avatar');

const SIZE_MAP: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const defaultProps: Partial<AvatarProps> = {
  size: 'md',
  round: true,
};

/**
 * Avatar 头像 — 用于用户、联系人等场景的图片/图标/文字头像。
 *
 * 优先级：src（图片）→ icon（图标）→ text（首字符）。
 * src 加载失败时自动降级到 icon 或 text。
 *
 * @example 图片头像
 * ```tsx
 * <Avatar src="user.jpg" size="lg" />
 * ```
 *
 * @example 图标头像
 * ```tsx
 * <Avatar icon="user" size="md" color="#1677ff" />
 * ```
 *
 * @example 文字头像
 * ```tsx
 * <Avatar text="张三" color="#f59e0b" />
 * ```
 *
 * @example 方形头像
 * ```tsx
 * <Avatar src="logo.png" square size="xl" />
 * ```
 */
export const Avatar: Component<AvatarProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, [
    'src', 'alt', 'size', 'round', 'square', 'icon', 'text', 'color', 'class', 'style',
  ]);

  // ── Image load state ──
  const [imgFailed, setImgFailed] = createSignal(false);
  const showImg = () => !!local.src && !imgFailed();

  // ── Computed size ──
  const sizePx = (): number =>
    typeof local.size === 'number' ? local.size : SIZE_MAP[local.size as AvatarSize] || 40;

  const sizeStyle = (): JSX.CSSProperties => ({
    width: `${sizePx()}px`,
    height: `${sizePx()}px`,
  });

  // ── Square radius ──
  const isSquare = () => local.square !== undefined && local.square !== false;
  const squareRadius = (): string | undefined => {
    if (!isSquare()) return undefined;
    if (typeof local.square === 'number') return `${local.square}px`;
    return undefined; // use CSS default
  };

  // ── Fallback text (first char) ──
  const fallbackChar = () => {
    const t = local.text;
    if (!t) return null;
    return t.trim().charAt(0);
  };

  // ── Has fallback? ──
  const hasFallback = () => !!local.icon || !!fallbackChar();

  return (
    <span
      class={cn(
        styles.avatar,
        isSquare() ? styles.square : local.round && styles.round,
        typeof local.size === 'string' && styles[local.size],
        local.class,
      )}
      style={{
        ...sizeStyle(),
        ...(local.color ? { 'background-color': local.color, color: '#fff' } : {}),
        ...(isSquare() && squareRadius() ? { 'border-radius': squareRadius() } : {}),
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
      role="img"
      aria-label={local.alt || (typeof local.text === 'string' ? local.text : undefined)}
      {...rest}
    >
      {/* Image mode */}
      <Show when={showImg()}>
        <img
          class={styles.img}
          src={local.src}
          alt={local.alt || ''}
          onError={() => setImgFailed(true)}
        />
      </Show>

      {/* Fallback: icon or text */}
      <Show when={!showImg() && hasFallback()}>
        <Show when={local.icon} fallback={
          <span class={styles.text}>{fallbackChar()}</span>
        }>
          <Icon name={local.icon!} size={sizePx() * 0.5} />
        </Show>
      </Show>

      {/* Ultimate fallback: default user icon */}
      <Show when={!showImg() && !hasFallback()}>
        <Icon name="user" size={sizePx() * 0.5} />
      </Show>
    </span>
  );
};
