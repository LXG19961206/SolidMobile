import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CityPickerMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { CityPicker } from '../../../src/components/CityPicker';
import { useT } from '../../doc-i18n';
import type { PickerOption } from '../../../src/components/Picker';

const propsData = [
  { name: 'columns', type: 'PickerOption[]', desc: 'componentProps.citypicker.columns' },
  { name: 'value', type: '(string | number)[]', desc: 'componentProps.citypicker.value' },
  { name: 'onChange', type: '(value) => void', desc: 'componentProps.citypicker.onChange' },
  { name: 'onConfirm', type: '(value) => void', desc: 'componentProps.citypicker.onConfirm' },
  { name: 'onCancel', type: '() => void', desc: 'componentProps.citypicker.onCancel' },
  { name: 'placeholder', type: 'string', desc: 'componentProps.citypicker.placeholder' },
  { name: 'separator', type: 'string', desc: 'componentProps.citypicker.separator' },
  { name: 'title', type: 'string', desc: 'componentProps.citypicker.title' },
  { name: 'cancelText', type: 'string', desc: 'componentProps.citypicker.cancelText' },
  { name: 'confirmText', type: 'string', desc: 'componentProps.citypicker.confirmText' },
  { name: 'show', type: 'boolean', desc: 'componentProps.citypicker.show' },
  { name: 'onUpdateShow', type: '(show) => void', desc: 'componentProps.citypicker.onUpdateShow' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const cityData: PickerOption[] = [
  {
    text: '北京', value: '110000', children: [
      { text: '北京市', value: '110100', children: [
        { text: '东城区', value: '110101' },
        { text: '西城区', value: '110102' },
        { text: '朝阳区', value: '110105' },
        { text: '海淀区', value: '110108' },
      ]},
    ],
  },
  {
    text: '上海', value: '310000', children: [
      { text: '上海市', value: '310100', children: [
        { text: '黄浦区', value: '310101' },
        { text: '徐汇区', value: '310104' },
        { text: '浦东新区', value: '310115' },
      ]},
    ],
  },
  {
    text: '广东', value: '440000', children: [
      { text: '广州市', value: '440100', children: [
        { text: '天河区', value: '440106' },
        { text: '越秀区', value: '440104' },
      ]},
      { text: '深圳市', value: '440300', children: [
        { text: '南山区', value: '440305' },
        { text: '福田区', value: '440304' },
      ]},
    ],
  },
];

export const CityPickerMobile: Component<CityPickerMobileProps> = (props) => {
  const t = useT();
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  const [display, setDisplay] = createSignal('');

  return (
    <MobilePreview title="CityPicker 城市选择" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 省市区选择 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.provinceCityDistrict')}</div>
        <div style={CARD.desc}>{t('demo.cascadeThreeLevels')}</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: display() || '#9ca3af' }}
            onClick={() => setShow(true)}
          >
            {display() || t('demo.pleaseSelectRegion')}
          </div>
          <CityPicker
            columns={cityData}
            show={show()}
            onUpdateShow={setShow}
            title={t('demo.selectRegion')}
            placeholder={t('demo.pleaseSelectRegion')}
            separator=" - "
            onConfirm={(v) => {
              // build display
              const parts: string[] = [];
              let current = cityData;
              for (const vv of v) {
                const found = current.find(o => o.value === vv);
                if (found) { parts.push(String(found.text)); current = found.children || []; }
              }
              setDisplay(parts.join(' - '));
              setVal(v);
              setShow(false);
            }}
            onCancel={() => setShow(false)}
          />
        </div>
      </div>

      {/* 嵌入式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.directEmbed')}</div>
        <div style={CARD.desc}>{t('demo.directEmbedMobileDesc')}</div>
        <div style={CARD.body}>
          <CityPicker
            columns={cityData}
            placeholder={t('demo.pleaseSelectCity')}
            onChange={setVal}
          />
        </div>
      </div>
    </MobilePreview>
  );
};
