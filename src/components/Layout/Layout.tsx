import { mergeProps, splitProps, type Component } from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import type { RowProps, ColProps } from './types';
import rawStyles from './Layout.module.css';
const styles = scopedStyle(rawStyles, 'sc-layout');

export const Row: Component<RowProps> = (rawProps) => {
  const props = mergeProps({}, rawProps);
  const [local, rest] = splitProps(props, ['gap', 'align', 'justify', 'wrap', 'children', 'class', 'style']);

  // 用负 margin + CSS 变量替代 gap，避免百分比 span + gap 溢出
  // Col 通过 padding 实现间距，Row 用负 margin 抵消两端多余的 padding
  const gapValue = typeof local.gap === 'number' ? `${local.gap}px` : local.gap;
  const halfGap = gapValue ? (typeof local.gap === 'number' ? `${-local.gap / 2}px` : `calc(${gapValue} / -2)`) : undefined;

  return (
    <div
      class={cn(
        styles.row,
        local.wrap && styles.wrap,
        local.align && styles[`align${local.align[0].toUpperCase() + local.align.slice(1)}` as keyof typeof styles],
        local.justify && styles[`justify${local.justify[0].toUpperCase() + local.justify.slice(1)}` as keyof typeof styles],
        local.class,
      )}
      style={{
        '--sc-row-gap': gapValue,
        ...(halfGap ? { 'margin-left': halfGap, 'margin-right': halfGap } : {}),
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
      {...rest}
    >
      {local.children}
    </div>
  );
};

export const Col: Component<ColProps> = (rawProps) => {
  const props = mergeProps({}, rawProps);
  const [local, rest] = splitProps(props, ['span', 'offset', 'children', 'class', 'style']);

  return (
    <div
      class={cn(
        styles.col,
        local.span != null && styles[`span${local.span}` as keyof typeof styles],
        local.offset != null && styles[`offset${local.offset}` as keyof typeof styles],
        local.class,
      )}
      style={{
        '--sc-row-gap': 'var(--sc-row-gap)',
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
      {...rest}
    >
      {local.children}
    </div>
  );
};
