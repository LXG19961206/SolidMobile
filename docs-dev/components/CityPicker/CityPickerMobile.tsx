import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { CityPicker } from '../../../src/components/CityPicker';
import type { PickerOption } from '../../../src/components/Picker';
import { Cell, CellGroup } from '../../../src/components/Cell';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useCityPickerTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const cityData: PickerOption[] = [
  { text: 'Beijing', value: '110000', children: [
    { text: 'Beijing', value: '110100', children: [
      { text: 'Dongcheng', value: '110101' }, { text: 'Xicheng', value: '110102' },
      { text: 'Chaoyang', value: '110105' }, { text: 'Haidian', value: '110108' },
    ]},
  ]},
  { text: 'Shanghai', value: '310000', children: [
    { text: 'Shanghai', value: '310100', children: [
      { text: 'Huangpu', value: '310101' }, { text: 'Xuhui', value: '310104' },
      { text: 'Pudong New Area', value: '310115' },
    ]},
  ]},
  { text: 'Guangdong', value: '440000', children: [
    { text: 'Guangzhou', value: '440100', children: [
      { text: 'Tianhe', value: '440106' }, { text: 'Yuexiu', value: '440104' },
    ]},
    { text: 'Shenzhen', value: '440300', children: [
      { text: 'Nanshan', value: '440305' }, { text: 'Futian', value: '440304' },
    ]},
  ]},
];

const deepTree: PickerOption[] = [
  { text: 'Guangdong', value: 'gd', children: [
    { text: 'Guangzhou', value: 'gz', children: [
      { text: 'Tianhe', value: 'gz-th', children: [
        { text: 'Shipai Street', value: 'sp' },
        { text: 'Liede Street', value: 'ld' },
        { text: 'Yuancun Street', value: 'yc' },
      ]},
      { text: 'Yuexiu', value: 'gz-yx', children: [
        { text: 'Beijing Road', value: 'bjl' },
        { text: 'Dongshankou', value: 'dsk' },
      ]},
    ]},
    { text: 'Shenzhen', value: 'sz', children: [
      { text: 'Nanshan', value: 'sz-ns', children: [
        { text: 'Yuehai Street', value: 'yh' },
        { text: 'Nantou Street', value: 'nt' },
      ]},
    ]},
  ]},
  { text: 'Zhejiang', value: 'zj', children: [
    { text: 'Hangzhou', value: 'hz', children: [
      { text: 'Xihu', value: 'hz-xh', children: [
        { text: 'Lingyin Street', value: 'ly' },
        { text: 'Beishan Street', value: 'bs' },
      ]},
      { text: 'Binjiang', value: 'hz-bj', children: [
        { text: 'Puyan Street', value: 'py' },
      ]},
    ]},
  ]},
];

export const CityPickerMobile = () => {
  const t = useT();
  const { propsTables, cssVarsTables } = useCityPickerTableData();

  const [open, setOpen] = createSignal('');
  const [regionLabel, setRegionLabel] = createSignal('Select');
  const [autoVal, setAutoVal] = createSignal<(string | number)[]>([]);
  const [deepLabel, setDeepLabel] = createSignal('Select');

  return (
    <MobilePreview title="CityPicker">
      <MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />

      <div style={{ padding: '12px 0 0' }}>
        <CellGroup card>
          <Cell title={t('citypicker.demo.region')} value={regionLabel()} clickable onClick={() => setOpen('region')} />
        </CellGroup>

        <CellGroup card style={{ 'margin-top': '12px' }}>
          <Cell title={t('citypicker.demo.deepCascade')} value={deepLabel()} clickable onClick={() => setOpen('deep')} />
        </CellGroup>

        {/* Auto mode */}
        <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div style={{ background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 16px 4px', 'font-size': '0.9rem', 'font-weight': 600 }}>{t('citypicker.demo.autoMode')}</div>
            <div style={{ padding: '0 16px', 'font-size': '0.8rem', color: '#9ca3af' }}>{t('citypicker.demoDesc.autoMode')}</div>
            <div style={{ padding: '0 16px 16px' }}>
              <CityPicker
                columns={cityData}
                value={autoVal()}
                onChange={setAutoVal}
                placeholder="Please select city"
              />
            </div>
          </div>
        </div>

        <CityPicker
          columns={cityData}
          show={open() === 'region'}
          onUpdateShow={(v) => { if (!v) setOpen(''); }}
          title="Select Region"
          onConfirm={(v) => {
            const parts: string[] = [];
            let current = cityData;
            for (const vv of v) {
              const found = current.find(o => o.value === vv);
              if (found) { parts.push(String(found.text)); current = found.children || []; }
            }
            setRegionLabel(parts.join(' / '));
            setOpen('');
          }}
          separator=" - "
        />
        <CityPicker
          columns={deepTree}
          show={open() === 'deep'}
          onUpdateShow={(v) => { if (!v) setOpen(''); }}
          title="Select Address"
          onConfirm={(v) => { setDeepLabel(v.join(' / ')); setOpen(''); }}
        />
      </div>
    </MobilePreview>
  );
};
