import { useContext, type Component } from 'solid-js';
import { Notify, NotifyRenderer } from '../../../../src/components/notify/NotifyManager';
import { Cell } from '../../../../src/components/Cell';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow } from '../../../../src/doc-utils';
import type { NotifyOptions } from '../../../../src/components/notify/types';
import { useT } from '../../../doc-i18n';

const propsData: PropRow[] = [
  { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger'", default: "'danger'", required: false, desc: '类型。' },
  { name: 'message', type: 'string', default: '—', required: true, desc: '展示文案，支持 \\n 换行。' },
  { name: 'duration', type: 'number', default: '3000', required: false, desc: '展示时长(ms)，0 不消失。' },
  { name: 'position', type: "'top' | 'bottom'", default: "'top'", required: false, desc: '弹出位置。' },
  { name: 'color', type: 'string', default: "'white'", required: false, desc: '字体颜色。' },
  { name: 'background', type: 'string', default: '—', required: false, desc: '背景颜色。' },
  { name: 'lockScroll', type: 'boolean', default: 'false', required: false, desc: '锁定背景滚动。' },
  { name: 'onClick', type: '(e: MouseEvent) => void', default: '—', required: false, desc: '点击回调。' },
  { name: 'onClose', type: '() => void', default: '—', required: false, desc: '关闭回调。' },
];

const NotifyDocInner: Component = () => {
  const t = useT();
  const phone = useContext(PhoneTargetContext);
  const m = () => phone?.();
  const noti = (fn: Function, msg: string, opts?: Partial<NotifyOptions>) =>
    fn(msg, { ...opts, teleport: m() });

  return (
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <NotifyRenderer />
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Notify 通知栏</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px' }}>顶部/底部弹出式通知栏，命令式 API 调用。</p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <DemoBlock title="Primary" desc="主要通知。" code="Notify.primary('这是一条主要通知');" groupCode="基础类型">
        <Cell title="Primary" clickable onClick={() => noti(Notify.primary, '这是一条主要通知')} />
      </DemoBlock>
      <DemoBlock title="Success" desc="成功通知。" code="Notify.success('操作成功');" groupCode="基础类型">
        <Cell title="Success" clickable onClick={() => noti(Notify.success, '操作成功')} />
      </DemoBlock>
      <DemoBlock title="Warning" desc="警告通知。" code="Notify.warning('请注意');" groupCode="提示">
        <Cell title="Warning" clickable onClick={() => noti(Notify.warning, '请注意')} />
      </DemoBlock>
      <DemoBlock title="Danger" desc="危险通知。" code="Notify.danger('操作失败');" groupCode="提示">
        <Cell title="Danger" clickable onClick={() => noti(Notify.danger, '操作失败')} />
      </DemoBlock>
      <DemoBlock title="底部弹出" desc="position: 'bottom'。" code={`Notify.success('已添加', { position: 'bottom' });`} groupCode="其他">
        <Cell title="底部弹出" clickable onClick={() => noti(Notify.success, '已添加至购物车', { position: 'bottom' })} />
      </DemoBlock>
      <DemoBlock title="不自动消失" desc="duration: 0 手动关闭。" code="Notify.primary('点击关闭', { duration: 0 });" groupCode="其他">
        <Cell title="不自动消失" clickable onClick={() => Notify.primary('点击任意位置手动关闭', { duration: 0, teleport: m() })} />
      </DemoBlock>

      <GroupCodePhone />
    </div>
  );
};

export const NotifyDocPage = () => (
  <DocLayout><NotifyDocInner /></DocLayout>
);
