import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface ToastMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Toast, ToastRenderer } from '../../../src/components/Toast';
import { Button } from '../../../src/components/Button';

const propsData = [
  { name: 'Toast.success(msg)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.success(msg)' },
  { name: 'Toast.error(msg)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.error(msg)' },
  { name: 'Toast.warning(msg)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.warning(msg)' },
  { name: 'Toast.loading(msg)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.loading(msg)' },
  { name: 'Toast.info(msg)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.info(msg)' },
  { name: 'Toast.show(options)', type: 'ToastHandle', desc: 'componentProps.toast.Toast.show(options)' },
  { name: 'Toast.dismissAll()', type: 'void', desc: 'componentProps.toast.Toast.dismissAll()' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px' },
};

export const ToastMobile: Component<ToastMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Toast 轻提示" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* 基础类型 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>五种类型</div>
        <div style={CARD.desc}>success / error / warning / loading / info</div>
        <div style={CARD.body}>
          <Button type="success" text="成功" size="sm" onClick={() => Toast.success('操作成功')} />
          <Button type="danger" text="错误" size="sm" onClick={() => Toast.error('操作失败')} />
          <Button type="warning" text="警告" size="sm" onClick={() => Toast.warning('请注意')} />
          <Button size="sm" text="加载" color="#6366f1" onClick={() => { const h = Toast.loading('加载中...'); setTimeout(() => h.dismiss(), 2000); }} />
          <Button size="sm" text="信息" color="#1677ff" onClick={() => Toast.info('提示信息')} />
        </div>
      </div>

      {/* 位置 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>位置 position</div>
        <div style={CARD.desc}>top / middle（默认）/ bottom</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text="顶部" onClick={() => Toast.show({ message: '顶部提示', position: 'top', duration: 1500 })} />
          <Button variant="outline" size="sm" text="中间" onClick={() => Toast.show({ message: '中间提示', position: 'middle', duration: 1500 })} />
          <Button variant="outline" size="sm" text="底部" onClick={() => Toast.show({ message: '底部提示', position: 'bottom', duration: 1500 })} />
        </div>
      </div>

      {/* 长文本 & 遮罩 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>遮罩 & 长文本</div>
        <div style={CARD.desc}>overlay 显示遮罩 / 多行文本</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text="遮罩模式" onClick={() => Toast.show({ message: '处理中...', type: 'loading', overlay: true, duration: 2000 })} />
          <Button variant="outline" size="sm" text="多行文本" onClick={() => Toast.info('这是一段比较长的提示文字\n用于展示多行内容')} />
        </div>
      </div>

      {/* 全局关闭 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>全局关闭</div>
        <div style={CARD.desc}>Toast.dismissAll() 关闭所有 Toast</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text="弹出多个" onClick={() => { Toast.info('消息 1'); Toast.info('消息 2'); }} />
          <Button variant="ghost" size="sm" text="全部关闭" onClick={() => Toast.dismissAll()} />
        </div>
      </div>
    </MobilePreview>
  );
};
