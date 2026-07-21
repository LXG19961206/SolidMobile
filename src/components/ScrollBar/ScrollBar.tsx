import { createMemo, mergeProps, splitProps, type Component, type JSX } from 'solid-js';
import { cn } from '../../utils';
import type { ScrollBarProps } from './types';

const defaultProps: Partial<ScrollBarProps> = {
  width: 6,
};

let instanceId = 0;

/**
 * ScrollBar — 自定义滚动条容器
 *
 * 包裹 children，注入统一风格的滚动条样式。支持亮色/暗色自动切换。
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

  const cls = `sc-sb-${++instanceId}`;
  const prefix = createMemo(() => local.native ? `.${cls} > *` : `.${cls}`);
  const w = createMemo(() => typeof local.width === 'number' ? `${local.width}px` : String(local.width));
  const c = createMemo(() => local.color || 'var(--sc-color-border, #d1d5db)');
  const t = createMemo(() => local.trackColor || 'transparent');

  return (
    <>
      <style>{`
        ${prefix()}{scrollbar-width:thin;scrollbar-color:${c()} ${t()}}
        ${prefix()}::-webkit-scrollbar{width:${w()};height:${w()}}
        ${prefix()}::-webkit-scrollbar-track{background:${t()}}
        ${prefix()}::-webkit-scrollbar-thumb{background:${c()};border-radius:calc(${w()}/2)}
        ${prefix()}::-webkit-scrollbar-button{display:none;width:0;height:0}
        ${prefix()}::-webkit-scrollbar-button:start:decrement,
        ${prefix()}::-webkit-scrollbar-button:end:increment{display:none}
        ${prefix()}::-webkit-scrollbar-corner{background:transparent}
        html.dark ${prefix()}{scrollbar-color:#475569 transparent}
        html.dark ${prefix()}::-webkit-scrollbar-thumb{background:#475569}
      `}</style>
      <div
        class={cn(cls, !local.native && 'sc-sb-overflow', local.class)}
        style={{
          overflow: local.native ? 'visible' : 'auto',
          ...(typeof local.style === 'object' ? local.style : {}),
        }}
        {...rest}
      >
        {local.children}
      </div>
    </>
  );
};
