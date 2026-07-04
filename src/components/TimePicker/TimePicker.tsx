import {
  createSignal, createMemo, createEffect, mergeProps, splitProps, Show,
  type Component,
} from 'solid-js';
import { Picker } from '../Picker';
import type { PickerOption } from '../Picker';
import { Cell } from '../Cell';
import { useFormField } from '../Form/FormItem';
import { useT } from '../../i18n';
import type { TimePickerProps } from './types';
import { emitEvent } from '../../event-bus';

/* ── Helpers ── */

/** 将 HH:mm:ss 字符串解析为 [h, m, s] */
function parseTime(val: string): [number, number, number] | null {
  const m = /^(\d{2}):(\d{2}):(\d{2})$/.exec(val);
  if (!m) return null;
  const h = Number(m[1]), min = Number(m[2]), s = Number(m[3]);
  if (h < 0 || h > 23 || min < 0 || min > 59 || s < 0 || s > 59) return null;
  return [h, min, s];
}

/** 格式化为 HH:mm:ss */
function formatTime(h: number, m: number, s: number): string {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* ── Fixed columns (memos to avoid recreation each render) ── */

const HOURS: PickerOption[] = Array.from({ length: 24 }, (_, i) => ({
  text: String(i).padStart(2, '0'),
  value: i,
}));

const MINUTES: PickerOption[] = Array.from({ length: 60 }, (_, i) => ({
  text: String(i).padStart(2, '0'),
  value: i,
}));

const SECONDS: PickerOption[] = Array.from({ length: 60 }, (_, i) => ({
  text: String(i).padStart(2, '0'),
  value: i,
}));

const TIME_COLUMNS: PickerOption[][] = [HOURS, MINUTES, SECONDS];

/* ══════════════════════════════════════════════════════════════════
   TimePicker
   ══════════════════════════════════════════════════════════════════ */

export const TimePicker: Component<TimePickerProps> = (rawProps) => {
  const props = mergeProps({}, rawProps);
  const [local] = splitProps(props, [
    'value', 'onChange', 'onConfirm', 'onCancel',
    'placeholder',
    'show', 'onUpdateShow',
    'title', 'cancelText', 'confirmText',
    'visibleItemCount', 'optionHeight', 'teleport', 'zIndex',
    'class', 'style',
  ]);

  /* ── i18n ── */
  const t = useT();
  const titleText = () => local.title ?? t('component.picker.select');
  const placeholderText = () => local.placeholder ?? t('component.timePicker.placeholder');

  /* ── Form field context ── */
  const field = useFormField();

  /* ── Show state ── */
  const autoMode = () => local.show === undefined;
  const [internalShow, setInternalShow] = createSignal(false);
  const isShow = () => (autoMode() ? internalShow() : local.show);
  const updateShow = (v: boolean) => {
    if (autoMode()) setInternalShow(v);
    else local.onUpdateShow?.(v);
  };

  /* ── Resolve initial time ── */
  function resolveInit(): [number, number, number] {
    const src = local.value ?? (field && typeof field.value === 'string' ? field.value : undefined);
    if (src) {
      const parsed = parseTime(src);
      if (parsed) return parsed;
    }
    // Default to 00:00:00
    return [0, 0, 0];
  }

  const inner = resolveInit();
  const [hour, setHour] = createSignal(inner[0]);
  const [minute, setMinute] = createSignal(inner[1]);
  const [second, setSecond] = createSignal(inner[2]);

  /* ── Sync external value → internal ── */
  createEffect(() => {
    const v = local.value;
    if (!v || typeof v !== 'string') return;
    const parsed = parseTime(v);
    if (parsed) { setHour(parsed[0]); setMinute(parsed[1]); setSecond(parsed[2]); }
  });

  createEffect(() => {
    if (!field) return;
    const v = field.value;
    if (v && typeof v === 'string') {
      const parsed = parseTime(v);
      if (parsed) { setHour(parsed[0]); setMinute(parsed[1]); setSecond(parsed[2]); return; }
    }
    // 值为空或非有效时间 → 重置为 00:00:00
    setHour(0); setMinute(0); setSecond(0);
  });

  /* ── Picker value ── */
  const pickerValue = createMemo(() => [hour(), minute(), second()]);

  /* ── Display text ── */
  const displayText = createMemo(() => {
    const v = local.value ?? (field ? String(field.value ?? '') : '');
    if (v && parseTime(v)) return v;
    return '';
  });

  /* ── Emit change ── */
  function emitChange(vals: (string | number)[]) {
    const h = Number(vals[0]), m = Number(vals[1]), s = Number(vals[2]);
    setHour(h); setMinute(m); setSecond(s);
    const formatted = formatTime(h, m, s);
    local.onChange?.(formatted);
    emitEvent({ component: 'TimePicker', type: 'change', payload: formatted, props: props, timestamp: Date.now() });
    if (field) field.onChange(formatted);
  }

  function handleConfirm(vals: (string | number)[]) {
    const h = Number(vals[0]), m = Number(vals[1]), s = Number(vals[2]);
    const formatted = formatTime(h, m, s);
    local.onChange?.(formatted);
    emitEvent({ component: 'TimePicker', type: 'change', payload: formatted, props: props, timestamp: Date.now() });
    local.onConfirm?.(formatted);
    emitEvent({ component: 'TimePicker', type: 'confirm', payload: formatted, props: props, timestamp: Date.now() });
    if (field) field.onChange(formatted);
    updateShow(false);
  }

  function handleCancel() {
    local.onCancel?.();
    updateShow(false);
  }

  return (
    <>
      <Show when={autoMode()}>
        <Cell
          title={displayText() || placeholderText()}
          clickable
          onClick={() => updateShow(true)}
          class={local.class}
          style={{
            cursor: 'pointer',
            ...(typeof local.style === 'object' ? local.style : {}),
          }}
        />
      </Show>

      <Picker
        value={pickerValue()}
        columns={TIME_COLUMNS}
        onChange={(_items: PickerOption[], vals: (string | number)[]) => emitChange(vals)}
        onConfirm={(_items: PickerOption[], vals: (string | number)[]) => handleConfirm(vals)}
        onCancel={handleCancel}
        show={isShow()}
        onUpdateShow={updateShow}
        title={titleText()}
        cancelText={local.cancelText}
        confirmText={local.confirmText}
        visibleItemCount={local.visibleItemCount}
        optionHeight={local.optionHeight}
        teleport={local.teleport}
        zIndex={local.zIndex}
      />
    </>
  );
};
