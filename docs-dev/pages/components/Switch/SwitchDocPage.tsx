import { createSignal } from 'solid-js';
import { Switch } from '../../../../src/components/Switch';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import styles from './SwitchDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'checked', type: 'boolean', default: '—', required: false, desc: '是否打开（受控模式）。' },
  { name: 'value', type: 'boolean', default: '—', required: false, desc: 'checked 的别名。' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', required: false, desc: '默认状态（非受控模式）。' },
  { name: 'onChange', type: '(checked: boolean) => void', default: '—', required: false, desc: '状态变化回调。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '是否禁用。' },
  { name: 'size', type: 'string | number', default: '28', required: false, desc: '尺寸，数字自动补 px。' },
  { name: 'activeColor', type: 'string', default: '—', required: false, desc: '打开时的背景色。' },
  { name: 'inactiveColor', type: 'string', default: '—', required: false, desc: '关闭时的背景色。' },
  { name: 'activeText', type: 'string', default: '—', required: false, desc: '打开时显示的文案，在滑块右侧。' },
  { name: 'inactiveText', type: 'string', default: '—', required: false, desc: '关闭时显示的文案，在滑块右侧。' },
  { name: 'class', type: 'string', default: '—', required: false, desc: '自定义 CSS class。' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: '内联样式。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'basic', title: '基础用法' },
  { id: 'controlled', title: '受控模式' },
  { id: 'color', title: '自定义颜色' },
  { id: 'size', title: '尺寸' },
  { id: 'disabled', title: '禁用状态' },
];

export const SwitchDocPage = () => {
  const [controlledOn, setControlledOn] = createSignal(false);

  return (
    <DocLayout>

      <div class={styles.page}>
        <h1 class={styles.h1}>Switch 开关</h1>
        <p class={styles.intro}>
          在两种状态间切换的交互控件。支持受控 / 非受控模式，自定义尺寸、颜色及禁用状态。
        </p>

        {/* Props */}
        <h2 id="props" class={styles.h2}>属性 / Props</h2>
        <PropsTable rows={propsData} />

        {/* Basic */}
        <h2 id="basic" class={styles.h2}>基础用法</h2>
        <DemoBlock
          title="非受控模式"
          desc="不传 checked，组件自行管理开关状态。"
          code={`<Switch defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Switch />
            <Switch defaultChecked />
          </div>
        </DemoBlock>

        {/* Controlled */}
        <h2 id="controlled" class={styles.h2}>受控模式</h2>
        <DemoBlock
          title="受控模式"
          desc="传入 checked（或 value） + onChange，由外部管理状态。"
          code={`const [on, setOn] = createSignal(false);\n\n<Switch checked={on()} onChange={setOn} />\n{/* value 是 checked 的别名 */}\n<Switch value={on()} onChange={setOn} />`}
        >
          <div class={styles.demoArea}>
            <Switch checked={controlledOn()} onChange={setControlledOn} />
            <span class={styles.result}>
              当前状态: {controlledOn() ? '开' : '关'}
            </span>
          </div>
        </DemoBlock>

        {/* Color */}
        <h2 id="color" class={styles.h2}>自定义颜色</h2>
        <DemoBlock
          title="activeColor / inactiveColor"
          desc="可分别设置开关两种状态下的背景色。"
          code={`<Switch activeColor="#22c55e" defaultChecked />\n<Switch activeColor="#ef4444" inactiveColor="#fecaca" defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Switch activeColor="#22c55e" defaultChecked />
            <Switch activeColor="#ef4444" inactiveColor="#fecaca" defaultChecked />
            <Switch activeColor="#f59e0b" />
          </div>
        </DemoBlock>

        {/* Size */}
        <h2 id="size" class={styles.h2}>尺寸</h2>
        <DemoBlock
          title="size"
          desc="支持数字（px）或 CSS 字符串，默认 28。"
          code={`<Switch size={20} />\n<Switch size={28} defaultChecked />\n<Switch size={36} defaultChecked />\n<Switch size="2.5rem" defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Switch size={20} />
            <Switch size={28} defaultChecked />
            <Switch size={36} defaultChecked />
            <Switch size="2.5rem" defaultChecked />
          </div>
        </DemoBlock>

        {/* Text */}
        <h2 id="text" class={styles.h2}>文案</h2>
        <DemoBlock
          title="activeText / inactiveText"
          desc={`文案显示在滑块右侧。如需"左 label + 滑块"布局，Switch 本身是行内元素，在外部包一个 flex 容器即可轻松实现。`}
          code={`<Switch activeText="ON" inactiveText="OFF" defaultChecked />\n<Switch activeText="开" inactiveText="关" activeColor="#22c55e" />\n{/* 左 label 布局 */}\n<label style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>\n  <span>开启通知</span>\n  <Switch />\n</label>`}
        >
          <div class={styles.demoArea}>
            <Switch activeText="ON" inactiveText="OFF" defaultChecked />
            <Switch activeText="开" inactiveText="关" activeColor="#22c55e" />
            <label style={{ display: 'flex', 'align-items': 'center', gap: '0.5rem', 'font-size': '0.875rem', cursor: 'pointer' }}>
              <span>开启通知</span>
              <Switch />
            </label>
          </div>
        </DemoBlock>

        {/* Disabled */}
        <h2 id="disabled" class={styles.h2}>禁用状态</h2>
        <DemoBlock
          title="disabled"
          desc="禁用后不可点击，整体降低透明度。"
          code={`<Switch disabled />\n<Switch disabled defaultChecked />`}
        >
          <div class={styles.demoArea}>
            <Switch disabled />
            <Switch disabled defaultChecked />
          </div>
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
