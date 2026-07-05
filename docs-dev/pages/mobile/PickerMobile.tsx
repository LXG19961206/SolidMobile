import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface PickerMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Picker } from '../../../src/components/Picker';
import { Cell, CellGroup } from '../../../src/components/Cell';
import type { PickerOption } from '../../../src/components/Picker';
import { useT } from '../../doc-i18n';

const propsData = [
  { name: 'columns', type: 'PickerOption[] | PickerOption[][]', desc: 'componentProps.picker.columns' },
  { name: 'value', type: '(string | number)[]', desc: 'componentProps.picker.value' },
  { name: 'onChange', type: '(items, vals) => void', desc: 'componentProps.picker.onChange' },
  { name: 'onConfirm', type: '(items, vals) => void', desc: 'componentProps.picker.onConfirm' },
  { name: 'onCancel', type: '() => void', desc: 'componentProps.picker.onCancel' },
  { name: 'show', type: 'boolean', desc: 'componentProps.picker.show' },
  { name: 'onUpdateShow', type: '(show) => void', desc: 'componentProps.picker.onUpdateShow' },
  { name: 'title', type: 'string', desc: 'componentProps.picker.title' },
  { name: 'visibleItemCount', type: 'number', desc: 'componentProps.picker.visibleItemCount' },
  { name: 'optionHeight', type: 'number', desc: 'componentProps.picker.optionHeight' },
  { name: 'cancelText', type: 'string', desc: 'componentProps.picker.cancelText' },
  { name: 'confirmText', type: 'string', desc: 'componentProps.picker.confirmText' },
  { name: 'placeholders', type: 'string | string[]', desc: 'componentProps.picker.placeholders' },
  { name: 'ratio', type: 'number', desc: 'componentProps.picker.ratio' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

/* ── Data ── */

const cityTree: PickerOption[] = [
  {
    text: 'Beijing', value: 'bj', children: [
      { text: 'Haidian', value: 'hd' }, { text: 'Chaoyang', value: 'cy' }, { text: 'Dongcheng', value: 'dc' },
    ],
  },
  {
    text: 'Shanghai', value: 'sh', children: [
      { text: 'Pudong', value: 'pd' }, { text: "Jing'an", value: 'ja' },
    ],
  },
  {
    text: 'Guangdong', value: 'gd', children: [
      {
        text: 'Shenzhen', value: 'sz', children: [
          { text: 'Nanshan', value: 'ns' }, { text: 'Futian', value: 'ft' },
        ],
      },
      { text: 'Guangzhou', value: 'gz', children: [{ text: 'Tianhe', value: 'th' }] },
    ],
  },
];

const thisYear = new Date().getFullYear();
const dateCols: PickerOption[][] = [
  Array.from({ length: 10 }, (_, i) => ({ text: `${thisYear - 5 + i}`, value: thisYear - 5 + i })),
  Array.from({ length: 12 }, (_, i) => ({ text: `${String(i + 1).padStart(2, '0')}`, value: i + 1 })),
];

const timeCols: PickerOption[][] = [
  Array.from({ length: 24 }, (_, i) => ({ text: `${String(i).padStart(2, '0')}h`, value: i })),
  Array.from({ length: 60 }, (_, i) => ({ text: `${String(i).padStart(2, '0')}m`, value: i })),
];

const disabledCols: PickerOption[][] = [[
  { text: 'Option A', value: 'a' },
  { text: 'Option B (disabled)', value: 'b', disabled: true },
  { text: 'Option C', value: 'c' },
  { text: 'Option D (disabled)', value: 'd', disabled: true },
  { text: 'Option E', value: 'e' },
]];

export const PickerMobile: Component<PickerMobileProps> = (props) => {
  const t = useT();
  /* ── Tree cascade ── */
  const [showCity, setShowCity] = createSignal(false);
  const [cityVal, setCityVal] = createSignal<(string | number)[]>([]);
  const [cityLabel, setCityLabel] = createSignal('');

  /* ── Flat year/month ── */
  const [showDate, setShowDate] = createSignal(false);
  const [dateVal, setDateVal] = createSignal<(string | number)[]>([]);
  const [dateLabel, setDateLabel] = createSignal('');

  /* ── Time ── */
  const [showTime, setShowTime] = createSignal(false);
  const [timeLabel, setTimeLabel] = createSignal('');

  /* ── Disabled options ── */
  const [showDisabled, setShowDisabled] = createSignal(false);
  const [disabledVal, setDisabledVal] = createSignal<(string | number)[]>([]);

  /* ── Placeholder ── */
  const [showPh, setShowPh] = createSignal(false);
  const [phLabel, setPhLabel] = createSignal('');

  /* ── Controlled value ── */
  const [showCtrl, setShowCtrl] = createSignal(false);

  return (
    <MobilePreview title="Picker" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Tree cascade */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cascade')}</div>
        <div style={CARD.desc}>{t('demo.cascadeDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="Select Region"
              value={cityLabel() || "Please select"}
              clickable
              onClick={() => setShowCity(true)}
            />
          </CellGroup>
          <Picker
            columns={cityTree}
            show={showCity()}
            onUpdateShow={setShowCity}
            title="Select Region"
            onChange={(_, v) => setCityVal(v)}
            onConfirm={(items, _) => {
              setCityLabel(items.map(i => i.text).join(' / '));
              setShowCity(false);
            }}
            onCancel={() => setShowCity(false)}
          />
        </div>
      </div>

      {/* Flat year/month */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.flat')}</div>
        <div style={CARD.desc}>{t('demo.flatDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="Select Year/Month"
              value={dateLabel() || "Please select"}
              clickable
              onClick={() => setShowDate(true)}
            />
          </CellGroup>
          <Picker
            columns={dateCols}
            show={showDate()}
            onUpdateShow={setShowDate}
            title="Select Year/Month"
            onChange={(_, v) => setDateVal(v)}
            onConfirm={(items, _) => {
              setDateLabel(items.map(i => i.text).join(' / '));
              setShowDate(false);
            }}
            onCancel={() => setShowDate(false)}
          />
        </div>
      </div>

      {/* Time picker */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.timeSelect')}</div>
        <div style={CARD.desc}>{t('demo.timeSelectDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="Select Time"
              value={timeLabel() || "Please select"}
              clickable
              onClick={() => setShowTime(true)}
            />
          </CellGroup>
          <Picker
            columns={timeCols}
            show={showTime()}
            onUpdateShow={setShowTime}
            title="Select Time"
            onChange={(_, v) => setTimeLabel(`${String(v[0]).padStart(2, '0')}:${String(v[1]).padStart(2, '0')}`)}
            onConfirm={(_items, v) => {
              setTimeLabel(`${String(v[0]).padStart(2, '0')}:${String(v[1]).padStart(2, '0')}`);
              setShowTime(false);
            }}
            onCancel={() => setShowTime(false)}
          />
        </div>
      </div>

      {/* Disabled options */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.disabled')}</div>
        <div style={CARD.desc}>{t('demo.disabledDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="With Disabled Items"
              value={disabledVal().length ? String(disabledVal()) : "Please select"}
              clickable
              onClick={() => setShowDisabled(true)}
            />
          </CellGroup>
          <Picker
            columns={disabledCols}
            show={showDisabled()}
            onUpdateShow={setShowDisabled}
            title="Options"
            onChange={(_, v) => setDisabledVal(v)}
            onConfirm={(_, v) => { setDisabledVal(v); setShowDisabled(false); }}
            onCancel={() => setShowDisabled(false)}
          />
        </div>
      </div>

      {/* Placeholder */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.placeholder')}</div>
        <div style={CARD.desc}>{t('demo.placeholderDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="Placeholder Mode"
              value={phLabel() || "Please select"}
              clickable
              onClick={() => setShowPh(true)}
            />
          </CellGroup>
          <Picker
            columns={[[{ text: 'Option 1', value: 1 }, { text: 'Option 2', value: 2 }, { text: 'Option 3', value: 3 }]]}
            show={showPh()}
            onUpdateShow={setShowPh}
            title="Please select"
            placeholders="Please select"
            onChange={(items, vals) => setPhLabel(vals[0] ? String(items[0]?.text ?? '') : '')}
            onConfirm={(items, vals) => {
              setPhLabel(vals[0] ? String(items[0]?.text ?? '') : '');
              setShowPh(false);
            }}
            onCancel={() => setShowPh(false)}
          />
        </div>
      </div>

      {/* Controlled value */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.controlled')}</div>
        <div style={CARD.desc}>{t('demo.controlledDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="Preset Value" value="Beijing / Haidian" clickable onClick={() => setShowCtrl(true)} />
          </CellGroup>
          <Picker
            columns={cityTree}
            show={showCtrl()}
            onUpdateShow={setShowCtrl}
            title="Select Region"
            value={['bj', 'hd']}
            onConfirm={() => setShowCtrl(false)}
            onCancel={() => setShowCtrl(false)}
          />
        </div>
      </div>
    </MobilePreview>
  );
};
