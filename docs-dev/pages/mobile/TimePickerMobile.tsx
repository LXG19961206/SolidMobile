import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';
import { TimePicker } from '../../../src/components/TimePicker';
import { Form, FormItem } from '../../../src/components/Form';
import { Button } from '../../../src/components/Button';
import { Cell, CellGroup } from '../../../src/components/Cell';

export interface TimePickerMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const propsData = [
  { name: 'value', type: 'string', desc: 'componentProps.TimePicker.value' },
  { name: 'onChange', type: '(value: string) => void', desc: 'componentProps.TimePicker.onChange' },
  { name: 'onConfirm', type: '(value: string) => void', desc: 'componentProps.TimePicker.onConfirm' },
  { name: 'onCancel', type: '() => void', desc: 'componentProps.TimePicker.onCancel' },
  { name: 'show', type: 'boolean', desc: '受控：是否显示面板' },
  { name: 'onUpdateShow', type: '(show: boolean) => void', desc: 'componentProps.TimePicker.onUpdateShow' },
  { name: 'placeholder', type: 'string', desc: '未选值时占位文本，默认 "请选择时间"' },
  { name: 'title', type: 'string', desc: '面板标题' },
  { name: 'visibleItemCount', type: 'number', desc: '可见行数，默认 7' },
  { name: 'optionHeight', type: 'number', desc: 'componentProps.TimePicker.optionHeight' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const TimePickerMobile: Component<TimePickerMobileProps> = (props) => {
  const t = useT();
  /* ── Basic ── */
  const [basicVal, setBasicVal] = createSignal('');

  /* ── Controlled ── */
  const [ctrlVal, setCtrlVal] = createSignal('09:15:30');

  /* ── Form ── */
  const [formVal, setFormVal] = createSignal({});

  return (
    <MobilePreview title="TimePicker 时间选择" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础用法 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.basic')}</div>
        <div style={CARD.desc}>{t('demo.basicDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell
              title="选择时间"
              value={basicVal() || '请选择'}
              clickable
            />
          </CellGroup>
          <TimePicker onChange={(v) => setBasicVal(v)} onConfirm={(v) => setBasicVal(v)} />
        </div>
      </div>

      {/* 受控值 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.controlled')}</div>
        <div style={CARD.desc}>{t('demo.controlledDesc')}</div>
        <div style={CARD.body}>
          <CellGroup>
            <Cell title="预设值" value={ctrlVal()} clickable />
          </CellGroup>
          <TimePicker value={ctrlVal()} onChange={(v) => setCtrlVal(v)} onConfirm={(v) => setCtrlVal(v)} />
        </div>
      </div>

      {/* 配合 Form */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>配合 Form</div>
        <div style={CARD.desc}>放入 FormItem 自动双向绑定，onSubmit 直接拿到 HH:mm:ss 格式字符串。</div>
        <div style={CARD.body}>
          <Form onSubmit={(v) => setFormVal(v)} labelWidth="5em">
            <FormItem name="startTime" label="开始时间" required>
              <TimePicker placeholder="选择开始时间" />
            </FormItem>
            <FormItem name="endTime" label="结束时间">
              <TimePicker placeholder="选择结束时间" />
            </FormItem>
            <div style={{ padding: '8px 0', display: 'flex' as const, gap: '8px' }}>
              <Button type="primary" block nativeType="submit" size="sm" text="提交" />
            </div>
          </Form>
          <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>
            提交值: {JSON.stringify(formVal())}
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
