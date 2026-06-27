import {
  createSignal, createEffect, on, Show,
  mergeProps, splitProps, type Component,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn } from '../../utils';
import { Overlay } from '../Overlay';
import type { PopupProps } from './types';
import styles from './Popup.module.css';

const defaultProps: Partial<PopupProps> = {
  zIndex: 2000,
  lockScroll: true,
};

/**
 * Popup 弹出层 — 底部半屏弹出容器。
 * Cascader / Calendar 等选择器组件的弹出层基础设施。
 */
export const Popup: Component<PopupProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'show', 'onUpdateShow', 'title', 'closeable', 'onClose',
    'round', 'maxHeight', 'teleport', 'zIndex', 'lockScroll',
    'closeOnClickOverlay', 'children', 'class', 'style',
  ]);

  const [visible, setVisible] = createSignal(false);
  const [entered, setEntered] = createSignal(false);

  createEffect(on(() => local.show, (v) => {
    if (v) { setVisible(true); requestAnimationFrame(() => setEntered(true)); }
    else { setEntered(false); setTimeout(() => setVisible(false), 300); }
  }));

  function close() {
    setEntered(false);
    setTimeout(() => { setVisible(false); local.onUpdateShow?.(false); local.onClose?.(); }, 300);
  }

  return (
    <Show when={visible()}>
      <Portal mount={local.teleport as Node ?? (typeof document !== 'undefined' ? document.body : undefined)}>
        <Overlay
          open={visible()}
          mount={local.teleport as Node | undefined}
          zIndex={Number(local.zIndex)}
          lockScroll={local.lockScroll}
          duration={200}
          onClose={local.closeOnClickOverlay ? close : undefined}
        />
        <div
          class={cn(styles.sheet, entered() && styles.sheetEnter, local.round && styles.round, local.class)}
          style={{
            'max-height': typeof local.maxHeight === 'number' ? `${local.maxHeight}px` : local.maxHeight,
            ...(typeof local.style === 'object' ? local.style : {}),
          }}
        >
          <Show when={local.title || local.closeable}>
            <div class={styles.header}>
              <Show when={local.title}><span class={styles.title}>{local.title}</span></Show>
              <Show when={local.closeable}>
                <button class={styles.close} onClick={close}>✕</button>
              </Show>
            </div>
          </Show>
          <div class={styles.body}>{local.children}</div>
        </div>
      </Portal>
    </Show>
  );
};
