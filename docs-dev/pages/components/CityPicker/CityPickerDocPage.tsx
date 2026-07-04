import { createSignal, useContext, type Component } from 'solid-js';
import { CityPicker } from '../../../../src/components/CityPicker';
import { Picker } from '../../../../src/components/Picker';
import { Cell, CellGroup } from '../../../../src/components/Cell';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import { useT } from '../../../doc-i18n';
import type { PickerOption } from '../../../../src/components/Picker';
import type { PropRow } from '../../../../src/doc-utils';

/* ── 示例省市区数据（用户需自行提供完整数据） ── */

const cityTree: PickerOption[] = [
  {
    text: '广东省', value: 'gd',
    children: [
      {
        text: '广州市', value: 'gz',
        children: [
          { text: '天河区', value: 'gz-th' },
          { text: '越秀区', value: 'gz-yx' },
          { text: '海珠区', value: 'gz-hz' },
        ],
      },
      {
        text: '深圳市', value: 'sz',
        children: [
          { text: '南山区', value: 'sz-ns' },
          { text: '福田区', value: 'sz-ft' },
          { text: '宝安区', value: 'sz-ba' },
        ],
      },
    ],
  },
  {
    text: '浙江省', value: 'zj',
    children: [
      {
        text: '杭州市', value: 'hz',
        children: [
          { text: '西湖区', value: 'hz-xh' },
          { text: '上城区', value: 'hz-sc' },
        ],
      },
    ],
  },
];

/* ── 深度级联示例（省 / 市 / 区 / 街道 / 村 / 组） ── */

const deepTree: PickerOption[] = [
  {
    text: '广东省', value: 'gd',
    children: [
      {
        text: '广州市', value: 'gz',
        children: [
          {
            text: '天河区', value: 'gz-th',
            children: [
              {
                text: '石牌街道', value: 'sp',
                children: [
                  {
                    text: '石牌村', value: 'spc',
                    children: [
                      { text: '一组', value: 'spc-1' },
                      { text: '二组', value: 'spc-2' },
                    ],
                  },
                  {
                    text: '南大社区', value: 'nd',
                    children: [
                      { text: '南区', value: 'nd-s' },
                      { text: '北区', value: 'nd-n' },
                    ],
                  },
                ],
              },
              {
                text: '猎德街道', value: 'ld',
                children: [
                  { text: '猎德村', value: 'ldc', children: [{ text: '一社', value: 'ldc-1' }] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: '浙江省', value: 'zj',
    children: [
      {
        text: '杭州市', value: 'hz',
        children: [
          {
            text: '西湖区', value: 'hz-xh',
            children: [
              { text: '灵隐街道', value: 'ly', children: [{ text: '灵隐社区', value: 'lyc' }] },
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
  { name: 'placeholder', type: 'string', default: "'请选择地区'", required: false, desc: 'componentProps.citypicker.placeholder' },
  { name: 'separator', type: 'string', default: "' / '", required: false, desc: 'componentProps.citypicker.separator' },
  { name: 'title', type: 'string', default: "'选择地区'", required: false, desc: 'componentProps.citypicker.title' },
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
    text: '广东省', value: 'gd',
    children: [
      {
        text: '广州市', value: 'gz',
        children: [
          { text: '天河区', value: 'gz-th' },
          { text: '越秀区', value: 'gz-yx' },
          { text: '海珠区', value: 'gz-hz' },
        ],
      },
      {
        text: '深圳市', value: 'sz',
        children: [
          { text: '南山区', value: 'sz-ns' },
          { text: '福田区', value: 'sz-ft' },
          { text: '宝安区', value: 'sz-ba' },
        ],
      },
    ],
  },
  {
    text: '浙江省', value: 'zj',
    children: [
      {
        text: '杭州市', value: 'hz',
        children: [
          { text: '西湖区', value: 'hz-xh' },
          { text: '上城区', value: 'hz-sc' },
        ],
      },
    ],
  },
];

function Demo() {
  const [val, setVal] = createSignal<(string | number)[]>([]);
  return (
    <CellGroup>
      <Cell title="所在地区" value={val().length ? val().join(' / ') : ''} />
      <CityPicker
        columns={cityTree}
        value={val()}
        onChange={setVal}
        placeholder="请选择省市区"

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
      <FormItem name="region" label="所在地区">
        <CityPicker columns={cityTree} placeholder="请选择省市区"  />
      </FormItem>
      <div style={{ padding: '12px 1rem' }}>
        <Button type="primary" block nativeType="submit" text="提交" />
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
    text: '广东省', value: 'gd',
    children: [
      {
        text: '广州市', value: 'gz',
        children: [
          {
            text: '天河区', value: 'gz-th',
            children: [
              {
                text: '石牌街道', value: 'sp',
                children: [
                  {
                    text: '石牌村', value: 'spc',
                    children: [
                      { text: '一组', value: 'spc-1' },
                      { text: '二组', value: 'spc-2' },
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
        title={val().length ? val().join(' / ') : '请选择'}
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
        title="选择地址"

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
      <Cell title="所在地区" value={val().length ? val().join(' / ') : ''} />
      <CityPicker
        columns={cityTree}
        value={val()}
        onChange={setVal}
        placeholder="请选择省市区"
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
      <Form onSubmit={(v) => { setFormVal(v); Toast.success('提交: ' + JSON.stringify(v)); }}>
        <FormItem name="region" label="所在地区">
          <CityPicker columns={cityTree} placeholder="请选择省市区" teleport={phone?.()} />
        </FormItem>
        <div style={{ padding: '12px 1rem' }}>
          <Button type="primary" block nativeType="submit" text="提交" />
        </div>
      </Form>
      <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
        提交值: {JSON.stringify(formVal())}
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
    if (!val().length) return '请选择（6级级联示例）';
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
        title="选择地址"
      />
    </>
  );
};

export const CityPickerDocPage: Component = () => {
  const t = useT();
  return (
    <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>CityPicker 城市选择</h1>
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
        更深的层级建议直接使用 <code>{'<Picker>'}</code> 组件搭配树形数据。
        Picker 的 tree 模式支持任意深度级联，不限层级数。
      </p>

      <DemoBlock title={t('demo.cityDeep6')} desc={t('demoDesc.CityPicker_3f0c2e')} code={codeDeep}>
        <DeepDemo />
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
