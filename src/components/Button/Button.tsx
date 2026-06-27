import { splitProps, mergeProps, type Component, type JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { cn, contrastText } from '../../utils';
import { Icon } from '../Icon';
import type { ButtonProps } from './types';
import styles from './Button.module.css';

const defaultProps: Partial<ButtonProps> = {
  type: 'primary',
  variant: 'solid',
  size: 'md',
  iconPosition: 'left',
  nativeType: 'button',
};

/**
 * 通用按钮组件 — 触发用户操作的核心交互元素。
 *
 * `type` 控制语义色（primary / danger / success / warning / info / secondary），
 * `variant` 控制填充方式（solid / outline / ghost），两个维度正交组合。
 *
 * 设置 `href` 时自动渲染为 `<a>` 标签，其余情况为标准 `<button>`。
 *
 * @example 基础用法
 * ```tsx
 * <Button type="primary" text="确认" />
 * <Button type="danger" variant="outline" text="删除" />
 * <Button icon="star" text="收藏" />
 * ```
 *
 * @example 加载状态
 * ```tsx
 * <Button loading loadingText="提交中..." text="提交" />
 * ```
 *
 * @example 自定义颜色
 * ```tsx
 * <Button color="#6366f1" text="Indigo" />
 * ```
 */
export const Button: Component<ButtonProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local, rest] = splitProps(props, [
    'text',
    'children',
    'type',
    'variant',
    'size',
    'block',
    'round',
    'hairline',
    'color',
    'textColor',
    'icon',
    'iconPosition',
    'disabled',
    'loading',
    'loadingText',
    'nativeType',
    'href',
    'target',
    'onClick',
    'class',
    'style',
  ]);

  // --- Derived ---
  const isDisabled = () => local.disabled || local.loading;
  const displayText = () =>
    local.loading && local.loadingText ? local.loadingText : local.text ?? local.children;
  const hasIcon = () => !!local.icon && !local.loading;
  const hasContent = () => !!displayText() || !!local.children;
  const showSpinner = () => local.loading;

  // --- Element tag ---
  const tag = () => (local.href ? 'a' : 'button');

  // --- Classes ---
  const classes = () =>
    cn(
      styles.button,
      styles[local.type!],
      styles[local.variant!],
      styles[local.size!],
      local.block && styles.block,
      local.round && styles.round,
      local.hairline && styles.hairline,
      local.loading && styles.isLoading,
      local.class,
    );

  // --- Inline styles for custom color overrides ---
  const inlineStyle = (): JSX.CSSProperties => {
    const s: JSX.CSSProperties = {};
    if (typeof local.style === 'string') return s;
    if (local.style && typeof local.style === 'object') Object.assign(s, local.style as JSX.CSSProperties);
    if (local.color) {
      s['--_btn-custom-bg'] = local.color;
      if (local.variant === 'solid') s['background-color'] = local.color;
      // Auto-compute contrasting text color when user doesn't specify one
      if (!local.textColor) {
        const autoText = contrastText(local.color);
        s['--_btn-custom-text'] = autoText;
        s['color'] = autoText;
      }
    }
    if (local.textColor) {
      s['--_btn-custom-text'] = local.textColor;
      s['color'] = local.textColor;
    }
    return s;
  };

  // --- Event handlers ---
  const handleClick: JSX.EventHandler<HTMLButtonElement | HTMLAnchorElement, MouseEvent> = (e) => {
    if (isDisabled()) {
      e.preventDefault();
      return;
    }
    if (typeof local.onClick === 'function') {
      local.onClick(e);
    }
  };

  // --- Icon rendering ---
  const renderIcon = () => {
    if (!hasIcon()) return null;
    const iconContent =
      typeof local.icon === 'string' ? <Icon name={local.icon} /> : local.icon;
    return <span class={styles.icon}>{iconContent}</span>;
  };

  return (
    <Dynamic
      component={tag()}
      {...(tag() === 'button'
        ? {
            type: local.nativeType,
            disabled: isDisabled(),
            'aria-busy': local.loading ? 'true' : undefined,
          }
        : {
            href: local.href,
            target: local.target,
            rel: local.target === '_blank' ? 'noopener noreferrer' : undefined,
            role: 'button',
            'aria-disabled': isDisabled() ? 'true' : undefined,
          })}
      class={classes()}
      style={inlineStyle()}
      onClick={handleClick}
      {...rest}
    >
      {/* Spinner */}
      {showSpinner() && <span class={styles.spinner} aria-hidden="true" />}

      {/* Left icon */}
      {local.iconPosition === 'left' && renderIcon()}

      {/* Text content */}
      {hasContent() && <span class={styles.content}>{displayText()}</span>}

      {/* Right icon */}
      {local.iconPosition === 'right' && renderIcon()}
    </Dynamic>
  );
};
