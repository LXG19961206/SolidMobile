import { createSignal, useContext, type Component } from 'solid-js';
import { Picker } from '../../../../src/components/Picker';
import { Cell, CellGroup } from '../../../../src/components/Cell';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow } from '../../../../src/doc-utils';
import type { PickerOption } from '../../../../src/components/Picker/types';

/* ── Data ── */

const cityTree: PickerOption[] = [
  {
    text: '北京', value: 'beijing', children: [
      { text: '海淀区', value: 'haidian' }, { text: '朝阳区', value: 'chaoyang' }, { text: '东城区', value: 'dongcheng' },
    ]
  },
  {
    text: '上海', value: 'shanghai', children: [
      { text: '浦东新区', value: 'pudong' }, { text: '静安区', value: 'jingan' },
    ]
  },
  {
    text: '广东', value: 'guangdong', children: [
      {
        text: '深圳市', value: 'shenzhen', children: [
          { text: '南山区', value: 'nanshan' }, { text: '福田区', value: 'futian' },
        ]
      },
      { text: '广州市', value: 'guangzhou', children: [{ text: '天河区', value: 'tianhe' }] },
    ]
  },
];

const thisYear = new Date().getFullYear();
const dateCols: PickerOption[][] = [
  Array.from({ length: 10 }, (_, i) => ({ text: `${thisYear - 5 + i}年`, value: thisYear - 5 + i })),
  Array.from({ length: 12 }, (_, i) => ({ text: `${i + 1}月`, value: i + 1 })),
];

const timeCols: PickerOption[][] = [
  Array.from({ length: 24 }, (_, i) => ({ text: `${String(i).padStart(2, '0')}时`, value: i })),
  Array.from({ length: 60 }, (_, i) => ({ text: `${String(i).padStart(2, '0')}分`, value: i })),
];

const colsDisabled: PickerOption[][] = [[
  { text: '选项 A', value: 'a' }, { text: '选项 B (禁用)', value: 'b', disabled: true },
  { text: '选项 C', value: 'c' }, { text: '选项 D (禁用)', value: 'd', disabled: true },
  { text: '选项 E', value: 'e' },
]];

