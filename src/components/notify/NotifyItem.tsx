import { onMount, onCleanup, createSignal, Show, type Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn, scopedStyle } from '../../utils';
import type { NotifyOptions } from './types';
import rawStyles from './Notify.module.css';
const styles = scopedStyle(rawStyles, 'sc-notify');

interface NotifyItemProps extends NotifyOptions {
  id: number;
  onDismiss: (id: number) => void;
}

/**
 * 单个 Notify 条目。由 NotifyManager 管理生命周期，不直接使用。
 */
export const NotifyItem: Component<NotifyItemProps> = (props) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const [visible, setVisible] = createSignal(false);

  const dismiss = () => {
    clearTimeout(timer);
    setVisible(false);
    // Delay removal to allow exit animation
    setTimeout(() => props.onDismiss(props.id), 200);
  };

  onMount(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setVisible(true));
    props.onOpened?.();

    if (props.duration !== 0) {
      timer = setTimeout(dismiss, props.duration ?? 3000);
    }

    // Lock scroll
    if (props.lockScroll) {
      document.body.style.overflow = 'hidden';
    }
  });

  onCleanup(() => {
    clearTimeout(timer);
    if (props.lockScroll) {
      document.body.style.overflow = '';
    }
  });

  return (
    <Portal mount={props.teleport}>
      <div
        class={cn(
          styles.bar,
          props.type && styles[props.type],
          props.position === 'bottom' && styles.bottom,
          !props.position && styles.top,
          props.onClick && styles.clickable,
          props.closeable && styles.closeable,
          props.className,
        )}
        style={{
          'z-index': props.zIndex ?? 2000,
          color: props.color ?? '#fff',
          ...(props.background ? { background: props.background } : {}),
          opacity: visible() ? 1 : 0,
          transform: visible()
            ? 'translateY(0)'
            : props.position === 'bottom'
              ? 'translateY(100%)'
              : 'translateY(-100%)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
        role="alert"
        aria-live="polite"
        onClick={(e) => props.onClick?.(e)}
      >
        <Show when={props.closeable}>
          <span class={styles.closeBtn} onClick={(e) => { e.stopPropagation(); dismiss(); }}>✕</span>
        </Show>
        {props.message}
      </div>
    </Portal>
  );
};
