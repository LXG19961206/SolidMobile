import { createSignal, useContext, type Component } from 'solid-js';
import { CityPicker } from '../../../../src/components/CityPicker';
import { Picker } from '../../../../src/components/Picker';
import { Cell, CellGroup } from '../../../../src/components/Cell';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import { useT } from '../../../doc-i18n';
import type { PickerOption } from '../../../../src/components/Picker';
import type { PropRow } from '../../../doc-utils';

/* ── 示例省市区数据（用户需自行提供完整数据） ── */

const cityTree: PickerOption[] = [
  {
    text: 'Guangdong', value: 'gd',
    children: [
      {
        text: 'Guangzhou', value: 'gz',
        children: [
          { text: 'Tianhe', value: 'gz-th' },
          { text: 'Yuexiu', value: 'gz-yx' },
          { text: 'Haizhu', value: 'gz-hz' },
        ],
      },
      {
        text: 'Shenzhen', value: 'sz',
        children: [
          { text: 'Nanshan', value: 'sz-ns' },
          { text: 'Futian', value: 'sz-ft' },
          { text: "Bao'an", value: 'sz-ba' },
        ],
      },
    ],
  },
  {
    text: 'Zhejiang', value: 'zj',
    children: [
      {
        text: 'Hangzhou', value: 'hz',
        children: [
          { text: 'Xihu', value: 'hz-xh' },
          { text: 'Shangcheng', value: 'hz-sc' },
        ],
      },
    ],
  },
];

/* ── 深度级联示例（省 / 市 / 区 / 街道 / 村 / 组） ── */

