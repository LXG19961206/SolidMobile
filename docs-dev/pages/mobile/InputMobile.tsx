import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface InputMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Input } from '../../../src/components/Input';

const propsData = [
  { name: 'value', type: 'string | number', desc: 'componentProps.input.value' },
  { name: 'onChange', type: '(value: string) => void', desc: 'componentProps.input.onChange' },
  { name: 'type', type: "'text' | 'number' | 'password' | 'tel' | 'email' | 'url'", desc: 'componentProps.input.type' },
  { name: 'placeholder', type: 'string', desc: 'componentProps.input.placeholder' },
  { name: 'maxlength', type: 'number', desc: 'componentProps.input.maxlength' },
  { name: 'disabled', type: 'boolean', desc: 'componentProps.input.disabled' },
  { name: 'readonly', type: 'boolean', desc: 'componentProps.input.readonly' },
  { name: 'align', type: "'left' | 'center' | 'right'", desc: 'componentProps.input.align' },
  { name: 'clearable', type: 'boolean', desc: 'componentProps.input.clearable' },
  { name: 'showPasswordToggle', type: 'boolean', desc: 'componentProps.input.showPasswordToggle' },
  { name: 'prefix', type: 'JSX.Element', desc: 'componentProps.input.prefix' },
  { name: 'suffix', type: 'JSX.Element', desc: 'componentProps.input.suffix' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", desc: 'componentProps.input.size' },
  { name: 'showCount', type: 'boolean', desc: 'componentProps.input.showCount' },
  { name: 'error', type: 'boolean', desc: 'componentProps.input.error' },
  { name: 'onEnter', type: '(e) => void', desc: 'componentProps.input.onEnter' },
  { name: 'onClear', type: '() => void', desc: 'componentProps.input.onClear' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-direction': 'column' as const, gap: '16px' },
};

export const InputMobile: Component<InputMobileProps> = (props) => {
  const t = useT();
  const [text1, setText1] = createSignal('');
  const [text2, setText2] = createSignal('');

  return (
    <MobilePreview title="Input 输入框" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>基础输入 & 类型</div>
        <div style={CARD.desc}>type 控制输入类型</div>
        <div style={CARD.body}>
          <Input placeholder="请输入文字 (text)" />
            <Input type="number" placeholder="请输入数字 (number)" />
            <Input type="password" placeholder="请输入密码 (password)" />
            <Input type="tel" placeholder="请输入手机号 (tel)" />
            <Input type="email" placeholder="请输入邮箱 (email)" />
        </div>
      </div>

      {/* 清除 & 密码切换 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>清除 & 密码切换</div>
        <div style={CARD.desc}>clearable 显示清除按钮 / showPasswordToggle 切换密码可见</div>
        <div style={CARD.body}>
          <Input placeholder="可清除的输入框" clearable onChange={setText1} value={text1()} />
            <Input type="password" placeholder="密码（可切换可见）" showPasswordToggle />
        </div>
      </div>

      {/* 前后缀 & 对齐 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>前后缀 & 对齐</div>
        <div style={CARD.desc}>prefix / suffix 装饰 / align 对齐方式</div>
        <div style={CARD.body}>
          <Input placeholder="搜索内容" prefix={<span style={{ color: 'var(--sc-doc-card-muted, #9ca3af)' }}>🔍</span>} />
            <Input placeholder="右对齐" align="right" />
            <Input placeholder="居中" align="center" />
        </div>
      </div>

      {/* 字数统计 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>字数统计</div>
        <div style={CARD.desc}>showCount + maxlength 限制输入长度</div>
        <div style={CARD.body}>
          <Input placeholder="最多 10 个字" maxlength={10} showCount onChange={setText2} value={text2()} />
        </div>
      </div>

      {/* 状态 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>禁用 & 只读 & 错误</div>
        <div style={CARD.desc}>disabled / readonly / error 三种状态</div>
        <div style={CARD.body}>
          <Input placeholder="{t('demo.disabled')}" disabled />
            <Input placeholder="只读状态" readonly value="只读内容" />
            <Input placeholder="错误状态" error />
        </div>
      </div>

      {/* 尺寸 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>尺寸 size</div>
        <div style={CARD.desc}>sm=32px / md=40px / lg=48px</div>
        <div style={CARD.body}>
          <Input placeholder="小尺寸 SM" size="sm" />
            <Input placeholder="中尺寸 MD" size="md" />
            <Input placeholder="大尺寸 LG" size="lg" />
        </div>
      </div>
    </MobilePreview>
  );
};
