import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Rate } from '../../../src/components/Rate';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useRateTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const RateMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useRateTableData();

  const [val, setVal] = createSignal(3);
  const [halfVal, setHalfVal] = createSignal(3.5);
  const [heartVal, setHeartVal] = createSignal(5);
  const [greenVal, setGreenVal] = createSignal(3);
  const [amberVal, setAmberVal] = createSignal(4);
  const [clearableVal, setClearableVal] = createSignal(3);

  return (
    <MobilePreview title="Rate">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <div style={cs}>
          <div style={ts}>{t('rate.demo.basic')}</div>
          <div style={ds}>{t('rate.demoDesc.basic')}</div>
          <Rate value={val()} onChange={setVal} />
          <div style={ss}>Value: {val()}</div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('rate.demo.half')}</div>
          <div style={ds}>{t('rate.demoDesc.half')}</div>
          <Rate value={halfVal()} onChange={setHalfVal} allowHalf />
          <div style={ss}>Value: {halfVal()}</div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('rate.demo.count')}</div>
          <div style={ds}>{t('rate.demoDesc.count')}</div>
          <Rate count={7} value={heartVal()} onChange={setHeartVal} icon="heart" voidIcon="heart" />
          <div style={ss}>Value: {heartVal()}</div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('rate.demo.color')}</div>
          <div style={ds}>{t('rate.demoDesc.color')}</div>
          <Rate value={greenVal()} onChange={setGreenVal} color="#22c55e" voidColor="#e5e7eb" />
          <div style={ss}>Green: {greenVal()}</div>
          <div style={{ 'margin-top': '8px' }}><Rate value={amberVal()} onChange={setAmberVal} color="#f59e0b" voidColor="#fef3c7" /></div>
          <div style={ss}>Amber: {amberVal()}</div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('rate.demo.clearable')}</div>
          <div style={ds}>{t('rate.demoDesc.clearable')}</div>
          <Rate value={clearableVal()} onChange={setClearableVal} clearable />
          <div style={ss}>Value: {clearableVal()} (tap again to clear)</div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('rate.demo.readonly')}</div>
          <div style={ds}>{t('rate.demoDesc.readonly')}</div>
          <div style={row}>Readonly: <Rate value={4} readonly /></div>
          <div style={row}>Disabled: <Rate value={2} disabled /></div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('rate.demo.form')}</div>
          <div style={ds}>{t('rate.demoDesc.form')}</div>
          <Form controlAlign="right" onSubmit={(v) => console.log(v)}>
            <FormItem name="rating" label="Rating">
              <Rate />
            </FormItem>
            <div style={{ padding: '8px 0' }}>
              <Button type="primary" block nativeType="submit" size="sm" text="Submit" />
            </div>
          </Form>
        </div>
      </div>
    </MobilePreview>
  );
};

const cs = { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', padding: '16px' };
const ts = { 'font-size': '0.9rem', 'font-weight': 600, 'margin-bottom': '4px' };
const ds = { 'font-size': '0.8rem', color: '#9ca3af', 'margin-bottom': '12px' };
const row = { display: 'flex', 'align-items': 'center', gap: '8px', 'margin-bottom': '4px', 'font-size': '0.85rem', color: '#6b7280' };
const ss = { 'font-size': '0.75rem', color: '#9ca3af', 'margin-top': '4px' };
