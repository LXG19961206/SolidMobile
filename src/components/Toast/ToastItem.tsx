import { onMount, onCleanup, type Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Overlay } from '../Overlay';
import type { ToastOptions } from './types';
import rawStyles from './Toast.module.css';
import { scopedStyle } from '../../utils';
const styles = scopedStyle(rawStyles, 'sc-toast');

interface ToastItemProps extends ToastOptions {
  id: number;
  onDismiss: (id: number) => void;
}

/**
 * 单个 Toast 条目。由 ToastManager 管理生命周期，不直接使用。
 */
export const ToastItem: Component<ToastItemProps> = (props) => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const dismiss = () => {
    clearTimeout(timer);
    props.onDismiss(props.id);
    // onClose is called by ToastManager.remove()
  };

  onMount(() => {
    if (props.duration !== 0) {
      timer = setTimeout(dismiss, props.duration ?? 3000);
    }
  });

  onCleanup(() => clearTimeout(timer));

  const iconText = () => {
    if (props.icon) return null;
    switch (props.type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '!';
      case 'loading': return '↻';
      default: return null;
    }
  };

  const isCustomIcon = () => !!props.icon;

  const stackGap = 56; // px between stacked toasts
  const stackOffset = () => {
    const idx = (props as any).stackIndex ?? 0;
    if (!idx) return 0;
    return idx * stackGap * (props.position === 'bottom' ? -1 : 1);
  };

  return (
    <Portal mount={props.portalMount}>
      <div
        class={styles.wrapper}
        classList={{
          [styles.top!]: props.position === 'top',
          [styles.middle!]: !props.position || props.position === 'middle',
          [styles.bottom!]: props.position === 'bottom',
        }}
        style={{ 'z-index': props.zIndex ?? 1000 }}
        role="status"
        aria-live="polite"
      >
        {/* Overlay — confined to Portal mount target, not global body */}
        <Overlay
          open={!!props.overlay}
          mount={props.portalMount}
          lockScroll={false}
          onClose={() => dismiss()}
          duration={200}
        />

        {/* Bubble — with stack offset */}
        <div style={{ transform: stackOffset() ? `translateY(${stackOffset()}px)` : undefined }}>
        <div
          class={styles.bubble}
          classList={{
            [styles.clickable!]: props.closeOnClick,
          }}
          onClick={() => props.closeOnClick && dismiss()}
        >
          {/* Icon */}
          {(iconText() || isCustomIcon()) && (
            <span
              class={styles.icon}
              classList={{ [styles.spin!]: props.type === 'loading' }}
            >
              {isCustomIcon() ? props.icon : iconText()}
            </span>
          )}

          {/* Message */}
          <span class={styles.message}>{props.message}</span>
        </div>
        </div>
      </div>
    </Portal>
  );
};
