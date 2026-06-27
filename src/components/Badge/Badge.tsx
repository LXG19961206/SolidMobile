import { mergeProps, splitProps, Show, type Component } from 'solid-js';
import { cn } from '../../utils';
import type { BadgeProps } from './types';
import styles from './Badge.module.css';

const defaultProps: Partial<BadgeProps> = {
  position: 'top-right',
};

export const Badge: Component<BadgeProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, ['content', 'dot', 'max', 'position', 'color', 'children', 'class', 'style']);

  const displayText = () => {
    if (local.dot) return '';
    if (local.content == null) return '';
    if (typeof local.content === 'number' && local.max && local.content > local.max) return `${local.max}+`;
    return String(local.content);
  };

  const showBadge = () => local.dot || local.content != null;

  return (
    <span class={cn(styles.wrapper, local.class)}
      style={typeof local.style === 'object' ? local.style : undefined} {...rest}>
      {local.children}
      <Show when={showBadge()}>
        <span
          class={cn(
            styles.badge,
            local.dot && styles.dot,
            !local.children && styles.standalone,
            styles[local.position!],
          )}
          style={local.color ? { background: local.color } : undefined}
        >
          {displayText()}
        </span>
      </Show>
    </span>
  );
};
