import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface ActionSheetMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { useT } from '../../doc-i18n';
import { ActionSheet } from '../../../src/components/ActionSheet';
import type { ActionSheetItem } from '../../../src/components/ActionSheet';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { Image } from '../../../src/components/Image';

const propsData = [
  { name: 'open', type: 'boolean', desc: 'componentProps.actionsheet.open' },
  { name: 'onClose', type: '() => void', desc: 'componentProps.actionsheet.onClose' },
  { name: 'items', type: 'ActionSheetItem[]', desc: 'componentProps.actionsheet.items' },
  { name: 'children', type: 'JSX.Element', desc: 'componentProps.actionsheet.children' },
  { name: 'title', type: 'string', desc: 'componentProps.actionsheet.title' },
  { name: 'closeable', type: 'boolean', desc: 'componentProps.actionsheet.closeable' },
  { name: 'description', type: 'string', desc: 'componentProps.actionsheet.description' },
  { name: 'cancelText', type: 'string', desc: 'componentProps.actionsheet.cancelText' },
  { name: 'onSelect', type: '(item, index) => void', desc: 'componentProps.actionsheet.onSelect' },
  { name: 'closeOnSelect', type: 'boolean', desc: 'componentProps.actionsheet.closeOnSelect' },
  { name: 'closeOnOverlayClick', type: 'boolean', desc: 'componentProps.actionsheet.closeOnOverlayClick' },
  { name: 'round', type: 'boolean', desc: 'componentProps.actionsheet.round' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const basicItems: ActionSheetItem[] = [
  { name: '编辑' },
  { name: '分享' },
  { name: '删除' },
];

const twoLineItems: ActionSheetItem[] = [
  { name: '从相册选择', subname: '支持 JPG、PNG、HEIC' },
  { name: '拍照上传', subname: '自动压缩至 2MB 以内' },
  { name: '从聊天记录选取', subname: '仅支持图片和视频文件' },
];

const disabledItems: ActionSheetItem[] = [
  { name: '选项 A' },
  { name: '选项 B (禁用)', disabled: true },
  { name: '选项 C' },
  { name: '选项 D (禁用)', disabled: true },
];

export const ActionSheetMobile: Component<ActionSheetMobileProps> = (props) => {
  const t = useT();
  const [show1, setShow1] = createSignal(false);
  const [show2, setShow2] = createSignal(false);
  const [show3, setShow3] = createSignal(false);
  const [show4, setShow4] = createSignal(false);
  const [show5, setShow5] = createSignal(false);
  const [show6, setShow6] = createSignal(false);
  const [show7, setShow7] = createSignal(false);

  return (
    <MobilePreview title="ActionSheet 动作面板" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 选项列表 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>选项列表</div>
        <div style={CARD.desc}>传入 items 数组，底部滑出选项菜单</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title={t('demo.actionOptions')} clickable onClick={() => setShow1(true)} />
          </CellGroup>
          <ActionSheet open={show1()} onClose={() => setShow1(false)} items={basicItems} />
        </div>
      </div>

      {/* 标题 & 取消 & 描述 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>标题 & 描述 & 取消按钮</div>
        <div style={CARD.desc}>title + closeable + description + cancelText 完整组合</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="完整头部" clickable onClick={() => setShow2(true)} />
          </CellGroup>
          <ActionSheet
            open={show2()} onClose={() => setShow2(false)}
            title="确认删除？"
            description="删除后数据不可恢复，建议先导出备份。"
            closeable
            items={[{ name: '直接删除' }, { name: '导出后删除' }]}
            cancelText="取消"
            onSelect={() => setShow2(false)}
          />
        </div>
      </div>

      {/* 双行选项 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>双行选项</div>
        <div style={CARD.desc}>name + subname 双行展示，适合带说明的选项</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="上传方式" clickable onClick={() => setShow3(true)} />
          </CellGroup>
          <ActionSheet
            open={show3()} onClose={() => setShow3(false)}
            title="上传方式"
            closeable
            items={twoLineItems}
            cancelText="取消"
            onSelect={() => setShow3(false)}
          />
        </div>
      </div>

      {/* 禁用项 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>禁用项</div>
        <div style={CARD.desc}>disabled: true 的选项显示为灰色，不可点击</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="含禁用项" clickable onClick={() => setShow4(true)} />
          </CellGroup>
          <ActionSheet
            open={show4()} onClose={() => setShow4(false)}
            items={disabledItems}
            cancelText="取消"
          />
        </div>
      </div>

      {/* 选中不关闭 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>选中不自动关闭</div>
        <div style={CARD.desc}>closeOnSelect={false}，适合多选或需要连续操作的场景</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="连续选择" clickable onClick={() => setShow5(true)} />
          </CellGroup>
          <ActionSheet
            open={show5()} onClose={() => setShow5(false)}
            title="选择标签"
            closeable
            closeOnSelect={false}
            items={[{ name: '前端' }, { name: '后端' }, { name: '设计' }, { name: '产品' }]}
            cancelText="完成"
            onSelect={() => {}}
          />
        </div>
      </div>

      {/* 关于 Solid */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义内容</div>
        <div style={CARD.desc}>children 完全自定义面板内容，可放图片、文字等任意元素</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="关于 SolidJS" clickable onClick={() => setShow6(true)} />
          </CellGroup>
          <ActionSheet
            open={show6()} onClose={() => setShow6(false)}
            title="About SolidJS"
            closeable
          >
            <div style={{ padding: '20px', display: 'flex' as const, 'flex-direction': 'column' as const, 'align-items': 'center' as const, gap: '16px' }}>
              <Image src="./solidjs-logo.png" width={72} height={72} round />
              <div style={{ 'text-align': 'center' }}>
                <div style={{ 'font-size': '1rem', 'font-weight': 600, color: 'var(--sc-doc-card-title, #1f2937)', 'margin-bottom': '8px' }}>SolidJS</div>
                <div style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'line-height': 1.6 }}>
                  A declarative, efficient and flexible JavaScript library for building user interfaces.
                  Fine-grained reactivity goes beyond virtual DOM — no diffing, no overhead.
                </div>
              </div>
            </div>
          </ActionSheet>
        </div>
      </div>
    </MobilePreview>
  );
};
