import { createSignal, For } from 'solid-js';
import { render } from 'solid-js/web';
import { DialogComponent } from './Dialog';
import type { DialogOptions, DialogHandle } from './types';
import { emitEvent } from '../../event-bus';

interface DialogEntry extends DialogOptions {
  id: number;
  show: boolean;
}

/* ---------------------------------------------------------------------- */
/*  Module-level state — imperative Dialog.show() from anywhere           */
/* ---------------------------------------------------------------------- */

let nextId = 0;
const [dialogs, setDialogs] = createSignal<DialogEntry[]>([]);
const autoMounted = false;

function remove(id: number) {
  setDialogs((prev) => prev.filter((d) => d.id !== id));
}

function ensureRenderer() {
  if (document.querySelector('[data-sc-dialog-root]')) return;
  const root = document.createElement('div');
  root.setAttribute('data-sc-dialog-root', '');
  document.body.appendChild(root);
  render(() => <DialogRenderer />, root);
}

function add(options: DialogOptions): DialogHandle {
  ensureRenderer();

  const id = ++nextId;
  const entry: DialogEntry = { ...options, id, show: true };
  setDialogs((prev) => [...prev, entry]);
  emitEvent({ component: 'Dialog', type: 'show', payload: options, props: options, timestamp: Date.now() });
  return { dismiss: () => update(id, false) };
}

function update(id: number, show: boolean) {
  setDialogs((prev) => prev.map((d) => (d.id === id ? { ...d, show } : d)));
  if (!show) {
    // Remove after animation
    setTimeout(() => remove(id), 300);
  }
}

/* ---------------------------------------------------------------------- */
/*  Convenience methods                                                   */
/* ---------------------------------------------------------------------- */

function show(options: DialogOptions): DialogHandle {
  return add(options);
}

function alert(options: DialogOptions): DialogHandle {
  return add({ ...options, showCancelButton: false });
}

function confirm(options: DialogOptions): DialogHandle {
  return add({ ...options, showCancelButton: true });
}

function dismissAll() {
  setDialogs([]);
}

/* ---------------------------------------------------------------------- */
/*  Imperative API                                                        */
/* ---------------------------------------------------------------------- */

export const DialogAPI = {
  show,
  alert,
  confirm,
  dismissAll,
} as const;

/* ---------------------------------------------------------------------- */
/*  Renderer — mount once at app root                                     */
/* ---------------------------------------------------------------------- */

export function DialogRenderer() {
  return (
    <For each={dialogs()}>
      {(d) => (
        <DialogComponent
          {...d}
          show={d.show}
          onUpdateShow={(v) => {
            if (!v) {
              update(d.id, false);
            }
          }}
          onClose={() => {
            d.onClose?.();
          }}
        />
      )}
    </For>
  );
}
