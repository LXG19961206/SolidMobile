import { createMemo, mergeProps, onMount, splitProps, type Component, type JSX } from 'solid-js';
import type { ScrollBarProps } from './types';

const defaultProps: Partial<ScrollBarProps> = {
  width: 6,
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
  const [local] = splitProps(props, ['width', 'color', 'trackColor', 'class', 'style', 'children']);

  const cls = `sc-sb-${++instanceId}`;
  const w = createMemo(() => typeof local.width === 'number' ? `${local.width}px` : String(local.width));
  const c = createMemo(() => local.color || 'var(--sc-color-border, #d1d5db)');
  const t = createMemo(() => local.trackColor || 'transparent');

  let wrapperRef!: HTMLSpanElement;

  onMount(() => {
    const child = wrapperRef?.firstElementChild as HTMLElement | null;
    if (child) child.classList.add(cls);
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
