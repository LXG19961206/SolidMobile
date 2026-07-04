import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface DialogMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { DialogAPI as Dialog, DialogRenderer } from '../../../src/components/Dialog/DialogManager';
import { DialogComponent } from '../../../src/components/Dialog';
import { Button } from '../../../src/components/Button';
import { Cell, CellGroup } from '../../../src/components/Cell';

const propsData = [
  { name: 'Dialog.alert(opts)', type: 'DialogHandle', desc: 'componentProps.dialog.Dialog.alert(opts)' },
  { name: 'Dialog.confirm(opts)', type: 'DialogHandle', desc: 'componentProps.dialog.Dialog.confirm(opts)' },
  { name: 'Dialog.show(opts)', type: 'DialogHandle', desc: 'componentProps.dialog.Dialog.show(opts)' },
  { name: 'handle.dismiss()', type: 'void', desc: 'componentProps.dialog.handle.dismiss()' },
  { name: 'Dialog.dismissAll()', type: 'void', desc: 'componentProps.dialog.Dialog.dismissAll()' },
  { name: 'title', type: 'string | JSX.Element', desc: 'componentProps.dialog.title' },
  { name: 'message', type: 'string | JSX.Element', desc: 'componentProps.dialog.message' },
  { name: 'showConfirmButton', type: 'boolean', desc: 'componentProps.dialog.showConfirmButton' },
  { name: 'showCancelButton', type: 'boolean', desc: 'componentProps.dialog.showCancelButton' },
  { name: 'confirmText / cancelText', type: 'string', desc: 'componentProps.dialog.confirmText / cancelText' },
  { name: 'closeOnClickOverlay', type: 'boolean', desc: 'componentProps.dialog.closeOnClickOverlay' },
  { name: 'onConfirm / onCancel', type: '() => void', desc: 'componentProps.dialog.onConfirm / onCancel' },
  { name: 'beforeClose', type: '(action) => boolean', desc: 'componentProps.dialog.beforeClose' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const DialogMobile: Component<DialogMobileProps> = (props) => {
  const t = useT();
  const [showDeclarative, setShowDeclarative] = createSignal(false);

  return (
    <MobilePreview title="Dialog 弹窗" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <DialogRenderer />

      {/* 基础弹窗 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础弹窗</div>
        <div style={CARD.desc}>alert（仅确认）/ confirm（确认+取消）/ 无标题纯消息</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title={t('demo.dialogAlert')} clickable onClick={() => Dialog.alert({ title: '提示', message: '操作成功！' })} />
            <Cell title={t('demo.dialogConfirm')} clickable onClick={() => Dialog.confirm({ title: '确认删除', message: '此操作不可撤销，确定继续吗？' })} />
            <Cell title={t('demo.dialogNoTitle')} clickable onClick={() => Dialog.show({ message: '这是一条纯文本消息，没有标题。' })} />
            <Cell title={t('demo.dialogMultiline')} clickable onClick={() => Dialog.alert({ message: '第一行\n第二行\n第三行' })} />
          </CellGroup>
        </div>
      </div>

      {/* 高级弹窗 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>高级弹窗</div>
        <div style={CARD.desc}>自定义按钮文案 / JSX 内容 / 异步提交 / 阻止关闭</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title={t('demo.customTrigger')} clickable onClick={() => Dialog.confirm({ title: '保存草稿', message: '是否保存当前编辑？', confirmText: '保存', cancelText: '不保存' })} />
            <Cell title={t('demo.dialogJSX')} clickable onClick={() => Dialog.alert({ title: '更新说明', message: (<div><p style="margin:0">v2.0 版本已发布</p><p style="margin:4px 0 0;font-size:0.8rem;color:#6b7280">新增 Picker 惯性滚动、SwipeCell 反向关闭</p></div>) })} />
            <Cell title="异步提交" clickable onClick={() => Dialog.confirm({ title: '提交确认', message: '确定要提交吗？提交后不可修改。', showCancelButton: true, confirmText: '提交', onConfirm: () => new Promise(r => setTimeout(r, 1500)) })} />
            <Cell title="阻止关闭" clickable onClick={() => Dialog.confirm({ title: '确认操作', message: '只有点「确认」才能关闭，点取消或遮罩均无效', beforeClose: (action) => { if (action === 'confirm') return true; return false; } })} />
          </CellGroup>
        </div>
      </div>

      {/* 组件方式 & 关闭 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>组件方式 & 手动关闭</div>
        <div style={CARD.desc}>JSX 组件声明式调用 / handle.dismiss() 手动关闭</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title={t('demo.componentUsage')} clickable onClick={() => setShowDeclarative(true)} />
            <Cell title="手动关闭" clickable onClick={() => {
              const h = Dialog.show({ title: '处理中', message: '请稍候...', showConfirmButton: false });
              setTimeout(() => h.dismiss(), 2000);
            }} />
          </CellGroup>
          <DialogComponent
            show={showDeclarative()}
            onUpdateShow={setShowDeclarative}
            title="组件弹窗"
            message="这是通过 JSX 组件方式调用的弹窗。适合嵌入模板、受控显示的场景。"
            showCancelButton
            onConfirm={() => { setShowDeclarative(false); }}
            onCancel={() => { setShowDeclarative(false); }}
          />
        </div>
      </div>
    </MobilePreview>
  );
};
