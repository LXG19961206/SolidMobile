import { mergeProps, splitProps, Show, type Component } from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import type { DividerProps } from './types';
import rawStyles from './Divider.module.css';
const styles = scopedStyle(rawStyles, 'sc-divider');

const defaultProps: Partial<DividerProps> = {
  direction: 'horizontal',
};

export const Divider: Component<DividerProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, ['direction', 'text', 'dashed', 'color', 'size', 'class', 'style']);

  const isVertical = () => local.direction === 'vertical';
  const hasText = () => !!local.text && !isVertical();

  const lineStyle = () => {
    const s: Record<string, string> = {};
    if (local.color) s['--sc-divider-color'] = local.color;
    if (local.size) s['--sc-divider-size'] =
      typeof local.size === 'number' ? `${local.size}px` : local.size;
    return s;
  };

  return (
    <div
      role="separator"
      aria-orientation={local.direction}
      class={cn(
        styles.divider,
        isVertical() ? styles.vertical : styles.horizontal,
        hasText() && styles.withText,
        local.dashed && styles.dashed,
        local.class,
      )}
      style={{ ...lineStyle(), ...(typeof local.style === 'object' ? local.style : {}) }}
      {...rest}
    >
      <Show when={hasText()}>
        <span class={styles.text}>{local.text}</span>
      </Show>
    </div>
  );
};
