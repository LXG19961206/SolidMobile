import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function usePullRefreshTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'loading', type: 'boolean', def: '—', desc: 'pullrefresh.props.loading' },
      { name: 'onRefresh', type: '() => void | Promise<void>', def: '—', desc: 'pullrefresh.props.onRefresh' },
      { name: 'pullDistance', type: 'number', def: '80', desc: 'pullrefresh.props.pullDistance' },
      { name: 'headHeight', type: 'number', def: '60', desc: 'pullrefresh.props.headHeight' },
      { name: 'successDuration', type: 'number', def: '500', desc: 'pullrefresh.props.successDuration' },
      { name: 'animationDuration', type: 'number', def: '300', desc: 'pullrefresh.props.animationDuration' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'pullrefresh.props.disabled' },
      { name: 'pullingText', type: 'string', def: '—', desc: 'pullrefresh.props.pullingText' },
      { name: 'loosingText', type: 'string', def: '—', desc: 'pullrefresh.props.loosingText' },
      { name: 'loadingText', type: 'string', def: '—', desc: 'pullrefresh.props.loadingText' },
      { name: 'successText', type: 'string', def: '—', desc: 'pullrefresh.props.successText' },
      { name: 'class', type: 'string', def: '—', desc: 'pullrefresh.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'pullrefresh.props.style' },
    ],
  }];

  const cssVarsTables: TableSection[] = [{
    title: 'PullRefresh',
    rows: [
      { name: '--sc-pullrefresh-duration', type: 'time', def: '0.3s', desc: 'pullrefresh.cssVars.--sc-pullrefresh-duration' },
      { name: '--sc-pullrefresh-head', type: 'length', def: '60px', desc: 'pullrefresh.cssVars.--sc-pullrefresh-head' },
    ],
  }];

  return { propsTables, cssVarsTables };
}
