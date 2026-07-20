import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Switch as Toggle } from '../../../src/components/Switch';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useSwitchTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const SwitchMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useSwitchTableData();

  const [on, setOn] = createSignal(false);

  return (
    <MobilePreview title="Switch">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        <div style={cs}>
          <div style={ts}>{t('switch.demo.basic')}</div>
          <div style={ds}>{t('switch.demoDesc.basic')}</div>
          <div style={row}><span style={ls}>Controlled: </span><Toggle checked={on()} onChange={setOn} /><span style={ss}>{on() ? ' ON' : ' OFF'}</span></div>
          <div style={row}><span style={ls}>Uncontrolled: </span><Toggle defaultChecked /></div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('switch.demo.disabled')}</div>
          <div style={ds}>{t('switch.demoDesc.disabled')}</div>
          <div style={row}><span style={ls}>Off: </span><Toggle disabled /></div>
          <div style={row}><span style={ls}>On: </span><Toggle disabled checked /></div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('switch.demo.color')}</div>
          <div style={ds}>{t('switch.demoDesc.color')}</div>
          <div style={row}><span style={ls}>Green: </span><Toggle activeColor="#22c55e" inactiveColor="#f3f4f6" /></div>
          <div style={row}><span style={ls}>Red: </span><Toggle activeColor="#ef4444" inactiveColor="#fee2e2" /></div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('switch.demo.size')}</div>
          <div style={ds}>{t('switch.demoDesc.size')}</div>
          <div style={row}><span style={ls}>sm: </span><Toggle size={24} /></div>
          <div style={row}><span style={ls}>md: </span><Toggle size={28} /></div>
          <div style={row}><span style={ls}>lg: </span><Toggle size={36} /></div>
        </div>

        <div style={cs}>
          <div style={ts}>{t('switch.demo.text')}</div>
          <div style={ds}>{t('switch.demoDesc.text')}</div>
          <Toggle activeText="ON" inactiveText="OFF" checked={on()} onChange={setOn} size={32} />
        </div>

        <div style={cs}>
          <div style={ts}>{t('switch.demo.form')}</div>
          <div style={ds}>{t('switch.demoDesc.form')}</div>
          <Form controlAlign="right" onSubmit={(v) => console.log(v)}>
            <FormItem name="notify" label="Notifications">
              <Toggle />
            </FormItem>
            <FormItem name="darkMode" label="Dark Mode">
              <Toggle />
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
const row = { display: 'flex', 'align-items': 'center', gap: '8px', 'margin-bottom': '4px' };
const ls = { 'font-size': '0.85rem', color: '#6b7280' };
const ss = { 'font-size': '0.8rem', color: '#9ca3af' };
