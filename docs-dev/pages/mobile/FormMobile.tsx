import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface FormMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Form, FormItem } from '../../../src/components/Form';
import { Input } from '../../../src/components/Input';
import { Textarea } from '../../../src/components/Textarea';
import { Button } from '../../../src/components/Button';
import { Switch } from '../../../src/components/Switch';
import { Radio, RadioGroup } from '../../../src/components/Radio';
import { Checkbox, CheckboxGroup } from '../../../src/components/Checkbox';
import { Rate } from '../../../src/components/Rate';
import { Stepper } from '../../../src/components/Stepper';
import { Slider } from '../../../src/components/Slider';
import { Select } from '../../../src/components/Select';
import { DatePicker } from '../../../src/components/DatePicker';
import { Upload } from '../../../src/components/Upload';
import { TimePicker } from '../../../src/components/TimePicker';
import { Toast, ToastRenderer } from '../../../src/components/Toast';

const propsData = [
  { name: 'Form.value', type: 'FormValue', desc: '受控表单值' },
  { name: 'Form.onChange', type: '(value) => void', desc: '值变化回调' },
  { name: 'Form.defaultValue', type: 'FormValue', desc: '默认值（非受控）' },
  { name: 'Form.onSubmit', type: '(value) => void', desc: '提交回调' },
  { name: 'Form.validateOnChange', type: 'boolean', desc: '字段变化时校验' },
  { name: 'Form.validateOnBlur', type: 'boolean', desc: '字段失焦时校验' },
  { name: 'Form.disabled', type: 'boolean', desc: '全局禁用' },
  { name: 'Form.labelAlign', type: "'top' | 'left' | 'right'", desc: '标签对齐' },
  { name: 'Form.labelWidth', type: 'string', desc: '标签宽度，如 6em' },
  { name: 'Form.ref', type: '(api) => void', desc: '暴露 setFormValue / resetFormValue / submit / validateAll' },
  { name: 'FormItem.name', type: 'string', desc: '字段名（必填）' },
  { name: 'FormItem.label', type: 'string', desc: '标签文本' },
  { name: 'FormItem.required', type: 'boolean', desc: '必填标记' },
  { name: 'FormItem.rules', type: 'FormRule[]', desc: '校验规则' },
  { name: 'FormItem.help', type: 'string', desc: '帮助文本' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const cityOpts = [{ text: '北京', value: 'beijing' }, { text: '上海', value: 'shanghai' }, { text: '广州', value: 'guangzhou' }];

function mockUploadApi(file: File, onProgress?: (pct: number) => void): Promise<string> {
  return new Promise((resolve) => {
    let pct = 0;
    const timer = setInterval(() => {
      pct += Math.random() * 30;
      if (pct >= 100) { pct = 100; clearInterval(timer); resolve(URL.createObjectURL(file)); }
      onProgress?.(Math.min(pct, 100));
    }, 200);
  });
}

export const FormMobile: Component<FormMobileProps> = (props) => {
  const [basicVal, setBasicVal] = createSignal({});
  const [fullVal, setFullVal] = createSignal({});
  let fullFormRef: any;

  return (
    <MobilePreview title="Form 表单" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      <ToastRenderer />

      {/* 基础用法 & 校验 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础表单 & 校验</div>
        <div style={CARD.desc}>用户名校验（至少 2 字符）+ 手机号输入，点击提交触发校验</div>
        <div style={CARD.body}>
          <Form
            validateOnBlur
            onSubmit={(v) => { setBasicVal(v); Toast.success('提交: ' + JSON.stringify(v)); }}
          >
            <FormItem name="username" label="用户名" required rules={[{
              validator: (v: any) => (v as string)?.length >= 2,
              message: '至少 2 个字符',
            }]}>
              <Input placeholder="请输入用户名" clearable />
            </FormItem>
            <FormItem name="phone" label="手机号">
              <Input type="tel" placeholder="请输入手机号" maxlength={11} />
            </FormItem>
            <div style={{ padding: '8px 0', display: 'flex' as const, gap: '8px' }}>
              <Button type="primary" block nativeType="submit" size="sm" text="提交" />
              <Button variant="outline" block nativeType="reset" size="sm" text="重置" />
            </div>
          </Form>
          <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>
            提交值: {JSON.stringify(basicVal())}
          </div>
        </div>
      </div>

      {/* 配合 Switch */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>配合其他控件</div>
        <div style={CARD.desc}>FormItem 可包裹任意有 value/onChange 的组件，如 Switch、Input 等</div>
        <div style={CARD.body}>
          <Form>
            <FormItem name="agree" label="同意协议">
              <Switch />
            </FormItem>
            <FormItem name="note" label="备注">
              <Input placeholder="选填" clearable />
            </FormItem>
          </Form>
        </div>
      </div>

      {/* 标签居左，控件居右 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>标签居左 · 控件居右</div>
        <div style={CARD.desc}>labelAlign="left" + labelWidth 固定标签宽度，控件自然靠右对齐</div>
        <div style={CARD.body}>
          <Form labelAlign="left" labelWidth="5em" colon>
            <FormItem name="name" label="姓名">
              <Input placeholder="请输入" align="right" />
            </FormItem>
            <FormItem name="phone" label="手机号">
              <Input type="tel" placeholder="请输入" align="right" />
            </FormItem>
            <FormItem name="gender" label="性别">
              <RadioGroup direction="horizontal">
                <Radio value="male" label="男" />
                <Radio value="female" label="女" />
              </RadioGroup>
            </FormItem>
            <FormItem name="notify" label="通知">
              <Switch />
            </FormItem>
          </Form>
        </div>
      </div>

      {/* 综合实例 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>综合实例</div>
        <div style={CARD.desc}>Input / Textarea / Radio / Checkbox / Rate / Stepper / Slider / Select / DatePicker / Upload / TimePicker 全覆盖</div>
        <div style={CARD.body}>
          <Form
            ref={(r: any) => { fullFormRef = r; }}
            onSubmit={(v) => { setFullVal(v); Toast.success('提交: ' + JSON.stringify(v)); }}
            labelWidth="5em"
            colon
            scrollToError
          >
            <FormItem name="username" label="用户名" required rules={[{
              validator: (v: any) => (v as string)?.length >= 2,
              message: '至少 2 个字符',
            }]}>
              <Input placeholder="请输入用户名" clearable />
            </FormItem>
            <FormItem name="intro" label="简介" contentFlex>
              <Textarea placeholder="说点什么..." />
            </FormItem>
            <FormItem name="gender" label="性别" required rules={[{
              validator: (v: any) => !!v,
              message: '请选择性别',
            }]}>
              <RadioGroup direction="horizontal">
                <Radio value="male" label="男" />
                <Radio value="female" label="女" />
              </RadioGroup>
            </FormItem>
            <FormItem name="hobbies" label="爱好" contentFlex>
              <CheckboxGroup direction="horizontal">
                <Checkbox value="coding" label="写代码" />
                <Checkbox value="reading" label="阅读" />
                <Checkbox value="gaming" label="游戏" />
              </CheckboxGroup>
            </FormItem>
            <FormItem name="score" label="评分">
              <Rate />
            </FormItem>
            <FormItem name="count" label="数量">
              <Stepper />
            </FormItem>
            <FormItem name="agree" label="同意协议">
              <Switch />
            </FormItem>
            <FormItem name="range" label="范围" contentFlex>
              <div style={{ padding: '8px 4px', flex: '1', 'min-width': '0' }}>
                <Slider />
              </div>
            </FormItem>
            <FormItem name="city" label="所在城市" contentFlex>
              <Select options={cityOpts} placeholder="请选择城市" />
            </FormItem>
            <FormItem name="birthday" label="生日" contentFlex>
              <DatePicker placeholder="选择出生日期" />
            </FormItem>
            <FormItem name="photos" label="照片" contentFlex>
              <Upload api={mockUploadApi} maxCount={6} />
            </FormItem>
            <FormItem name="time" label="时间" contentFlex>
              <TimePicker placeholder="选择时间" />
            </FormItem>
            <div style={{ padding: '8px 0', display: 'flex' as const, gap: '8px' }}>
              <Button type="primary" block nativeType="submit" size="sm" text="提交" />
              <Button size="sm" text="重置" onClick={() => fullFormRef?.resetFormValue?.()} />
            </div>
          </Form>
          <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '8px' }}>
            提交值: {JSON.stringify(fullVal())}
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};

