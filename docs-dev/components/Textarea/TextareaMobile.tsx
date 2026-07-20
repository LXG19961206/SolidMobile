import { createSignal } from 'solid-js'; import { useT, registerLocale } from '../../doc-i18n'; import { Textarea } from '../../../src/components/Textarea'; import { Form, FormItem } from '../../../src/components/Form'; import { Button } from '../../../src/components/Button'; import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet'; import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN'; import enUS from './en-US'; import { useTextareaTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
export const TextareaMobile = () => {
  const t = useT(); const { propsTables, cssVarsTables } = useTextareaTableData();
  return (<MobilePreview title="Textarea"><MobilePropsSheet propsTables={propsTables} cssVarsTables={cssVarsTables} />
    <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
      <C t={t('textarea.demo.basic')} d={t('textarea.demoDesc.basic')}><Textarea placeholder="Enter text" /><div style={{ 'margin-top': '8px' }}><Textarea rows={5} placeholder="5 rows tall" /></div></C>
      <C t={t('textarea.demo.autoSize')} d={t('textarea.demoDesc.autoSize')}><Textarea autoSize placeholder="Auto-expand as you type" /><div style={{ 'margin-top': '8px' }}><Textarea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="Min 2, max 6 rows" /></div></C>
      <C t={t('textarea.demo.states')} d={t('textarea.demoDesc.states')}><Textarea disabled value="Disabled" /><div style={{ 'margin-top': '8px' }}><Textarea readonly value="Readonly — focusable & copyable" /></div><div style={{ 'margin-top': '8px' }}><Textarea error value="Error state" /></div><div style={{ 'margin-top': '8px' }}><Textarea clearable defaultValue="Tap X to clear" /></div></C>
      <C t={t('textarea.demo.count')} d={t('textarea.demoDesc.count')}><Textarea showCount maxlength={200} rows={4} placeholder="Max 200 chars" /></C>
      <C t={t('textarea.demo.form')} d={t('textarea.demoDesc.form')}><Form controlAlign="right" onSubmit={(v) => console.log(v)}><FormItem name="remark" label="Note" rules={[{ validator: (v: unknown) => (v as string)?.length <= 200, message: 'Max 200 chars' }]}><Textarea placeholder="Enter note" showCount maxlength={200} rows={4} /></FormItem><div style={{ padding: '8px 0' }}><Button type="primary" block nativeType="submit" size="sm" text="Submit" /></div></Form></C>
    </div>
  </MobilePreview>);
};
const cs = { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden', 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', padding: '16px' };
const ts = { 'font-size': '0.9rem', 'font-weight': 600, 'margin-bottom': '4px' };
const ds = { 'font-size': '0.8rem', color: '#9ca3af', 'margin-bottom': '12px' };
function C(p: { t: string; d: string; children: any }) { return <div style={cs}><div style={ts}>{p.t}</div><div style={ds}>{p.d}</div>{p.children}</div>; }
