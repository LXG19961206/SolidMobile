import { createSignal, For, Show, createEffect, onCleanup } from 'solid-js';
import { render, Portal } from 'solid-js/web';
import { ToastItem } from './ToastItem';
import type { ToastOptions, ToastHandle, ToastType } from './types';
import { emitEvent } from '../../event-bus';

interface ToastEntry extends ToastOptions {
  id: number;
  /** Index within the same position group, for Y stacking offset */
  stackIndex: number;
}

/* ---------------------------------------------------------------------- */
/*  Module-level state — enables imperative Toast.show() from anywhere    */
/* ---------------------------------------------------------------------- */

let nextId = 0;
const [toasts, setToasts] = createSignal<ToastEntry[]>([]);
const onCloseCallbacks = new Map<number, (() => void) | undefined>();

/** Track whether the renderer was auto-mounted (vs manually placed by the user). */
let autoMounted = false;

function remove(id: number) {
  const cb = onCloseCallbacks.get(id);
  if (cb) cb();
  onCloseCallbacks.delete(id);
  setToasts((prev) => prev.filter((t) => t.id !== id));
}

/**
 * Ensure a DOM renderer exists.  If the user has already placed
 * `<ToastRenderer />` in their tree, it will have created a root node
 * with `data-sc-toast-root`.  Otherwise we auto-create one and append
 * it to `document.body`.
 */
function ensureRenderer() {
  if (document.querySelector('[data-sc-toast-root]')) return;

  const root = document.createElement('div');
  root.setAttribute('data-sc-toast-root', '');
  document.body.appendChild(root);
  autoMounted = true;

  render(() => <ToastRenderer />, root);
}

function add(options: ToastOptions): ToastHandle {
  ensureRenderer();

  const id = ++nextId;
  onCloseCallbacks.set(id, options.onClose);

  setToasts((prev) => {
    const position = options.position || 'middle';

    if (!options.stack) {
      // Replace mode: dismiss all toasts at the same position first
      for (const t of prev) {
        const tp = t.position || 'middle';
        if (tp === position) {
          const cb = onCloseCallbacks.get(t.id);
          if (cb) cb();
          onCloseCallbacks.delete(t.id);
        }
      }
      const rest = prev.filter((t) => (t.position || 'middle') !== position);
      return [...rest, { ...options, id, stackIndex: 0 }];
    }

    // Stack mode: keep all, compute index within same position group
    const same = prev.filter((t) => (t.position || 'middle') === position);
    return [...prev, { ...options, id, stackIndex: same.length }];
  });

  const handle: ToastHandle = { id, dismiss: () => remove(id) };
  emitEvent({ component: 'Toast', type: 'show', payload: options, props: options, timestamp: Date.now() });
  return handle;
}

/* ---------------------------------------------------------------------- */
/*  Convenience methods                                                     */
/* ---------------------------------------------------------------------- */

function show(message: string, type?: ToastType, opts?: Partial<ToastOptions>): ToastHandle {
  return add({ message, type, duration: 3000, ...opts });
}
function success(message: string, opts?: Partial<ToastOptions>): ToastHandle {
  return add({ message, type: 'success', duration: 2000, ...opts });
}
function error(message: string, opts?: Partial<ToastOptions>): ToastHandle {
  return add({ message, type: 'error', duration: 3000, overlay: true, ...opts });
}
function warning(message: string, opts?: Partial<ToastOptions>): ToastHandle {
  return add({ message, type: 'warning', duration: 3000, ...opts });
}
function loading(message: string, opts?: Partial<ToastOptions>): ToastHandle {
  return add({ message, type: 'loading', duration: 0, overlay: true, closeOnClick: false, ...opts });
}
function info(message: string, opts?: Partial<ToastOptions>): ToastHandle {
  return add({ message, type: 'info', duration: 2500, ...opts });
}

function dismissAll() {
  setToasts([]);
}

/* ---------------------------------------------------------------------- */
/*  Imperative API (exported as `Toast`)                                   */
/* ---------------------------------------------------------------------- */

export const Toast = {
  /** 完整配置显示 toast，返回句柄 */
  show: (options: ToastOptions): ToastHandle => add(options),
  /** 成功提示 */
  success,
  /** 失败/错误提示 */
  error,
  /** 警告提示 */
  warning,
  /** 加载中提示（不自动关闭，需手动 dismiss） */
  loading,
  /** 信息提示 */
  info,
  /** 关闭所有 toast */
  dismissAll,
} as const;

/* ---------------------------------------------------------------------- */
/*  Renderer — mount once at app root (manual) or auto-mounted above       */
/* ---------------------------------------------------------------------- */

/**
 * Manual renderer.  User places `<ToastRenderer />` in their component
 * tree for explicit control (e.g. inside a `ProviderConfig`).  When omitted,
 * the first `Toast.*()` call auto-creates a renderer in `document.body`.
 */
export function ToastRenderer() {
  // Auto-cleanup happens when the renderer's DOM parent is removed.
  // For auto-mounted nodes this is the detached div; for user-placed
  // nodes this is whatever parent they chose.
  return (
    <For each={toasts()}>
      {(t) => (
        <Show when={t.portalMount} fallback={<ToastItem {...t} onDismiss={remove} />}>
          <Portal mount={t.portalMount!}>
            <ToastItem {...t} onDismiss={remove} />
          </Portal>
        </Show>
      )}
    </For>
  );
}
