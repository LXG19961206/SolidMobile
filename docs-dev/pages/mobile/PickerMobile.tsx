import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface PickerMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Picker } from '../../../src/components/Picker';
import type { PickerOption } from '../../../src/components/Picker';

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '16px' },
  trigger: { padding: '12px 16px', border: '1px solid #e5e7eb', 'border-radius': '8px', cursor: 'pointer' as const, 'font-size': '0.9rem' },
};

const cityTree: PickerOption[] = [
  {
    text: '北京', value: 'bj', children: [
      { text: '海淀', value: 'hd' }, { text: '朝阳', value: 'cy' },
    ]
  },
  {
    text: '上海', value: 'sh', children: [
      { text: '浦东', value: 'pd' }, { text: '静安', value: 'ja' },
    ]
  },
];

const dateCols: PickerOption[][] = [
  [{ text: '2024年', value: 2024 }, { text: '2025年', value: 2025 }],
  [{ text: '1月', value: 1 }, { text: '2月', value: 2 }, { text: '3月', value: 3 }],
];

const disabledCols: PickerOption[][] = [[
  { text: '选项 A', value: 'a' },
  { text: '选项 B (禁用)', value: 'b', disabled: true },
  { text: '选项 C', value: 'c' },
]];

const pickerProps = [
  { name: 'columns', type: 'PickerOption[] | PickerOption[][]', desc: '数据源，支持 tree 级联或 flat 多列' },
  { name: 'value', type: '(string | number)[]', desc: '当前选中值' },
  { name: 'onChange', type: '(items, vals) => void', desc: '值变化回调' },
  { name: 'onConfirm', type: '(items, vals) => void', desc: '确认回调' },
  { name: 'title', type: 'string', desc: '面板标题' },
  { name: 'cancelText', type: 'string', desc: '取消按钮文字' },
  { name: 'confirmText', type: 'string', desc: '确认按钮文字' },
  { name: 'show', type: 'boolean', desc: '受控：是否显示面板' },
  { name: 'onUpdateShow', type: '(show) => void', desc: '面板开关回调' },
  { name: 'visibleItemCount', type: 'number', desc: '可见行数，默认 7' },
];

export const PickerMobile: Component<PickerMobileProps> = (props) => {
  const [showTree, setShowTree] = createSignal(false);
  const [showFlat, setShowFlat] = createSignal(false);
  const [showDisabled, setShowDisabled] = createSignal(false);
  const [treeVal, setTreeVal] = createSignal<(string | number)[]>([]);
  const [flatVal, setFlatVal] = createSignal<(string | number)[]>([]);
  const [disabledVal, setDisabledVal] = createSignal<(string | number)[]>([]);

  return (
    <MobilePreview title="Picker 选择器" props={pickerProps} components={props.components} onNavigate={props.onNavigate}>
      {/* 多级联动 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>多级联动</div>
        <div style={CARD.desc}>省 → 市 二级 tree 模式</div>
        <div style={CARD.body}>
          <div
            style={{ ...CARD.trigger, color: treeVal().length ? '#1f2937' : '#9ca3af' }}
            onClick={() => setShowTree(true)}
          >
            {treeVal().length ? treeVal().join(' / ') : '请选择地区'}
          </div>
          <Picker
            columns={cityTree}
            show={showTree()}
            onUpdateShow={setShowTree}
            onChange={(_, v) => setTreeVal(v)}
            onConfirm={(_, v) => { setTreeVal(v); setShowTree(false); }}
            onCancel={() => setShowTree(false)}
          />
        </div>
      </div>

      {/* 多列不联动 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>多列不联动</div>
        <div style={CARD.desc}>年月独立选择（flat 模式）</div>
        <div style={CARD.body}>
          <div
            style={{ ...CARD.trigger, color: flatVal().length ? '#1f2937' : '#9ca3af' }}
            onClick={() => setShowFlat(true)}
          >
            {flatVal().length ? `${flatVal()[0]}年 ${flatVal()[1]}月` : '请选择年月'}
          </div>
          <Picker
            columns={dateCols}
            show={showFlat()}
            onUpdateShow={setShowFlat}
            onChange={(_, v) => setFlatVal(v)}
            onConfirm={(_, v) => { setFlatVal(v); setShowFlat(false); }}
            onCancel={() => setShowFlat(false)}
          />
        </div>
      </div>

      {/* 禁用选项 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>禁用选项</div>
        <div style={CARD.desc}>disabled 项不可选中</div>
        <div style={CARD.body}>
          <div
            style={{ ...CARD.trigger, color: disabledVal().length ? '#1f2937' : '#9ca3af' }}
            onClick={() => setShowDisabled(true)}
          >
            {disabledVal().length ? disabledVal() : '请选择'}
          </div>
          <Picker
            columns={disabledCols}
            show={showDisabled()}
            onUpdateShow={setShowDisabled}
            onChange={(_, v) => setDisabledVal(v)}
            onConfirm={(_, v) => { setDisabledVal(v); setShowDisabled(false); }}
            onCancel={() => setShowDisabled(false)}
          />
        </div>
      </div>
    </MobilePreview>
  );
};
