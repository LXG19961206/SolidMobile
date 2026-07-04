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
    text: '北京', value: 'bj', children: [
      { text: '海淀区', value: 'hd' }, { text: '朝阳区', value: 'cy' }, { text: '东城区', value: 'dc' },
    ],
  },
  {
    text: '上海', value: 'sh', children: [
      { text: '浦东新区', value: 'pd' }, { text: '静安区', value: 'ja' },
    ],
  },
  {
    text: '广东', value: 'gd', children: [
      {
        text: '深圳市', value: 'sz', children: [
          { text: '南山区', value: 'ns' }, { text: '福田区', value: 'ft' },
        ],
      },
      { text: '广州市', value: 'gz', children: [{ text: '天河区', value: 'th' }] },
    ],
  },
];

const thisYear = new Date().getFullYear();
const dateCols: PickerOption[][] = [
  Array.from({ length: 10 }, (_, i) => ({ text: `${thisYear - 5 + i}年`, value: thisYear - 5 + i })),
  Array.from({ length: 12 }, (_, i) => ({ text: `${i + 1}月`, value: i + 1 })),
];

const timeCols: PickerOption[][] = [
  Array.from({ length: 24 }, (_, i) => ({ text: `${String(i).padStart(2, '0')}时`, value: i })),
  Array.from({ length: 60 }, (_, i) => ({ text: `${String(i).padStart(2, '0')}分`, value: i })),
];

const disabledCols: PickerOption[][] = [[
  { text: '选项 A', value: 'a' },
  { text: '选项 B (禁用)', value: 'b', disabled: true },
  { text: '选项 C', value: 'c' },
  { text: '选项 D (禁用)', value: 'd', disabled: true },
  { text: '选项 E', value: 'e' },
]];

export const PickerMobile: Component<PickerMobileProps> = (props) => {
  const t = useT();
  /* ── Tree 级联 ── */
  const [showCity, setShowCity] = createSignal(false);
  const [cityVal, setCityVal] = createSignal<(string | number)[]>([]);
  const [cityLabel, setCityLabel] = createSignal('');

  /* ── Flat 年月 ── */
  const [showDate, setShowDate] = createSignal(false);
  const [dateVal, setDateVal] = createSignal<(string | number)[]>([]);
  const [dateLabel, setDateLabel] = createSignal('');

  /* ── 时分 ── */
  const [showTime, setShowTime] = createSignal(false);
  const [timeLabel, setTimeLabel] = createSignal('');

  /* ── 禁用项 ── */
  const [showDisabled, setShowDisabled] = createSignal(false);
  const [disabledVal, setDisabledVal] = createSignal<(string | number)[]>([]);

  /* ── 占位符 ── */
  const [showPh, setShowPh] = createSignal(false);
  const [phLabel, setPhLabel] = createSignal('');

  /* ── 受控值 ── */
  const [showCtrl, setShowCtrl] = createSignal(false);

  return (
    <MobilePreview title="Picker 选择器" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Tree 级联 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.cascade')}</div>
        <div style={CARD.desc}>{t('demo.cascadeDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="选择地区"
              value={cityLabel() || '请选择'}
              clickable
              onClick={() => setShowCity(true)}
            />
          </CellGroup>
          <Picker
            columns={cityTree}
            show={showCity()}
            onUpdateShow={setShowCity}
            title="选择地区"
            onChange={(_, v) => setCityVal(v)}
            onConfirm={(items, _) => {
              setCityLabel(items.map(i => i.text).join(' / '));
              setShowCity(false);
            }}
            onCancel={() => setShowCity(false)}
          />
        </div>
      </div>

      {/* Flat 年月 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.flat')}</div>
        <div style={CARD.desc}>{t('demo.flatDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="选择年月"
              value={dateLabel() || '请选择'}
              clickable
              onClick={() => setShowDate(true)}
            />
          </CellGroup>
          <Picker
            columns={dateCols}
            show={showDate()}
            onUpdateShow={setShowDate}
            title="选择年月"
            onChange={(_, v) => setDateVal(v)}
            onConfirm={(items, _) => {
              setDateLabel(items.map(i => i.text).join(' / '));
              setShowDate(false);
            }}
            onCancel={() => setShowDate(false)}
          />
        </div>
      </div>

      {/* 时分选择 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.timeSelect')}</div>
        <div style={CARD.desc}>{t('demo.timeSelectDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="选择时间"
              value={timeLabel() || '请选择'}
              clickable
              onClick={() => setShowTime(true)}
            />
          </CellGroup>
          <Picker
            columns={timeCols}
            show={showTime()}
            onUpdateShow={setShowTime}
            title="选择时间"
            onChange={(_, v) => setTimeLabel(`${String(v[0]).padStart(2, '0')}:${String(v[1]).padStart(2, '0')}`)}
            onConfirm={(_items, v) => {
              setTimeLabel(`${String(v[0]).padStart(2, '0')}:${String(v[1]).padStart(2, '0')}`);
              setShowTime(false);
            }}
            onCancel={() => setShowTime(false)}
          />
        </div>
      </div>

      {/* 禁用选项 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.disabled')}</div>
        <div style={CARD.desc}>{t('demo.disabledDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="含禁用项"
              value={disabledVal().length ? String(disabledVal()) : '请选择'}
              clickable
              onClick={() => setShowDisabled(true)}
            />
          </CellGroup>
          <Picker
            columns={disabledCols}
            show={showDisabled()}
            onUpdateShow={setShowDisabled}
            title={t('demo.actionOptions')}
            onChange={(_, v) => setDisabledVal(v)}
            onConfirm={(_, v) => { setDisabledVal(v); setShowDisabled(false); }}
            onCancel={() => setShowDisabled(false)}
          />
        </div>
      </div>

      {/* 占位符 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.placeholder')}</div>
        <div style={CARD.desc}>{t('demo.placeholderDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="占位符模式"
              value={phLabel() || '请选择'}
              clickable
              onClick={() => setShowPh(true)}
            />
          </CellGroup>
          <Picker
            columns={[[{ text: '选项 1', value: 1 }, { text: '选项 2', value: 2 }, { text: '选项 3', value: 3 }]]}
            show={showPh()}
            onUpdateShow={setShowPh}
            title="请选择"
            placeholders="请选择"
            onChange={(items, vals) => setPhLabel(vals[0] ? String(items[0]?.text ?? '') : '')}
            onConfirm={(items, vals) => {
              setPhLabel(vals[0] ? String(items[0]?.text ?? '') : '');
              setShowPh(false);
            }}
            onCancel={() => setShowPh(false)}
          />
        </div>
      </div>

      {/* 受控值 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.controlled')}</div>
        <div style={CARD.desc}>{t('demo.controlledDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="预设值" value="北京 / 海淀区" clickable onClick={() => setShowCtrl(true)} />
          </CellGroup>
          <Picker
            columns={cityTree}
            show={showCtrl()}
            onUpdateShow={setShowCtrl}
            title="选择地区"
            value={['bj', 'hd']}
            onConfirm={() => setShowCtrl(false)}
            onCancel={() => setShowCtrl(false)}
          />
        </div>
      </div>
    </MobilePreview>
  );
};
