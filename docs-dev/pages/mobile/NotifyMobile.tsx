import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface NotifyMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Notify, NotifyRenderer } from '../../../src/components/notify';
import { Button } from '../../../src/components/Button';

const propsData = [
  { name: 'Notify.primary(msg)', type: 'NotifyHandle', desc: '主色通知' },
  { name: 'Notify.success(msg)', type: 'NotifyHandle', desc: '成功通知' },
  { name: 'Notify.warning(msg)', type: 'NotifyHandle', desc: '警告通知' },
  { name: 'Notify.danger(msg)', type: 'NotifyHandle', desc: '危险通知' },
  { name: 'Notify.show(options)', type: 'NotifyHandle', desc: '完整配置，支持 type/position/duration 等' },
  { name: 'Notify.dismissAll()', type: 'void', desc: '关闭所有通知' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px' },
};

export const NotifyMobile: Component<NotifyMobileProps> = (props) => {
  return (
    <MobilePreview title="Notify 通知栏" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <NotifyRenderer />

      {/* 四种类型 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>四种类型</div>
        <div style={CARD.desc}>primary / success / warning / danger（从顶部弹出）</div>
        <div style={CARD.body}>
          <Button type="primary" size="sm" text="Primary" onClick={() => Notify.primary('主色通知栏')} />
          <Button type="success" size="sm" text="Success" onClick={() => Notify.success('操作成功！')} />
          <Button type="warning" size="sm" text="Warning" onClick={() => Notify.warning('请注意检查')} />
          <Button type="danger" size="sm" text="Danger" onClick={() => Notify.danger('操作失败')} />
        </div>
      </div>

      {/* 位置 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>位置 position</div>
        <div style={CARD.desc}>top（默认）/ bottom</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text="顶部" onClick={() => Notify.show({ message: '顶部通知', type: 'primary', position: 'top', duration: 2000 })} />
          <Button variant="outline" size="sm" text="底部" onClick={() => Notify.show({ message: '底部通知', type: 'success', position: 'bottom', duration: 2000 })} />
        </div>
      </div>

      {/* 自定义 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义样式</div>
        <div style={CARD.desc}>color / background 自定义外观</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text="自定义颜色" onClick={() => Notify.show({ message: '自定义通知', background: '#6366f1', color: '#fff', duration: 2000 })} />
          <Button variant="outline" size="sm" text="长时显示" onClick={() => Notify.show({ message: '不会自动消失（duration=0）', type: 'warning', duration: 0 })} />
        </div>
      </div>
    </MobilePreview>
  );
};
