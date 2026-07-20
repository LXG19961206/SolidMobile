import { createUniqueId, mergeProps, splitProps, type Component, type JSX } from 'solid-js';
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
  const [local, rest] = splitProps(props, ['width', 'color', 'trackColor', 'native', 'class', 'style', 'children']);

  const cssVars = () => {
    const v: Record<string, string> = {};
    v['--sc-scrollbar-width'] = typeof local.width === 'number' ? `${local.width}px` : String(local.width);
    if (local.color) v['--sc-scrollbar-color'] = local.color;
    if (local.trackColor) v['--sc-scrollbar-track'] = local.trackColor;
    return v;
  };

  const s = cssVars();
  const id = createUniqueId();
  const prefix = local.native ? `#${id} > *` : `#${id}`;
  const w = s['--sc-scrollbar-width'] || '6px';
  const c = s['--sc-scrollbar-color'] || '#d1d5db';
  const t = s['--sc-scrollbar-track'] || 'transparent';

  return (
    <>
      <style>{`
        ${prefix}{scrollbar-width:thin;scrollbar-color:${c} ${t}}
        ${prefix}::-webkit-scrollbar{width:${w};height:${w}}
        ${prefix}::-webkit-scrollbar-track{background:${t}}
        ${prefix}::-webkit-scrollbar-thumb{background:${c};border-radius:calc(${w}/2)}
        ${prefix}::-webkit-scrollbar-button{display:none}
        html.dark ${prefix}{scrollbar-color:#475569 transparent}
        html.dark ${prefix}::-webkit-scrollbar-thumb{background:#475569}
      `}</style>
      <div
        id={id}
        class={cn(local.native ? undefined : styles.container, local.class)}
        style={{
          ...(local.native ? {} : { overflow: 'auto' }),
          ...(typeof local.style === 'object' ? local.style : {}),
        }}
        {...rest}
      >
        {local.children}
      </div>
    </>
  );
};
