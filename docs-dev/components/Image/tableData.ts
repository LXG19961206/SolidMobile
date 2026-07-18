import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useImageTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'src', type: 'string', def: '—', desc: 'image.props.src' },
      { name: 'alt', type: 'string', def: "''", desc: 'image.props.alt' },
      { name: 'width', type: 'string | number', def: '—', desc: 'image.props.width' },
      { name: 'height', type: 'string | number', def: '—', desc: 'image.props.height' },
      { name: 'fit', type: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'", def: "'fill'", desc: 'image.props.fit' },
      { name: 'position', type: 'string', def: '—', desc: 'image.props.position' },
      { name: 'radius', type: 'string | number', def: '—', desc: 'image.props.radius' },
      { name: 'round', type: 'boolean', def: 'false', desc: 'image.props.round' },
      { name: 'block', type: 'boolean', def: 'false', desc: 'image.props.block' },
      { name: 'lazy', type: 'boolean', def: 'false', desc: 'image.props.lazy' },
      { name: 'placeholder', type: 'JSX.Element', def: '—', desc: 'image.props.placeholder' },
      { name: 'fallback', type: 'JSX.Element', def: '—', desc: 'image.props.fallback' },
      { name: 'iconSize', type: 'string | number', def: '—', desc: 'image.props.iconSize' },
      { name: 'onLoad', type: '() => void', def: '—', desc: 'image.props.onLoad' },
      { name: 'onError', type: '() => void', def: '—', desc: 'image.props.onError' },
      { name: 'preview', type: 'boolean', def: 'false', desc: 'image.props.preview' },
      { name: 'class', type: 'string', def: '—', desc: 'image.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'image.props.style' },
    ],
  }];

  return { propsTables };
}
