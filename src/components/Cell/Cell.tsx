import { mergeProps, splitProps, Show, type Component } from 'solid-js';
import { cn } from '../../utils';
import { Icon } from '../Icon';
import type { CellProps } from './types';
import styles from './Cell.module.css';

const defaultProps: Partial<CellProps> = {
  size: 'md',
};

/**
 * Cell 单元格 — 列表项的基础组件，配合 CellGroup 使用。
 *
 * 支持标题、描述、右侧值、左侧图标、可点击模式（自动显示箭头）等常见布局。
 * 也支持通过 children 完全自定义内容。
 *
 * @example 基础用法
 * ```tsx
 * <Cell title="用户名" value="张三" />
 * <Cell title="手机号" value="138****8888" clickable />
 * <Cell title="简介" description="这是一段描述文字" />
 * ```
 */
export const Cell: Component<CellProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local, rest] = splitProps(props, [
    'title',
    'value',
    'description',
    'children',
    'icon',
    'size',
    'required',
    'center',
    'clickable',
    'onClick',
    'class',
    'style',
    'id',
  ]);

  // ── Icon ──
  const renderIcon = () => {
    if (!local.icon) return null;
    return (
      <span class={styles.icon}>
        {typeof local.icon === 'string' ? <Icon name={local.icon} /> : local.icon}
      </span>
    );
  };

  return (
    <div
      class={cn(
        styles.cell,
        styles[local.size!],
        local.clickable && styles.clickable,
        local.center && styles.center,
        local.class,
      )}
      style={typeof local.style === 'object' ? local.style : undefined}
      id={local.id}
      onClick={() => {
        if (local.clickable) local.onClick?.();
      }}
      role={local.clickable ? 'button' : undefined}
      tabIndex={local.clickable ? 0 : undefined}
      aria-required={local.required ? true : undefined}
      onKeyDown={
        local.clickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                local.onClick?.();
              }
            }
          : undefined
      }
      {...rest}
    >
      <Show
        when={!local.children}
        fallback={<div class={styles.body}>{local.children}</div>}
      >
        {renderIcon()}

        <div class={styles.body}>
          <div class={styles.titleRow}>
            <Show when={local.required}>
              <span class={styles.required} aria-hidden="true">*</span>
            </Show>
            <Show when={local.title}>
              <span class={styles.title}>{local.title}</span>
            </Show>
          </div>
          <Show when={local.description}>
            <span class={styles.description}>{local.description}</span>
          </Show>
        </div>

        <Show when={local.value}>
          <span class={styles.value}>{local.value}</span>
        </Show>

        <Show when={local.clickable}>
          <span class={styles.arrow}>
            <Icon name="arrow-right" size={16} />
          </span>
        </Show>
      </Show>
    </div>
  );
};
