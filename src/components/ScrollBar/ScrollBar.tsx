import { createMemo, mergeProps, onMount, splitProps, type Component, type JSX } from 'solid-js';
import type { ScrollBarProps } from './types';

const defaultProps: Partial<ScrollBarProps> = {
  width: 6,
  direction: 'vertical',
};

let instanceId = 0;

/**
 * ScrollBar — 抽象滚动条组件，不产生任何 DOM。
 *
 * 向第一个子元素注入自定义滚动条样式（class + <style> 标签）。
 *
 * @example
 * ```tsx
 * <ScrollBar width={6}>
 *   <div style={{ height: '400px', overflow: 'auto' }}>long content...</div>
 * </ScrollBar>
 * ```
 */
export const ScrollBar: Component<ScrollBarProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, ['width', 'color', 'trackColor', 'direction', 'height', 'children']);

  const cls = `sc-scrollbar-${++instanceId}`;
  const w = createMemo(() => typeof local.width === 'number' ? `${local.width}px` : String(local.width));
  const c = createMemo(() => local.color || 'var(--sc-color-border, #d1d5db)');
  const t = createMemo(() => local.trackColor || 'transparent');

  let wrapperRef!: HTMLSpanElement;

  const overflow = createMemo(() => {
    const d = local.direction;
    if (d === 'both') return 'auto';
    return d === 'horizontal' ? 'auto hidden' : 'hidden auto';
  });

  onMount(() => {
    const child = wrapperRef?.firstElementChild as HTMLElement | null;
    if (child) {
      child.classList.add(cls);
      const s = child.style;
      if (!s.overflow || s.overflow === 'visible') s.overflow = overflow();
      if (!s.overflowX || s.overflowX === 'visible') s.overflowX = local.direction === 'horizontal' || local.direction === 'both' ? 'auto' : 'hidden';
      if (!s.overflowY || s.overflowY === 'visible') s.overflowY = local.direction === 'vertical' || local.direction === 'both' ? 'auto' : 'hidden';
      if (local.height && !s.height) s.height = typeof local.height === 'number' ? `${local.height}px` : local.height;
    }
  });

  return (
    <>
      <style>{`
        .${cls}{scrollbar-width:thin;scrollbar-color:${c()} ${t()}}
        .${cls}::-webkit-scrollbar{width:${w()};height:${w()}}
        .${cls}::-webkit-scrollbar-track{background:${t()}}
        .${cls}::-webkit-scrollbar-thumb{background:${c()};border-radius:calc(${w()}/2)}
        .${cls}::-webkit-scrollbar-button{display:none;width:0;height:0}
        .${cls}::-webkit-scrollbar-button:start:decrement,
        .${cls}::-webkit-scrollbar-button:end:increment{display:none}
        .${cls}::-webkit-scrollbar-corner{background:transparent}
        html.dark .${cls}{scrollbar-color:#475569 transparent}
        html.dark .${cls}::-webkit-scrollbar-thumb{background:#475569}
      `}</style>
      <span ref={wrapperRef} style={{ display: 'contents' }}>
        {local.children}
      </span>
    </>
  );
};
