import {
  createSignal, createMemo, createEffect, mergeProps, splitProps, Show,
  type Component,
} from 'solid-js';
import { Picker } from '../Picker';
import type { PickerOption } from '../Picker';
import { Cell } from '../Cell';
import { useFormField } from '../Form/FormItem';
import { useT } from '../../i18n';
import type { CityPickerProps } from './types';
import { emitEvent } from '../../event-bus';

const defaultProps: Partial<CityPickerProps> = {
  separator: ' / ',
};

/** 根据 value 数组在树中查找每级的 text，拼接为显示文字 */
function getDisplayText(columns: PickerOption[], values: (string | number)[], separator: string): string {
  const texts: string[] = [];
  let level = columns;
  for (const v of values) {
    const found = level.find((item) => item.value === v);
    if (!found) break;
    texts.push(String(found.text));
    if (found.children?.length) level = found.children;
    else break;
  }
  return texts.join(separator);
}

export const CityPicker: Component<CityPickerProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'columns', 'value', 'onChange', 'onConfirm', 'onCancel',
    'placeholder', 'separator',
    'show', 'onUpdateShow',
    'title', 'cancelText', 'confirmText',
    'visibleItemCount', 'optionHeight', 'teleport', 'zIndex',
    'class', 'style',
  ]);

  /* ── Form field context ── */
  const field = useFormField();
  const t = useT();
  const titleText = () => local.title ?? t('component.cityPicker.title');
  const placeholderText = () => local.placeholder ?? t('component.cityPicker.placeholder');

  /* ── Show state ── */
  const autoMode = () => local.show === undefined;
  const [internalShow, setInternalShow] = createSignal(false);
  const isShow = () => (autoMode() ? internalShow() : local.show);
  const updateShow = (v: boolean) => {
    if (autoMode()) setInternalShow(v);
    else local.onUpdateShow?.(v);
  };

  /* ── Internal value ── */
  const initVal = (): (string | number)[] => local.value ?? (field?.value as (string | number)[] | undefined) ?? [];
  const [innerVal, setInnerVal] = createSignal<(string | number)[]>(initVal());

  createEffect(() => {
    if (local.value) setInnerVal(local.value);
  });
  createEffect(() => {
    if (!field) return;
    if (Array.isArray(field.value)) setInnerVal(field.value);
    else setInnerVal([]);
  });

  /* ── Display text ── */
  const displayText = createMemo(() => {
    const vals = local.value ?? (Array.isArray(field?.value) ? field.value : innerVal());
    if (vals && vals.length) return getDisplayText(local.columns, vals, local.separator!);
    return '';
  });

  /* ── Handlers ── */
  function handleChange(_items: PickerOption[], vals: (string | number)[]) {
    setInnerVal(vals);
    local.onChange?.(vals);
    emitEvent({ component: 'CityPicker', type: 'change', payload: vals, props: props, timestamp: Date.now() });
    if (field) field.onChange(vals);
  }

  function handleConfirm(_items: PickerOption[], vals: (string | number)[]) {
    setInnerVal(vals);
    local.onChange?.(vals);
    emitEvent({ component: 'CityPicker', type: 'change', payload: vals, props: props, timestamp: Date.now() });
    local.onConfirm?.(vals);
    emitEvent({ component: 'CityPicker', type: 'confirm', payload: vals, props: props, timestamp: Date.now() });
    if (field) field.onChange(vals);
    updateShow(false);
  }

  function handleCancel() {
    local.onCancel?.();
    updateShow(false);
  }

  return (
    <>
      {/* Trigger (auto mode) */}
      <Show when={autoMode()}>
        <Cell
          title={displayText() || placeholderText()}
          clickable
          flush
          onClick={() => updateShow(true)}
          class={local.class}
          style={{
            cursor: 'pointer',
            ...(local.style ?? {}),
          }}
        />
      </Show>

      {/* Picker */}
      <Picker
        columns={local.columns}
        value={innerVal()}
        onChange={handleChange}
        onConfirm={handleConfirm}
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
