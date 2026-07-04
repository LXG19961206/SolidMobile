import { createSignal, useContext } from 'solid-js';
import { ActionSheet } from '../../../../src/components/ActionSheet';
import { Cell } from '../../../../src/components/Cell';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';
import type { PropRow } from '../../../../src/doc-utils';
import type { ActionSheetItem } from '../../../../src/components/ActionSheet/types';

const propsData: PropRow[] = [
  { name: 'open', type: 'boolean', default: '—', required: true, desc: '是否显示。' },
  { name: 'onClose', type: '() => void', default: '—', required: true, desc: '关闭回调。' },
  { name: 'items', type: 'ActionSheetItem[]', default: '—', required: false, desc: '选项列表。' },
  { name: 'title', type: 'string', default: '—', required: false, desc: '标题文字。' },
  { name: 'closeable', type: 'boolean', default: 'false', required: false, desc: '关闭图标。' },
  { name: 'description', type: 'string', default: '—', required: false, desc: '描述文字。' },
  { name: 'cancelText', type: 'string', default: '—', required: false, desc: '取消按钮文字。' },
  { name: 'closeOnSelect', type: 'boolean', default: 'true', required: false, desc: '选中后自动关闭。' },
  { name: 'closeOnOverlayClick', type: 'boolean', default: 'true', required: false, desc: '点击遮罩关闭。' },
  { name: 'round', type: 'boolean', default: 'true', required: false, desc: '顶部圆角。' },
];

const basicItems: ActionSheetItem[] = [
  { name: '编辑' }, { name: '复制' }, { name: '分享' }, { name: '删除' },
];

const twoLineItems: ActionSheetItem[] = [
  { name: '拍摄照片', subname: '使用相机拍摄' },
  { name: '从相册选择', subname: '从手机相册中选取' },
  { name: '从文件选择', subname: '浏览文件管理器' },
];

const mixedItems: ActionSheetItem[] = [
  { name: '设为默认' }, { name: '重命名', subname: '修改文件名称' }, { name: '查看详情' },
  { name: '删除', disabled: true },
];

/* ── Inner ── */

const ActionSheetDocInner = () => {
  const t = useT();
  const phone = useContext(PhoneTargetContext);
  const pm = () => phone?.();
  const [s1, s1s] = createSignal(false);
  const [s2, s2s] = createSignal(false);
  const [s3, s3s] = createSignal(false);
  const [s4, s4s] = createSignal(false);
  const [s5, s5s] = createSignal(false);
  const [s6, s6s] = createSignal(false);
  const [s7, s7s] = createSignal(false);

  return (
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>ActionSheet 动作面板</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px' }}>从底部弹出的选项菜单。</p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <DemoBlock title="选项列表" desc="传入 items 数组。" code={`<ActionSheet open={open} onClose={...} items={items} />`} groupCode="基础">
        <Cell title="选项列表" clickable onClick={() => s1s(true)} />
        <ActionSheet mount={pm()} open={s1()} onClose={() => s1s(false)} items={basicItems} />
      </DemoBlock>
      <DemoBlock title="标题 & 取消" desc="title + closeable + cancelText。" code={`<ActionSheet open={open} title="选择操作" closeable items={items} cancelText="取消" />`} groupCode="基础">
        <Cell title="标题 & 取消" clickable onClick={() => s2s(true)} />
        <ActionSheet mount={pm()} open={s2()} onClose={() => s2s(false)} title="选择操作" closeable items={basicItems} cancelText="取消" />
      </DemoBlock>
      <DemoBlock title="描述文字" desc="description 显示在标题下方。" code={`<ActionSheet open={open} title="确认删除？" description="..." items={items} cancelText="取消" />`} groupCode="基础">
        <Cell title="描述文字" clickable onClick={() => s3s(true)} />
        <ActionSheet mount={pm()} open={s3()} onClose={() => s3s(false)} title="确认删除？" closeable description="删除后数据不可恢复。" items={[{ name: '直接删除' }, { name: '导出后删除' }]} cancelText="取消" />
      </DemoBlock>
      <DemoBlock title="双行选项" desc="name + subname。" code={`<ActionSheet open={open} title="上传方式" items={items} cancelText="取消" />`} groupCode="选项样式">
        <Cell title="双行选项" clickable onClick={() => s4s(true)} />
        <ActionSheet mount={pm()} open={s4()} onClose={() => s4s(false)} title="上传方式" closeable items={twoLineItems} cancelText="取消" />
      </DemoBlock>
      <DemoBlock title="禁用项" desc="item.disabled = true。" code={`<ActionSheet open={open} items={items} cancelText="取消" />`} groupCode="选项样式">
        <Cell title="禁用项" clickable onClick={() => s5s(true)} />
        <ActionSheet mount={pm()} open={s5()} onClose={() => s5s(false)} items={mixedItems} cancelText="取消" />
      </DemoBlock>
      <DemoBlock title="选中不关闭" desc="closeOnSelect={false}。" code={`<ActionSheet open={open} closeOnSelect={false} items={items} />`} groupCode="选项样式">
        <Cell title="选中不关闭" clickable onClick={() => s6s(true)} />
        <ActionSheet mount={pm()} open={s6()} onClose={() => s6s(false)} title="选择主题色" closeable closeOnSelect={false} items={[{ name: '蓝色' }, { name: '绿色' }, { name: '紫色' }, { name: '橙色' }]} cancelText="确定" />
      </DemoBlock>
      <DemoBlock title={t('demo.customRender')} desc={t('demo.customRenderDesc')} code={`<ActionSheet open={open} title="自定义面板">...</ActionSheet>`} groupCode="选项样式">
        <Cell title="自定义内容" clickable onClick={() => s7s(true)} />
        <ActionSheet mount={pm()} open={s7()} onClose={() => s7s(false)} title="自定义面板" closeable>
          <div style={{ padding: '24px', 'text-align': 'center' }}>
            <p style={{ margin: '0 0 16px', color: '#666' }}>这里可以放任意内容，如表单、图片选择器等。</p>
          </div>
        </ActionSheet>
      </DemoBlock>

      <GroupCodePhone />
    </div>
  );
};

export const ActionSheetDocPage = () => (
  <DocLayout><ActionSheetDocInner /></DocLayout>
);
