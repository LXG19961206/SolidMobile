import { createSignal, useContext } from 'solid-js';
import { ActionSheet } from '../../../../src/components/ActionSheet';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import type { ActionSheetItem } from '../../../../src/components/ActionSheet/types';
import styles from './ActionSheetDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'open', type: 'boolean', default: '—', required: true, desc: '是否显示。' },
  { name: 'onClose', type: '() => void', default: '—', required: true, desc: '关闭回调。' },
  { name: 'items', type: 'ActionSheetItem[]', default: '—', required: false, desc: '选项列表。与 children 互斥。' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: '自定义内容，设置后 items 被忽略。' },
  { name: 'title', type: 'string', default: '—', required: false, desc: '标题文字，不设置则不显示标题栏。' },
  { name: 'closeable', type: 'boolean', default: 'false', required: false, desc: '是否显示关闭图标。' },
  { name: 'description', type: 'string', default: '—', required: false, desc: '描述文字，显示在标题下方。' },
  { name: 'cancelText', type: 'string', default: '—', required: false, desc: '取消按钮文字。' },
  { name: 'closeOnSelect', type: 'boolean', default: 'true', required: false, desc: '选中选项后是否自动关闭。' },
  { name: 'closeOnOverlayClick', type: 'boolean', default: 'true', required: false, desc: '点击遮罩层是否关闭。' },
  { name: 'round', type: 'boolean', default: 'true', required: false, desc: '顶部是否圆角。' },
  { name: 'zIndex', type: 'number', default: '—', required: false, desc: '自定义 z-index。' },
  { name: 'lockScroll', type: 'boolean', default: 'true', required: false, desc: '是否锁定背景滚动。' },
  { name: 'onSelect', type: '(item, index) => void', default: '—', required: false, desc: '选项选中回调。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'basic', title: '基础用法' },
  { id: 'title-closeable', title: '标题 & 关闭' },
  { id: 'description', title: '描述文字' },
  { id: 'two-line', title: '双行选项' },
  { id: 'disabled', title: '禁用项' },
  { id: 'no-auto-close', title: '选中不关闭' },
  { id: 'custom', title: '自定义内容' },
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
  { name: '设为默认' },
  { name: '重命名', subname: '修改文件名称' },
  { name: '查看详情' },
  { name: '删除', disabled: true },
];

const basicCode = `import { createSignal } from 'solid-js';\nimport { ActionSheet } from 'solid-component';\n\nfunction Demo() {\n  const [open, setOpen] = createSignal(false);\n  const items = [\n    { name: '编辑' }, { name: '复制' },\n    { name: '分享' }, { name: '删除' },\n  ];\n\n  return (\n    <>\n      <button onClick={() => setOpen(true)}>打开菜单</button>\n      <ActionSheet\n        open={open()}\n        onClose={() => setOpen(false)}\n        items={items}\n        onSelect={(item, index) => console.log(item, index)}\n      />\n    </>\n  );\n}`;

