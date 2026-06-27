import { createSignal, Show, useContext, type Component } from 'solid-js';
import { Picker } from '../../../../src/components/Picker';
import { Button } from '../../../../src/components/Button';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import type { PickerOption } from '../../../../src/components/Picker/types';

/* ── Demo Data ── */

const cityTree: PickerOption[] = [
  {
    text: '北京', value: 'beijing',
    children: [
      { text: '海淀区', value: 'haidian' },
      { text: '朝阳区', value: 'chaoyang' },
      { text: '东城区', value: 'dongcheng' },
      { text: '西城区', value: 'xicheng' },
    ],
  },
  {
    text: '上海', value: 'shanghai',
    children: [
      { text: '浦东新区', value: 'pudong' },
      { text: '静安区', value: 'jingan' },
      { text: '徐汇区', value: 'xuhui' },
    ],
  },
  {
    text: '广东', value: 'guangdong',
    children: [
      {
        text: '深圳市', value: 'shenzhen',
        children: [
          { text: '南山区', value: 'nanshan' },
          { text: '福田区', value: 'futian' },
          { text: '宝安区', value: 'baoan' },
        ],
      },
      {
        text: '广州市', value: 'guangzhou',
        children: [
          { text: '天河区', value: 'tianhe' },
          { text: '越秀区', value: 'yuexiu' },
        ],
      },
    ],
  },
];

const thisYear = new Date().getFullYear();
const dateColumns: PickerOption[][] = [
  Array.from({ length: 10 }, (_, i) => ({
    text: `${thisYear - 5 + i}年`,
    value: thisYear - 5 + i,
  })),
  Array.from({ length: 12 }, (_, i) => ({
    text: `${i + 1}月`,
    value: i + 1,
  })),
];

const timeColumns: PickerOption[][] = [
  Array.from({ length: 24 }, (_, i) => ({
    text: `${i.toString().padStart(2, '0')}时`,
    value: i,
  })),
  Array.from({ length: 60 }, (_, i) => ({
    text: `${i.toString().padStart(2, '0')}分`,
    value: i,
  })),
];

const colsWithDisabled: PickerOption[][] = [[
  { text: '选项 A', value: 'a' },
  { text: '选项 B (禁用)', value: 'b', disabled: true },
  { text: '选项 C', value: 'c' },
  { text: '选项 D (禁用)', value: 'd', disabled: true },
  { text: '选项 E', value: 'e' },
]];

function makeFlatCols(n: number): PickerOption[][] {
  return [Array.from({ length: n }, (_, i) => ({
    text: `${i + 1}`,
    value: i + 1,
  }))];
}

/* ── Props Table ── */

