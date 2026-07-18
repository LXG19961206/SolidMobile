import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useNotifyTableData() {
  const t = useT();

  const propsTables: TableSection[] = [
    {
      title: 'Notify Options',
      rows: [
        { name: 'message', type: 'string | JSX.Element', def: '—', desc: 'notify.props.message' },
        { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger'", def: "'primary'", desc: 'notify.props.type' },
        { name: 'position', type: "'top' | 'bottom'", def: "'top'", desc: 'notify.props.position' },
        { name: 'duration', type: 'number', def: '3000', desc: 'notify.props.duration' },
        { name: 'color', type: 'string', def: "'white'", desc: 'notify.props.color' },
        { name: 'background', type: 'string', def: '—', desc: 'notify.props.background' },
        { name: 'lockScroll', type: 'boolean', def: 'false', desc: 'notify.props.lockScroll' },
        { name: 'onClick', type: '() => void', def: '—', desc: 'notify.props.onClick' },
        { name: 'onClose', type: '() => void', def: '—', desc: 'notify.props.onClose' },
        { name: 'className', type: 'string', def: '—', desc: 'notify.props.className' },
        { name: 'zIndex', type: 'number', def: '—', desc: 'notify.props.zIndex' },
      ],
    },
    {
      title: 'Methods',
      rows: [
        { name: 'Notify.primary(msg, opts?)', type: 'NotifyHandle', def: '—', desc: 'notify.methods.primary' },
        { name: 'Notify.success(msg, opts?)', type: 'NotifyHandle', def: '—', desc: 'notify.methods.success' },
        { name: 'Notify.warning(msg, opts?)', type: 'NotifyHandle', def: '—', desc: 'notify.methods.warning' },
        { name: 'Notify.danger(msg, opts?)', type: 'NotifyHandle', def: '—', desc: 'notify.methods.danger' },
        { name: 'Notify.show(options)', type: 'NotifyHandle', def: '—', desc: 'notify.methods.show' },
        { name: 'Notify.dismissAll()', type: 'void', def: '—', desc: 'notify.methods.dismissAll' },
      ],
    },
  ];

  return { propsTables };
}
