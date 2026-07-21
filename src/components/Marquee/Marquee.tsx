import { mergeProps, splitProps, type Component } from 'solid-js';
import { cn, scopedStyle } from '../../utils';
import type { MarqueeProps } from './types';
import rawStyles from './Marquee.module.css';

const styles = scopedStyle(rawStyles, 'sc-marquee');

const defaultProps: Partial<MarqueeProps> = {
  duration: 10,
  direction: 'left',
  pauseOnHover: true,
};

/**
 * Marquee 跑马灯 — 水平无缝滚动容器。
 * 内容保持原样渲染，不添加任何额外样式。
 */
export const Marquee: Component<MarqueeProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local, rest] = splitProps(props, ['duration', 'direction', 'pauseOnHover', 'gap', 'class', 'style', 'children']);

  const cssVars = () => {
    const v: Record<string, string> = {
      '--mq-duration': `${local.duration}s`,
      '--mq-direction': local.direction === 'right' ? 'reverse' : 'normal',
    };
    if (local.gap) v['--mq-gap'] = typeof local.gap === 'number' ? `${local.gap}px` : local.gap;
    return v;
  };

  return (
    <div
      class={cn(styles.container, local.pauseOnHover && styles.pauseOnHover, local.class)}
      style={{ ...cssVars(), ...(typeof local.style === 'object' ? local.style : {}) }}
      {...rest}
    >
      <div class={styles.track}>
        <div class={styles.content}>{local.children}</div>
        <div class={styles.content} aria-hidden="true">{local.children}</div>
      </div>
    </div>
  );
};
