import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface DialogMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { DialogAPI as Dialog, DialogRenderer } from '../../../src/components/Dialog/DialogManager';
import { DialogComponent } from '../../../src/components/Dialog';
import { Button } from '../../../src/components/Button';

const propsData = [
  { name: 'Dialog.alert(options)', type: 'DialogHandle', desc: '提示弹窗，仅确认按钮' },
  { name: 'Dialog.confirm(options)', type: 'DialogHandle', desc: '确认弹窗，确认+取消按钮' },
  { name: 'Dialog.show(options)', type: 'DialogHandle', desc: '完整配置弹窗' },
  { name: 'Dialog.dismissAll()', type: 'void', desc: '关闭所有弹窗' },
  { name: 'handle.dismiss()', type: 'void', desc: '手动关闭特定弹窗' },
  { name: 'title', type: 'string | JSX.Element', desc: '标题' },
  { name: 'message', type: 'string | JSX.Element', desc: '内容，\\n 自动换行' },
  { name: 'showConfirmButton', type: 'boolean', desc: '显示确认按钮，默认 true' },
  { name: 'showCancelButton', type: 'boolean', desc: '显示取消按钮，默认 false' },
  { name: 'confirmText', type: 'string', desc: '确认按钮文字' },
  { name: 'cancelText', type: 'string', desc: '取消按钮文字' },
  { name: 'closeOnClickOverlay', type: 'boolean', desc: '点击遮罩关闭' },
  { name: 'beforeClose', type: '(action) => boolean', desc: '关闭前回调' },
  { name: 'onConfirm', type: '() => void', desc: '确认回调' },
  { name: 'onCancel', type: '() => void', desc: '取消回调' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px' },
};

export const DialogMobile: Component<DialogMobileProps> = (props) => {
  const [showComponent, setShowComponent] = createSignal(false);

  return (
    <MobilePreview title="Dialog 弹窗" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <DialogRenderer />

      {/* 提示 & 确认 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>提示 & 确认</div>
        <div style={CARD.desc}>alert（仅确认）/ confirm（确认+取消）</div>
        <div style={CARD.body}>
          <Button type="primary" size="sm" text="提示" onClick={() => Dialog.alert({ title: '提示', message: '操作成功！' })} />
          <Button type="danger" size="sm" text="删除确认" onClick={() => Dialog.confirm({ title: '确认删除', message: '此操作不可撤销，确定继续吗？' })} />
          <Button variant="outline" size="sm" text="无标题" onClick={() => Dialog.show({ message: '这是一条纯文本消息，没有标题。' })} />
        </div>
      </div>

      {/* 高级 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>高级弹窗</div>
        <div style={CARD.desc}>自定义按钮文案 / 多行消息 / 异步提交</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text="自定义按钮" onClick={() => Dialog.confirm({ title: '保存草稿', message: '是否保存当前编辑？', confirmText: '保存', cancelText: '不保存' })} />
          <Button variant="outline" size="sm" text="多行消息" onClick={() => Dialog.alert({ message: '第一行\n第二行\n第三行' })} />
          <Button variant="outline" size="sm" text="异步提交" onClick={() => Dialog.confirm({ title: '提交确认', message: '确定要提交吗？', confirmText: '提交', onConfirm: () => new Promise(r => setTimeout(r, 1500)) })} />
        </div>
      </div>

      {/* 组件方式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>组件方式调用</div>
        <div style={CARD.desc}>通过 show 受控显示，适合嵌入模板场景</div>
        <div style={CARD.body}>
          <Button variant="outline" size="sm" text="组件弹窗" onClick={() => setShowComponent(true)} />
          <DialogComponent
            show={showComponent()}
            onUpdateShow={setShowComponent}
            title="组件弹窗"
            message="这是通过 JSX 组件方式调用的弹窗。"
            showCancelButton
            onConfirm={() => { setShowComponent(false); }}
            onCancel={() => { setShowComponent(false); }}
          />
        </div>
      </div>
    </MobilePreview>
  );
};
