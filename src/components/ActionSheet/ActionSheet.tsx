import {
  createSignal,
  createEffect,
  onCleanup,
  on,
  Show,
  For,
  mergeProps,
  splitProps,
  type Component,
} from 'solid-js';
import { cn } from '../../utils';
import { Overlay } from '../Overlay';
import { Icon } from '../Icon';
import type { ActionSheetItem, ActionSheetProps } from './types';
import styles from './ActionSheet.module.css';

const defaultProps: Partial<ActionSheetProps> = {
  closeOnSelect: true,
  closeOnOverlayClick: true,
  round: true,
  lockScroll: true,
};

/**
 * ActionSheet 动作面板 — 从底部弹出的选项菜单。
 *
 * 支持标准选项列表、自定义内容、标题栏、描述文字、取消按钮等完整功能。
 * 基于 Overlay 组件，自带遮罩、动画和滚动锁定。
 *
 * @example 基础用法
 * ```tsx
 * <ActionSheet
 *   open={open()}
 *   onClose={() => setOpen(false)}
 *   items={[
 *     { name: '选项一' },
 *     { name: '选项二', subname: '副标题' },
 *   ]}
 *   onSelect={(item, index) => console.log(item, index)}
 * />
 * ```
 *
 * @example 带标题和取消
 * ```tsx
 * <ActionSheet
 *   open={open()}
 *   onClose={() => setOpen(false)}
 *   title="选择操作"
 *   closeable
 *   cancelText="取消"
 *   items={[{ name: '编辑' }, { name: '删除' }]}
 * />
 * ```
 */
export const ActionSheet: Component<ActionSheetProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local, rest] = splitProps(props, [
    'open',
    'onClose',
    'items',
    'children',
    'title',
    'closeable',
    'description',
    'cancelText',
    'onCancel',
    'closeOnSelect',
    'closeOnOverlayClick',
    'round',
    'zIndex',
    'lockScroll',
    'mount',
    'onSelect',
    'class',
    'style',
    'id',
  ]);

  // ── Animation state ──
  const [mounted, setMounted] = createSignal(false);
  const [visible, setVisible] = createSignal(false);
  const duration = 280; // ms, matches CSS transition

  createEffect(
    on(
      () => local.open,
      (isOpen) => {
        if (isOpen) {
          setMounted(true);
          requestAnimationFrame(() => setVisible(true));
        } else {
          setVisible(false);
          setTimeout(() => setMounted(false), duration);
        }
      },
    ),
  );

  // ── Has header? ──
  const hasHeader = () => !!(local.title || local.closeable);

  // ── Item click ──
  const handleItemClick = (item: ActionSheetItem, index: number) => {
    if (item.disabled || item.loading) return;
    local.onSelect?.(item, index);
    if (local.closeOnSelect) {
      local.onClose();
    }
  };

  // ── Cancel ──
  const handleCancel = () => {
    local.onCancel?.();
    local.onClose();
  };

  // ── Overlay close ──
  const handleOverlayClose = () => {
    if (local.closeOnOverlayClick) {
      local.onClose();
    }
  };

  // ── Classes ──
  const sheetClasses = () =>
    cn(
      styles.sheet,
      visible() && styles.enter,
      !visible() && mounted() && styles.exit,
      local.round && styles.round,
      local.class,
    );

  return (
    <Show when={mounted()}>
      <Overlay
        open={true}
        onClose={handleOverlayClose}
        zIndex={local.zIndex}
        lockScroll={local.lockScroll}
        duration={duration}
        mount={local.mount}
      >
        <div
          class={sheetClasses()}
          id={local.id}
          style={local.style as JSX.CSSProperties}
          role="dialog"
          aria-label={local.title || '动作面板'}
          onClick={(e) => e.stopPropagation()}
          {...rest}
        >
          {/* ── Header ── */}
          <Show when={hasHeader()}>
            <div class={styles.header}>
              <span class={styles.title}>{local.title || ''}</span>
              <Show when={local.closeable}>
                <button
                  class={styles.closeBtn}
                  onClick={() => local.onClose()}
                  aria-label="关闭"
                >
                  <Icon name="close" size={20} />
                </button>
              </Show>
            </div>
          </Show>

          {/* ── Description ── */}
          <Show when={local.description}>
            <div class={styles.description}>{local.description}</div>
          </Show>

          {/* ── Content ── */}
          <Show
            when={!local.children}
            fallback={<div class={styles.content}>{local.children}</div>}
          >
            <div class={styles.items}>
              <For each={local.items}>
                {(item, index) => (
                  <div
                    class={cn(
                      styles.item,
                      item.subname && styles.itemBoth,
                      !item.subname && styles.itemSingle,
                      item.disabled && styles.itemDisabled,
                      item.loading && styles.itemLoading,
                    )}
                    classList={{
                      [styles.itemDisabled!]: !!item.disabled,
                    }}
                    onClick={() => handleItemClick(item, index())}
                    role="menuitem"
                    aria-disabled={item.disabled || item.loading}
                  >
                    <span class={styles.itemName}>{item.name}</span>
                    <Show when={item.subname}>
                      <span class={styles.itemSubname}>{item.subname}</span>
                    </Show>
                    <Show when={item.loading}>
                      <span class={styles.itemSpinner}>
                        <Icon name="refresh" size={16} />
                      </span>
                    </Show>
                  </div>
                )}
              </For>
            </div>
          </Show>

          {/* ── Cancel button ── */}
          <Show when={local.cancelText && !local.children}>
            <div class={styles.cancelGap} />
            <button class={styles.cancelBtn} onClick={handleCancel}>
              {local.cancelText}
            </button>
          </Show>

          {/* ── Safe area ── */}
          <div class={styles.safeArea} />
        </div>
      </Overlay>
    </Show>
  );
};