const propsData: PropRow[] = [
  { name: 'columns', type: 'PickerOption[] | PickerOption[][]', default: '—', required: true, desc: '数据源。Tree 模式传 PickerOption[]（带 children），Flat 模式传 PickerOption[][]。' },
  { name: 'value', type: '(string | number)[]', default: '—', required: false, desc: '受控选中值，每列一个。' },
  { name: 'onChange', type: '(selected: PickerOption[], value: (string|number)[]) => void', default: '—', required: false, desc: '选中值变化回调，手指抬起后触发。' },
  { name: 'onConfirm', type: '(selected: PickerOption[], value: (string|number)[]) => void', default: '—', required: false, desc: '点击确认按钮。' },
  { name: 'onCancel', type: '() => void', default: '—', required: false, desc: '点击取消按钮。' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: '面板是否可见（受控）。' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', default: '—', required: false, desc: '面板可见状态变化回调。' },
  { name: 'title', type: 'string', default: "'请选择'", required: false, desc: '标题文字。' },
  { name: 'visibleItemCount', type: 'number', default: '7', required: false, desc: '可见行数（奇数）。' },
  { name: 'optionHeight', type: 'number', default: '50', required: false, desc: '每行高度(px)。' },
  { name: 'ratio', type: 'number', default: '1.5', required: false, desc: '触摸滑动灵敏度倍率。' },
  { name: 'swipeDuration', type: 'number', default: '1', required: false, desc: '惯性动画时长(秒)。' },
  { name: 'cancelText', type: 'string', default: '跟随 locale', required: false, desc: '取消按钮文字。' },
  { name: 'confirmText', type: 'string', default: '跟随 locale', required: false, desc: '确认按钮文字。' },
  { name: 'placeholders', type: 'string | string[]', default: '—', required: false, desc: '每列占位选项文本。' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'Portal 挂载目标。' },
  { name: 'zIndex', type: 'number | string', default: '2000', required: false, desc: 'z-index。' },
  { name: 'class', type: 'string', default: '—', required: false, desc: '自定义 CSS class。' },
  { name: 'style', type: 'CSSProperties | string', default: '—', required: false, desc: '内联样式。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'basic', title: '基础用法' },
  { id: 'flat', title: 'Flat 多列' },
  { id: 'special', title: '特殊场景' },
];

/* ── Demo Components ── */

/** Tree 级联 — 省市区 */
const CityPickerDemo: Component = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);

  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem', 'align-items': 'center', 'flex-wrap': 'wrap' }}>
        <Button type="primary" text={val().length ? val().join(' / ') : '选择城市'} onClick={() => setShow(true)} />
        <Show when={val().length}>
          <span style={{ 'font-size': '0.8rem', color: '#6b7280' }}>已选: {val().join(' / ')}</span>
        </Show>
      </div>
      <Picker
        show={show()}
        onUpdateShow={setShow}
        columns={cityTree}
        title="选择城市"
        onChange={(_, vals) => setVal(vals)}
        onConfirm={(_, vals) => { setVal(vals); setShow(false); }}
        onCancel={() => setShow(false)}
        teleport={phoneTarget?.()}
      />
    </>
  );
};

/** Flat 多列 — 年月 */
const DatePickerDemo: Component = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);

  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem', 'align-items': 'center', 'flex-wrap': 'wrap' }}>
        <Button type="primary" text={val().length ? val().join(' / ') : '选择年月'} onClick={() => setShow(true)} />
        <Show when={val().length}>
          <span style={{ 'font-size': '0.8rem', color: '#6b7280' }}>已选: {val().join(' / ')}</span>
        </Show>
      </div>
      <Picker
        show={show()}
        onUpdateShow={setShow}
        columns={dateColumns}
        title="选择年月"
        onChange={(_, vals) => setVal(vals)}
        onConfirm={(_, vals) => { setVal(vals); setShow(false); }}
        onCancel={() => setShow(false)}
        teleport={phoneTarget?.()}
      />
    </>
  );
};

/** Flat 多列 — 时分 */
const TimePickerDemo: Component = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);

  return (
    <>
      <Button variant="outline" text="选择时间" onClick={() => setShow(true)} />
      <Picker
        show={show()}
        onUpdateShow={setShow}
        columns={timeColumns}
        title="选择时间"
        onConfirm={() => setShow(false)}
        onCancel={() => setShow(false)}
        teleport={phoneTarget?.()}
      />
    </>
  );
};

/** 禁用项 */
const DisabledPickerDemo: Component = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);

  return (
    <>
      <Button variant="outline" text="含禁用项" onClick={() => setShow(true)} />
      <Picker
        show={show()}
        onUpdateShow={setShow}
        columns={colsWithDisabled}
        title="选项列表"
        onConfirm={() => setShow(false)}
        onCancel={() => setShow(false)}
        teleport={phoneTarget?.()}
      />
    </>
  );
};

/** 占位符 */
const PlaceholderPickerDemo: Component = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);

  return (
    <>
      <Button variant="outline" text="带占位符" onClick={() => setShow(true)} />
      <Picker
        show={show()}
        onUpdateShow={setShow}
        columns={makeFlatCols(3)}
        title="请选择数量"
        placeholders="请选择"
        onConfirm={() => setShow(false)}
        onCancel={() => setShow(false)}
        teleport={phoneTarget?.()}
      />
    </>
  );
};

