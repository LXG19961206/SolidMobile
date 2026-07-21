import { For, Show, mergeProps, splitProps, type Component } from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import type { SidebarProps } from './types';
import rawStyles from './Sidebar.module.css';

const styles = scopedStyle(rawStyles, 'sc-sidebar');

const defaultProps: Partial<SidebarProps> = {
  width: 90,
};

export const Sidebar: Component<SidebarProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, ['items', 'activeKey', 'onChange', 'width', 'compact', 'class', 'style']);

  return (
    <div
      class={cn(styles.root, local.class)}
      style={{
        width: local.compact ? 'auto' : typeof local.width === 'number' ? `${local.width}px` : local.width,
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
      {...rest}
    >
      <For each={local.items}>
        {(item) => (
          <div
            onClick={() => { if (!item.disabled) local.onChange(item.key); }}
            class={cn(
              styles.item,
              local.compact && styles.compact,
              local.activeKey === item.key && styles.active,
              item.disabled && styles.disabled,
            )}
            title={local.compact && typeof item.title === 'string' ? item.title : undefined}
          >
            <Show when={item.icon}>{item.icon}</Show>
            <Show when={!local.compact}><span class={styles.label}>{item.title}</span></Show>
          </div>
        )}
      </For>
    </div>
  );
};
