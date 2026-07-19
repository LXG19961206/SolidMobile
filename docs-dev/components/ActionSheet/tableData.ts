import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useActionSheetTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'open', type: 'boolean', def: '—', desc: 'actionsheet.props.open' },
      { name: 'onClose', type: '() => void', def: '—', desc: 'actionsheet.props.onClose' },
      { name: 'items', type: 'ActionSheetItem[]', def: '—', desc: 'actionsheet.props.items' },
      { name: 'children', type: 'JSX.Element', def: '—', desc: 'actionsheet.props.children' },
      { name: 'title', type: 'string', def: '—', desc: 'actionsheet.props.title' },
      { name: 'closeable', type: 'boolean', def: 'false', desc: 'actionsheet.props.closeable' },
      { name: 'description', type: 'string', def: '—', desc: 'actionsheet.props.description' },
      { name: 'cancelText', type: 'string', def: '—', desc: 'actionsheet.props.cancelText' },
      { name: 'closeOnSelect', type: 'boolean', def: 'true', desc: 'actionsheet.props.closeOnSelect' },
      { name: 'closeOnOverlayClick', type: 'boolean', def: 'true', desc: 'actionsheet.props.closeOnOverlayClick' },
      { name: 'round', type: 'boolean', def: 'true', desc: 'actionsheet.props.round' },
      { name: 'lockScroll', type: 'boolean', def: 'true', desc: 'actionsheet.props.lockScroll' },
      { name: 'onSelect', type: '(item, index) => void', def: '—', desc: 'actionsheet.props.onSelect' },
      { name: 'class', type: 'string', def: '—', desc: 'actionsheet.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'actionsheet.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'ActionSheet',
    rows: [
      { name: '--sc-actionsheet-bg', type: 'color', def: '#fff', desc: 'actionsheet.cssVars.--sc-actionsheet-bg' },
      { name: '--sc-actionsheet-item-height', type: 'length', def: '50px', desc: 'actionsheet.cssVars.--sc-actionsheet-item-height' },
      { name: '--sc-actionsheet-cancel-btn-height', type: 'length', def: '50px', desc: 'actionsheet.cssVars.--sc-actionsheet-cancel-btn-height' },
      { name: '--sc-actionsheet-header-height', type: 'length', def: '48px', desc: 'actionsheet.cssVars.--sc-actionsheet-header-height' },
      { name: '--sc-actionsheet-max-height', type: 'length', def: '70vh', desc: 'actionsheet.cssVars.--sc-actionsheet-max-height' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
