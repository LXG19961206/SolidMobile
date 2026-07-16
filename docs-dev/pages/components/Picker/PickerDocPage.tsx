import { createSignal, useContext, type Component } from 'solid-js';


import { useT } from '../../../doc-i18n';
import { Picker } from '../../../../src/components/Picker';
import { Cell, CellGroup } from '../../../../src/components/Cell';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';
import type { PickerOption } from '../../../../src/components/Picker/types';

/* ── Data ── */

const cityTree: PickerOption[] = [
  {
    text: 'Beijing', value: 'beijing', children: [
      { text: 'Haidian', value: 'haidian' }, { text: 'Chaoyang', value: 'chaoyang' }, { text: 'Dongcheng', value: 'dongcheng' },
    ]
  },
  {
    text: 'Shanghai', value: 'shanghai', children: [
      { text: 'Pudong', value: 'pudong' }, { text: "Jing'an", value: 'jingan' },
    ]
  },
  {
    text: 'Guangdong', value: 'guangdong', children: [
      {
        text: 'Shenzhen', value: 'shenzhen', children: [
          { text: 'Nanshan', value: 'nanshan' }, { text: 'Futian', value: 'futian' },
        ]
      },
      { text: 'Guangzhou', value: 'guangzhou', children: [{ text: 'Tianhe', value: 'tianhe' }] },
    ]
  },
];

const thisYear = new Date().getFullYear();
const dateCols: PickerOption[][] = [
  Array.from({ length: 10 }, (_, i) => ({ text: `${thisYear - 5 + i}y`, value: thisYear - 5 + i })),
  Array.from({ length: 12 }, (_, i) => ({ text: `${i + 1}mo`, value: i + 1 })),
];

const timeCols: PickerOption[][] = [
  Array.from({ length: 24 }, (_, i) => ({ text: `${String(i).padStart(2, '0')}h`, value: i })),
  Array.from({ length: 60 }, (_, i) => ({ text: `${String(i).padStart(2, '0')}min`, value: i })),
];

const colsDisabled: PickerOption[][] = [[
  { text: 'Option A', value: 'a' }, { text: 'Option B (Disabled)', value: 'b', disabled: true },
  { text: 'Option C', value: 'c' }, { text: 'Option D (Disabled)', value: 'd', disabled: true },
  { text: 'Option E', value: 'e' },
]];

