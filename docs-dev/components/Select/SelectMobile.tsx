import { createSignal } from 'solid-js'; import { useT, registerLocale } from '../../doc-i18n'; import { Select } from '../../../src/components/Select'; import { Form, FormItem } from '../../../src/components/Form'; import { Button } from '../../../src/components/Button'; import { Cell, CellGroup } from '../../../src/components/Cell'; import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet'; import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN'; import enUS from './en-US'; import { useSelectTableData } from './tableData';
import { SelectDesign } from './SelectDesign';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const cityOpts = [{ text: 'Beijing', value: 'bj' }, { text: 'Shanghai', value: 'sh' }, { text: 'Guangzhou', value: 'gz' }];
const frameworkOpts = [
  { text: 'SolidJS', value: 'solid', render: <span style={{ display: 'flex', gap: '8px', 'align-items': 'center' }}><span style={{ color: '#1677ff', 'font-size': '1.2rem' }}>◈</span> SolidJS</span> },
  { text: 'React', value: 'react', render: <span style={{ display: 'flex', gap: '8px', 'align-items': 'center' }}><span style={{ color: '#22c55e', 'font-size': '1.2rem' }}>◇</span> React</span> },
  { text: 'Vue', value: 'vue', render: <span style={{ display: 'flex', gap: '8px', 'align-items': 'center' }}><span style={{ color: '#f59e0b', 'font-size': '1.2rem' }}>◆</span> Vue</span> },
];

export const SelectMobile = () => {
  const t = useT(); const { propsTables, cssVarsTables } = useSelectTableData();
  const [open, setOpen] = createSignal('');
  const [cityVal, setCityVal] = createSignal<string | number>('');

  return (<MobilePreview title="Select"><MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
    <div style={{ padding: '12px 0 0' }}>
      <CellGroup card>
        <Cell title={t('select.demo.basic')} value={cityVal() || 'Select'} clickable onClick={() => setOpen('city')} />
        <Cell title={t('select.demo.customRender')} value="Pick one" description="Custom JSX options" clickable onClick={() => setOpen('render')} />
      </CellGroup>
      <Select show={open() === 'city'} onUpdateShow={(v) => { if (!v) setOpen(''); }} options={cityOpts} onConfirm={(v: string|number) => { setCityVal(v); setOpen(''); }} title="City" />
      <Select show={open() === 'render'} onUpdateShow={(v) => { if (!v) setOpen(''); }} options={frameworkOpts} title="Framework" />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <div style={cs}><div style={ts}>{t('select.demo.form')}</div><div style={ds}>{t('select.demoDesc.form')}</div>
          <Form controlAlign="right" onSubmit={(v) => console.log(v)}><FormItem name="city" label="City"><Select options={cityOpts} placeholder="Select city" /></FormItem><div style={{ padding: '8px 0' }}><Button type="primary" block nativeType="submit" size="sm" text="Submit" /></div></Form>
        </div>
      </div>
    </div>
    <div style={{ padding: '0 12px 12px' }}><SelectDesign /></div>
  </MobilePreview>);
};
const cs = { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', padding: '16px' };
const ts = { 'font-size': '0.9rem', 'font-weight': 600, 'margin-bottom': '4px' };
const ds = { 'font-size': '0.8rem', color: '#9ca3af', 'margin-bottom': '12px' };
