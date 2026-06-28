import {
  createSignal, mergeProps, splitProps, For, createEffect, on,
  type Component,
} from 'solid-js';
import { cn } from '../../utils';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { useFormField } from '../Form/FormItem';
import type { RateProps } from './types';
import styles from './Rate.module.css';

const defaultProps: Partial<RateProps> = {
  count: 5,
  size: 20,
  gutter: 4,
  color: '#ee0a24',
  voidColor: '#c8c9cc',
  disabledColor: '#c8c9cc',
  icon: 'star',
  voidIcon: 'star',
  allowHalf: false,
  clearable: false,
  readonly: false,
  disabled: false,
};

function toPx(v: string | number | undefined, fallback: string): string {
  if (v === undefined) return fallback;
  return typeof v === 'number' ? `${v}px` : v;
}

const HALF = 0.5;

export const Rate: Component<RateProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'value', 'onChange',
    'count', 'size', 'gutter',
    'color', 'voidColor', 'disabledColor',
    'icon', 'voidIcon',
    'allowHalf', 'clearable', 'readonly', 'disabled',
    'class', 'style',
  ]);

  const count = () => Math.max(1, Number(local.count) || 5);
  const isDisabled = () => local.disabled || local.readonly;

  /* ── Form field context ── */
  const field = useFormField();

  /* ── Value management ── */
  const initVal = local.value ?? (typeof field?.value === 'number' ? field.value : 0);
  const [internalVal, setInternalVal] = createSignal(initVal);

  createEffect(on(() => local.value, (v) => {
    if (v !== undefined) setInternalVal(v);
  }, { defer: false }));

  createEffect(on(() => field?.value, (v) => {
    if (field && typeof v === 'number') setInternalVal(v);
  }, { defer: false }));

  const currentVal = () => (local.value !== undefined ? local.value : internalVal());

  const activeColor = () => local.disabled ? local.disabledColor! : local.color!;
  const inactiveColor = () => local.disabled ? local.disabledColor! : local.voidColor!;

  function handleClick(index: number, isLeftHalf: boolean) {
    if (isDisabled()) return;

    let newVal: number;
    if (local.allowHalf && isLeftHalf) {
      newVal = index + HALF;
    } else {
      newVal = index + 1;
    }

    if (local.clearable && Math.abs(currentVal() - newVal) < 0.01) {
      newVal = 0;
    }

    setInternalVal(newVal);
    local.onChange?.(newVal);
    if (field) field.onChange(newVal);
  }

  function onStarClick(e: MouseEvent, index: number) {
    if (isDisabled()) return;
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const isLeft = (e.clientX - rect.left) < rect.width / 2;
    handleClick(index, isLeft);
  }

  const starSize = () => toPx(local.size, '20px');

  return (
    <div
      class={cn(
        styles.wrapper,
        local.disabled && styles.disabled,
        local.readonly && styles.readonly,
        local.class,
      )}
      style={{
        gap: toPx(local.gutter, '4px'),
        ...(local.style ?? {}),
      }}
    >
      <For each={Array.from({ length: count() })}>
        {(_item, index) => {
          const idx = index();
          return (
            <div
              class={styles.star}
              style={{ width: starSize(), height: starSize() }}
              onClick={(e) => onStarClick(e, idx)}
            >
              {/* ── 统一用 local.icon 的 fill 路径，
                    底层灰色铺底（上层裁剪到哪里就露出哪里的灰色） ── */}
              <span class={styles.layer}>
                <Icon
                  name={local.icon as IconName}
                  variant="fill"
                  size={starSize()}
                  color={inactiveColor()}
                />
              </span>

              {/* ── 上层：品牌色裁剪，与底层同路径保证对齐 ── */}
              <span
                class={styles.layer}
                style={{
                  overflow: 'hidden',
                  width: currentVal() >= idx + 1
                    ? '100%'
                    : local.allowHalf && currentVal() >= idx + HALF
                      ? '50%'
                      : '0%',
                  transition: 'width 0.1s',
                }}
              >
                <Icon
                  name={local.icon as IconName}
                  variant="fill"
                  size={starSize()}
                  color={activeColor()}
                />
              </span>
            </div>
          );
        }}
      </For>
    </div>
  );
};
