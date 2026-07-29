import { mergeProps, splitProps, Show, For, type Component } from 'solid-js';
import type { SkeletonProps } from './types';
import { cn, scopedStyle } from '../../utils';
import rawStyles from './Skeleton.module.css';
const styles = scopedStyle(rawStyles, 'sc-skeleton');

const defaultProps: Partial<SkeletonProps> = {
  loading: false,
  animated: false,
  size: 'normal',
  shape: 'round',
  duration: 0.6,
  rows: 1,
};

export const Skeleton: Component<SkeletonProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);
  const [local] = splitProps(props, [
    'loading', 'animated', 'size', 'shape', 'duration',
    'rows', 'width', 'height', 'children', 'class', 'style',
  ]);

  const rowStyle = (idx: number): Record<string, any> => {
    const s: Record<string, any> = {};
    if (local.duration) s['--sc-skeleton-duration'] = `${local.duration}s`;
    if (local.width) {
      const w = typeof local.width === 'number' ? `${local.width}px` : local.width;
      s['width'] = idx === local.rows! - 1 && local.rows! > 1 ? undefined : w;
    }
    if (local.height) {
      s['height'] = typeof local.height === 'number' ? `${local.height}px` : local.height;
    }
    return s;
  };

  return (
    <Show when={local.loading} fallback={local.children}>
      <div
        class={cn(styles.wrapper, local.class)}
        style={typeof local.style === 'object' ? local.style as Record<string, any> : undefined}
      >
        <For each={Array.from({ length: local.rows! })}>
          {(_, idx) => (
            <div
              class={cn(
                styles.row,
                styles[local.shape!],
                !local.width && !local.height ? styles[local.size!] : '',
                local.animated ? styles.animated : '',
              )}
              style={rowStyle(idx())}
            />
          )}
        </For>
      </div>
    </Show>
  );
};
