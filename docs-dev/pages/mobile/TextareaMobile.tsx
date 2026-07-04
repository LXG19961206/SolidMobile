import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface TextareaMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Textarea } from '../../../src/components/Textarea';

const propsData = [
  { name: 'value', type: 'string', desc: 'componentProps.textarea.value' },
  { name: 'onChange', type: '(value: string) => void', desc: 'componentProps.textarea.onChange' },
  { name: 'defaultValue', type: 'string', desc: 'componentProps.textarea.defaultValue' },
  { name: 'placeholder', type: 'string', desc: 'componentProps.textarea.placeholder' },
  { name: 'maxlength', type: 'number', desc: 'componentProps.textarea.maxlength' },
  { name: 'rows', type: 'number', desc: 'componentProps.textarea.rows' },
  { name: 'autoSize', type: 'boolean | {minRows, maxRows}', desc: 'componentProps.textarea.autoSize' },
  { name: 'disabled', type: 'boolean', desc: 'componentProps.textarea.disabled' },
  { name: 'readonly', type: 'boolean', desc: 'componentProps.textarea.readonly' },
  { name: 'clearable', type: 'boolean', desc: 'componentProps.textarea.clearable' },
  { name: 'showCount', type: 'boolean', desc: 'componentProps.textarea.showCount' },
  { name: 'error', type: 'boolean', desc: 'componentProps.textarea.error' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-direction': 'column' as const, gap: '12px' },
};

export const TextareaMobile: Component<TextareaMobileProps> = (props) => {
  const t = useT();
  const [val1, setVal1] = createSignal('');
  const [val2, setVal2] = createSignal('');

  return (
    <MobilePreview title="Textarea 多行输入" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础多行输入</div>
        <div style={CARD.desc}>rows 控制可视行数</div>
        <div style={CARD.body}>
          <Textarea placeholder="请输入多行文字..." rows={3} />
          <Textarea placeholder="更多行数..." rows={5} />
        </div>
      </div>

      {/* 自动撑高 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自动撑高 autoSize</div>
        <div style={CARD.desc}>内容超过高度时自动扩展</div>
        <div style={CARD.body}>
          <Textarea placeholder="输入内容自动撑高..." autoSize onChange={setVal1} value={val1()} />
        </div>
      </div>

      {/* 字数统计 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>字数统计 & 清除</div>
        <div style={CARD.desc}>showCount + maxlength + clearable</div>
        <div style={CARD.body}>
          <Textarea placeholder="最多 100 字" maxlength={100} showCount clearable onChange={setVal2} value={val2()} />
        </div>
      </div>

      {/* 状态 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>禁用 & 只读 & 错误</div>
        <div style={CARD.body}>
          <Textarea placeholder="{t('demo.disabled')}" disabled />
          <Textarea placeholder="只读状态" readonly value="只读内容" />
          <Textarea placeholder="错误状态" error />
        </div>
      </div>
    </MobilePreview>
  );
};
