import { mergeProps, splitProps, Show, type Component } from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import type { CellGroupProps } from './types';
import rawStyles from './Cell.module.css';
const styles = scopedStyle(rawStyles, 'sc-cell');

const defaultProps: Partial<CellGroupProps> = {
  border: true,
};

/**
 * CellGroup 单元格分组 — 将多个 Cell 归为一组，支持标题和卡片模式。
 *
 * @example 基础用法
 * ```tsx
 * <CellGroup title="基本信息">
 *   <Cell title="用户名" value="张三" />
 *   <Cell title="手机号" value="138****8888" />
 * </CellGroup>
 * ```
 *
 * @example 卡片模式
 * ```tsx
 * <CellGroup title="设置" card>
 *   <Cell title="通知" clickable />
 *   <Cell title="隐私" clickable />
 * </CellGroup>
 * ```
 */
export const CellGroup: Component<CellGroupProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local, rest] = splitProps(props, [
    'title',
    'children',
    'card',
    'border',
    'class',
    'style',
  ]);

  return (
    <div
      class={cn(styles.group, local.card && styles.card, local.class)}
      style={typeof local.style === 'object' ? local.style : undefined}
      {...rest}
    >
      <Show when={local.title}>
        <div class={styles.groupTitle}>{local.title}</div>
      </Show>
      <div
        class={styles.cells}
        style={!local.border ? { '--_cell-border': 'none' } : undefined}
      >
        {local.children}
      </div>
    </div>
  );
};
