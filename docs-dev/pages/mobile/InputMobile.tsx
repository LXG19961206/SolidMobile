import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface InputMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Input } from '../../../src/components/Input';

const propsData = [
  { name: 'value', type: 'string | number', desc: '当前值' },
  { name: 'onChange', type: '(value: string) => void', desc: '值变化回调' },
  { name: 'type', type: "'text' | 'number' | 'password' | 'tel' | 'email' | 'url'", desc: '输入类型，默认 text' },
  { name: 'placeholder', type: 'string', desc: '占位文本' },
  { name: 'maxlength', type: 'number', desc: '最大长度' },
  { name: 'disabled', type: 'boolean', desc: '禁用' },
  { name: 'readonly', type: 'boolean', desc: '只读' },
  { name: 'align', type: "'left' | 'center' | 'right'", desc: '文字对齐' },
  { name: 'clearable', type: 'boolean', desc: '可清除，右侧出现 X 按钮' },
  { name: 'showPasswordToggle', type: 'boolean', desc: '密码可见切换（type=password 时）' },
  { name: 'prefix', type: 'JSX.Element', desc: '左侧图标或文本' },
  { name: 'suffix', type: 'JSX.Element', desc: '右侧图标或文本' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", desc: '尺寸，默认 md' },
  { name: 'showCount', type: 'boolean', desc: '显示字数统计（需 maxlength）' },
  { name: 'error', type: 'boolean', desc: '错误状态' },
  { name: 'onEnter', type: '(e) => void', desc: '回车回调' },
  { name: 'onClear', type: '() => void', desc: '清除回调' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-direction': 'column' as const, gap: '16px' },
};

export const InputMobile: Component<InputMobileProps> = (props) => {
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
          <Input placeholder="禁用状态" disabled />
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
