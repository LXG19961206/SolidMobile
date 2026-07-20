import { mergeProps, splitProps, type Component, type JSX } from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import type { ScrollBarProps } from './types';
import rawStyles from './ScrollBar.module.css';

const styles = scopedStyle(rawStyles, 'sc-scrollbar');

const defaultProps: Partial<ScrollBarProps> = {
  width: 6,
};

/**
 * ScrollBar — 自定义滚动条容器
 *
 * 包裹 children，将自定义滚动条样式注入到子元素的滚动容器上。
 * 支持亮色/暗色模式自动切换，宽度和颜色均可通过 props 或 CSS 变量控制。
 *
 * @example
 * ```tsx
 * <ScrollBar style={{ height: '400px' }}>
 *   <div>long content...</div>
 * </ScrollBar>
 * ```
 */
export const ScrollBar: Component<ScrollBarProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, ['width', 'color', 'trackColor', 'class', 'style', 'children']);

  const cssVars = () => {
    const v: Record<string, string> = {};
    v['--sc-scrollbar-width'] = typeof local.width === 'number' ? `${local.width}px` : String(local.width);
    if (local.color) v['--sc-scrollbar-color'] = local.color;
    if (local.trackColor) v['--sc-scrollbar-track'] = local.trackColor;
    return v;
  };

  return (
    <div
      class={cn(styles.container, local.class)}
      style={{ ...cssVars(), ...(typeof local.style === 'object' ? local.style : {}) }}
      {...rest}
    >
      {local.children}
    </div>
  );
};
