import { type Component } from 'solid-js';
import { Textarea } from '../../../../src/components/Textarea';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { DemoBlock, PropsTable, DocLayout } from '../../../doc-utils';
import type { PropRow } from '../../../doc-utils';
import { useT, registerLocale } from '../../../doc-i18n';
import zhCN from '../../../i18n/textarea/zh-CN';
import enUS from '../../../i18n/textarea/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

const propsData: PropRow[] = [
  { name: 'value', type: 'string', default: '—', required: false, desc: 'componentProps.textarea.value' },
  { name: 'onChange', type: '(value: string) => void', default: '—', required: false, desc: 'componentProps.textarea.onChange' },
  { name: 'defaultValue', type: 'string', default: '—', required: false, desc: 'componentProps.textarea.defaultValue' },
  { name: 'placeholder', type: 'string', default: '—', required: false, desc: 'componentProps.textarea.placeholder' },
  { name: 'maxlength', type: 'number', default: '—', required: false, desc: 'componentProps.textarea.maxlength' },
  { name: 'rows', type: 'number', default: '3', required: false, desc: 'componentProps.textarea.rows' },
  { name: 'autoSize', type: 'boolean | { minRows, maxRows }', default: 'false', required: false, desc: 'componentProps.textarea.autoSize' },
  { name: 'clearable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.textarea.clearable' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.textarea.disabled' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: 'componentProps.textarea.readonly' },
  { name: 'showCount', type: 'boolean', default: 'false', required: false, desc: 'componentProps.textarea.showCount' },
  { name: 'error', type: 'boolean', default: 'false', required: false, desc: 'componentProps.textarea.error' },
  { name: 'onBlur', type: '(e: Event) => void', default: '—', required: false, desc: 'componentProps.textarea.onBlur' },
  { name: 'onFocus', type: '(e: Event) => void', default: '—', required: false, desc: 'componentProps.textarea.onFocus' },
  { name: 'onEnter', type: '(e: KeyboardEvent) => void', default: '—', required: false, desc: 'componentProps.textarea.onEnter' },
];

const codeBasic = `<Textarea placeholder="Enter text" />
<Textarea rows={5} placeholder="5 rows tall" />`;

const codeAutoSize = `<Textarea autoSize placeholder="Auto-expand as you type" />
<Textarea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="Min 2, max 6 rows" />`;

const codeStates = `<Textarea rows={3} placeholder="Enter text" />
<Textarea rows={5} placeholder="5 rows tall" />
<Textarea disabled value="Not editable" />
<Textarea readonly value="Focusable & copyable" />
<Textarea error value="Invalid format" />
<Textarea clearable defaultValue="Tap X to clear" />`;

const codeWithForm = `<Form>
  <FormItem name="remark" label="Note" contentFlex rules={[{
    validator: v => (v as string)?.length <= 200,
    message: 'Max 200 chars',
  }]}>
    <Textarea placeholder="Enter note" showCount maxlength={200} rows={4} />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="Submit" />
</Form>`;

export const TextareaDocPage: Component = () => {
  const t = useT();
  return (
    <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Textarea</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        {t('componentIntro.TextareaIntro')}
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.cssVars')}</h2>
      <PropsTable rows={[
        { name: '--sc-textarea-text-color', type: 'color', default: '--sc-color-text (#323233)', required: false, desc: 'cssVars.Textarea.__sc_textarea_text_color' },
        { name: '--sc-textarea-placeholder-color', type: 'color', default: '--sc-color-text-secondary', required: false, desc: 'cssVars.Textarea.__sc_textarea_placeholder_color' },
        { name: '--sc-textarea-border-color', type: 'color', default: '--sc-color-border (#dcdee0)', required: false, desc: 'cssVars.Textarea.__sc_textarea_border_color' },
        { name: '--sc-textarea-border-focus-color', type: 'color', default: '--sc-color-primary (#1677ff)', required: false, desc: 'cssVars.Textarea.__sc_textarea_border_focus_color' },
        { name: '--sc-textarea-disabled-opacity', type: 'number', default: '0.5', required: false, desc: 'cssVars.Textarea.__sc_textarea_disabled_opacity' },
        { name: '--sc-textarea-count-font-size', type: 'dimension', default: '0.75rem', required: false, desc: 'cssVars.Textarea.__sc_textarea_count_font_size' },
        { name: '--sc-textarea-count-color', type: 'color', default: '--sc-color-text-tertiary', required: false, desc: 'cssVars.Textarea.__sc_textarea_count_color' },
        { name: '--sc-textarea-error-color', type: 'color', default: '#e01823', required: false, desc: 'cssVars.Textarea.__sc_textarea_error_color' },
      ]} />

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('section.basicAndStates')}</h2>
      <DemoBlock title={t('demo.textareaStates')} code={codeStates}>
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>3 rows</div>
            <Textarea rows={3} placeholder="Enter text" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>5 rows</div>
            <Textarea rows={5} placeholder="5 rows tall" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>Disabled</div>
            <Textarea disabled value="Not editable" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>Readonly</div>
            <Textarea readonly value="Focusable & copyable" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>Error</div>
            <Textarea error value="Invalid format" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>Clearable</div>
            <Textarea clearable defaultValue="Tap X to clear" />
          </div>
        </div>
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('section.autoSize')}</h2>
      <DemoBlock title={t('demo.textareaAutoSize')} desc={t('demoDesc.textarea_autosize')} code={codeAutoSize}>
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>Auto size</div>
            <Textarea autoSize placeholder="Auto-expand as you type" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>2~6 rows</div>
            <Textarea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="Min 2 rows, max 6 rows" />
          </div>
        </div>
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.form')}</h2>
      <DemoBlock title={t('demo.textareaForm')} desc={t('demoDesc.textarea_form')} code={codeWithForm}>
        <Form>
          <FormItem name="remark" label="Note" contentFlex rules={[{
            validator: (v: any) => (v as string)?.length <= 200,
            message: 'Max 200 chars',
          }]}>
            <Textarea placeholder="Enter note" showCount maxlength={200} rows={4} />
          </FormItem>
          <div style={{ padding: '12px 1rem' }}>
            <Button type="primary" block nativeType="submit" text="Submit" />
          </div>
        </Form>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
