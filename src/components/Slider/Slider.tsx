import {
  createSignal, createEffect, on, onMount, mergeProps, splitProps,
  type Component,
} from 'solid-js';
import { cn } from '../../utils';
import { useFormField } from '../Form/FormItem';
import type { SliderProps } from './types';
import styles from './Slider.module.css';

const defaultProps: Partial<SliderProps> = {
  min: 0, max: 100, step: 1, count: 1,
  barHeight: 2, buttonSize: 20,
  activeColor: '#1989fa', inactiveColor: '#e5e5e5',
  reverse: false, disabled: false, readonly: false,
};

function toPx(v: string | number | undefined, fallback: string): string {
  if (v === undefined) return fallback;
  return typeof v === 'number' ? `${v}px` : v;
}

function clamp(v: number, min: number, max: number, step: number): number {
  return Math.round((Math.max(min, Math.min(max, v)) - min) / step) * step + min;
}

export const Slider: Component<SliderProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'value', 'onChange', 'min', 'max', 'step', 'count',
    'barHeight', 'buttonSize', 'activeColor', 'inactiveColor',
    'reverse', 'disabled', 'readonly', 'thumbRender',
    'class', 'style',
  ]);

  const field = useFormField();
  const allCount = () => Math.max(1, local.count ?? 1);

  function resolveValue(): number[] {
    const v = local.value ?? (typeof field?.value === 'number' ? field.value : undefined);
    if (typeof v === 'number') return [v];
    if (Array.isArray(v)) return [...v];
    if (allCount() === 1) return [0];
    return Array.from({ length: allCount() }, (_, i) => Math.round((100 / (allCount() - 1)) * i));
  }

  const [vals, setVals] = createSignal<number[]>(resolveValue());
  const isDisabled = () => local.disabled || local.readonly;

  createEffect(on(() => local.value, (v) => {
    if (v === undefined) return;
    if (typeof v === 'number') { setVals([v]); updateUI([v]); }
    else if (Array.isArray(v)) { setVals([...v]); updateUI([...v]); }
  }, { defer: false }));

  createEffect(on(() => field?.value, (v) => {
    if (!field || v === undefined || v === null) return;
    if (typeof v === 'number') { setVals([v]); updateUI([v]); }
    else if (Array.isArray(v)) { setVals(v.map(Number)); updateUI(v.map(Number)); }
  }, { defer: false }));

  const currentVals = () => {
    const ext = local.value;
    if (ext !== undefined) return typeof ext === 'number' ? [ext] : [...ext];
    return vals();
  };

  function pct(v: number): string {
    const range = local.max! - local.min!;
    return range > 0 ? `${((v - local.min!) / range) * 100}%` : '0%';
  }

  /* ── Imperative DOM ── */
  let wrapEl!: HTMLDivElement;
  let trackEl!: HTMLDivElement;
  let fillEl!: HTMLDivElement;
  const thumbEls: HTMLDivElement[] = [];
  let hasCustomThumb = false;

  function updateUI(sorted: number[]) {
    // Update fill
    if (fillEl) {
      if (allCount() <= 1) {
        fillEl.style.left = '0%';
        fillEl.style.width = pct(sorted[0]);
      } else if (sorted.length >= 2) {
        fillEl.style.left = pct(sorted[0]);
        fillEl.style.width = `calc(${pct(sorted[sorted.length - 1])} - ${pct(sorted[0])})`;
      }
    }
    // Update thumbs
    thumbEls.forEach((el, i) => {
      if (el && sorted[i] !== undefined) {
        el.style.left = pct(sorted[i]);
        if (hasCustomThumb) el.textContent = String(sorted[i]);
      }
    });
  }

  function emitValue(vals: number[]) {
    const sorted = [...vals].sort((a, b) => a - b);
    setVals(sorted);
    updateUI(sorted);
    if (allCount() === 1) {
      local.onChange?.(sorted[0]);
      field?.onChange(sorted[0]);
    } else {
      local.onChange?.(sorted);
      field?.onChange(sorted);
    }
  }

  function calcValue(clientX: number): number {
    if (!trackEl) return 0;
    const r = trackEl.getBoundingClientRect();
    let pct = (clientX - r.left) / r.width;
    if (local.reverse) pct = 1 - pct;
    return clamp(local.min! + pct * (local.max! - local.min!), local.min!, local.max!, local.step!);
  }

  function nearestIdx(v: number): number {
    const arr = currentVals();
    let idx = 0, dist = Infinity;
    arr.forEach((val, i) => { const d = Math.abs(val - v); if (d < dist) { dist = d; idx = i; } });
    return idx;
  }

  /* ── Events ── */
  let dragging = false;
  let dragVal = 0;  // track by value, not index, to survive sorting

  function onDown(e: PointerEvent) {
    if (isDisabled()) return;
    e.preventDefault();
    dragging = true;
    wrapEl.setPointerCapture(e.pointerId);
    const v = calcValue(e.clientX);
    const arr = currentVals();
    const i = nearestIdx(v);
    const next = [...arr];
    next[i] = v;
    dragVal = v;   // ← 存新值，emitValue 排序后 indexOf 才能找到
    emitValue(next);
  }

  function onMove(e: PointerEvent) {
    if (isDisabled() || !dragging) return;
    e.preventDefault();
    const v = calcValue(e.clientX);
    const arr = currentVals();
    // Find the index of the value we were dragging (it may have moved after sorting)
    const i = arr.indexOf(dragVal);
    if (i < 0) return;
    const next = [...arr];
    next[i] = v;
    dragVal = v;  // update tracked value
    emitValue(next);
  }

  function onEnd() { dragging = false; }

  /* ── Build thumbs imperatively & init UI ── */
  onMount(() => {
    const track = trackEl;
    if (!track) return;
    const count = allCount();
    const init = currentVals();
    for (let i = 0; i < count; i++) {
      const thumb = document.createElement('div');
      thumb.className = styles.thumb;
      thumb.setAttribute('data-slider-thumb', '');
      thumb.style.left = pct(init[i] ?? 0);
      // Custom render
      if (local.thumbRender) {
        hasCustomThumb = true;
        const content = local.thumbRender(init[i], i);
        if (content != null) {
          if (typeof content === 'string' || typeof content === 'number') {
            thumb.textContent = String(content);
          } else if (content instanceof Node) {
            thumb.appendChild(content);
          }
        }
      }
      track.appendChild(thumb);
      thumbEls[i] = thumb;
    }
    // Init fill
    updateUI(init);
  });

  return (
    <div
      ref={wrapEl!}
      class={cn(styles.wrapper, isDisabled() && styles.disabled, local.class)}
      style={{
        '--sc-slider-bar-height': toPx(local.barHeight, '2px'),
        '--sc-slider-button-size': toPx(local.buttonSize, '20px'),
        '--sc-slider-active-color': local.activeColor!,
        '--sc-slider-inactive-color': local.inactiveColor!,
        ...(local.style ?? {}),
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onEnd}
      onPointerCancel={onEnd}
    >
      <div ref={trackEl!} class={styles.track}>
        <div ref={fillEl!} class={styles.fill} style="width:0%;left:0%" />
      </div>
    </div>
  );
};
