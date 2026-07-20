import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Stepper } from '../../../src/components/Stepper';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useStepperTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const StepperMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useStepperTableData();
  const [val, setVal] = createSignal(0);
  const [rangeVal, setRangeVal] = createSignal(5);
  const [stepVal, setStepVal] = createSignal(2.5);

  return (
    <MobilePreview title="Stepper">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <Card title={t('stepper.demo.basic')} desc={t('stepper.demoDesc.basic')}>
          <Stepper value={val()} onChange={setVal} />
          <div style={ss}>Value: {val()}</div>
        </Card>
        <Card title={t('stepper.demo.range')} desc={t('stepper.demoDesc.range')}>
          <Stepper value={rangeVal()} onChange={setRangeVal} min={1} max={10} />
          <div style={ss}>Value: {rangeVal()} (min=1, max=10)</div>
        </Card>
        <Card title={t('stepper.demo.step')} desc={t('stepper.demoDesc.step')}>
          <Stepper value={stepVal()} onChange={setStepVal} step={0.5} decimalLength={1} />
          <div style={ss}>Value: {stepVal()} (step=0.5)</div>
        </Card>
        <Card title={t('stepper.demo.disabled')} desc={t('stepper.demoDesc.disabled')}>
          <div style={row}><span style={ls}>Disabled: </span><Stepper value={5} disabled /></div>
          <div style={row}><span style={ls}>Input disabled: </span><Stepper value={5} inputDisabled /></div>
        </Card>
        <Card title={t('stepper.demo.form')} desc={t('stepper.demoDesc.form')}>
          <Form controlAlign="right" onSubmit={(v) => console.log(v)}>
            <FormItem name="count" label="Quantity">
              <Stepper />
            </FormItem>
            <div style={{ padding: '8px 0' }}><Button type="primary" block nativeType="submit" size="sm" text="Submit" /></div>
          </Form>
        </Card>
      </div>
    </MobilePreview>
  );
};

const cs = { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', padding: '16px' };
const ts = { 'font-size': '0.9rem', 'font-weight': 600, 'margin-bottom': '4px' };
const ds = { 'font-size': '0.8rem', color: '#9ca3af', 'margin-bottom': '12px' };
const row = { display: 'flex', 'align-items': 'center', gap: '8px', 'margin-bottom': '4px' };
const ls = { 'font-size': '0.85rem', color: '#6b7280' };
const ss = { 'font-size': '0.75rem', color: '#9ca3af', 'margin-top': '4px' };

function Card(props: { title: string; desc: string; children: any }) {
  return <div style={cs}><div style={ts}>{props.title}</div><div style={ds}>{props.desc}</div>{props.children}</div>;
}
