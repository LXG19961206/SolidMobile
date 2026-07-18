import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useNavBarTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'title', type: 'string | JSX.Element', def: '—', desc: 'navbar.props.title' },
      { name: 'left', type: 'JSX.Element', def: '—', desc: 'navbar.props.left' },
      { name: 'right', type: 'JSX.Element', def: '—', desc: 'navbar.props.right' },
      { name: 'backArrow', type: 'boolean', def: 'false', desc: 'navbar.props.backArrow' },
      { name: 'onBack', type: '() => void', def: '—', desc: 'navbar.props.onBack' },
      { name: 'onLeftClick', type: '() => void', def: '—', desc: 'navbar.props.onLeftClick' },
      { name: 'onRightClick', type: '() => void', def: '—', desc: 'navbar.props.onRightClick' },
      { name: 'fixed', type: 'boolean', def: 'false', desc: 'navbar.props.fixed' },
      { name: 'placeholder', type: 'boolean', def: 'false', desc: 'navbar.props.placeholder' },
      { name: 'border', type: 'boolean', def: 'false', desc: 'navbar.props.border' },
      { name: 'zIndex', type: 'number | string', def: '1000', desc: 'navbar.props.zIndex' },
      { name: 'background', type: 'string', def: '—', desc: 'navbar.props.background' },
      { name: 'color', type: 'string', def: '—', desc: 'navbar.props.color' },
      { name: 'height', type: 'number | string', def: '46', desc: 'navbar.props.height' },
      { name: 'class', type: 'string', def: '—', desc: 'navbar.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'navbar.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'NavBar',
    rows: [
      { name: '--sc-navbar-height', type: 'length', def: '46px', desc: 'navbar.cssVars.--sc-navbar-height' },
      { name: '--sc-navbar-bg', type: 'color', def: '#fff', desc: 'navbar.cssVars.--sc-navbar-bg' },
      { name: '--sc-navbar-color', type: 'color', def: '#1f2937', desc: 'navbar.cssVars.--sc-navbar-color' },
      { name: '--sc-navbar-font-size', type: 'length', def: '1rem', desc: 'navbar.cssVars.--sc-navbar-font-size' },
      { name: '--sc-navbar-border', type: 'color', def: '#f3f4f6', desc: 'navbar.cssVars.--sc-navbar-border' },
      { name: '--sc-navbar-padding', type: 'length', def: '16px', desc: 'navbar.cssVars.--sc-navbar-padding' },
      { name: '--sc-navbar-title-weight', type: 'number', def: '600', desc: 'navbar.cssVars.--sc-navbar-title-weight' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
