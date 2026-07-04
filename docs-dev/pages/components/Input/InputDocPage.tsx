import { createSignal, type Component } from 'solid-js';
import { Input } from '../../../../src/components/Input';
import { Icon } from '../../../../src/components/Icon';
import { Form, FormItem } from '../../../../src/components/Form';
import { Button } from '../../../../src/components/Button';
import { Cell, CellGroup } from '../../../../src/components/Cell';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';

const propsData: PropRow[] = [
  { name: 'type', type: "'text' | 'number' | 'password' | 'tel' | 'email' | 'url'", default: "'text'", required: false, desc: 'componentProps.input.type' },
  { name: 'value', type: 'string | number', default: '—', required: false, desc: 'componentProps.input.value' },
  { name: 'onChange', type: '(value: string) => void', default: '—', required: false, desc: 'componentProps.input.onChange' },
  { name: 'defaultValue', type: 'string', default: '—', required: false, desc: 'componentProps.input.defaultValue' },
  { name: 'placeholder', type: 'string', default: '—', required: false, desc: 'componentProps.input.placeholder' },
  { name: 'maxlength', type: 'number', default: '—', required: false, desc: 'componentProps.input.maxlength' },
  { name: 'clearable', type: 'boolean', default: 'false', required: false, desc: 'componentProps.input.clearable' },
  { name: 'disabled', type: 'boolean', default: 'false', required: false, desc: 'componentProps.input.disabled' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: 'componentProps.input.readonly' },
  { name: 'showCount', type: 'boolean', default: 'false', required: false, desc: 'componentProps.input.showCount' },
  { name: 'prefix', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.input.prefix' },
  { name: 'suffix', type: 'JSX.Element', default: '—', required: false, desc: 'componentProps.input.suffix' },
  { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", required: false, desc: 'componentProps.input.align' },
  { name: 'onBlur', type: '(value: string) => void', default: '—', required: false, desc: 'componentProps.input.onBlur' },
  { name: 'onFocus', type: '(value: string) => void', default: '—', required: false, desc: 'componentProps.input.onFocus' },
  { name: 'onEnter', type: '(value: string) => void', default: '—', required: false, desc: 'componentProps.input.onEnter' },
];

const codeBasic = `<CellGroup>
  <Cell title="文本" value={<Input placeholder="请输入" />} />
  <Cell title="密码" value={<Input type="password" placeholder="密码" showPasswordToggle />} />
  <Cell title="数字" value={<Input type="number" placeholder="数字" />} />
</CellGroup>`;

const codeClearable = `<CellGroup>
  <Cell title="清除" value={<Input clearable placeholder="输入点东西试试" />} />
  <Cell title="预设值" value={<Input clearable defaultValue="点 X 可清除" />} />
</CellGroup>`;

const codeCount = `<CellGroup>
  <Cell title="简介" value={<Input showCount maxlength={20} placeholder="最多 20 字" />} />
  <Cell title="签名" value={<Input showCount maxlength={50} placeholder="个性签名" />} />
</CellGroup>`;

const codeAffix = `<CellGroup>
  <Cell title="用户名" value={<Input placeholder="请输入" prefix={<span style="color:#999">@</span>} />} />
  <Cell title="邮箱" value={<Input placeholder="example" suffix={<span style="color:#999;font-size:0.85rem">@gmail.com</span>} />} />
</CellGroup>`;

const codeSearch = `
        <Input placeholder="搜索文章" clearable size="md" prefix={<Icon name="search" color="#999" />} style={{ 'border-radius': '16px', border: 'none', padding: '0 16px' }} />
`;

const codeWithForm = `<Form>
  <FormItem name="username" label="用户名" rules={[{
    validator: v => (v as string)?.length >= 2,
    message: '至少 2 个字符',
  }]}>
    <Input placeholder="请输入用户名" clearable />
  </FormItem>
  <Button type="primary" block nativeType="submit" text="提交" />
</Form>`;

const SmsDemo: Component = () => {
  const [countdown, setCountdown] = createSignal(0);
  let timer: ReturnType<typeof setInterval>;

  const send = () => {
    if (countdown() > 0) return;
    setCountdown(60);
    timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); return 0; }
        return c - 1;
      });
    }, 1000);
  };

  const btn = () => (
    <span onClick={send} style={{
      'font-size': '0.8rem', 'white-space': 'nowrap',
      color: countdown() > 0 ? '#999' : '#1677ff',
      cursor: countdown() > 0 ? 'default' : 'pointer',
    }}>
      {countdown() > 0 ? `${countdown()}s` : '发送验证码'}
    </span>
  );

  return (
    <CellGroup>
      <Cell title="手机号" value={<Input type="tel" placeholder="请输入手机号" maxlength={11} suffix={btn()} />} />
    </CellGroup>
  );
};

const codeSms = `<CellGroup>
  <Cell title="手机号" value={<Input type="tel" maxlength={11} suffix={btn()} />} />
</CellGroup>`;

