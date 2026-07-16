import { createSignal, type Component } from 'solid-js';


import zhCN from '../../../i18n/stepper/zh-CN';
import enUS from '../../../i18n/stepper/en-US';
import { registerLocale } from '../../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../../doc-i18n';
import { Stepper } from '../../../../src/components/Stepper';
import { Cell } from '../../../../src/components/Cell';
import { Icon } from '../../../../src/components/Icon';
import { DemoBlock, GroupCodePhone, PropsTable, DocLayout } from '../../../doc-utils';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Toast } from '../../../../src/components/Toast';
import type { PropRow } from '../../../doc-utils';

const stepperProps: PropRow[] = [
  { name: 'value', type: 'number', default: '—', required: false, desc: 'componentProps.stepper.value' },
  { name: 'onChange', type: '(value) => void', default: '—', required: false, desc: 'componentProps.stepper.onChange' },
  { name: 'defaultValue', type: 'number', default: '0', required: false, desc: 'componentProps.stepper.defaultValue' },
  { name: 'size', type: 'number | string', default: '—', required: false, desc: 'componentProps.stepper.size' },
  { name: 'min', type: 'number', default: '0', required: false, desc: 'componentProps.stepper.min' },
  { name: 'max', type: 'number', default: 'Infinity', required: false, desc: 'componentProps.stepper.max' },
  { name: 'step', type: 'number', default: '1', required: false, desc: 'componentProps.stepper.step' },
  { name: 'decimalLength', type: 'number', default: '0', required: false, desc: 'componentProps.stepper.decimalLength' },
  { name: 'integer', type: 'boolean', default: 'false', required: false, desc: 'componentProps.stepper.integer' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.stepper.disabled' },
  { name: 'inputDisabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.stepper.inputDisabled' },
  { name: 'buttonSize', type: 'number | string', default: '28px', required: false, desc: 'componentProps.stepper.buttonSize' },
  { name: 'inputWidth', type: 'number | string', default: '50px', required: false, desc: 'componentProps.stepper.inputWidth' },
  { name: 'minusIcon', type: 'any', default: "'−'", required: false, desc: 'componentProps.stepper.minusIcon' },
  { name: 'plusIcon', type: 'any', default: "'+'", required: false, desc: 'componentProps.stepper.plusIcon' },
  { name: 'allowEmpty', type: 'boolean', default: 'false', required: false, desc: 'componentProps.stepper.allowEmpty' },
];

const codeBasic = `const [val, setVal] = createSignal(1);
<Stepper value={val()} onChange={setVal} />`;

const codeRange = `<Stepper defaultValue={5} min={0} max={10} />`;

const codeStep = `<Stepper defaultValue={0} step={2} />`;

const codeDecimal = `<Stepper defaultValue={0} step={0.1} decimalLength={1} />`;

const codeSize = `<Stepper defaultValue={5} size={30} />`;

const codeCustomIcon = `<Stepper defaultValue={0}\n  minusIcon={\n    <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}>\n      <Icon name="heart" variant="fill" color="#333" />\n    </span>\n  }\n  plusIcon={<Icon name="heart" variant="fill" color="#ff4d4f" />}\n/>`;

const codeDisabled = `<Stepper value={3} disabled />`;

const codeForm = `<FormItem name="count" label="Quantity">
  <Stepper />
</FormItem>`;

export const StepperDocPage: Component = () => {
  const t = useT();
  const [basicVal, setBasicVal] = createSignal(1);
  const [formVal, setFormVal] = createSignal({});

  return (
    <DocLayout>
      <div style={{ padding: '16px', 'max-width': '960px' }}>
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Stepper</h1>
        <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
          {t('componentIntro.StepperIntro')}
        </p>

        <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>Stepper {t('common.props')}</h2>
        <PropsTable rows={stepperProps} />

        <GroupCodePhone />

        <DemoBlock title={t('demo.basic')} code={codeBasic} groupCode="Stepper">
          <Cell title="Quantity" value={<Stepper value={basicVal()} onChange={setBasicVal} />} />
        </DemoBlock>

        <DemoBlock title={t('demo.range')} code={codeRange} groupCode="Stepper">
          <Cell title="Range 0~10" value={<Stepper defaultValue={5} min={0} max={10} />} />
        </DemoBlock>

        <DemoBlock title={t('demo.step')} code={codeStep} groupCode="Stepper">
          <Cell title="Step 2" value={<Stepper defaultValue={0} step={2} />} />
        </DemoBlock>

        <DemoBlock title={t('demo.decimal')} code={codeDecimal} groupCode="Stepper">
          <Cell title="1 Decimal" value={<Stepper defaultValue={0} step={0.1} decimalLength={1} />} />
        </DemoBlock>

        <DemoBlock title={t('demo.customSize')} code={codeSize} groupCode="Stepper">
          <Cell title="size=30" value={<Stepper defaultValue={5} size={30} />} />
        </DemoBlock>

        <DemoBlock title={t('demo.customIcon')} code={codeCustomIcon} groupCode="Stepper">
          <Cell title="Up / Down" value={<Stepper defaultValue={3} minusIcon={<span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon name="heart" variant="fill" color="#333" /></span>} plusIcon={<Icon name="heart" variant="fill" color="#ff4d4f" />} />} />
        </DemoBlock>

        <DemoBlock title={t('demo.disabled')} code={codeDisabled} groupCode="Stepper">
          <Cell title="Disabled" value={<Stepper value={3} disabled />} />
        </DemoBlock>

        <DemoBlock title={t('demo.form')} desc={t('demo.formDesc')} code={codeForm}>
          <Form onSubmit={(v) => { setFormVal(v); Toast.success('Submit: ' + JSON.stringify(v)); }}>
            <FormItem name="count" label="Quantity">
              <Stepper />
            </FormItem>
            <div style={{ padding: '12px 1rem' }}>
              <Button type="primary" block nativeType="submit" text="Submit" />
            </div>
          </Form>
          <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
            Submit value: {JSON.stringify(formVal())}
          </div>
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
