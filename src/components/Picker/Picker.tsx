import {
  createSignal, createMemo, createEffect, createRenderEffect,
  on, onMount, onCleanup,
  For, Show, mergeProps, splitProps,
  type Component,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import { cn, scopedStyle } from '../../utils';
import { useLocale, useT } from '../../i18n';
import { Overlay } from '../Overlay';
import { Cell } from '../Cell';
import { emitEvent } from '../../event-bus';
import type { PickerOption, PickerProps } from './types';
import rawStyles from './Picker.module.css';
const styles = scopedStyle(rawStyles, 'sc-picker');

/* ── Constants ── */
const DEFAULT_DURATION = 0.4;
const MOVE_DURATION = 0.05;
const MOMENTUM_WINDOW_MS = 300;
const QUEUE_CAPACITY = 30;
const MOMENTUM_EXTRAPOLATE_FACTOR = 1.8;
const OVERSCROLL_DAMPING = 0.4;
const MIN_SNAP_MS = 240;
const MAX_ANIM_MS = 2000;

/* ── FixedQueue ── */
class FixedQueue<T> {
  private _items: T[] = [];
  constructor(private capacity: number) {}

  push(item: T) {
    if (this._items.length >= this.capacity) this._items.shift();
    this._items.push(item);
  }

  clear() { this._items.length = 0; }

  head(): T | undefined { return this._items[0]; }

  tail(): T | undefined { return this._items[this._items.length - 1]; }

  at(n: number): T | undefined {
    return n >= 0 ? this._items[n] : this._items.slice(n)[0];
  }

  get length() { return this._items.length; }
}

/** Queue entry: [deltaY, timestamp, _, absoluteTranslateBeforeMove] */
type QueueEntry = [number, number, boolean, number];

/* ── Pure Helpers ── */

/**
 * 检测列数：
 * - 如果 columns 的每个元素都是数组 → flat 模式，返回 columns.length
 * - 否则 → tree 模式，跟随第一个元素的 children 链计算深度
 */
function getColCount(columns: PickerOption[] | PickerOption[][]): number {
  if (!columns.length) return 0;

  // Flat mode: every element is an array
  if ((columns as Array<unknown>).every(Array.isArray)) {
    return columns.length;
  }

  // Tree mode: follow children chain
  let depth = 1;
  let pointer: PickerOption | undefined = (columns as PickerOption[])[0];
  while (pointer?.children?.length) {
    depth += 1;
    pointer = pointer.children[0];
  }
  return depth;
}

/** 将索引夹到 [0, maxIdx] 范围 */
function clampIdx(idx: number, maxIdx: number): number {
  return idx < 0 ? 0 : idx > maxIdx ? maxIdx : idx;
}

/** 四舍五入到最近的 lineHeight 整数倍 */
function snapToLine(num: number, lineHeight: number): number {
  return Math.round(num / lineHeight) * lineHeight;
}

/**
 * 生成占位选项。
 * Tree 模式下递归生成 children 链，保证 tree walk 能正确遍历到下一层。
 */
function genPlaceHolderItems(
  placeholders: string | string[],
  index: number,
  isFlat: boolean,
  totalCount: number,
): PickerOption {
  const text = typeof placeholders === 'string' ? placeholders : placeholders[index];
  const hasMore = index + 1 < totalCount && !isFlat;
  return {
    text,
    value: '',
    ...(hasMore ? { children: [genPlaceHolderItems(placeholders, index + 1, isFlat, totalCount)] } : {}),
  };
}

/* ── Default Props ── */
const defaultProps: Partial<PickerProps> = {
  visibleItemCount: 7,
  ratio: 1.0,
  swipeDuration: 1,
  title: undefined,
};

/* ══════════════════════════════════════════════════════════════════
   Picker Component
   ══════════════════════════════════════════════════════════════════ */

/**
 * 滚轮选择器 — 移动端通用的底部弹出选择组件。
 *
 * 支持两种数据模式：
 * - **Tree 级联**：传入 `PickerOption[]`，每项的 `children` 自动成为下一列
 * - **Flat 多列**：传入 `PickerOption[][]`，每列独立滚动
 *
 * @example Tree 级联
 * ```tsx
 * <Picker
 *   show={show()}
 *   onUpdateShow={setShow}
 *   columns={[
 *     { text: '北京', value: 'bj', children: [
 *       { text: '海淀', value: 'hd' },
 *       { text: '朝阳', value: 'cy' },
 *     ]},
 *     { text: '上海', value: 'sh', children: [...] },
 *   ]}
 *   onChange={(items, values) => console.log(values)}
 * />
 * ```
 *
 * @example Flat 多列
 * ```tsx
 * <Picker
 *   show={show()}
 *   onUpdateShow={setShow}
 *   columns={[
 *     [{ text: '2024年', value: 2024 }, { text: '2025年', value: 2025 }],
 *     [{ text: '1月', value: 1 }, { text: '2月', value: 2 }],
 *   ]}
 * />
 * ```
 */
export const Picker: Component<PickerProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local] = splitProps(props, [
    'columns', 'value', 'onChange', 'onConfirm', 'onCancel',
    'show', 'onUpdateShow', 'title', 'teleport', 'zIndex',
    'visibleItemCount', 'optionHeight', 'ratio', 'swipeDuration',
    'cancelText', 'confirmText', 'placeholders',
    'class', 'style',
  ]);

  /* ── i18n ── */
  const locale = useLocale;
  const t = useT();
  const cancelLabel = () => local.cancelText ?? t('component.picker.cancel');
  const confirmLabel = () => local.confirmText ?? t('component.picker.confirm');
  const titleLabel = () => local.title ?? t('component.picker.select');

  /* ── Line Height ── */
  const lineHeight = (): number => {
    if (local.optionHeight) return local.optionHeight;
    if (typeof document !== 'undefined') {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--sc-picker-item-height');
      if (v) return parseFloat(v) || 50;
    }
    return 50;
  };

  /* ── Column Count ── */
  const colCount = createMemo(() => getColCount(local.columns));
  const isTree = () => !Array.isArray((local.columns as Array<unknown>)[0]);

  /* ── Per-Column Signals ──
     createMemo 包裹以确保 colCount 变化时重建所有 signal 数组 */
  const columnsData = createMemo(() =>
    Array.from({ length: colCount() }, () => createSignal<PickerOption[]>([])),
  );
  const selectedIdx = createMemo(() =>
    Array.from({ length: colCount() }, () => createSignal<number>(0)),
  );
  const translateY = createMemo(() =>
    Array.from({ length: colCount() }, () => createSignal<number>(0)),
  );
  const animDuration = createMemo(() =>
    Array.from({ length: colCount() }, () => createSignal<number>(DEFAULT_DURATION)),
  );

  /* ── Derived Memos ── */
  const allColumns = createMemo(() => columnsData().map(([g]) => g()));
  const allIdxs = createMemo(() => selectedIdx().map(([g]) => g()));
  const allTranslates = createMemo(() => translateY().map(([g]) => g()));
  const allDurations = createMemo(() => animDuration().map(([g]) => g()));

  const currentValue = createMemo(() =>
    allIdxs().map((idx, i) => allColumns()[i][idx]?.value ?? ''),
  );

  /** 每列的占位项数量 [顶部占位数, 底部占位数]
     底部至少保留 halfVisible 个占位，确保最后一列的最后一项也能滚动到居中位置 */
  const placeholderItems = createMemo(() =>
    allColumns().map((col) => {
      const halfVisible = Math.floor(local.visibleItemCount! / 2);
      const topCount = halfVisible;
      const rawBottom = local.visibleItemCount! - ((col.length + topCount) % local.visibleItemCount!);
      const bottomCount = Math.max(rawBottom, halfVisible);
      return [
        Array.from({ length: topCount }, (_, i) => i),
        Array.from({ length: bottomCount }, (_, i) => i),
      ];
    }),
  );

  /* ── Sheet Animation State ── */
  const autoMode = () => local.show === undefined;
  const [internalShow, setInternalShow] = createSignal(local.show ?? false);
  const [animated, setAnimated] = createSignal(false);
  let animTimer: ReturnType<typeof setTimeout> | null = null;

  function openSheet() {
    setInternalShow(true);
    requestAnimationFrame(() => setAnimated(true));
  }

  function closeSheet() {
    setAnimated(false);
    if (animTimer) clearTimeout(animTimer);
    animTimer = setTimeout(() => {
      setInternalShow(false);
    }, 300);
  }

  // Sync with controlled `show` prop
  createEffect(on(() => local.show, (s) => {
    if (autoMode()) return;
    if (s) openSheet(); else closeSheet();
  }, { defer: false }));

  /* ── Display text for auto-mode Cell ── */
  const displayText = createMemo(() => {
    const idxs = allIdxs();
    const cols = allColumns();
    if (!cols.length || !idxs.length) return '';
    return idxs.map((idx, i) => {
      const item = cols[i]?.[idx];
      return item ? String(item.render ? item.text : item.text) : '';
    }).filter(Boolean).join(' / ') || '';
  });

  const placeholderText = () => {
    if (local.placeholders) {
      const ph = typeof local.placeholders === 'string' ? local.placeholders : local.placeholders.join(' / ');
      return ph;
    }
    return t('component.picker.select');
  };

  onCleanup(() => {
    if (animTimer) clearTimeout(animTimer);
  });

  /* ── Momentum State ── */
  const queue = new FixedQueue<QueueEntry>(QUEUE_CAPACITY);
  const [targetCol, setTargetCol] = createSignal(0);
  const [isScrolling, setIsScrolling] = createSignal(false);
  let lastClientY = 0;
  let scrollGateTimer: ReturnType<typeof setTimeout> | null = null;
  let scrollGateMoved = false; // distance-based gate: >3px = scrolling, not a tap
  let pointerDown = false; // guard: only process moves when pointer is pressed
  /** 每列独立的 rAF id，避免滑动某一列时取消另一列的动画 */
  const animRafIds: (number | null)[] = [];

  onCleanup(() => {
    if (scrollGateTimer) clearTimeout(scrollGateTimer);
    animRafIds.forEach((id) => { if (id !== null) cancelAnimationFrame(id); });
  });

  /* ═══════════════════════════════════════════════════════════
     Effects
     ═══════════════════════════════════════════════════════════ */

  /* ── Effect 1: Tree-walk ──
     当选中索引或 columns 数据源变化时，重新构建每列的数据。
     使用 defer: false 确保初始挂载时立即执行一次。 */
  createEffect(
    on([allIdxs, () => local.columns], () => {
      let target: PickerOption[] | PickerOption[][] = local.columns;
      const flat = !isTree();
      let depth = 0;

      while (depth < colCount()) {
        const [, colSetter] = columnsData()[depth];
        const [idxGetter] = selectedIdx()[depth];

        const rawIdx = idxGetter();
        const adjustedIdx = rawIdx - +!!local.placeholders;
        const arr = target as PickerOption[];
        const finalIdx = clampIdx(adjustedIdx, arr.length - 1);

        if (flat) {
          // Flat: 每列独立，直接从 columns[depth] 取
          const flatCol = (local.columns as PickerOption[][])[depth];
          if (local.placeholders) {
            const ph = genPlaceHolderItems(local.placeholders, depth, true, colCount());
            colSetter([ph, ...flatCol]);
          } else {
            colSetter(flatCol);
          }
        } else {
          // Tree: 当前层的数据来自上一层的 children
          if (local.placeholders) {
            // 有占位符时，深度 > 0 的列需要上一列有选中项才展示（index > 0 表示不是占位项）
            const showPH = depth === 0 || allIdxs()[depth - 1] > 0;
            const ph = genPlaceHolderItems(local.placeholders, depth, false, colCount());
            colSetter(showPH ? [ph, ...arr] : [ph]);
          } else {
            // 无占位符时，直接展示当前层数据
            colSetter(arr);
          }

          // 前进到下一层：取当前层选中项的 children
          if (depth + 1 <= colCount()) {
            const selected = arr[finalIdx];
            target = selected?.children ?? [];
          }

          // Tree 模式下，父列切换导致子列数据变化时，若当前索引
          // 已越界（新 children 比旧 children 少），则重置到第一项。
          // 子列自身滚动引起的 effect 重入不会误伤。
          if (depth > 0) {
            const [idxGetter, idxSetter] = selectedIdx()[depth];
            const [, transSetter] = translateY()[depth];
            if (idxGetter() >= arr.length) {
              idxSetter(0);
              transSetter(0);
            }
          }
        }

        depth++;
      }
    }, { defer: false }),
  );

  /* ── Effect 2: Per-column index sync ──
     当某列数据变短导致当前索引越界时，修正索引 */
  columnsData().forEach(([getter], i) => {
    createRenderEffect(
      on(getter, (newVal, oldVal) => {
        if (!oldVal) return;

        const currentIdx = allIdxs()[i];
        if (currentIdx + 1 > newVal.length) {
          const newIdx = Math.max(0, newVal.length - 1);
          // 瞬间跳转（无动画）
          animDuration()[i][1](0);
          selectedIdx()[i][1](newIdx);
          translateY()[i][1](-lineHeight() * newIdx);

          setTimeout(() => {
            animDuration()[i][1](DEFAULT_DURATION);
          });
        }
      }),
    );
  });

  /* ── Effect 3: Controlled value sync ──
     外部 value 变化时，逐列查找并设置索引。
     defer: false 确保初始挂载时也能应用预设值。 */
  createEffect(
    on(() => local.value, (newVal, oldVal) => {
      if (!newVal?.length) return;
      if (oldVal && oldVal.length && Object.is(newVal, oldVal)) return;

      (async () => {
        let i = 0;
        while (i < Math.min(newVal.length, colCount())) {
          const val = newVal[i];
          const source = allColumns()[i];
          const idx = source.findIndex((item) => item.value === val);
          if (idx === -1) break;

          selectedIdx()[i][1](idx);
          translateY()[i][1](idx * lineHeight() * -1);

          i++;
          // 让 tree-walk effect 先生效 populate 下一列，再查
          await Promise.resolve();
        }
      })();
    }, { defer: false }),
  );

  /* ═══════════════════════════════════════════════════════════
     Scroll Helpers
     ═══════════════════════════════════════════════════════════ */

  /** 同时设置 translate 和选中索引 */
  function setTranslateAndIdx(col: number, value: number) {
    translateY()[col][1](value);
    selectedIdx()[col][1](Math.round(-value / lineHeight()));
  }

  /** 边界夹持 */
  function boundaryCalc(col: number, value: number): number {
    const items = allColumns()[col];
    const bottom = (1 - items.length) * lineHeight();
    const top = 0;
    return value > top ? top : value < bottom ? bottom : value;
  }

  /** 跳过 disabled 项（带深度保护） */
  function disabledFixed(col: number, value: number, isDown?: boolean, depth = 0): number {
    const items = allColumns()[col];
    if (!items.length) return value;
    const idx = clampIdx(Math.round(-value / lineHeight()), items.length - 1);

    // 推断方向
    if (isDown == null) {
      if (queue.length >= 2) {
        isDown = Math.abs(queue.tail()![3]) - Math.abs(queue.head()![3]) > 0;
      } else {
        isDown = false;
      }
    }

    // 边界保护 — 递归跳过边界上的禁用项
    if (value > 0) return disabledFixed(col, 0, true, depth + 1);
    const bottom = (1 - items.length) * lineHeight();
    if (value < bottom) return disabledFixed(col, bottom, false, depth + 1);

    // 当前项被禁用 → 向滑动方向找下一个可用项
    if (items[idx]?.disabled) {
      if (depth > items.length) return value; // 全禁用，放弃
      return disabledFixed(col, value + (isDown ? -lineHeight() : lineHeight()), isDown, depth + 1);
    }
    return value;
  }

  /** 惯性计算 / snap
     用队列中最后几次 delta 的平均值作为速度，外推惯性距离，最多 2 个单元格 */
  function momentumCalc(col: number, enableMomentum: boolean): number {
    const current = allTranslates()[col];

    if (!enableMomentum || queue.length < 3) {
      return snapToLine(current, lineHeight());
    }

    const len = queue.length;
    // 基于时间戳计算真实速度 (px/ms)，而非简单平均 delta — 避免帧率差异影响惯性手感
    const oldest = queue.at(len - Math.min(len, 5))!;
    const latest = queue.at(len - 1)!;
    const dt = latest[1] - oldest[1];
    if (dt <= 0) return snapToLine(current, lineHeight());

    const totalDelta = latest[3] - oldest[3];
    const velocity = totalDelta / dt; // px/ms

    const extrapolated = current + velocity * 80; // ~80ms 动量外推
    // 动态上限：速度越快滚得越远，但最多 8 格
    const maxCells = Math.max(1, Math.min(Math.abs(velocity) * 20, 8));
    const maxDelta = maxCells * lineHeight();
    const clamped = current + Math.max(-maxDelta, Math.min(maxDelta, extrapolated - current));

    return snapToLine(clamped, lineHeight());
  }

  /* ═══════════════════════════════════════════════════════════
     Pointer Event Handlers
     ═══════════════════════════════════════════════════════════ */

  /** 根据触摸 X 坐标计算目标列 */
  function getCol(evt: PointerEvent): number {
    const target = evt.currentTarget as HTMLElement;
    return Math.floor(evt.offsetX / (target.clientWidth / colCount()));
  }

  function onPointerDown(evt: PointerEvent) {
    const col = getCol(evt);

    // 只取消当前列上一次未完成的 rAF 动画，不影响其他列
    if (animRafIds[col] !== null && animRafIds[col] !== undefined) {
      cancelAnimationFrame(animRafIds[col]!);
      animRafIds[col] = null;
    }

    setTargetCol(col);
    pointerDown = true;

    // 去抖动：避免轻点确认 / 取消按钮时误触发滚动。
    // 50ms 后或手指移动超过 3px 即可认为用户在滑动。
    scrollGateMoved = false;
    scrollGateTimer = setTimeout(() => setIsScrolling(true), 50);

    // 不主动 snap，保留当前列的位置作为拖拽起点 — 避免 PC 端点击时视觉跳动
    const currentY = allTranslates()[col];
    animDuration()[col][1](MOVE_DURATION);

    queue.clear();
    lastClientY = evt.clientY;
  }

  function onPointerMove(evt: PointerEvent) {
    if (!pointerDown) return;

    // Distance gate: if the user has moved >3px, it's definitely a scroll
    if (!scrollGateMoved && Math.abs(evt.clientY - lastClientY) > 3) {
      scrollGateMoved = true;
      if (scrollGateTimer) { clearTimeout(scrollGateTimer); scrollGateTimer = null; }
      setIsScrolling(true);
    }
    if (!isScrolling()) return;

    evt.stopPropagation();
    evt.stopImmediatePropagation();

    const col = targetCol();
    const delta = (evt.clientY - lastClientY) * local.ratio!;

    // 方向反转时清空队列，避免惯性计算混入旧方向数据导致抽搐
    const prevDir = queue.tail()?.[0] ?? 0;
    if (prevDir !== 0 && (delta > 0) !== (prevDir > 0)) {
      queue.clear();
    }

    const [getter, setter] = translateY()[col];
    const items = allColumns()[col];
    const bottom = (1 - items.length) * lineHeight();
    const top = 0;
    let newVal = getter() + delta;

    // 超出边界时带阻尼，允许拖出较大距离再回弹
    if (newVal > top) {
      newVal = top + (newVal - top) * OVERSCROLL_DAMPING;
    } else if (newVal < bottom) {
      newVal = bottom + (newVal - bottom) * OVERSCROLL_DAMPING;
    }

    setter(newVal);

    queue.push([delta, evt.timeStamp, false, getter()]);

    lastClientY = evt.clientY;
  }

  function onPointerUp(_evt: PointerEvent) {
    pointerDown = false;
    finishScroll();
  }

  /** 指针快速离开组件时也触发一次修正，防止列停在中间位置对不齐 */
  function onPointerLeave(_evt: PointerEvent) {
    pointerDown = false;
    finishScroll();
  }

  /** 结束滚动的公共逻辑：snap + 惯性 + 边界 + 跳过禁用项 */
  function finishScroll() {
    if (scrollGateTimer) { clearTimeout(scrollGateTimer); scrollGateTimer = null; }

    if (!isScrolling()) {
      return;
    }
    setIsScrolling(false);

    const col = targetCol();

    // 判断是否使用惯性
    const useMomentum =
      queue.length > 2 &&
      queue.tail()![1] - queue.head()![1] < MOMENTUM_WINDOW_MS;

    // 三步管道计算最终位置
    const snapped = momentumCalc(col, useMomentum);
    const bounded = boundaryCalc(col, snapped);
    const final = disabledFixed(col, bounded);

    // 立刻更新 selectedIdx，让子列在动画开始时就切换到目标父项对应的 children，
    // 避免动画期间出现「父列滚到 B，子列还显示 A 的 children」的错位问题。
    selectedIdx()[col][1](Math.round(-final / lineHeight()));

    const start = allTranslates()[col];
    const distance = final - start;
    // 滑动距离越大动画越久，但至少 280ms 保证可见，最多 2s
    const travelItems = Math.abs(distance) / lineHeight();
    const duration = Math.max(MIN_SNAP_MS, Math.min(
      (useMomentum ? local.swipeDuration! * 1000 : 400) + travelItems * 35,
      MAX_ANIM_MS
    ));

    // 无 CSS transition — 用 rAF 逐帧驱动，高亮实时跟踪
    animDuration()[col][1](0);

    const t0 = performance.now();
    function frame() {
      const elapsed = performance.now() - t0;
      const t = Math.min(elapsed / duration, 1);
      // cubic ease-out: 先快后慢
      const eased = 1 - Math.pow(1 - t, 3);
      translateY()[col][1](start + distance * eased);

      if (t < 1) {
        animRafIds[col] = requestAnimationFrame(frame);
      } else {
        // 终态：精确对齐 + 更新 selectedIdx + 回调
        animRafIds[col] = null;
        translateY()[col][1](final);
        selectedIdx()[col][1](Math.round(-final / lineHeight()));
        animDuration()[col][1](DEFAULT_DURATION);
        const items = allColumns().map((cols, i) => cols[allIdxs()[i]]);
        const vals = allIdxs().map((idx, i) => allColumns()[i][idx]?.value ?? '');
        local.onChange?.call(void 0, items, vals);
        emitEvent({ component: 'Picker', type: 'change', payload: { items, vals }, props: props, timestamp: Date.now() });
      }
    }
    animRafIds[col] = requestAnimationFrame(frame);
  }

  /* ═══════════════════════════════════════════════════════════
     Cancel / Confirm
     ═══════════════════════════════════════════════════════════ */

  function cancel() {
    local.onCancel?.();
    emitEvent({ component: 'Picker', type: 'cancel', payload: undefined, props: props, timestamp: Date.now() });
    if (autoMode()) closeSheet();
    else local.onUpdateShow?.(false);
  }

  function confirm() {
    const items = allColumns().map((cols, i) => cols[allIdxs()[i]]);
    const vals = allIdxs().map((idx, i) => allColumns()[i][idx]?.value ?? '');
    local.onConfirm?.call(void 0, items, vals);
    emitEvent({ component: 'Picker', type: 'confirm', payload: { items, vals }, props: props, timestamp: Date.now() });
    if (autoMode()) closeSheet();
    else local.onUpdateShow?.(false);
  }

  /* ═══════════════════════════════════════════════════════════
     calcStyle — item visibility & opacity
     ═══════════════════════════════════════════════════════════ */

  function calcStyle(itemIdx: number, colIdx: number): Record<string, string | number> {
    // 不动态调整 opacity，仅用于判断选中态。
    // opacity 由 CSS .item / .itemSelected 控制，动画期间不会闪白。
    return {};
  }

  function isItemSelected(itemIdx: number, colIdx: number): boolean {
    // Track visual position via translateY during CSS transition,
    // not selectedIdx (which only updates after animation completes)
    return itemIdx === Math.round(-allTranslates()[colIdx] / lineHeight());
  }

  /* ═══════════════════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════════════════ */

  return (
    <>
      {/* Auto mode: render a Cell trigger */}
      <Show when={autoMode()}>
        <Cell
          title={displayText() || placeholderText()}
          clickable flush
          onClick={() => openSheet()}
          class={local.class}
          style={typeof local.style === 'string' ? local.style : undefined}
        />
      </Show>

      <Show when={internalShow()}>
        <Portal mount={local.teleport as Node ?? (typeof document !== 'undefined' ? document.body : undefined)}>
        {/* 遮罩：mount 指向 teleport 同目标，避免溢出到模拟器外 */}
        <Overlay
          open={internalShow()}
          zIndex={Number(local.zIndex ?? 2000)}
          duration={200}
          onClose={() => cancel()}
          mount={local.teleport as Node | undefined}
        />

        {/* 底部面板 */}
        <div
          class={cn(
            styles.sheet,
            local.class,
            animated() && styles.sheetEnter,
          )}
          style={{
            'z-index': (Number(local.zIndex ?? 2000) + 1).toString(),
            '--sc-picker-visible-height': `${local.visibleItemCount! * lineHeight()}px`,
            ...(typeof local.style === 'object' ? (local.style as Record<string, string>) : {}),
          }}
        >
          {/* ── Header ── */}
          <div class={styles.header}>
            <button class={styles.cancelBtn} onClick={cancel}>
              {cancelLabel()}
            </button>
            <span class={styles.title}>{titleLabel()}</span>
            <button class={styles.confirmBtn} onClick={confirm}>
              {confirmLabel()}
            </button>
          </div>

          {/* ── Columns ── */}
          <div class={styles.columns}>
            {/* 中心高亮指示条 */}
            <div class={styles.indicator} />

            {/* 触摸捕获层 */}
            <div
              class={styles.mask}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerLeave}
            />

            <For each={allColumns()}>
              {(col, colIdx) => (
                <div
                  data-testid="picker-column"
                  class={styles.column}
                  style={{
                    'flex': `0 0 ${100 / colCount()}%`,
                    'transition-duration': `${allDurations()[colIdx()]}s`,
                    'transform': `translate3d(0, ${allTranslates()[colIdx()]}px, 0)`,
                  }}
                >
                  {/* 顶部占位 */}
                  <For each={placeholderItems()[colIdx()][0]}>
                    {() => <div class={styles.placeholderItem} />}
                  </For>

                  {/* 实际选项 */}
                  <For each={col}>
                    {(item, itemIdx) => (
                      <div
                        class={cn(
                          styles.item,
                          item.disabled && styles.itemDisabled,
                          isItemSelected(itemIdx(), colIdx()) && styles.itemSelected,
                          item.className,
                        )}
                        style={calcStyle(itemIdx(), colIdx())}
                      >
                        {item.render ?? item.text}
                      </div>
                    )}
                  </For>

                  {/* 底部占位 */}
                  <For each={placeholderItems()[colIdx()][1]}>
                    {() => <div class={styles.placeholderItem} />}
                  </For>
                </div>
              )}
            </For>
          </div>
        </div>
      </Portal>
      </Show>
    </>
  );
};