const deepTree: PickerOption[] = [
  {
    text: 'Electronics', value: 'e', children: [
      {
        text: 'Phones', value: 'phone', children: [
          {
            text: 'Smartphones', value: 'smart', children: [
              {
                text: 'Flagship', value: 'flagship', children: [
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
    text: 'Food', value: 'food', children: [
      {
        text: 'Snacks', value: 'snack', children: [
          {
            text: 'Puffed', value: 'puffed', children: [
              {
                text: 'Original', value: 'ori', children: [
                  { text: 'Small Pack', value: 's' }, { text: 'Large Pack', value: 'l' },
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
  { name: 'columns', type: 'PickerOption[] | PickerOption[][]', default: '—', required: true, desc: 'componentProps.picker.columns' },
  { name: 'value', type: '(string | number)[]', default: '—', required: false, desc: 'componentProps.picker.value' },
  { name: 'onChange', type: '(selected, value) => void', default: '—', required: false, desc: 'componentProps.picker.onChange' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: 'componentProps.picker.show' },
  { name: 'onUpdateShow', type: '(show) => void', default: '—', required: false, desc: 'componentProps.picker.onUpdateShow' },
  { name: 'title', type: 'string', default: "'Please Select'", required: false, desc: 'componentProps.picker.title' },
  { name: 'visibleItemCount', type: 'number', default: '7', required: false, desc: 'componentProps.picker.visibleItemCount' },
  { name: 'optionHeight', type: 'number', default: '50', required: false, desc: 'componentProps.picker.optionHeight' },
  { name: 'ratio', type: 'number', default: '1.5', required: false, desc: 'componentProps.picker.ratio' },
  { name: 'swipeDuration', type: 'number', default: '1', required: false, desc: 'componentProps.picker.swipeDuration' },
  { name: 'cancelText', type: 'string', default: 'Follows locale', required: false, desc: 'componentProps.picker.cancelText' },
  { name: 'confirmText', type: 'string', default: 'Follows locale', required: false, desc: 'componentProps.picker.confirmText' },
  { name: 'placeholders', type: 'string | string[]', default: '—', required: false, desc: 'componentProps.picker.placeholders' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'componentProps.picker.teleport' },
];

/* ── Demo Components (each a standalone Cell + Picker pair) ── */

const phoneCtx = PhoneTargetContext;

const CityPicker: Component = () => {
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  return (
    <>
      <Cell title="Tree Cascade" value={val().length ? val().join(' / ') : 'Please Select'} clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={cityTree} title="Select City"
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
      <Cell title="Flat Year-Month" value={val().length ? val().join(' / ') : 'Please Select'} clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={dateCols} title="Select Year-Month"
        onChange={(_, v) => setVal(v)} onConfirm={(_, v) => { setVal(v); setShow(false); }}
        onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

const TimePickerDemo: Component = () => {
  const t = useT();
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  const [label, setLabel] = createSignal('');
  return (
    <>
      <Cell title={t('demo.timeSelect')} value={label() || 'Please Select'} clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={timeCols} title="Select Time"
        onChange={(_, v) => setLabel(`${String(v[0]).padStart(2, '0')}:${String(v[1]).padStart(2, '0')}`)}
        onConfirm={(_items, v) => { setLabel(`${String(v[0]).padStart(2, '0')}:${String(v[1]).padStart(2, '0')}`); setShow(false); }}
        onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

const DisabledPicker: Component = () => {
  const t = useT();
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  const [label, setLabel] = createSignal('');
  return (
    <>
      <Cell title="With Disabled" value={label() || 'Please Select'} clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={colsDisabled} title={t('demo.actionOptions')}
        onChange={(items) => setLabel(String(items[0]?.text ?? ''))}
        onConfirm={(items) => { setLabel(String(items[0]?.text ?? '')); setShow(false); }}
        onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

const PlaceholderPicker: Component = () => {
  const t = useT();
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  const [label, setLabel] = createSignal('');
  return (
    <>
      <Cell title={t('demo.placeholder')} value={label() || 'Please Select'} clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={makeFlatCols(3)} title="Please Select" placeholders="Please Select"
        onChange={(items, vals) => setLabel(vals[0] ? String(items[0]?.text ?? '') : '')}
        onConfirm={(items, vals) => { setLabel(vals[0] ? String(items[0]?.text ?? '') : ''); setShow(false); }}
        onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

const DeepPicker: Component = () => {
  const phone = useContext(phoneCtx);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  return (
    <>
      <Cell title="5-Level Cascade" value={val().length ? `${val().length} levels selected` : 'Please Select'} clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={deepTree} title="Select Level by Level"
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
      <Cell title="Controlled (preset: Beijing/Haidian)" clickable onClick={() => setShow(true)} />
      <Picker show={show()} onUpdateShow={setShow} columns={cityTree} title="Select City"
        value={['beijing', 'haidian']} onConfirm={() => setShow(false)} onCancel={() => setShow(false)} teleport={phone?.()} />
    </>
  );
};

/* ── Code Snippets ── */

const codeTree = `<Picker columns={cityTree} show={show} onUpdateShow={setShow}
  title="Select City"
  onChange={(_, v) => setVal(v)}
  onConfirm={(_, v) => { setVal(v); setShow(false); }} />`;

const codeFlat = `<Picker columns={dateCols} show={show} onUpdateShow={setShow}
  title="Select Year-Month"  />`;

const codeTime = `<Picker columns={timeCols} show={show} onUpdateShow={setShow}
  title="Select Time"  />`;

const codeDisabled = `<Picker columns={colsDisabled} show={show} onUpdateShow={setShow}
  title={t('demo.actionOptions')}  />`;

const codePlaceholder = `<Picker columns={flatCols} show={show} onUpdateShow={setShow}
  title="Please Select" placeholders="Please Select"  />`;

const codeDeep = `<Picker columns={deepTree} show={show} onUpdateShow={setShow}
  title="Select Level by Level"
  onChange={(_, v) => setDeepVal(v)}
  onConfirm={(_, v) => { setDeepVal(v); setShow(false); }} />`;

const codeControlled = `<Picker columns={cityTree} show={show} onUpdateShow={setShow}
  title="Select City"
  value={['beijing', 'haidian']} />`;

/* ── Page ── */

export const PickerDocPage: Component = () => {
  const t = useT();
  return (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Picker</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        {t('componentIntro.PickerIntro')}
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      {/* Each DemoBlock has groupCode="picker" → merged into one CellGroup in phone */}
      <DemoBlock title={t('demo.cascade')} desc={t('demo.cascadeDesc')} code={codeTree} groupCode="多cascade动">
        <CityPicker />
      </DemoBlock>
      <DemoBlock title={t('demo.flat')} desc={t('demo.flatDesc')} code={codeFlat} groupCode="多级但不联动">
        <DatePickerDemo />
      </DemoBlock>
      <DemoBlock title={t('demo.timeSelect')} desc={t('demo.timeSelectDesc')} code={codeTime} groupCode="时分选择">
        <TimePickerDemo />
      </DemoBlock>
      <DemoBlock title={t('demo.disabled')} desc={t('demo.disabledDesc')} code={codeDisabled} groupCode="disabled选项">
        <DisabledPicker />
      </DemoBlock>
      <DemoBlock title={t('demo.placeholder')} desc={t('demo.placeholderDesc')} code={codePlaceholder} groupCode="占位符">
        <PlaceholderPicker />
      </DemoBlock>
      <DemoBlock title={t('demo.deepCascade')} desc={t('demo.deepCascadeDesc')} code={codeDeep} groupCode="理论Supports Infinite 层级">
        <DeepPicker />
      </DemoBlock>
      <DemoBlock title={t('demo.controlled')} desc={t('demo.controlledDesc')} code={codeControlled} groupCode="受控值">
        <ControlledPicker />
      </DemoBlock>

      <GroupCodePhone />
    </div>
  </DocLayout>
  );
};
