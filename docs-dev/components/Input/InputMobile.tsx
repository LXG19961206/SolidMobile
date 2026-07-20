import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Input } from '../../../src/components/Input';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useInputTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const InputStandalone = () => {
  const [val, setVal] = createSignal('');
  return (
    <>
      <Input value={val()} onChange={setVal} placeholder="Type here..." clearable />
      <div style={{ 'font-size': '0.8rem', color: '#6b7280' }}>Value: {val() || '(empty)'}</div>
    </>
  );
};

export const InputMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useInputTableData();

  const [countdown, setCountdown] = createSignal(0);
  let timer: ReturnType<typeof setInterval>;

  const send = () => {
    if (countdown() > 0) return;
    setCountdown(60);
    timer = setInterval(() => {
      setCountdown(c => { if (c <= 1) { clearInterval(timer); return 0; } return c - 1; });
    }, 1000);
  };

  const btn = () => (
    <span onClick={send} style={{ 'font-size': '0.8rem', 'white-space': 'nowrap', color: countdown() > 0 ? '#999' : 'var(--sc-color-primary, #1677ff)', cursor: countdown() > 0 ? 'default' : 'pointer' }}>
      {countdown() > 0 ? `${countdown()}s` : 'Send Code'}
    </span>
  );

  return (
    <MobilePreview title="Input">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px 0 0' }}>
        {/* Standalone */}
        <div style={{ padding: '0 12px 12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>{t('input.demo.standalone')}</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>{t('input.demoDesc.standalone')}</div>
            <div style={{ padding: '0 16px 16px', display: 'flex', 'flex-direction': 'column', gap: '8px' }}>
              <InputStandalone />
            </div>
          </div>
        </div>

        <CellGroup card>
          <Cell title="Text" value={<Input placeholder="Enter text" />} />
          <Cell title="Password" value={<Input type="password" placeholder="Password" showPasswordToggle />} />
          <Cell title="Number" value={<Input type="number" placeholder="Number" />} />
          <Cell title="Tel" value={<Input type="tel" placeholder="Phone number" />} />
          <Cell title="Email" value={<Input type="email" placeholder="Email" />} />
        </CellGroup>

        <CellGroup card style={{ 'margin-top': '12px' }}>
          <Cell title="Clearable" value={<Input clearable placeholder="Type something..." />} />
          <Cell title="Password Toggle" value={<Input type="password" placeholder="Password" showPasswordToggle />} />
        </CellGroup>

        <CellGroup card style={{ 'margin-top': '12px' }}>
          <Cell title="Prefix" value={<Input placeholder="Enter text" prefix={<span style={{ color: '#999' }}>@</span>} />} />
          <Cell title="Suffix" value={<Input placeholder="example" suffix={<span style={{ color: '#999', 'font-size': '0.85rem' }}>@gmail.com</span>} />} />
        </CellGroup>

        <CellGroup card style={{ 'margin-top': '12px' }}>
          <Cell title="Char Count" value={<Input showCount maxlength={20} placeholder="Max 20 chars" />} />
        </CellGroup>

        <CellGroup card style={{ 'margin-top': '12px' }}>
          <Cell title="Disabled" value={<Input disabled value="Not editable" />} />
          <Cell title="Readonly" value={<Input readonly value="Focusable, copyable" />} />
          <Cell title="Error" value={<Input error value="Invalid format" />} />
        </CellGroup>

        <CellGroup card style={{ 'margin-top': '12px' }}>
          <Cell title="Small" value={<Input placeholder="sm" size="sm" />} />
          <Cell title="Medium" value={<Input placeholder="md" size="md" />} />
          <Cell title="Large" value={<Input placeholder="lg" size="lg" />} />
        </CellGroup>

        <CellGroup card style={{ 'margin-top': '12px' }}>
          <Cell title="Verify Code" value={<Input type="tel" maxlength={11} placeholder="Enter phone" suffix={btn()} />} />
        </CellGroup>

        <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>{t('input.demo.form')}</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>{t('input.demoDesc.form')}</div>
            <Form controlAlign="right" onSubmit={(v) => console.log(v)}>
              <FormItem name="username" label="Username" required rules={[{ validator: (v: unknown) => (v as string)?.length >= 2, message: 'At least 2 characters' }]}>
                <Input placeholder="Enter username" clearable />
              </FormItem>
              <FormItem name="email" label="Email">
                <Input type="email" placeholder="Enter email" clearable />
              </FormItem>
              <div style={{ padding: '8px 1rem' }}>
                <Button type="primary" block nativeType="submit" size="sm" text="Submit" />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