export const InputDocPage: Component = () => {
  const t = useT();
  return (
  <DocLayout>
    <div style={{ padding: '16px', 'max-width': '960px' }}>
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '16px 0 8px' }}>Input 输入框</h1>
      <p style={{ color: '#6b7280', margin: '0 0 24px', 'line-height': 1.6 }}>
        {t('componentIntro.InputIntro')}
      </p>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('common.cssVars')}</h2>
      <PropsTable rows={[
        { name: '--sc-input-text-color', type: 'color', default: '--sc-color-text (#323233)', required: false, desc: 'cssVars.Input.__sc_input_text_color' },
        { name: '--sc-input-placeholder-color', type: 'color', default: '--sc-color-text-secondary', required: false, desc: 'cssVars.Input.__sc_input_placeholder_color' },
        { name: '--sc-input-disabled-opacity', type: 'number', default: '0.5', required: false, desc: 'cssVars.Input.__sc_input_disabled_opacity' },
        { name: '--sc-input-gap', type: 'dimension', default: '6px', required: false, desc: 'cssVars.Input.__sc_input_gap' },
        { name: '--sc-input-affix-color', type: 'color', default: '--sc-color-text-secondary', required: false, desc: 'cssVars.Input.__sc_input_affix_color' },
        { name: '--sc-input-affix-font-size', type: 'dimension', default: '0.9rem', required: false, desc: 'cssVars.Input.__sc_input_affix_font_size' },
        { name: '--sc-input-clear-color', type: 'color', default: '--sc-color-text-tertiary', required: false, desc: 'cssVars.Input.__sc_input_clear_color' },
        { name: '--sc-input-clear-hover-color', type: 'color', default: '--sc-color-text-secondary', required: false, desc: 'cssVars.Input.__sc_input_clear_hover_color' },
        { name: '--sc-input-count-font-size', type: 'dimension', default: '0.75rem', required: false, desc: 'cssVars.Input.__sc_input_count_font_size' },
        { name: '--sc-input-count-color', type: 'color', default: '--sc-color-text-tertiary', required: false, desc: 'cssVars.Input.__sc_input_count_color' },
        { name: '--sc-input-error-color', type: 'color', default: '#e01823', required: false, desc: 'cssVars.Input.__sc_input_error_color' },
      ]} />

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('section.basicTypes')}</h2>
      <DemoBlock title={t('demo.basic')} code={codeBasic}>
        <CellGroup>
          <Cell title="文本" value={<Input placeholder="请输入" />} />
          <Cell title="密码" value={<Input type="password" placeholder="密码" showPasswordToggle />} />
          <Cell title="数字" value={<Input type="number" placeholder="数字" />} />
        </CellGroup>
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.clearable')}</h2>
      <DemoBlock title={t('demo.clearable')} desc={t('demoDesc.input_clearable')} code={codeClearable}>
        <CellGroup>
          <Cell title="清除" value={<Input clearable placeholder="输入点东西试试" />} />
          <Cell title="预设值" value={<Input clearable defaultValue="点 X 可清除" />} />
        </CellGroup>
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('section.charCount')}</h2>
      <DemoBlock title={t('demo.inputShowCount')} code={codeCount}>
        <CellGroup>
          <Cell title="简介" value={<Input showCount maxlength={20} placeholder="最多 20 字" />} />
          <Cell title="签名" value={<Input showCount maxlength={50} placeholder="个性签名" />} />
        </CellGroup>
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.affix')}</h2>
      <DemoBlock title={t('demo.inputAffix')} code={codeAffix}>
        <CellGroup>
          <Cell title="用户名" value={<Input placeholder="请输入" prefix={<span style={{ color: '#999' }}>@</span>} />} />
          <Cell title="邮箱" value={<Input placeholder="example" suffix={<span style={{ color: '#999', 'font-size': '0.85rem' }}>@gmail.com</span>} />} />
        </CellGroup>
      </DemoBlock>
      <DemoBlock title={t('demo.searchInput')} desc={t('demoDesc.input_search')} code={codeSearch}>
        <Input placeholder="搜索文章" clearable size="md" prefix={<Icon name="search" color="#999" />} style={{ 'border-radius': '16px', border: 'none', padding: '0 16px' }} />
      </DemoBlock>


      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('section.states')}</h2>
      <DemoBlock title={t('demo.inputStates')} desc={t('demoDesc.input_states')} code={`<CellGroup>\n  <Cell title="禁用" value={<Input disabled value="不可编辑" />} />\n  <Cell title={t('demo.readonly')} value={<Input readonly value="可聚焦复制" />} />\n  <Cell title="错误" value={<Input error value="格式不正确" />} />\n</CellGroup>`}>
        <CellGroup>
          <Cell title="禁用" value={<Input disabled value="不可编辑" />} />
          <Cell title={t('demo.readonly')} value={<Input readonly value="可聚焦复制" />} />
          <Cell title="错误" value={<Input error value="格式不正确" />} />
        </CellGroup>
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('section.verifyCode')}</h2>
      <DemoBlock title={t('demo.inputCountdown')} desc={t('demoDesc.input_countdown')} code={codeSms}>
        <SmsDemo />
      </DemoBlock>

      <h2 style={{ 'font-size': '1.2rem', 'font-weight': 600, margin: '32px 0 12px' }}>{t('demo.form')}</h2>
      <DemoBlock title={t('demo.inputForm')} desc={t('demoDesc.input_form')} code={codeWithForm}>
        <Form>
          <FormItem name="username" label="用户名" rules={[{
            validator: (v: any) => (v as string)?.length >= 2,
            message: '至少 2 个字符',
          }]}>
            <Input placeholder="请输入用户名" clearable />
          </FormItem>
          <FormItem name="email" label="邮箱">
            <Input type="email" placeholder="请输入邮箱" clearable />
          </FormItem>
          <div style={{ padding: '12px 1rem' }}>
            <Button type="primary" block nativeType="submit" text="提交" />
          </div>
        </Form>
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
