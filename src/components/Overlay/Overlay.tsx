import {
  createSignal,
  createEffect,
  onCleanup,
  on,
  mergeProps,
  splitProps,
  type Component,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn } from '../../utils';
import type { OverlayProps } from './types';
import styles from './Overlay.module.css';

const defaultProps: Partial<OverlayProps> = {
  zIndex: 999,
  lockScroll: true,
  duration: 200,
};

/**
 * 遮罩层组件 — 模态窗、弹出层、ActionSheet 等组件的基础设施。
 *
 * 渲染一个全屏半透明遮罩，支持点击背景关闭、body 滚动锁定、
 * Portal 挂载和进入动画。
 *
 * @example 基础用法
 * ```tsx
 * const [open, setOpen] = createSignal(false);
 * <Overlay open={open()} onClose={() => setOpen(false)}>
 *   <div class="my-popup">内容</div>
 * </Overlay>
 * ```
 *
 * @example 自定义 z-index
 * ```tsx
 * <Overlay open={true} zIndex={2000}>
 *   <Modal />
 * </Overlay>
 * ```
 *
 * @example 不锁定滚动（如 Toast 场景）
 * ```tsx
 * <Overlay open={true} lockScroll={false}>
 *   <Toast />
 * </Overlay>
 * ```
 */
export const Overlay: Component<OverlayProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local, rest] = splitProps(props, [
    'open',
    'onClose',
    'zIndex',
    'lockScroll',
    'mount',
    'duration',
    'children',
    'class',
    'style',
    'id',
  ]);

  // ---- Mount / animation state ----
  const [mounted, setMounted] = createSignal(false);
  const [visible, setVisible] = createSignal(false);

  let animationTimer: ReturnType<typeof setTimeout>;

  createEffect(
    on(
      () => local.open,
      (isOpen) => {
        if (isOpen) {
          setMounted(true);
          // Trigger enter animation on next frame
          animationTimer = setTimeout(() => setVisible(true), 10);
        } else {
          setVisible(false);
          // Wait for exit animation before unmounting
          animationTimer = setTimeout(
            () => setMounted(false),
            local.duration! + 10,
          );
        }
      },
    ),
  );

  onCleanup(() => clearTimeout(animationTimer));

  // ---- Body scroll lock ----
  let previousOverflow = '';

  createEffect(
    on(
      () => local.open && local.lockScroll,
      (shouldLock, prevShouldLock) => {
        if (shouldLock) {
          previousOverflow = document.body.style.overflow;
          document.body.style.overflow = 'hidden';
        } else if (prevShouldLock) {
          // Restore body scroll when overlay closes
          document.body.style.overflow = previousOverflow;
        }
      },
    ),
  );

  // Always restore body scroll on full unmount (belt + suspenders)
  onCleanup(() => {
    if (local.lockScroll && local.open) {
      document.body.style.overflow = previousOverflow;
    }
  });

  // ---- Escape key (document-level) ----
  createEffect(
    on(
      () => local.open && !!local.onClose,
      (shouldListen, prevShouldListen) => {
        if (shouldListen) {
          const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
              local.onClose!();
            }
          };
          document.addEventListener('keydown', handler);
          // Remove listener when this effect re-runs
          onCleanup(() => document.removeEventListener('keydown', handler));
        }
      },
    ),
  );

  // ---- Backdrop click ----
  const handleBackdropClick = (e: MouseEvent) => {
    // Only trigger if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      local.onClose?.();
    }
  };

  // ---- Inline style ----
  const inlineStyle = () => {
    const base: Record<string, string | number> = {
      '--sc-overlay-z-index': local.zIndex!,
      '--sc-overlay-duration': `${local.duration}ms`,
    };
    if (typeof local.style === 'object' && local.style !== null) {
      Object.assign(base, local.style);
    }
    return base;
  };

  // ---- Classes ----
  const classes = () =>
    cn(
      styles.overlay,
      visible() && styles.enter,
      !visible() && mounted() && styles.exit,
      local.class,
    );

  return (
    <Portal mount={local.mount}>
      {mounted() && (
        <div
          class={classes()}
          style={inlineStyle()}
          id={local.id}
          onClick={handleBackdropClick}
          role="presentation"
          {...rest}
        >
          <div
            class={styles.content}
            // Prevent backdrop click from firing when clicking content
            onClick={(e) => e.stopPropagation()}
          >
            {local.children}
          </div>
        </div>
      )}
    </Portal>
  );
};
