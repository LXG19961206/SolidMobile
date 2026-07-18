import { useT } from '../../doc-i18n';
import type { TableSection } from '../../doc-utils';

export function useToastTableData() {
  const t = useT();

  const propsTables: TableSection[] = [
    {
      title: 'Toast Options',
      rows: [
        { name: 'message', type: 'string | JSX.Element', def: '—', desc: 'toast.props.message' },
        { name: 'type', type: "'success' | 'error' | 'warning' | 'loading' | 'info'", def: '—', desc: 'toast.props.type' },
        { name: 'position', type: "'top' | 'middle' | 'bottom'", def: "'middle'", desc: 'toast.props.position' },
        { name: 'duration', type: 'number', def: '3000', desc: 'toast.props.duration' },
        { name: 'overlay', type: 'boolean', def: 'false', desc: 'toast.props.overlay' },
        { name: 'closeOnClick', type: 'boolean', def: 'false', desc: 'toast.props.closeOnClick' },
        { name: 'icon', type: 'JSX.Element', def: '—', desc: 'toast.props.icon' },
        { name: 'zIndex', type: 'number', def: '—', desc: 'toast.props.zIndex' },
        { name: 'stack', type: 'boolean', def: 'false', desc: 'toast.props.stack' },
        { name: 'onClose', type: '() => void', def: '—', desc: 'toast.props.onClose' },
      ],
    },
    {
      title: 'Methods',
      rows: [
        { name: 'Toast.show(options)', type: 'ToastHandle', def: '—', desc: 'toast.methods.show' },
        { name: 'Toast.success(msg, opts?)', type: 'ToastHandle', def: '—', desc: 'toast.methods.success' },
        { name: 'Toast.error(msg, opts?)', type: 'ToastHandle', def: '—', desc: 'toast.methods.error' },
        { name: 'Toast.warning(msg, opts?)', type: 'ToastHandle', def: '—', desc: 'toast.methods.warning' },
        { name: 'Toast.loading(msg, opts?)', type: 'ToastHandle', def: '—', desc: 'toast.methods.loading' },
        { name: 'Toast.info(msg, opts?)', type: 'ToastHandle', def: '—', desc: 'toast.methods.info' },
        { name: 'Toast.dismissAll()', type: 'void', def: '—', desc: 'toast.methods.dismissAll' },
      ],
    },
  ];

  return { propsTables };
}