const deepTree: PickerOption[] = [
  {
    text: 'Guangdong', value: 'gd',
    children: [
      {
        text: 'Guangzhou', value: 'gz',
        children: [
          {
            text: 'Tianhe', value: 'gz-th',
            children: [
              {
                text: 'Shipai Street', value: 'sp',
                children: [
                  {
                    text: 'Shipai Village', value: 'spc',
                    children: [
                      { text: 'Group 1', value: 'spc-1' },
                      { text: 'Group 2', value: 'spc-2' },
                    ],
                  },
                  {
                    text: 'Nanda Community', value: 'nd',
                    children: [
                      { text: 'South', value: 'nd-s' },
                      { text: 'North', value: 'nd-n' },
                    ],
                  },
                ],
              },
              {
                text: 'Liede Street', value: 'ld',
                children: [
                  { text: 'Liede Village', value: 'ldc', children: [{ text: 'Commune 1', value: 'ldc-1' }] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: 'Zhejiang', value: 'zj',
    children: [
      {
        text: 'Hangzhou', value: 'hz',
        children: [
          {
            text: 'Xihu', value: 'hz-xh',
            children: [
              { text: 'Lingyin Street', value: 'ly', children: [{ text: 'Lingyin Community', value: 'lyc' }] },
            ],
          },
        ],
      },
    ],
  },
];

const cityPickerProps: PropRow[] = [
  { name: 'columns', type: 'PickerOption[]', default: '—', required: true, desc: 'componentProps.citypicker.columns' },
  { name: 'value', type: '(string \\| number)[]', default: '—', required: false, desc: 'componentProps.citypicker.value' },
  { name: 'onChange', type: '(value) => void', default: '—', required: false, desc: 'componentProps.citypicker.onChange' },
  { name: 'onConfirm', type: '(value) => void', default: '—', required: false, desc: 'componentProps.citypicker.onConfirm' },
  { name: 'placeholder', type: 'string', default: "'Select Region'", required: false, desc: 'componentProps.citypicker.placeholder' },
  { name: 'separator', type: 'string', default: "' / '", required: false, desc: 'componentProps.citypicker.separator' },
  { name: 'title', type: 'string', default: "'Select Region'", required: false, desc: 'componentProps.citypicker.title' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'componentProps.citypicker.teleport' },
];

const codeBasic = `import { createSignal, useContext } from 'solid-js';
import { Cell, CellGroup } from 'your-package/Cell';
import { CityPicker } from 'your-package/CityPicker';
import { PhoneTargetContext } from 'your-package/doc-utils';
import type { PickerOption } from 'your-package/Picker';

// ⚠️ 数据由用户自行准备，组件不内置
const cityTree: PickerOption[] = [
  {
    text: 'Guangdong', value: 'gd',
    children: [
      {
        text: 'Guangzhou', value: 'gz',
        children: [
          { text: 'Tianhe', value: 'gz-th' },
          { text: 'Yuexiu', value: 'gz-yx' },
          { text: 'Haizhu', value: 'gz-hz' },
        ],
      },
      {
        text: 'Shenzhen', value: 'sz',
        children: [
          { text: 'Nanshan', value: 'sz-ns' },
          { text: 'Futian', value: 'sz-ft' },
          { text: "Bao'an", value: 'sz-ba' },
        ],
      },
    ],
  },
  {
    text: 'Zhejiang', value: 'zj',
    children: [
      {
        text: 'Hangzhou', value: 'hz',
        children: [
          { text: 'Xihu', value: 'hz-xh' },
          { text: 'Shangcheng', value: 'hz-sc' },
        ],
      },
    ],
  },
];

function Demo() {
  const [val, setVal] = createSignal<(string | number)[]>([]);
  return (
    <CellGroup>
      <Cell title="Region" value={val().length ? val().join(' / ') : ''} />
      <CityPicker
        columns={cityTree}
        value={val()}
        onChange={setVal}
        placeholder="Select region"

      />
    </CellGroup>
  );
}`;

const codeForm = `import { createSignal, useContext } from 'solid-js';
import { Form, FormItem } from 'your-package/Form';
import { CityPicker } from 'your-package/CityPicker';
import { Button } from 'your-package/Button';
import { Toast } from 'your-package/Toast';
import { PhoneTargetContext } from 'your-package/doc-utils';

// cityTree 同基础用法示例

function Demo() {
  const [formVal, setFormVal] = createSignal({});
  return (
    <Form onSubmit={(v) => { setFormVal(v); Toast.success(JSON.stringify(v)); }}>
      <FormItem name="region" label="Region">
        <CityPicker columns={cityTree} placeholder="Select region"  />
      </FormItem>
      <div style={{ padding: '12px 1rem' }}>
        <Button type="primary" block nativeType="submit" text="Submit" />
      </div>
    </Form>
  );
}`;

const codeDeep = `import { createSignal, useContext } from 'solid-js';
import { Picker } from 'your-package/Picker';
import { Cell } from 'your-package/Cell';
import { PhoneTargetContext } from 'your-package/doc-utils';
import type { PickerOption } from 'your-package/Picker';

// 6 层深度树形数据：省 / 市 / 区 / 街道 / 村 / 组
const deepTree: PickerOption[] = [
  {
    text: 'Guangdong', value: 'gd',
    children: [
      {
        text: 'Guangzhou', value: 'gz',
        children: [
          {
            text: 'Tianhe', value: 'gz-th',
            children: [
              {
                text: 'Shipai Street', value: 'sp',
                children: [
                  {
                    text: 'Shipai Village', value: 'spc',
                    children: [
                      { text: 'Group 1', value: 'spc-1' },
                      { text: 'Group 2', value: 'spc-2' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

function Demo() {
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  return (
    <>
      <Cell
        title={val().length ? val().join(' / ') : 'Please Select'}
        clickable onClick={() => setShow(true)}
      />
      <Picker
        columns={deepTree}
        value={val()}
        onChange={(_items, vals) => setVal(vals)}
        onConfirm={(_items, vals) => { setVal(vals); setShow(false); }}
        onCancel={() => setShow(false)}
        show={show()}
        onUpdateShow={setShow}
        title="Select Address"

      />
    </>
  );
}`;

/* ── Basic Demo ── */

const BasicDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  return (
    <CellGroup>
      <Cell title="Region" value={val().length ? val().join(' / ') : ''} />
      <CityPicker
        columns={cityTree}
        value={val()}
        onChange={setVal}
        placeholder="Select region"
        teleport={phone?.()}
      />
    </CellGroup>
  );
};

/* ── Form Demo ── */

const FormDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [formVal, setFormVal] = createSignal({});
  return (
    <>
      <Form onSubmit={(v) => { setFormVal(v); Toast.success('Submit: ' + JSON.stringify(v)); }}>
        <FormItem name="region" label="Region">
          <CityPicker columns={cityTree} placeholder="Select region" teleport={phone?.()} />
        </FormItem>
        <div style={{ padding: '12px 1rem' }}>
          <Button type="primary" block nativeType="submit" text="Submit" />
        </div>
      </Form>
      <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
        Submit value: {JSON.stringify(formVal())}
      </div>
    </>
  );
};

/* ── Deep Cascade Demo ── */

const DeepDemo: Component = () => {
  const phone = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);

  const displayText = () => {
    if (!val().length) return 'Please select (6-level cascade demo)';
    return val().join(' / ');
  };

  return (
    <>
      <Cell title={displayText()} clickable onClick={() => setShow(true)} />
      <Picker
        columns={deepTree}
        value={val()}
        onChange={(_items, vals) => setVal(vals)}
        onConfirm={(_items, vals) => { setVal(vals); setShow(false); }}
        onCancel={() => setShow(false)}
        show={show()}
        onUpdateShow={setShow}
        title="Select Address"
        teleport={phone?.()}
      />
    </>
  );
};

export const CityPickerDocPage: Component = () => {
  const t = useT();
  return (
    <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>CityPicker</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        {t('componentIntro.CityPickerIntro')}
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>CityPicker Props</h2>
      <PropsTable rows={cityPickerProps} />

      <DemoBlock title={t('demo.basic')} desc={t('demo.basicDesc')} code={codeBasic}>
        <BasicDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.form')} desc={t('demo.formDesc')} code={codeForm}>
        <FormDemo />
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('section.deepCascade')}</h2>
      <p style={{ color: '#6b7280', margin: '0 0 12px', 'line-height': 1.6 }}>
        如果需要更多层级（如省市区街村组），CityPicker 默认只做三级，
        For deeper levels, use the <code>{'<Picker>'}</code> component with tree data instead.
        Picker 的 tree 模式支持任意深度级联，不限层级数。
      </p>

      <DemoBlock title={t('demo.cityDeep6')} desc={t('demoDesc.citypicker_deep')} code={codeDeep}>
        <DeepDemo />
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