/** 受控值 */
const ControlledPickerDemo: Component = () => {
  const phoneTarget = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>(['beijing', 'haidian']);

  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem', 'align-items': 'center', 'flex-wrap': 'wrap' }}>
        <Button type="primary" text="预设北京-海淀" onClick={() => setShow(true)} />
        <Button variant="outline" text="切换到上海-静安" onClick={() => setVal(['shanghai', 'jingan'])} />
        <Show when={val().length}>
          <span style={{ 'font-size': '0.8rem', color: '#6b7280' }}>当前: {val().join(' / ')}</span>
        </Show>
      </div>
      <Picker
        show={show()}
        onUpdateShow={setShow}
        columns={cityTree}
        title="选择城市"
        value={val()}
        onChange={(_, vals) => setVal(vals)}
        onConfirm={() => setShow(false)}
        onCancel={() => setShow(false)}
        teleport={phoneTarget?.()}
      />
    </>
  );
};

/* ── Code Snippets ── */

const codeTree = `<Picker
  show={show()}
  onUpdateShow={setShow}
  columns={cityTree}
  title="选择城市"
  teleport={phoneTarget?.()}
  onChange={(_, vals) => setVal(vals)}
  onConfirm={(_, vals) => { setVal(vals); setShow(false); }}
  onCancel={() => setShow(false)}
/>`;

const codeFlat = `<Picker
  show={show()}
  onUpdateShow={setShow}
  columns={dateColumns}
  title="选择年月"
  teleport={phoneTarget?.()}
  onChange={(_, vals) => setVal(vals)}
  onConfirm={(_, vals) => { setVal(vals); setShow(false); }}
  onCancel={() => setShow(false)}
/>`;

const codeDisabled = `<Picker
  show={show()}
  onUpdateShow={setShow}
  columns={colsWithDisabled}
  title="选项列表"
  teleport={phoneTarget?.()}
/>`;

const codePlaceholder = `<Picker
  show={show()}
  onUpdateShow={setShow}
  columns={flatCols}
  title="请选择"
  placeholders="请选择"
  teleport={phoneTarget?.()}
/>`;

const codeControlled = `<Picker
  show={show()}
  onUpdateShow={setShow}
  columns={cityTree}
  title="选择城市"
  value={val()}
  teleport={phoneTarget?.()}
  onChange={(_, vals) => setVal(vals)}
/>`;

/* ── Main Doc Page ── */

export const PickerDocPage: Component = () => {
  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        {/* ── Props Table ── */}
        <h2 id="props" style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '16px 0 12px' }}>
          属性 / Props
        </h2>
        <PropsTable rows={propsData} />

        {/* ── Tree 级联 ── */}
        <h2 id="basic" style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>
          基础用法
        </h2>
        <DemoBlock title="Tree 级联 — 省市区" code={codeTree}>
          <CityPickerDemo />
        </DemoBlock>

        {/* ── Flat 多列 ── */}
        <h2 id="flat" style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>
          Flat 多列独立选择
        </h2>
        <DemoBlock title="年月选择" code={codeFlat}>
          <DatePickerDemo />
        </DemoBlock>
        <DemoBlock title="时分选择" code={codeFlat}>
          <TimePickerDemo />
        </DemoBlock>

        {/* ── 特殊场景 ── */}
        <h2 id="special" style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>
          特殊场景
        </h2>
        <DemoBlock title="禁用项 & 跳过" code={codeDisabled}>
          <DisabledPickerDemo />
        </DemoBlock>
        <DemoBlock title="占位符" code={codePlaceholder}>
          <PlaceholderPickerDemo />
        </DemoBlock>
        <DemoBlock title="受控模式" code={codeControlled}>
          <ControlledPickerDemo />
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
