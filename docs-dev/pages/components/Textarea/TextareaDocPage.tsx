import { type Component } from 'solid-js';
import { Textarea } from '../../../../src/components/Textarea';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow } from '../../../../src/doc-utils';

const propsData: PropRow[] = [
  { name: 'value', type: 'string', default: '—', required: false, desc: '当前值（受控）。' },
  { name: 'onChange', type: '(value: string) => void', default: '—', required: false, desc: '值变化回调。' },
  { name: 'defaultValue', type: 'string', default: '—', required: false, desc: '默认值（非受控）。' },
  { name: 'placeholder', type: 'string', default: '—', required: false, desc: '占位文本。' },
  { name: 'maxlength', type: 'number', default: '—', required: false, desc: '最大长度。' },
  { name: 'rows', type: 'number', default: '3', required: false, desc: '可视行数。' },
  { name: 'autoSize', type: 'boolean | { minRows, maxRows }', default: 'false', required: false, desc: '自动撑高，内容超出时扩展。' },
  { name: 'clearable', type: 'boolean', default: 'false', required: false, desc: '显示清除按钮。' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: '禁用。' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: '只读。' },
  { name: 'showCount', type: 'boolean', default: 'false', required: false, desc: '显示字数统计。' },
  { name: 'error', type: 'boolean', default: 'false', required: false, desc: '错误状态，出现红色波浪线。' },
  { name: 'onBlur', type: '(e: Event) => void', default: '—', required: false, desc: '失焦回调。' },
  { name: 'onFocus', type: '(e: Event) => void', default: '—', required: false, desc: '聚焦回调。' },
  { name: 'onEnter', type: '(e: KeyboardEvent) => void', default: '—', required: false, desc: '回车回调（Shift+Enter 换行）。' },
];

const codeBasic = `<Textarea placeholder="请输入" />
<Textarea rows={5} placeholder="5 行高度" />`;

const codeAutoSize = `<Textarea autoSize placeholder="输入文字自动撑高" />
<Textarea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="最少2行最多6行" />`;

const codeStates = `<Textarea rows={3} placeholder="请输入" />
<Textarea rows={5} placeholder="5 行高度" />
<Textarea disabled value="不可编辑" />
<Textarea readonly value="可聚焦复制" />
<Textarea error value="格式不正确" />
<Textarea clearable defaultValue="点 X 清除" />`;

const codeWithForm = `<Form>
  <FormItem name="remark" label="备注" contentFlex rules={[{
    validator: v => (v as string)?.length <= 200,
    message: '最多 200 字',
  }]}>
    <Textarea placeholder="请输入备注" showCount maxlength={200} rows={4} />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="提交" />
</Form>`;

export const TextareaDocPage: Component = () => (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Textarea 多行输入</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        多行文本输入组件。支持自动撑高、字数统计、清除按钮，可通过 FormItem 接入表单。
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>属性</h2>
      <PropsTable rows={propsData} />

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>CSS 变量</h2>
      <PropsTable rows={[
        { name: '--sc-textarea-text-color', type: 'color', default: '--sc-color-text (#323233)', required: false, desc: '文字颜色。' },
        { name: '--sc-textarea-placeholder-color', type: 'color', default: '--sc-color-text-secondary', required: false, desc: '占位符颜色。' },
        { name: '--sc-textarea-border-color', type: 'color', default: '--sc-color-border (#dcdee0)', required: false, desc: '边框颜色。' },
        { name: '--sc-textarea-border-focus-color', type: 'color', default: '--sc-color-primary (#1677ff)', required: false, desc: '聚焦时边框颜色。' },
        { name: '--sc-textarea-disabled-opacity', type: 'number', default: '0.5', required: false, desc: '禁用态透明度。' },
        { name: '--sc-textarea-count-font-size', type: 'dimension', default: '0.75rem', required: false, desc: '计数字号。' },
        { name: '--sc-textarea-count-color', type: 'color', default: '--sc-color-text-tertiary', required: false, desc: '计数颜色。' },
        { name: '--sc-textarea-error-color', type: 'color', default: '#e01823', required: false, desc: '错误态波浪线颜色。' },
      ]} />

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>基础 & 状态</h2>
      <DemoBlock title="rows / clearable / 各种状态" code={codeStates}>
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>3 行</div>
            <Textarea rows={3} placeholder="请输入" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>5 行</div>
            <Textarea rows={5} placeholder="5 行高度" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>禁用</div>
            <Textarea disabled value="不可编辑" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>只读</div>
            <Textarea readonly value="可聚焦复制" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>错误</div>
            <Textarea error value="格式不正确" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>可清除</div>
            <Textarea clearable defaultValue="点 X 清除" />
          </div>
        </div>
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>自动撑高</h2>
      <DemoBlock title="autoSize" desc="内容超出时自动扩展高度，可限制最小/最大行数。" code={codeAutoSize}>
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>自动撑高</div>
            <Textarea autoSize placeholder="输入文字自动撑高" />
          </div>
          <div>
            <div style={{ 'font-size': '0.85rem', 'font-weight': 500, 'margin-bottom': '4px', color: '#666' }}>2~6 行</div>
            <Textarea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="最少2行，最多6行" />
          </div>
        </div>
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>配合 Form</h2>
      <DemoBlock title="FormItem + Textarea" desc="contentFlex 让 Textarea 自动拉伸撑满剩余宽度。" code={codeWithForm}>
        <Form>
          <FormItem name="remark" label="备注" contentFlex rules={[{
            validator: (v: any) => (v as string)?.length <= 200,
            message: '最多 200 字',
          }]}>
            <Textarea placeholder="请输入备注" showCount maxlength={200} rows={4} />
          </FormItem>
          <div style={{ padding: '12px 1rem' }}>
            <Button type="primary" block nativeType="submit" text="提交" />
          </div>
        </Form>
      </DemoBlock>
    </div>
  </DocLayout>
);
