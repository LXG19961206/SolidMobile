import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Picker } from '../../../src/components/Picker';
import type { PickerOption } from '../../../src/components/Picker';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { usePickerTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

/* ── Data ── */
const cityTree: PickerOption[] = [
  { text: 'Beijing', value: 'bj', children: [{ text: 'Haidian', value: 'hd' }, { text: 'Chaoyang', value: 'cy' }] },
  { text: 'Shanghai', value: 'sh', children: [{ text: 'Pudong', value: 'pd' }, { text: 'Xuhui', value: 'xh' }] },
  { text: 'Guangdong', value: 'gd', children: [{ text: 'Guangzhou', value: 'gz' }, { text: 'Shenzhen', value: 'sz' }] },
];

const dateCols: PickerOption[][] = [
  [{ text: '2024', value: 2024 }, { text: '2025', value: 2025 }, { text: '2026', value: 2026 }],
  [{ text: 'Jan', value: 1 }, { text: 'Feb', value: 2 }, { text: 'Mar', value: 3 }, { text: 'Apr', value: 4 }, { text: 'May', value: 5 }, { text: 'Jun', value: 6 }],
];

const hrs = Array.from({ length: 24 }, (_, i) => ({ text: `${i.toString().padStart(2, '0')}`, value: i }));
const mins = Array.from({ length: 60 }, (_, i) => ({ text: `${i.toString().padStart(2, '0')}`, value: i }));
const timeCols: PickerOption[][] = [hrs, mins];

export const PickerMobile = () => {
  const t = useT();
  const { propsTables, optionTables, cssVarsTables } = usePickerTableData();
  const [open, setOpen] = createSignal('');
  const [cityLabel, setCityLabel] = createSignal('');
  const [dateLabel, setDateLabel] = createSignal('');
  const [timeLabel, setTimeLabel] = createSignal('');
  const [disabledLabel, setDisabledLabel] = createSignal('');
  const [renderLabel, setRenderLabel] = createSignal('');

  return (
    <MobilePreview title="Picker">
      <MobilePropsSheet propsTables={[...propsTables, ...optionTables]} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px 0 0' }}>
        <CellGroup card>
          <Cell title={t('picker.demo.city')} value={cityLabel() || 'Select'} clickable onClick={() => setOpen('city')} />
          <Cell title={t('picker.demo.date')} value={dateLabel() || 'Select'} clickable onClick={() => setOpen('date')} />
          <Cell title={t('picker.demo.time')} value={timeLabel() || 'Select'} clickable onClick={() => setOpen('time')} />
          <Cell title={t('picker.demo.disabled')} value={disabledLabel() || 'Select'} clickable onClick={() => setOpen('disabled')} />
          <Cell title={t('picker.demo.controlled')} value="bj / hd" clickable onClick={() => setOpen('controlled')} />
          <Cell title={t('picker.renderDemo')} value={renderLabel() || 'Select'} description="Custom JSX in options" clickable onClick={() => setOpen('render')} />
          <Cell title="ratio=0.3 slow" description={t('picker.inertiaDesc')} value={timeLabel() || 'Select'} clickable onClick={() => setOpen('inertia')} />
        </CellGroup>

        <Picker show={open() === 'render'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          title="Pick a Framework" cancelText="Cancel" confirmText="Select"
          onConfirm={(items: any, vals: any) => setRenderLabel(vals.join(', '))}
          columns={[[
            { text: '', value: 'solid', render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px' }}><span style={{ color: '#1677ff', 'font-size': '1.2rem' }}>◈</span> SolidJS — <span style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>fine-grained reactivity</span></span> },
            { text: '', value: 'react', render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px' }}><span style={{ color: '#22c55e', 'font-size': '1.2rem' }}>◇</span> React — <span style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>virtual DOM</span></span> },
            { text: '', value: 'vue', render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px' }}><span style={{ color: '#f59e0b', 'font-size': '1.2rem' }}>◆</span> Vue — <span style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>reactive components</span></span> },
            { text: '', value: 'svelte', render: <span style={{ display: 'flex', 'align-items': 'center', gap: '8px' }}><span style={{ color: '#ef4444', 'font-size': '1.2rem' }}>◇</span> Svelte — <span style={{ 'font-size': '0.75rem', color: '#9ca3af' }}>compile-time shifts</span></span> },
          ]]}
        />

        <Picker show={open() === 'inertia'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          title="Slow Inertia" cancelText="Cancel" confirmText="Confirm"
          ratio={0.3} swipeDuration={2}
          columns={timeCols}
          onConfirm={(items: any, vals: any) => setTimeLabel(vals.map(String).join(':'))}
        />

        <Picker show={open() === 'city'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          title="City" cancelText="Cancel" confirmText="Confirm"
          columns={cityTree}
          onConfirm={(items: any, vals: any) => setCityLabel(vals.join(' / '))}
        />
        <Picker show={open() === 'date'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          title="Date" cancelText="Cancel" confirmText="Confirm" columns={dateCols}
          onConfirm={(items: any, vals: any) => setDateLabel(vals.join(' / '))}
        />
        <Picker show={open() === 'time'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          title="Time" cancelText="Cancel" confirmText="Confirm" columns={timeCols}
          onConfirm={(items: any, vals: any) => setTimeLabel(vals.map(String).join(':'))}
        />
        <Picker show={open() === 'disabled'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          title="Options" columns={[[
            { text: 'Option A', value: 'a' },
            { text: 'Option B (disabled)', value: 'b', disabled: true },
            { text: 'Option C', value: 'c' },
            { text: 'Option D (disabled)', value: 'd', disabled: true },
          ]]} cancelText="Cancel" confirmText="Confirm"
          onConfirm={(items: any, vals: any) => setDisabledLabel(vals.join(', '))}
        />
        <Picker show={open() === 'controlled'} onUpdateShow={(v) => { if (!v) setOpen(''); }}
          title="City" cancelText="Cancel" confirmText="Confirm"
          value={['bj', 'hd']} columns={cityTree}
        />

        {/* Auto mode: Picker renders its own Cell trigger, no show/onUpdateShow needed */}
        <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>Auto Mode</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>No show prop — Picker renders its own Cell trigger</div>
            <div style={{ padding: '0 16px 16px' }}>
              <Picker
                columns={[[
                  { text: 'Option A', value: 'a' },
                  { text: 'Option B', value: 'b' },
                  { text: 'Option C', value: 'c' },
                ]]}
                title="Pick One"
                cancelText="Cancel" confirmText="Confirm"
              />
            </div>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
