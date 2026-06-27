import {
  createSignal,
  mergeProps,
  splitProps,
  Show,
  type Component,
  type JSX,
} from 'solid-js';
import { cn } from '../../utils';
import { Lazyload } from '../Lazyload';
import { Icon } from '../Icon';
import type { ImageProps } from './types';
import styles from './Image.module.css';

const defaultProps: Partial<ImageProps> = {
  fit: 'fill',
  alt: '',
};

/**
 * Image 图片 — 增强的图片组件。
 *
 * 支持懒加载、加载占位、失败兜底、多种填充方式、圆角/圆形等常见需求。
 * `lazy` 模式下内部使用 Lazyload 组件，图片进入视口才开始加载。
 *
 * @example 基础用法
 * ```tsx
 * <Image src="photo.jpg" width={200} height={150} fit="cover" />
 * ```
 *
 * @example 懒加载
 * ```tsx
 * <Image src="large.jpg" lazy placeholder={<Skeleton />} />
 * ```
 */
export const Image: Component<ImageProps> = (rawProps) => {
  const props = mergeProps(defaultProps, rawProps);

  const [local, rest] = splitProps(props, [
    'src', 'alt', 'width', 'height', 'fit', 'position', 'radius', 'round',
    'block', 'lazy', 'placeholder', 'fallback', 'iconSize',
    'onLoad', 'onError', 'onClick', 'preview', 'class', 'style',
  ]);

  const [status, setStatus] = createSignal<'loading' | 'loaded' | 'error'>('loading');
  const [previewOpen, setPreviewOpen] = createSignal(false);

  const sizeStyle = (): JSX.CSSProperties => {
    const s: JSX.CSSProperties = {};
    if (local.width) s['width'] = typeof local.width === 'number' ? `${local.width}px` : local.width;
    if (local.height) s['height'] = typeof local.height === 'number' ? `${local.height}px` : local.height;
    return s;
  };

  const iconSz = () =>
    local.iconSize
      ? typeof local.iconSize === 'number' ? `${local.iconSize}px` : local.iconSize
      : '2rem';

  const handleClick = (e: MouseEvent) => {
    if (local.preview && status() === 'loaded') {
      setPreviewOpen(true);
    }
    local.onClick?.(e as any);
  };

  const imgEl = (
    <img
      src={local.src}
      alt={local.alt}
      class={styles.img}
      style={{
        'object-fit': local.fit,
        'object-position': local.position,
        ...(local.radius ? { 'border-radius': typeof local.radius === 'number' ? `${local.radius}px` : local.radius } : {}),
        ...(status() === 'error' ? { display: 'none' } : {}),
        ...(local.preview ? { cursor: 'pointer' } : {}),
      }}
      onLoad={() => { setStatus('loaded'); local.onLoad?.(); }}
      onError={() => { setStatus('error'); local.onError?.(); }}
      onClick={handleClick}
      {...rest}
    />
  );

  const wrapper = (
    <div
      class={cn(
        styles.wrapper,
        local.block && styles.block,
        local.round && styles.round,
        local.class,
      )}
      style={{
        ...sizeStyle(),
        ...(local.radius && !local.round ? { 'border-radius': typeof local.radius === 'number' ? `${local.radius}px` : local.radius } : {}),
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
    >
      {imgEl}
      <Show when={status() === 'loading'}>
        <div class={styles.state} style={sizeStyle()}>
          {local.placeholder || <Icon name="image" size={iconSz()} />}
        </div>
      </Show>
      <Show when={status() === 'error'}>
        <div class={styles.state} style={sizeStyle()}>
          {local.fallback || <Icon name="close-circle" size={iconSz()} />}
        </div>
      </Show>
    </div>
  );

  return (
    <>
      {local.lazy ? (
        <Lazyload placeholder={local.placeholder ? <div class={styles.state} style={sizeStyle()}>{local.placeholder}</div> : undefined}>
          {wrapper}
        </Lazyload>
      ) : wrapper}

      <Show when={previewOpen()}>
        <div class={styles.previewOverlay} onClick={() => setPreviewOpen(false)}>
          <img src={local.src} class={styles.previewImg} onClick={(e) => e.stopPropagation()} />
        </div>
      </Show>
    </>
  );
};
