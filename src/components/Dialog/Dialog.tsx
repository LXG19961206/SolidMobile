import {
  createSignal, createEffect, onCleanup, on,
  Show, mergeProps, splitProps, type Component,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn } from '../../utils';
import { Overlay } from '../Overlay';
import { Loading } from '../Loading';
import type { DialogProps } from './types';
import styles from './Dialog.module.css';

const defaultProps: Partial<DialogProps> = {
  width: '320px',
  messageAlign: 'center',
  showConfirmButton: true,
  showCancelButton: false,
  confirmText: '确认',
  cancelText: '取消',
  zIndex: 2000,
  overlay: true,
  lockScroll: true,
  lazyRender: true,
  closeOnClickOverlay: false,
};

/**
 * Dialog 弹窗 — 居中模态对话框。
 *
 * 支持声明式和命令式两种调用方式。
 *
 * @example 声明式
 * ```tsx
 * const [show, setShow] = createSignal(false);
 * <Dialog show={show()} onUpdateShow={setShow} title="提示" message="确认删除？" />
 * ```
 */
export const DialogComponent: Component<DialogProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'show', 'title', 'message', 'width', 'messageAlign',
    'showConfirmButton', 'showCancelButton',
    'confirmText', 'cancelText',
    'confirmDisabled', 'cancelDisabled',
    'zIndex', 'overlay', 'closeOnClickOverlay', 'lockScroll',
    'beforeClose', 'destroyOnClose', 'lazyRender', 'teleport',
    'onConfirm', 'onCancel', 'onClose', 'onUpdateShow',
    'class', 'style',
  ]);

  const [internalShow, setInternalShow] = createSignal(local.show);
  const [closing, setClosing] = createSignal(false);
  const [confirmLoading, setConfirmLoading] = createSignal(false);

  // Sync external show with internal state
  createEffect(on(() => local.show, (v) => {
    if (v) { setInternalShow(true); setClosing(false); }
    else { setClosing(true); setTimeout(() => setInternalShow(false), 250); }
  }));

  const dismiss = async (action: string) => {
    if (local.beforeClose) {
      const ok = await local.beforeClose(action);
      if (ok === false) return;
    }
    if (action === 'confirm') {
      setConfirmLoading(true);
      try { await local.onConfirm?.(); } catch {}
      setConfirmLoading(false);
    } else if (action === 'cancel') {
      local.onCancel?.();
    }
    setClosing(true);
    local.onClose?.();
    local.onUpdateShow?.(false);
    setTimeout(() => setInternalShow(false), 250);
  };

  const handleOverlayClick = () => {
    if (local.closeOnClickOverlay) dismiss('overlay');
  };

  return (
    <Show when={!local.lazyRender || internalShow()}>
      <Portal mount={(local.teleport as Node) ?? (typeof document !== 'undefined' ? document.body : undefined)}>
        <Show when={!local.destroyOnClose || internalShow()}>
          {/* Overlay */}
          <Show when={local.overlay}>
            <Overlay
              open={internalShow() && !closing()}
              mount={local.teleport as Node | undefined}
              zIndex={Number(local.zIndex)}
              lockScroll={local.lockScroll}
              duration={200}
              onClose={handleOverlayClick}
            />
          </Show>

          {/* Dialog wrapper */}
          <Show when={internalShow()}>
            <div
              class={styles.wrapper}
              style={{ 'z-index': Number(local.zIndex) + 1, 'pointer-events': closing() ? 'none' : undefined }}
            >
              <div
                class={cn(styles.card, local.class)}
                style={{
                  width: typeof local.width === 'number' ? `${local.width}px` : local.width,
                  ...(typeof local.style === 'object' ? local.style : {}),
                  opacity: closing() ? 0 : 1,
                  transform: closing() ? 'scale(0.9) translateY(10px)' : undefined,
                  transition: closing() ? 'opacity 0.2s ease, transform 0.2s ease' : undefined,
                }}
              >
                {/* Title */}
                <Show when={local.title}>
                  <div class={styles.header}>{local.title}</div>
                </Show>

                {/* Message */}
                <Show when={local.message != null}>
                  <div
                    class={cn(
                      styles.body,
                      local.messageAlign === 'left' && styles.bodyLeft,
                      local.messageAlign === 'right' && styles.bodyRight,
                      (!local.messageAlign || local.messageAlign === 'center') && styles.bodyCenter,
                    )}
                  >
                    {local.message}
                  </div>
                </Show>

                {/* Footer */}
                <Show when={local.showConfirmButton || local.showCancelButton}>
                  <div class={styles.footer}>
                    <Show when={local.showCancelButton}>
                      <button
                        class={cn(styles.btn, styles.cancelBtn)}
                        disabled={local.cancelDisabled}
                        onClick={() => dismiss('cancel')}
                      >
                        {local.cancelText}
                      </button>
                    </Show>
                    <Show when={local.showConfirmButton}>
                      <button
                        class={cn(styles.btn, styles.confirmBtn)}
                        disabled={local.confirmDisabled || confirmLoading()}
                        onClick={() => dismiss('confirm')}
                      >
                        {confirmLoading() ? <Loading size={18} /> : local.confirmText}
                      </button>
                    </Show>
                  </div>
                </Show>
              </div>
            </div>
          </Show>
        </Show>
      </Portal>
    </Show>
  );
};
