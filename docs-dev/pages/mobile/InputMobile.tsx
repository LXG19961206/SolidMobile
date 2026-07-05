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
    <MobilePreview title={t('nav.input')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.inputBasicMobile')}</div>
        <div style={CARD.desc}>{t('demo.inputBasicMobileDesc')}</div>
        <div style={CARD.body}>
          <Input placeholder={t('demo.inputPlaceholderText')} />
            <Input type="number" placeholder={t('demo.inputPlaceholderNumber')} />
            <Input type="password" placeholder={t('demo.inputPlaceholderPassword')} />
            <Input type="tel" placeholder={t('demo.inputPlaceholderTel')} />
            <Input type="email" placeholder={t('demo.inputPlaceholderEmail')} />
        </div>
      </div>

      {/* 清除 & 密码切换 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.inputClearableMobile')}</div>
        <div style={CARD.desc}>{t('demo.inputClearableMobileDesc')}</div>
        <div style={CARD.body}>
          <Input placeholder={t('demo.inputClearablePlaceholder')} clearable onChange={setText1} value={text1()} />
            <Input type="password" placeholder={t('demo.inputPasswordTogglePlaceholder')} showPasswordToggle />
        </div>
      </div>

      {/* 前后缀 & 对齐 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.inputAffixMobile')}</div>
        <div style={CARD.desc}>{t('demo.inputAffixMobileDesc')}</div>
        <div style={CARD.body}>
          <Input placeholder={t('demo.inputSearchPlaceholder')} prefix={<span style={{ color: 'var(--sc-doc-card-muted, #9ca3af)' }}>🔍</span>} />
            <Input placeholder={t('demo.inputAlignRight')} align="right" />
            <Input placeholder={t('demo.inputAlignCenter')} align="center" />
        </div>
      </div>

      {/* 字数统计 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.inputShowCountMobile')}</div>
        <div style={CARD.desc}>{t('demo.inputShowCountMobileDesc')}</div>
        <div style={CARD.body}>
          <Input placeholder={t('demo.inputMaxlengthPlaceholder')} maxlength={10} showCount onChange={setText2} value={text2()} />
        </div>
      </div>

      {/* 状态 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.inputStatesMobile')}</div>
        <div style={CARD.desc}>{t('demo.inputStatesMobileDesc')}</div>
        <div style={CARD.body}>
          <Input placeholder={t('demo.disabled')} disabled />
            <Input placeholder={t('demo.inputReadonlyPlaceholder')} readonly value={t('demo.inputReadonlyValue')} />
            <Input placeholder={t('demo.inputErrorPlaceholder')} error />
        </div>
      </div>

      {/* 尺寸 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.inputSizeMobile')}</div>
        <div style={CARD.desc}>{t('demo.inputSizeMobileDesc')}</div>
        <div style={CARD.body}>
          <Input placeholder={t('demo.inputSizeSmall')} size="sm" />
            <Input placeholder={t('demo.inputSizeMedium')} size="md" />
            <Input placeholder={t('demo.inputSizeLarge')} size="lg" />
        </div>
      </div>
    </MobilePreview>
  );
};
