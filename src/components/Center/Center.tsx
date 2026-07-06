import { mergeProps, splitProps, type Component, type JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { cn, scopedStyle } from '../../utils';
import type { CenterProps } from './types';
import rawStyles from './Center.module.css';
const styles = scopedStyle(rawStyles, 'sc-center');

const defaultProps: Partial<CenterProps> = {
  as: 'div',
};

/**
 * Center 居中组件 — 解决初级开发者常见的居中难题。
 *
 * 提供五种居中策略，通过布尔参数自由组合：
 * - `flexX` / `flexY`：Flexbox 居中（默认无参数时两轴同时开启）
 * - `text`：text-align 居中
 * - `vertical`：vertical-align 居中
 * - `position`：absolute + transform 居中
 *
 * @example 默认 flex 两轴居中
 * ```tsx
 * <Center><div>居中的内容</div></Center>
 * ```
 *
 * @example 水平 flex 居中
 * ```tsx
 * <Center flexX><span>水平居中</span></Center>
 * ```
 *
 * @example 绝对定位居中（Center 自身为定位容器，父级给高度即可）
 * ```tsx
 * <div style={{ height: 200 }}>
 *   <Center position><div>绝对居中</div></Center>
 * </div>
 * ```
 */
export const Center: Component<CenterProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local, rest] = splitProps(props, [
    'flexX',
    'flexY',
    'text',
    'vertical',
    'position',
    'inline',
    'as',
    'class',
    'style',
    'children',
  ]);

  // ── Determine which centering modes are active ──
  const hasAny = local.flexX || local.flexY || local.text || local.vertical || local.position;
  // Default: no props → flex both axes
  const useFlexX = hasAny ? !!local.flexX : true;
  const useFlexY = hasAny ? !!local.flexY : true;
  const useText = !!local.text;
  const useVertical = !!local.vertical;
  const usePosition = !!local.position;

  // ── Classes ──
  const classes = () =>
    cn(
      useFlexX && styles.flexX,
      useFlexY && styles.flexY,
      useText && styles.text,
      useVertical && styles.vertical,
      usePosition && styles.position,
      local.inline && styles.inline,
      local.class,
    );

  // ── Inline style ──
  const inlineStyle = (): JSX.CSSProperties | string | undefined => {
    if (typeof local.style === 'string') return local.style;
    return local.style as JSX.CSSProperties | undefined;
  };

  return (
    <Dynamic component={local.as} class={classes()} style={inlineStyle()} {...rest}>
      {usePosition ? (
        <div class={styles.positionInner}>{local.children}</div>
      ) : (
        local.children
      )}
    </Dynamic>
  );
};
