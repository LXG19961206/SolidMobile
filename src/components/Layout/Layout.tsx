import { mergeProps, splitProps, type Component } from 'solid-js';
import { cn } from '../../utils';
import type { RowProps, ColProps } from './types';
import styles from './Layout.module.css';

export const Row: Component<RowProps> = (rawProps) => {
  const props = mergeProps({}, rawProps);
  const [local, rest] = splitProps(props, ['gap', 'align', 'justify', 'wrap', 'children', 'class', 'style']);

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
        gap: typeof local.gap === 'number' ? `${local.gap}px` : local.gap,
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
        local.span && styles[`span${local.span}` as keyof typeof styles],
        local.offset && styles[`offset${local.offset}` as keyof typeof styles],
        local.class,
      )}
      style={typeof local.style === 'object' ? local.style : undefined}
      {...rest}
    >
      {local.children}
    </div>
  );
};
