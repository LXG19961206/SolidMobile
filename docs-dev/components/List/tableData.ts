import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useListTableData() {
  const t = useT();

  const propsTables: TableSection[] = [{
    rows: [
      { name: 'data', type: 'I[]', def: '—', desc: 'list.props.data' },
      { name: 'onLoad', type: '() => Promise<I[]>', def: '—', desc: 'list.props.onLoad' },
      { name: 'finished', type: 'boolean', def: 'false', desc: 'list.props.finished' },
      { name: 'children', type: '(item, index) => JSX.Element', def: '—', desc: 'list.props.children' },
      { name: 'empty', type: 'string | JSX.Element', def: '—', desc: 'list.props.empty' },
      { name: 'loadMoreText', type: 'string', def: '—', desc: 'list.props.loadMoreText' },
      { name: 'finishedText', type: 'string', def: '—', desc: 'list.props.finishedText' },
      { name: 'errorText', type: 'string', def: '—', desc: 'list.props.errorText' },
      { name: 'offset', type: 'number', def: '100', desc: 'list.props.offset' },
      { name: 'virtual', type: 'boolean', def: 'false', desc: 'list.props.virtual' },
      { name: 'itemHeight', type: 'number', def: '—', desc: 'list.props.itemHeight' },
      { name: 'pullRefresh', type: 'boolean', def: 'false', desc: 'list.props.pullRefresh' },
      { name: 'onRefresh', type: '() => Promise<void>', def: '—', desc: 'list.props.onRefresh' },
      { name: 'class', type: 'string', def: '—', desc: 'list.props.class' },
      { name: 'style', type: 'CSSProperties | string', def: '—', desc: 'list.props.style' },
    ],
  }];

  return { propsTables };
}
