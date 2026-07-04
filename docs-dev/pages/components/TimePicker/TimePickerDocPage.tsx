import { createSignal, type Component } from 'solid-js';
import { TimePicker } from '../../../../src/components/TimePicker';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Cell, CellGroup } from '../../../../src/components/Cell';
import { useT } from '../../../doc-i18n';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow } from '../../../../src/doc-utils';

const propsData: PropRow[] = [
  { name: 'value', type: 'string', default: '—', required: false, desc: '当前选中时间，格式 HH:mm:ss' },
  { name: 'onChange', type: '(value: string) => void', default: '—', required: false, desc: '滚动停止后回调' },
  { name: 'onConfirm', type: '(value: string) => void', default: '—', required: false, desc: '确认回调' },
  { name: 'onCancel', type: '() => void', default: '—', required: false, desc: '取消回调' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: '受控：是否显示面板。不传则自带 Cell 触发器' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', default: '—', required: false, desc: '面板开关回调' },
  { name: 'placeholder', type: 'string', default: "'请选择时间'", required: false, desc: '未选值时显示的占位文本' },
  { name: 'title', type: 'string', default: "'请选择'", required: false, desc: '面板标题' },
  { name: 'visibleItemCount', type: 'number', default: '7', required: false, desc: '可见行数（奇数）' },
  { name: 'optionHeight', type: 'number', default: '50', required: false, desc: '每行高度(px)' },
  { name: 'cancelText', type: 'string', default: '跟随 locale', required: false, desc: '取消按钮文字' },
  { name: 'confirmText', type: 'string', default: '跟随 locale', required: false, desc: '确认按钮文字' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: 'Portal 挂载目标' },
];

/* ── Basic demo ── */

const BasicDemo: Component = () => {
  const [val, setVal] = createSignal('');
  return (
    <>
      <CellGroup>
        <Cell
          title="选择时间"
          value={val() || '请选择'}
          clickable
          onClick={() => {
            // TimePicker manages its own show state (auto mode)
          }}
        />
      </CellGroup>
      <TimePicker onChange={(v) => setVal(v)} onConfirm={(v) => setVal(v)} />
    </>
  );
};

const codeBasic = `<TimePicker onChange={(v) => setVal(v)} />`;

/* ── Controlled value demo ── */

const ControlledDemo: Component = () => {
  const [val, setVal] = createSignal('14:30:00');
  return (
    <>
      <CellGroup>
        <Cell
          title="预设值"
          value={val() || '请选择'}
          clickable
        />
      </CellGroup>
      <TimePicker value={val()} onChange={(v) => setVal(v)} onConfirm={(v) => setVal(v)} />
    </>
  );
};

const codeControlled = `<TimePicker value="14:30:00" />`;

/* ── Form demo ── */

const FormDemo: Component = () => {
  const [formVal, setFormVal] = createSignal({});
  return (
    <>
      <Form onSubmit={(v) => setFormVal(v)} labelWidth="4em">
        <FormItem name="startTime" label="开始时间" required>
          <TimePicker placeholder="选择开始时间" />
        </FormItem>
        <FormItem name="endTime" label="结束时间">
          <TimePicker placeholder="选择结束时间" />
        </FormItem>
        <div style={{ padding: '12px 1rem' }}>
          <Button type="primary" block nativeType="submit" text="提交" />
        </div>
      </Form>
      <div style={{ padding: '0 1rem', 'font-size': '0.8rem', color: '#6b7280' }}>
        提交值: {JSON.stringify(formVal())}
      </div>
    </>
  );
};

const codeForm = `<Form onSubmit={(v) => console.log(v)}>
  <FormItem name="startTime" label="开始时间">
    <TimePicker />
  </FormItem>
  <FormItem name="endTime" label="结束时间">
    <TimePicker />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="提交" />
</Form>`;

export const TimePickerDocPage: Component = () => {
  const t = useT();
  return (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>TimePicker 时间选择</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        HH:mm:ss 三列时间选择器，基于 Picker 封装。自动适配 Form。
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <DemoBlock title={t('demo.basic')} desc={t('demo.basicDesc')} code={codeBasic}>
        <BasicDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.controlled')} desc={t('demo.controlledDesc')} code={codeControlled}>
        <ControlledDemo />
      </DemoBlock>

      <DemoBlock title={t('demo.form')} desc={t('demo.formDesc')} code={codeForm}>
        <FormDemo />
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
