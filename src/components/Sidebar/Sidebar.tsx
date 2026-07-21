import { For, mergeProps, splitProps, type Component } from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import type { SidebarProps } from './types';
import rawStyles from './Sidebar.module.css';

const styles = scopedStyle(rawStyles, 'sc-sidebar');

const defaultProps: Partial<SidebarProps> = {
  width: 90,
};

/**
 * Sidebar — 垂直分组导航。
 *
 * 常用于弹出面板或侧边栏中切换多个表格/分组。
 */
export const Sidebar: Component<SidebarProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, ['items', 'activeKey', 'onChange', 'width', 'class', 'style']);

  return (
    <div
      class={cn(styles.root, local.class)}
      style={{
        width: typeof local.width === 'number' ? `${local.width}px` : local.width,
        ...local.style,
      }}
    >
      <For each={local.items}>
        {(item) => (
          <div
            onClick={() => local.onChange(item.key)}
            class={cn(styles.item, local.activeKey === item.key && styles.active)}
          >
            {item.title}
          </div>
        )}
      </For>
    </div>
  );
};
