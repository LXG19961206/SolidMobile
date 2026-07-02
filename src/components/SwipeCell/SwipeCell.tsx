import {
  createSignal, createMemo, createEffect, on, onCleanup,
  Show, For, mergeProps, splitProps,
  type Component,
} from 'solid-js';
import { cn } from '../../utils';
import type { SwipeAction, SwipeCellProps } from './types';
import styles from './SwipeCell.module.css';

/* ── Constants ── */
const MOVE_DURATION = 0.05;      // 跟指滑动时的动画时长
const DEFAULT_DURATION = 0.3;    // snap 动画时长
const MOMENTUM_WINDOW = 300;     // 惯性判定时间窗口(ms)
const VELOCITY_THRESHOLD = 0.3;  // 速度阈值(px/ms)，超过即认为快速滑动

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

type QueueEntry = [number, number]; // [deltaX, timestamp]

/* ── Theme mapping ── */
const themeClass: Record<string, string> = {
  primary: styles.actionPrimary,
  success: styles.actionSuccess,
  warning: styles.actionWarning,
  danger: styles.actionDanger,
  default: styles.actionDefault,
};

const defaultProps: Partial<SwipeCellProps> = {
  threshold: 30,
  disabled: false,
};

export const SwipeCell: Component<SwipeCellProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'leftActions', 'rightActions', 'threshold', 'actionsWidth',
    'disabled', 'onOpen', 'onClose', 'children', 'class', 'style',
  ]);

  const queue = new FixedQueue<QueueEntry>(20);

  const [translateX, setTranslateX] = createSignal(0);
  const [animDuration, setAnimDuration] = createSignal(DEFAULT_DURATION);
  const [openSide, setOpenSide] = createSignal<'left' | 'right' | null>(null);
  const [isTracking, setIsTracking] = createSignal(false);

  let lastClientX = 0;
  let lastClientY = 0;
  let horizontalIntent: boolean | null = null; // null=未判定, true=水平, false=垂直
  let scrollGateTimer: ReturnType<typeof setTimeout> | null = null;

  onCleanup(() => {
    if (scrollGateTimer) clearTimeout(scrollGateTimer);
  });

  /* ── 测量按钮区实际宽度 ── */

  let rightRef: HTMLDivElement | undefined;
  let leftRef: HTMLDivElement | undefined;
  const [rightMeasured, setRightMeasured] = createSignal(0);
  const [leftMeasured, setLeftMeasured] = createSignal(0);

  function measureRight() {
    if (rightRef) setRightMeasured(rightRef.getBoundingClientRect().width);
  }
  function measureLeft() {
    if (leftRef) setLeftMeasured(leftRef.getBoundingClientRect().width);
  }

  const rightWidth = createMemo(() => {
    if (!local.rightActions?.length) return 0;
    if (local.actionsWidth) return local.actionsWidth;
    // 触发 getBoundingClientRect 的读取以建立依赖
    void rightMeasured();
    return rightMeasured() || 0;
  });

  const leftWidth = createMemo(() => {
    if (!local.leftActions?.length) return 0;
    if (local.actionsWidth) return local.actionsWidth;
    void leftMeasured();
    return leftMeasured() || 0;
  });

  /* ── 关闭 ── */
  function close(animate = true) {
    setAnimDuration(animate ? DEFAULT_DURATION : 0);
    setTranslateX(0);
    if (openSide()) {
      setOpenSide(null);
      local.onClose?.();
    }
  }

  function open(side: 'left' | 'right') {
    const target = side === 'right' ? -rightWidth() : leftWidth();
    setAnimDuration(DEFAULT_DURATION);
    setTranslateX(target);
    setOpenSide(side);
    local.onOpen?.();
  }

  /* ── Pointer Events ── */
  function onPointerDown(evt: PointerEvent) {
    if (local.disabled) return;

    const side = openSide();
    if (side) {
      // 已打开 → 开始跟踪，允许反向滑动关闭
      setAnimDuration(MOVE_DURATION);
      queue.clear();
      lastClientX = evt.clientX;
      lastClientY = evt.clientY;
      horizontalIntent = null;
      setIsTracking(true);
      return;
    }

    setAnimDuration(MOVE_DURATION);
    queue.clear();
    lastClientX = evt.clientX;
    lastClientY = evt.clientY;
    horizontalIntent = null;
    setIsTracking(true);
  }

  function onPointerMove(evt: PointerEvent) {
    if (!isTracking()) return;

    const dx = evt.clientX - lastClientX;
    const dy = evt.clientY - lastClientY;

    // 首次移动时判断方向意图
    if (horizontalIntent === null) {
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        horizontalIntent = Math.abs(dx) > Math.abs(dy);
      } else {
        return; // 还没到判定距离
      }
    }

    if (!horizontalIntent) {
      // 垂直滚动，让事件冒泡
      setIsTracking(false);
      return;
    }

    // 水平滑动，阻止冒泡
    evt.stopPropagation();
    evt.preventDefault();

    const side = openSide();
    if (side) {
      // 已打开状态，只允许反向滑动关闭
      if (side === 'right' && dx > 0) {
        // 右滑关闭（cell 已左滑打开，现在向右滑回去）
        const newX = translateX() + dx;
        setTranslateX(Math.min(0, newX));
        queue.push([dx, evt.timeStamp]);
        lastClientX = evt.clientX;
        lastClientY = evt.clientY;
        return;
      }
      if (side === 'left' && dx < 0) {
        // 左滑关闭（cell 已右滑打开，现在向左滑回去）
        const newX = translateX() + dx;
        setTranslateX(Math.max(0, newX));
        queue.push([dx, evt.timeStamp]);
        lastClientX = evt.clientX;
        lastClientY = evt.clientY;
        return;
      }
      // 同向滑动 → 忽略
      return;
    }

    // 未打开状态：只允许向左滑（右按钮）或向右滑（左按钮）
    if (dx > 0 && !local.leftActions?.length) return;   // 向右滑但没有左按钮
    if (dx < 0 && !local.rightActions?.length) return;  // 向左滑但没有右按钮

    const newX = translateX() + dx;

    // 超出限制时带阻尼
    const minX = -rightWidth();
    const maxX = leftWidth();
    let clampedX = newX;
    if (newX < minX) clampedX = minX + (newX - minX) * 0.3;
    if (newX > maxX) clampedX = maxX + (newX - maxX) * 0.3;

    setTranslateX(clampedX);
    queue.push([dx, evt.timeStamp]);

    lastClientX = evt.clientX;
    lastClientY = evt.clientY;
  }

  function onPointerUp(_evt: PointerEvent) {
    if (!isTracking()) return;
    setIsTracking(false);

    const currentX = translateX();
    const side = openSide();

    // ── 已打开 → 判断是保持打开还是关闭 ──
    if (side) {
      const width = side === 'right' ? rightWidth() : leftWidth();
      const target = side === 'right' ? -width : width;
      // 滑回超过一半 → 关闭，否则保持打开
      if (Math.abs(currentX - target) > width / 2) {
        close(true);
      } else {
        open(side); // snap 回全开
      }
      return;
    }

    // 没移动过 → 保持关闭
    if (queue.length === 0) {
      close(true);
      return;
    }

    // ── 未打开 → 判断开/关 ──
    const speed = getSpeed();
    const useMomentum = queue.length > 2 &&
      queue.tail()![1] - queue.head()![1] < MOMENTUM_WINDOW;

    // 决定开/关
    if (useMomentum) {
      // 快速滑动：按速度方向决定
      if (speed < -VELOCITY_THRESHOLD && local.rightActions?.length) {
        open('right');
      } else if (speed > VELOCITY_THRESHOLD && local.leftActions?.length) {
        open('left');
      } else {
        close(true);
      }
    } else {
      // 慢速滑动：按阈值决定
      if (currentX < -local.threshold! && local.rightActions?.length) {
        open('right');
      } else if (currentX > local.threshold! && local.leftActions?.length) {
        open('left');
      } else {
        close(true);
      }
    }
  }

  function onPointerLeave() {
    if (isTracking()) {
      onPointerUp(null as any);
    }
  }

  /** 从队列估算滑动速度(px/ms) */
  function getSpeed(): number {
    if (queue.length < 3) return 0;
    const len = queue.length;
    const d1 = queue.at(len - 1)![0];
    const d2 = queue.at(len - 2)![0];
    const d3 = queue.at(len - 3)![0];
    return (d1 + d2 + d3) / 3;
  }

  /** 外部点击（非本组件内）时关闭，用于多 cell 互斥 */
  function onClickAction(action: SwipeAction) {
    close(true);
    action.onClick?.();
  }

  /* ── Render ── */
  return (
    <div
      class={cn(styles.wrapper, local.class)}
      style={typeof local.style === 'object' ? (local.style as Record<string, string>) : {}}
    >
      {/* 左按钮 */}
      <Show when={!!local.leftActions?.length}>
        <div
          ref={(el) => { leftRef = el; queueMicrotask(measureLeft); }}
          class={cn(styles.actions, styles.actionsLeft)}
        >
          <For each={local.leftActions}>
            {(action) => (
              <div
                class={cn(
                  styles.action,
                  themeClass[action.theme || 'default'],
                  action.class,
                )}
                style={action.color ? { background: action.color } : {}}
                onClick={() => onClickAction(action)}
              >
                {action.text}
              </div>
            )}
          </For>
        </div>
      </Show>

      {/* 右按钮 */}
      <Show when={!!local.rightActions?.length}>
        <div
          ref={(el) => { rightRef = el; queueMicrotask(measureRight); }}
          class={cn(styles.actions, styles.actionsRight)}
        >
          <For each={local.rightActions}>
            {(action) => (
              <div
                class={cn(
                  styles.action,
                  themeClass[action.theme || 'default'],
                  action.class,
                )}
                style={action.color ? { background: action.color } : {}}
                onClick={() => onClickAction(action)}
              >
                {action.text}
              </div>
            )}
          </For>
        </div>
      </Show>

      {/* 内容层 */}
      <div
        class={styles.content}
        style={{
          transform: `translate3d(${translateX()}px, 0, 0)`,
          'transition-duration': `${animDuration()}s`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        {local.children}
      </div>
    </div>
  );
};
