import { createSignal, For } from 'solid-js';
import { NotifyItem } from './NotifyItem';
import type { JSX } from 'solid-js';
import type { NotifyOptions, NotifyHandle, NotifyType } from './types';

interface NotifyEntry extends NotifyOptions {
  id: number;
}

/* ---------------------------------------------------------------------- */
/*  Module-level state — enables imperative Notify.show() from anywhere   */
/* ---------------------------------------------------------------------- */

let nextId = 0;
const [notifies, setNotifies] = createSignal<NotifyEntry[]>([]);
const onCloseCallbacks = new Map<number, (() => void) | undefined>();
const onOpenedCallbacks = new Map<number, (() => void) | undefined>();

function remove(id: number) {
  const cb = onCloseCallbacks.get(id);
  if (cb) cb();
  onCloseCallbacks.delete(id);
  onOpenedCallbacks.delete(id);
  setNotifies((prev) => prev.filter((n) => n.id !== id));
}

function add(options: NotifyOptions): NotifyHandle {
  const id = ++nextId;
  onCloseCallbacks.set(id, options.onClose);
  onOpenedCallbacks.set(id, options.onOpened);

  // Replace existing notify at same position
  const position = options.position || 'top';
  setNotifies((prev) => {
    const rest = prev.filter((n) => (n.position || 'top') !== position);
    return [...rest, { ...options, id }];
  });

  return { id, dismiss: () => remove(id) };
}

/* ---------------------------------------------------------------------- */
/*  Convenience methods                                                   */
/* ---------------------------------------------------------------------- */

function show(message: string | JSX.Element, type?: NotifyType, opts?: Partial<NotifyOptions>): NotifyHandle {
  return add({ message, type: type ?? 'danger', duration: 3000, ...opts });
}
function primary(message: string | JSX.Element, opts?: Partial<NotifyOptions>): NotifyHandle {
  return add({ message, type: 'primary', duration: 3000, ...opts });
}
function success(message: string | JSX.Element, opts?: Partial<NotifyOptions>): NotifyHandle {
  return add({ message, type: 'success', duration: 2000, ...opts });
}
function warning(message: string | JSX.Element, opts?: Partial<NotifyOptions>): NotifyHandle {
  return add({ message, type: 'warning', duration: 3000, ...opts });
}
function danger(message: string | JSX.Element, opts?: Partial<NotifyOptions>): NotifyHandle {
  return add({ message, type: 'danger', duration: 3000, ...opts });
}

function dismissAll() {
  setNotifies([]);
}

/* ---------------------------------------------------------------------- */
/*  Imperative API (exported as `Notify`)                                 */
/* ---------------------------------------------------------------------- */

export const Notify = {
  /** 完整配置显示 notify，返回句柄 */
  show: (options: NotifyOptions): NotifyHandle => add(options),
  /** 主要通知 */
  primary,
  /** 成功通知 */
  success,
  /** 警告通知 */
  warning,
  /** 危险/错误通知 */
  danger,
  /** 关闭所有 notify */
  dismissAll,
} as const;

/* ---------------------------------------------------------------------- */
/*  Renderer — mount once at app root                                     */
/* ---------------------------------------------------------------------- */

export function NotifyRenderer() {
  return (
    <For each={notifies()}>
      {(n) => <NotifyItem {...n} onDismiss={remove} />}
    </For>
  );
}
