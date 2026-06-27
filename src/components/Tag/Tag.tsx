import { mergeProps, splitProps, Show, type Component } from 'solid-js';
import { cn } from '../../utils';
import type { TagProps } from './types';
import styles from './Tag.module.css';

const defaultProps: Partial<TagProps> = {
  type: 'primary',
  variant: 'solid',
  size: 'md',
};

export const Tag: Component<TagProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, ['type', 'variant', 'size', 'round', 'closeable', 'onClose', 'children', 'class', 'style', 'color']);

  return (
    <span
      class={cn(
        styles.tag,
        styles[local.variant!],
        styles[local.type!],
        styles[local.size!],
        local.round && styles.round,
        local.class,
      )}
      style={{
        ...(local.color ? { background: local.color, borderColor: local.color } : {}),
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
