import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface ActionSheetMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { ActionSheet } from '../../../src/components/ActionSheet';
import type { ActionSheetItem } from '../../../src/components/ActionSheet';
import { Button } from '../../../src/components/Button';
import { Cell } from '../../../src/components/Cell';

const propsData = [
  { name: 'open', type: 'boolean', desc: '是否显示（必填）' },
  { name: 'onClose', type: '() => void', desc: '关闭回调（必填）' },
  { name: 'items', type: 'ActionSheetItem[]', desc: '选项列表' },
  { name: 'children', type: 'JSX.Element', desc: '自定义内容（覆盖 items）' },
  { name: 'title', type: 'string', desc: '标题' },
  { name: 'closeable', type: 'boolean', desc: '显示关闭图标' },
  { name: 'description', type: 'string', desc: '描述文字' },
  { name: 'cancelText', type: 'string', desc: '取消按钮文字' },
  { name: 'onSelect', type: '(item, index) => void', desc: '选项选中回调' },
  { name: 'closeOnSelect', type: 'boolean', desc: '选中后自动关闭，默认 true' },
  { name: 'closeOnOverlayClick', type: 'boolean', desc: '点击遮罩关闭，默认 true' },
  { name: 'round', type: 'boolean', desc: '顶部圆角，默认 true' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px' },
};

const items: ActionSheetItem[] = [
  { name: '选项一' },
  { name: '选项二', subname: '描述文字' },
  { name: '选项三（禁用）', disabled: true },
  { name: '选项四', loading: true },
];

export const ActionSheetMobile: Component<ActionSheetMobileProps> = (props) => {
  const [show1, setShow1] = createSignal(false);
  const [show2, setShow2] = createSignal(false);
  const [show3, setShow3] = createSignal(false);

  return (
    <MobilePreview title="ActionSheet 动作面板" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础选项面板</div>
        <div style={CARD.desc}>从底部滑出的选项菜单</div>
        <div style={CARD.body}>
          <Button size="sm" text="弹出面板" onClick={() => setShow1(true)} />
          <ActionSheet
            open={show1()}
            onClose={() => setShow1(false)}
            items={items}
            cancelText="取消"
            onSelect={(item) => { console.log(item.name); }}
          />
        </div>
      </div>

      {/* 带标题 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>带标题 & 描述</div>
        <div style={CARD.desc}>title + description + closeable</div>
        <div style={CARD.body}>
          <Button size="sm" text="带标题" onClick={() => setShow2(true)} />
          <ActionSheet
            open={show2()}
            onClose={() => setShow2(false)}
            title="请选择操作"
            description="选择一个选项进行操作"
            closeable
            items={[
              { name: '编辑' },
              { name: '分享' },
              { name: '删除' },
            ]}
            cancelText="取消"
            onSelect={(item) => { setShow2(false); }}
          />
        </div>
      </div>

      {/* 自定义 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义内容</div>
        <div style={CARD.desc}>children 完全自定义面板内容</div>
        <div style={CARD.body}>
          <Button size="sm" text="自定义" onClick={() => setShow3(true)} />
          <ActionSheet
            open={show3()}
            onClose={() => setShow3(false)}
            title="自定义面板"
            closeable
          >
            <div style={{ padding: '16px' }}>
              <Cell title="选项 A" clickable onClick={() => setShow3(false)} />
              <Cell title="选项 B" clickable onClick={() => setShow3(false)} />
              <Cell title="选项 C" clickable onClick={() => setShow3(false)} />
            </div>
          </ActionSheet>
        </div>
      </div>
    </MobilePreview>
  );
};
