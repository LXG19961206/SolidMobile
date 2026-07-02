import {
  createSignal, createMemo, createEffect, on, mergeProps, splitProps, Show,
  type Component,
} from 'solid-js';
import { Picker } from '../Picker';
import type { PickerOption } from '../Picker';
import { Cell } from '../Cell';
import { useFormField } from '../Form/FormItem';
import { useT } from '../../i18n';
import { daysInMonth, range, formatDate, parseDate, parseDateRange, clampDay } from './date-utils';
import type { DatePickerProps, DatePickerType } from './types';
import { emitEvent } from '../../event-bus';

const defaultProps: Partial<DatePickerProps> = {
  startDate: '2014-01-01',
  endDate: '2034-12-31',
  type: 'date',
};

export const DatePicker: Component<DatePickerProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'value', 'onChange', 'onConfirm', 'onCancel',
    'startDate', 'endDate', 'type', 'placeholder', 'disabledDate',
    'show', 'onUpdateShow',
    'title', 'cancelText', 'confirmText',
    'visibleItemCount', 'optionHeight', 'teleport', 'zIndex',
    'class', 'style',
  ]);

  /* ── i18n ── */
  const t = useT();
  const titleText = () => local.title ?? t('component.datePicker.title');
  const placeholderText = () => local.placeholder ?? t('component.datePicker.placeholder');

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

  /* ── Parse range ── */
  const startParts = createMemo(() => parseDateRange(local.startDate!));
  const endParts = createMemo(() => parseDateRange(local.endDate!));

  /* ── Today ── */
  const today = new Date();
  const todayArr: [number, number, number] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];

  /* ── Resolve initial date ── */
  function resolveInit(): [number, number, number] {
    const src = local.value ?? (field && typeof field.value === 'string' ? field.value : undefined);
    if (src && typeof src === 'string') {
      const parsed = parseDate(src);
      if (parsed) return parsed;
    }
    return todayArr;
  }

  const inner = resolveInit();
  const [year, setYear] = createSignal(inner[0]);
  const [month, setMonth] = createSignal(inner[1]);
  const [day, setDay] = createSignal(inner[2]);

  /* ── Sync external value → internal ── */
  createEffect(() => {
    const v = local.value;
    if (!v || typeof v !== 'string') return;
    const parsed = parseDate(v);
    if (parsed) { setYear(parsed[0]); setMonth(parsed[1]); setDay(parsed[2]); }
  });

  createEffect(() => {
    if (!field) return;
    const v = field.value;
    if (v && typeof v === 'string') {
      const parsed = parseDate(v);
      if (parsed) { setYear(parsed[0]); setMonth(parsed[1]); setDay(parsed[2]); return; }
    }
    // 值为空或非有效日期 → 重置为今天
    const t = new Date();
    setYear(t.getFullYear()); setMonth(t.getMonth() + 1); setDay(t.getDate());
  });

  /* ── Clamp day when year/month changes ── */
  createEffect(() => {
    const maxDay = daysInMonth(year(), month());
    if (day() > maxDay) setDay(maxDay);
  });

  /* ── Generate columns ── */
  const yearOptions = createMemo(() => {
    const [sy] = startParts(); const [ey] = endParts();
    return range(sy, ey).map((y) => ({ text: `${y}年`, value: y }));
  });

  const monthOptions = createMemo(() => {
    const y = year(); const [sy, sm] = startParts(); const [ey, em] = endParts();
    let startM = 1, endM = 12;
    if (y === sy) startM = sm;
    if (y === ey) endM = em;
    return range(startM, endM).map((m) => ({ text: `${m}月`, value: m }));
  });

  const dayOptions = createMemo(() => {
    const y = year(); const m = month(); const [sy, sm, sd] = startParts(); const [ey, em, ed] = endParts();
    const maxDay = daysInMonth(y, m);
    let startD = 1, endD = maxDay;
    if (y === sy && m === sm) startD = sd;
    if (y === ey && m === em) endD = ed;
    return range(Math.min(startD, maxDay), Math.min(endD, maxDay)).map((d) => ({
      text: `${d}日`,
      value: d,
      disabled: local.disabledDate?.(y, m, d) ?? false,
    }));
  });

  const pickerColumns = createMemo(() => {
    if (local.type === 'year-month') return [yearOptions(), monthOptions()] as PickerOption[][];
    return [yearOptions(), monthOptions(), dayOptions()] as PickerOption[][];
  });

  const pickerValue = createMemo(() => {
    if (local.type === 'year-month') return [year(), month()];
    return [year(), month(), clampDay(year(), month(), day())];
  });

  /* ── Display text ── */
  const displayText = createMemo(() => {
    const v = local.value ?? (field ? String(field.value ?? '') : '');
    if (v) return v;
    return '';
  });

  /* ── Emit change ── */
  function emitChange(vals: (string | number)[]) {
    const nums = vals.map(Number);
    const y = nums[0]; const m = nums[1]; const d = local.type === 'year-month' ? 1 : nums[2] || 1;
    setYear(y); setMonth(m);
    if (local.type !== 'year-month') setDay(d);
    const formatted = formatDate(y, m, clampDay(y, m, d));
    local.onChange?.(formatted);
    emitEvent({ component: 'DatePicker', type: 'change', payload: formatted, timestamp: Date.now() });
    if (field) field.onChange(formatted);
  }

  function handleConfirm(vals: (string | number)[]) {
    const nums = vals.map(Number);
    const y = nums[0]; const m = nums[1]; const d = local.type === 'year-month' ? 1 : nums[2] || 1;
    const formatted = formatDate(y, m, clampDay(y, m, d));
    local.onChange?.(formatted);
    emitEvent({ component: 'DatePicker', type: 'change', payload: formatted, timestamp: Date.now() });
    local.onConfirm?.(formatted);
    if (field) field.onChange(formatted);
    updateShow(false);
  }

  function handleCancel() {
    local.onCancel?.();
    updateShow(false);
  }

  return (
    <>
      {/* Trigger - always rendered unless show is externally controlled */}
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

      {/* Picker sheet */}
      <Picker
        value={pickerValue()}
        columns={pickerColumns()}
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
