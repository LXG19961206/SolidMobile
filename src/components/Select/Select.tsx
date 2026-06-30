import {
  createSignal, createMemo, createEffect, mergeProps, splitProps, Show,
  type Component,
} from 'solid-js';
import { Picker } from '../Picker';
import type { PickerOption } from '../Picker';
import { Cell } from '../Cell';
import { useFormField } from '../Form/FormItem';
import { useLocale, useT } from '../../i18n';
import type { SelectProps } from './types';

const defaultProps: Partial<SelectProps> = {};

export const Select: Component<SelectProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'options', 'value', 'onChange', 'onConfirm', 'onCancel',
    'placeholder', 'title',
    'show', 'onUpdateShow',
    'cancelText', 'confirmText',
    'visibleItemCount', 'optionHeight', 'teleport', 'zIndex',
    'class', 'style',
  ]);

  /* ── Form field context ── */
  const field = useFormField();

  /* ── i18n ── */
  const locale = useLocale;
  const t = useT();
  const titleText = () => local.title ?? t('component.picker.select');
  const placeholderText = () => local.placeholder ?? t('component.select.placeholder');

  /* ── Show state ── */
  const autoMode = () => local.show === undefined;
  const [internalShow, setInternalShow] = createSignal(false);
  const isShow = () => (autoMode() ? internalShow() : local.show);
  const updateShow = (v: boolean) => {
    if (autoMode()) setInternalShow(v);
    else local.onUpdateShow?.(v);
  };

  /* ── Value ── */
  function resolveInit(): string | number | undefined {
    const src = local.value ?? (field?.value !== undefined && field?.value !== '' ? field.value : undefined);
    return (typeof src === 'string' || typeof src === 'number') ? src : undefined;
  }
  const [innerVal, setInnerVal] = createSignal<string | number | undefined>(resolveInit());

  createEffect(() => {
    const v = local.value;
    if (v !== undefined) setInnerVal(v);
  });
  createEffect(() => {
    if (!field) return;
    if (field.value !== undefined && field.value !== null) {
      setInnerVal(field.value as string | number);
    } else {
      setInnerVal(undefined);
    }
  });

  /* ── Display text ── */
  const displayText = createMemo(() => {
    const v = local.value ?? (field?.value !== undefined && field?.value !== '' ? field.value : innerVal());
    if (v === undefined || v === '') return '';
    const found = local.options.find((o) => o.value === v);
    return found ? found.text : String(v);
  });

  /* ── Picker columns ── */
  const pickerColumns = createMemo((): PickerOption[][] => [
    local.options.map((o) => ({ text: o.text, value: o.value })),
  ]);

  const pickerValue = createMemo((): (string | number)[] => {
    const v = local.value ?? (field?.value !== undefined && field?.value !== '' ? field.value : innerVal());
    return (v !== undefined && v !== '') ? [v as string | number] : [];
  });

  /* ── Events ── */
  function handleConfirm(_items: PickerOption[], vals: (string | number)[]) {
    const v = vals[0];
    if (v === undefined || v === '') return;
    setInnerVal(v);
    local.onChange?.(v);
    local.onConfirm?.(v);
    if (field) field.onChange(v);
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
        columns={pickerColumns()}
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