const deepTree: PickerOption[] = [
  {
    text: '电子产品', value: 'e', children: [
      {
        text: '手机', value: 'phone', children: [
          {
            text: '智能机', value: 'smart', children: [
              {
                text: '旗舰', value: 'flagship', children: [
                  { text: '512GB', value: '512' }, { text: '1TB', value: '1tb' },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
  {
    text: '食品', value: 'food', children: [
      {
        text: '零食', value: 'snack', children: [
          {
            text: '膨化', value: 'puffed', children: [
              {
                text: '原味', value: 'ori', children: [
                  { text: '小包', value: 's' }, { text: '大包', value: 'l' },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
];

function makeFlatCols(n: number): PickerOption[][] {
  return [Array.from({ length: n }, (_, i) => ({ text: `${i + 1}`, value: i + 1 }))];
}

/* ── Props ── */

const propsData: PropRow[] = [
  { name: 'columns', type: 'PickerOption[] | PickerOption[][]', default: '—', required: true, desc: 'component.picker.props.columns' },
  { name: 'value', type: '(string | number)[]', default: '—', required: false, desc: 'component.picker.props.value' },
  { name: 'onChange', type: '(selected, value) => void', default: '—', required: false, desc: 'component.picker.props.onChange' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: 'component.picker.props.show' },
  { name: 'onUpdateShow', type: '(show) => void', default: '—', required: false, desc: 'component.picker.props.onUpdateShow' },
  { name: 'title', type: 'string', default: "'请选择'", required: false, desc: 'component.picker.props.title' },
  { name: 'visibleItemCount', type: 'number', default: '7', required: false, desc: 'component.picker.props.visibleItemCount' },
  { name: 'optionHeight', type: 'number', default: '50', required: false, desc: 'component.picker.props.optionHeight' },
  { name: 'ratio', type: 'number', default: '1.5', required: false, desc: 'component.picker.props.ratio' },
  { name: 'swipeDuration', type: 'number', default: '1', required: false, desc: 'component.picker.props.swipeDuration' },
  { name: 'cancelText', type: 'string', default: '跟随 locale', required: false, desc: 'component.picker.props.cancelText' },
  { name: 'confirmText', type: 'string', default: '跟随 locale', required: false, desc: 'component.picker.props.confirmText' },
  { name: 'placeholders', type: 'string | string[]', default: '—', required: false, desc: 'component.picker.props.placeholders' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'component.picker.props.teleport' },
];

/* ── Demo Components (each a standalone Cell + Picker pair) ── */

const phoneCtx = PhoneTargetContext;

const CityPicker: Component = () => {
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  return (
    <>
      <Cell title="Tree 级联" value={val().length ? val().join(' / ') : '请选择'} clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={cityTree} title="选择城市"
        onChange={(_, v) => setVal(v)} onConfirm={(_, v) => { setVal(v); setShow(false); }}
        onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

const DatePickerDemo: Component = () => {
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  return (
    <>
      <Cell title="Flat 年月" value={val().length ? val().join(' / ') : '请选择'} clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={dateCols} title="选择年月"
        onChange={(_, v) => setVal(v)} onConfirm={(_, v) => { setVal(v); setShow(false); }}
        onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

const TimePickerDemo: Component = () => {
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  return (
    <>
      <Cell title="时分选择" clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={timeCols} title="选择时间"
        onConfirm={() => setShow(false)} onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

const DisabledPicker: Component = () => {
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  return (
    <>
      <Cell title="含禁用项" clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={colsDisabled} title="选项列表"
        onConfirm={() => setShow(false)} onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

const PlaceholderPicker: Component = () => {
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  return (
    <>
      <Cell title="占位符" clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={makeFlatCols(3)} title="请选择" placeholders="请选择"
        onConfirm={() => setShow(false)} onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

const DeepPicker: Component = () => {
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  return (
    <>
      <Cell title="5 层级联" value={val().length ? `${val().length} 层已选` : '请选择'} clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={deepTree} title="逐级选择"
        onChange={(_, v) => setVal(v)} onConfirm={(_, v) => { setVal(v); setShow(false); }}
        onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

const ControlledPicker: Component = () => {
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  return (
    <>
      <Cell title="受控值（预设 北京/海淀）" clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={cityTree} title="选择城市"
        value={['beijing', 'haidian']} onConfirm={() => setShow(false)} onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

/* ── Code Snippets ── */

const codeTree = `<Picker columns={cityTree} show={show} onUpdateShow={setShow}
  title="选择城市"
  onChange={(_, v) => setVal(v)}
  onConfirm={(_, v) => { setVal(v); setShow(false); }} />`;

const codeFlat = `<Picker columns={dateCols} show={show} onUpdateShow={setShow}
  title="选择年月"  />`;

const codeTime = `<Picker columns={timeCols} show={show} onUpdateShow={setShow}
  title="选择时间"  />`;

const codeDisabled = `<Picker columns={colsDisabled} show={show} onUpdateShow={setShow}
  title="选项列表"  />`;

const codePlaceholder = `<Picker columns={flatCols} show={show} onUpdateShow={setShow}
  title="请选择" placeholders="请选择"  />`;

const codeDeep = `<Picker columns={deepTree} show={show} onUpdateShow={setShow}
  title="逐级选择"
  onChange={(_, v) => setDeepVal(v)}
  onConfirm={(_, v) => { setDeepVal(v); setShow(false); }} />`;

const codeControlled = `<Picker columns={cityTree} show={show} onUpdateShow={setShow}
  title="选择城市"
  value={['beijing', 'haidian']} />`;

/* ── Page ── */

export const PickerDocPage: Component = () => (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Picker 选择器</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        滚轮选择器，支持 Tree 级联和 Flat 多列。点击 Cell 弹出。
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>属性</h2>
      <PropsTable rows={propsData} />

      {/* Each DemoBlock has groupCode="picker" → merged into one CellGroup in phone */}
      <DemoBlock title="多级联动" desc="省→市→区三级联动。" code={codeTree} groupCode="多级联动">
        <CityPicker />
      </DemoBlock>
      <DemoBlock title="多级但不联动" desc="比如年月独立列。列之间的选择并不互相关联，采用flat模式以优化性能" code={codeFlat} groupCode="多级但不联动">
        <DatePickerDemo />
      </DemoBlock>
      <DemoBlock title="时分选择" desc="时 / 分两列。" code={codeTime} groupCode="时分选择">
        <TimePickerDemo />
      </DemoBlock>
      <DemoBlock title="disabled选项" desc="滚动时自动跳过 disabled 项。" code={codeDisabled} groupCode="disabled选项">
        <DisabledPicker />
      </DemoBlock>
      <DemoBlock title="占位符" desc="顶部显示 '请选择' 占位。" code={codePlaceholder} groupCode="占位符">
        <PlaceholderPicker />
      </DemoBlock>
      <DemoBlock title="理论支持无限层级" desc="电子产品→手机→智能机→旗舰→容量。" code={codeDeep} groupCode="理论支持无限层级">
        <DeepPicker />
      </DemoBlock>
      <DemoBlock title="受控值" desc="预设 value prop。" code={codeControlled} groupCode="受控值">
        <ControlledPicker />
      </DemoBlock>

      <GroupCodePhone />
    </div>
  </DocLayout>
);
