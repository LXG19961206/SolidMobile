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
    <MobilePreview title={t('demo.textareaMobileTitle')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.textareaBasic')}</div>
        <div style={CARD.desc}>{t('demo.textareaBasicMobileDesc')}</div>
        <div style={CARD.body}>
          <Textarea placeholder="Enter multiple lines..." rows={3} />
          <Textarea placeholder="Enter more content..." rows={5} />
        </div>
      </div>

      {/* 自动撑高 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.textareaAutoSize')}</div>
        <div style={CARD.desc}>{t('demo.textareaAutoSizeMobileDesc')}</div>
        <div style={CARD.body}>
          <Textarea placeholder="Type to auto-expand..." autoSize onChange={setVal1} value={val1()} />
        </div>
      </div>

      {/* 字数统计 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.textareaCharCount')}</div>
        <div style={CARD.desc}>{t('demo.textareaCharCountMobileDesc')}</div>
        <div style={CARD.body}>
          <Textarea placeholder="Max 100 characters..." maxlength={100} showCount clearable onChange={setVal2} value={val2()} />
        </div>
      </div>

      {/* 状态 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.textareaStates')}</div>
        <div style={CARD.body}>
          <Textarea placeholder="Disabled" disabled />
          <Textarea placeholder="Read only" readonly value="This is read-only content." />
          <Textarea placeholder="Error state" error />
        </div>
      </div>
    </MobilePreview>
  );
};