const ActionSheetDocInner = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const pm = () => phoneTarget?.();

  const [basicOpen, setBasicOpen] = createSignal(false);
  const [titleOpen, setTitleOpen] = createSignal(false);
  const [descOpen, setDescOpen] = createSignal(false);
  const [twoLineOpen, setTwoLineOpen] = createSignal(false);
  const [mixedOpen, setMixedOpen] = createSignal(false);
  const [noCloseOpen, setNoCloseOpen] = createSignal(false);
  const [customOpen, setCustomOpen] = createSignal(false);
  const [lastSelected, setLastSelected] = createSignal('');

  const handleSelect = (item: ActionSheetItem) => {
    setLastSelected(`${item.name}${item.subname ? ` (${item.subname})` : ''}`);
  };

  return (
    <>

      <div class={styles.page}>
        <h1 class={styles.h1}>ActionSheet 动作面板</h1>
        <p class={styles.intro}>从底部弹出的选项菜单，基于 Overlay 组件构建，自带遮罩、动画和 body 滚动锁定。</p>

        <h2 id="props" class={styles.h2}>属性 / Props</h2>
        <PropsTable rows={propsData} />

        <h2 id="basic" class={styles.h2}>基础用法</h2>
        <DemoBlock title="选项列表" desc="传入 items 数组，选中后默认自动关闭。" code={basicCode}>
          <div class={styles.demoArea}>
            <button class={styles.btn} onClick={() => setBasicOpen(true)}>打开菜单</button>
            {lastSelected() && <span class={styles.result}>已选择: <code>{lastSelected()}</code></span>}
            <ActionSheet mount={pm()} open={basicOpen()} onClose={() => setBasicOpen(false)} items={basicItems} onSelect={handleSelect} />
          </div>
        </DemoBlock>

        <h2 id="title-closeable" class={styles.h2}>标题 & 关闭按钮</h2>
        <DemoBlock title="带标题和取消" desc="设置 title 显示标题栏，closeable 显示关闭图标，cancelText 显示底部取消按钮。" code={`<ActionSheet\n  open={open()}\n  onClose={() => setOpen(false)}\n  title="选择操作"\n  closeable\n  items={items}\n  cancelText="取消"\n/>`}>
          <div class={styles.demoArea}>
            <button class={styles.btn} onClick={() => setTitleOpen(true)}>打开菜单</button>
            <ActionSheet mount={pm()} open={titleOpen()} onClose={() => setTitleOpen(false)} title="选择操作" closeable items={basicItems} cancelText="取消" />
          </div>
        </DemoBlock>

        <h2 id="description" class={styles.h2}>描述文字</h2>
        <DemoBlock title="带描述" desc="description 显示在标题下方、选项上方。" code={`<ActionSheet\n  open={open()}\n  onClose={() => setOpen(false)}\n  title="确认删除？"\n  closeable\n  description="删除后数据不可恢复，建议先导出备份。"\n  items={[{ name: '直接删除' }, { name: '导出后删除' }]}\n  cancelText="取消"\n/>`}>
          <div class={styles.demoArea}>
            <button class={styles.btn} onClick={() => setDescOpen(true)}>打开菜单</button>
            <ActionSheet mount={pm()} open={descOpen()} onClose={() => setDescOpen(false)} title="确认删除？" closeable description="删除后数据不可恢复，建议先导出备份。" items={[{ name: '直接删除' }, { name: '导出后删除' }]} cancelText="取消" />
          </div>
        </DemoBlock>

        <h2 id="two-line" class={styles.h2}>双行选项</h2>
        <DemoBlock title="name + subname" desc="每个 item 可设置 subname 副标题。" code={`const items = [\n  { name: '拍摄照片', subname: '使用相机拍摄' },\n  { name: '从相册选择', subname: '从手机相册中选取' },\n  { name: '从文件选择', subname: '浏览文件管理器' },\n];\n\n<ActionSheet open={open()} onClose={() => setOpen(false)} title="上传方式" closeable items={items} cancelText="取消" />`}>
          <div class={styles.demoArea}>
            <button class={styles.btn} onClick={() => setTwoLineOpen(true)}>打开菜单</button>
            <ActionSheet mount={pm()} open={twoLineOpen()} onClose={() => setTwoLineOpen(false)} title="上传方式" closeable items={twoLineItems} cancelText="取消" />
          </div>
        </DemoBlock>

        <h2 id="disabled" class={styles.h2}>禁用项</h2>
        <DemoBlock title="disabled 选项" desc="item.disabled = true 时降低透明度并阻止点击。" code={`const items = [{ name: '设为默认' }, { name: '重命名', subname: '修改文件名称' }, { name: '查看详情' }, { name: '删除', disabled: true }];\n\n<ActionSheet open={open()} onClose={() => setOpen(false)} items={items} cancelText="取消" />`}>
          <div class={styles.demoArea}>
            <button class={styles.btn} onClick={() => setMixedOpen(true)}>打开菜单</button>
            <ActionSheet mount={pm()} open={mixedOpen()} onClose={() => setMixedOpen(false)} items={mixedItems} cancelText="取消" />
          </div>
        </DemoBlock>

        <h2 id="no-auto-close" class={styles.h2}>选中不自动关闭</h2>
        <DemoBlock title="closeOnSelect={false}" desc="设为 false 后选中选项不关闭面板。" code={`<ActionSheet open={open()} onClose={() => setOpen(false)} title="选择主题色" closeable closeOnSelect={false} items={[{ name: '蓝色' }, { name: '绿色' }, { name: '紫色' }, { name: '橙色' }]} cancelText="确定" />`}>
          <div class={styles.demoArea}>
            <button class={styles.btn} onClick={() => setNoCloseOpen(true)}>打开菜单</button>
            {lastSelected() && <span class={styles.result}>已选择: <code>{lastSelected()}</code></span>}
            <ActionSheet mount={pm()} open={noCloseOpen()} onClose={() => setNoCloseOpen(false)} title="选择主题色" closeable closeOnSelect={false} items={[{ name: '蓝色' }, { name: '绿色' }, { name: '紫色' }, { name: '橙色' }]} onSelect={handleSelect} cancelText="确定" />
          </div>
        </DemoBlock>

        <h2 id="custom" class={styles.h2}>自定义内容</h2>
        <DemoBlock title="children 模式" desc="传入 children 后 items 被忽略，内容完全自定义。" code={`<ActionSheet open={open()} onClose={() => setOpen(false)} title="自定义面板" closeable>\n  <div style={{ padding: '24px', textAlign: 'center' }}>\n    <div style={{ display: 'flex', gap: 12 }}>\n    {['#1677ff','#22c55e','#f59e0b','#ef4444'].map(c => (\n      <div style={{ width: 48, height: 48, borderRadius: 8, background: c, cursor: 'pointer' }} onClick={() => {}} />\n    ))}\n  </div>\n  </div>\n</ActionSheet>`}>
          <div class={styles.demoArea}>
            <button class={styles.btn} onClick={() => setCustomOpen(true)}>打开自定义面板</button>
            <ActionSheet mount={pm()} open={customOpen()} onClose={() => setCustomOpen(false)} title="自定义面板" closeable>
              <div style={{ padding: '24px', 'text-align': 'center' }}>
                <p style={{ margin: '0 0 16px', color: '#666' }}>这里可以放任意内容，如表单、图片选择器等。</p>
                <div style={{ display: 'flex', gap: '8px', 'justify-content': 'center' }}>
                  {['#1677ff', '#22c55e', '#f59e0b', '#ef4444'].map((color) => (
                    <div style={{ width: '44px', height: '44px', 'border-radius': '50%', background: color, cursor: 'pointer', border: '2px solid #fff', 'box-shadow': '0 2px 4px rgba(0,0,0,0.15)' }} onClick={() => { setLastSelected(`颜色 ${color}`); setCustomOpen(false); }} />
                  ))}
                </div>
              </div>
            </ActionSheet>
          </div>
        </DemoBlock>
      </div>
    </>
  );
};

export const ActionSheetDocPage = () => (
  <DocLayout><ActionSheetDocInner /></DocLayout>
);
