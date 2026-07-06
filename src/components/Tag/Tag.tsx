import { mergeProps, splitProps, Show, type Component } from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import type { TagProps } from './types';
import rawStyles from './Tag.module.css';
const styles = scopedStyle(rawStyles, 'sc-tag');

const defaultProps: Partial<TagProps> = {
  type: 'primary',
  variant: 'solid',
  size: 'md',
};

export const Tag: Component<TagProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, ['type', 'variant', 'size', 'round', 'closeable', 'onClose', 'children', 'class', 'style', 'color']);

  const hasCustomColor = !!local.color;

  return (
    <span
      class={cn(
        styles.tag,
        styles[local.variant!],
        !hasCustomColor && styles[local.type!],
        styles[local.size!],
        local.round && styles.round,
        local.class,
      )}
      style={{
        ...(hasCustomColor ? {
          ...(local.variant === 'outline'
            ? { background: 'transparent', borderColor: local.color, color: local.color }
            : { background: local.color, borderColor: local.color, color: '#fff' }
          ),
        } : {}),
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
      {...rest}
    >
      {local.children}
      <Show when={local.closeable}>
        <span class={styles.close} onClick={local.onClose} aria-label="关闭">✕</span>
      </Show>
    </span>
  );
};
