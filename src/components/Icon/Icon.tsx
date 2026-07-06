import { mergeProps, splitProps, type Component, type JSX } from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import type { IconProps } from './types';
import { icons } from './icon-registry';
import rawStyles from './Icon.module.css';
const styles = scopedStyle(rawStyles, 'sc-icon');

const defaultProps: Partial<IconProps> = {
  variant: 'line',
  size: '1em',
};

/**
 * 图标组件 — 基于 Remix Icon 精选图标集。
 *
 * 提供线性（line）和填充（fill）两种风格，覆盖导航、操作、状态、
 * 文件、商务、媒体等常用场景 130+ 语义图标。
 *
 * @example 基础用法
 * ```tsx
 * <Icon name="search" />
 * <Icon name="heart" variant="fill" color="#ff4d4f" />
 * ```
 *
 * @example 自定义尺寸
 * ```tsx
 * <Icon name="arrow-right" size={24} />
 * <Icon name="home" size="2rem" />
 * ```
 *
 * @example 与按钮组合
 * ```tsx
 * <Button icon={<Icon name="add" />}>新建</Button>
 * ```
 *
 * @example 点击交互
 * ```tsx
 * <Icon name="close" onClick={() => closeModal()} aria-label="关闭" />
 * ```
 */
export const Icon: Component<IconProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local, rest] = splitProps(props, [
    'name',
    'variant',
    'size',
    'color',
    'class',
    'style',
    'id',
    'onClick',
    'aria-label',
  ]);

  // --- Icon data lookup ---
  const svgInnerHtml = (): string => {
    const icon = icons[local.name!];
    if (!icon) return '';
    const variantData = local.variant === 'fill' && icon.fill ? icon.fill : icon.line;
    return variantData ?? '';
  };

  // --- Computed size ---
  const computedSize = (): string =>
    typeof local.size === 'number' ? `${local.size}px` : (local.size ?? '1em');

  // --- Classes ---
  const classes = () => cn(styles.icon, local.class);

  // --- Inline style ---
  const inlineStyle = (): JSX.CSSProperties => {
    const s: JSX.CSSProperties = {};
    if (typeof local.style === 'string') return s;
    if (local.style && typeof local.style === 'object') Object.assign(s, local.style as JSX.CSSProperties);
    if (local.color) s['color'] = local.color;
    return s;
  };

  // --- Aria ---
  const isDecorative = () => !local['aria-label'];
  const ariaLabel = () => local['aria-label'];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={computedSize()}
      height={computedSize()}
      fill="currentColor"
      role={isDecorative() ? 'img' : undefined}
      aria-hidden={isDecorative() ? 'true' : undefined}
      aria-label={ariaLabel()}
      class={classes()}
      style={inlineStyle()}
      id={local.id}
      onClick={local.onClick}
      {...rest}
    >
      <g innerHTML={svgInnerHtml()} />
    </svg>
  );
};
