import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CascaderMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Cascader } from '../../../src/components/Cascader';
import type { CascaderOption } from '../../../src/components/Cascader';

const propsData = [
  { name: 'options', type: 'CascaderOption[]', desc: '级联数据源' },
  { name: 'value', type: '(string | number)[]', desc: '当前选中值' },
  { name: 'onChange', type: '(value) => void', desc: '值变化回调' },
  { name: 'title', type: 'string | JSX.Element', desc: '标题' },
  { name: 'placeholder', type: 'string', desc: '占位文字' },
  { name: 'show', type: 'boolean', desc: '是否显示（受控）' },
  { name: 'onUpdateShow', type: '(show) => void', desc: '关闭回调' },
  { name: 'disabled', type: 'boolean', desc: '禁用整个选择器' },
  { name: 'onLoadChildren', type: '(option) => Promise<CascaderOption[]>', desc: '异步加载子选项' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const options: CascaderOption[] = [
  {
    text: '浙江', value: 'zj', children: [
      { text: '杭州', value: 'hz', children: [
        { text: '西湖区', value: 'xh' },
        { text: '余杭区', value: 'yh' },
      ]},
      { text: '宁波', value: 'nb', children: [
        { text: '海曙区', value: 'hs' },
        { text: '鄞州区', value: 'yz' },
      ]},
    ],
  },
  {
    text: '江苏', value: 'js', children: [
      { text: '南京', value: 'nj', children: [
        { text: '玄武区', value: 'xw' },
        { text: '鼓楼区', value: 'gl' },
      ]},
      { text: '苏州', value: 'sz', children: [
        { text: '姑苏区', value: 'gs' },
        { text: '工业园区', value: 'yy' },
      ]},
    ],
  },
];

export const CascaderMobile: Component<CascaderMobileProps> = (props) => {
  const [show, setShow] = createSignal(false);
  const [val, setVal] = createSignal<(string | number)[]>([]);
  const [display, setDisplay] = createSignal('');

  return (
    <MobilePreview title="Cascader 级联选择" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础级联 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础三级级联</div>
        <div style={CARD.desc}>省 → 市 → 区 三级联动</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid #e5e7eb', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: display() || '#9ca3af' }}
            onClick={() => setShow(true)}
          >
            {display() || '请选择地区'}
          </div>
          <Cascader
            options={options}
            show={show()}
            onUpdateShow={setShow}
            title="选择地区"
            placeholder="请选择地区"
            onChange={(v) => {
              setVal(v);
              // build display
              const parts: string[] = [];
              let currentOpts = options;
              for (const vv of v) {
                const found = currentOpts.find(o => o.value === vv);
                if (found) { parts.push(found.text); currentOpts = found.children || []; }
              }
              setDisplay(parts.join(' / '));
              setShow(false);
            }}
          />
        </div>
      </div>

      {/* 禁用选项 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>禁用选项 & 禁用整体</div>
        <div style={CARD.desc}>disabled 选项不可选 / 整体禁用</div>
        <div style={CARD.body}>
          <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, gap: '8px' }}>
            <Cascader
              options={[
                { text: '选项 A', value: 'a' },
                { text: '选项 B (禁用)', value: 'b', disabled: true },
                { text: '选项 C', value: 'c' },
              ]}
              placeholder="含禁用项..."
              onChange={() => {}}
            />
            <Cascader
              options={[{ text: '选项', value: 'x' }]}
              placeholder="整体禁用"
              disabled
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
