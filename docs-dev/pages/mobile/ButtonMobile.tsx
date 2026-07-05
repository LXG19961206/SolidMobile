import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface ButtonMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { useT } from '../../doc-i18n';
import { Button } from '../../../src/components/Button';
import { Icon } from '../../../src/components/Icon';

const propsData = [
  { name: 'text', type: 'string', desc: 'componentProps.button.text' },
  { name: 'type', type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'", desc: 'componentProps.button.type' },
  { name: 'variant', type: "'solid' | 'outline' | 'ghost'", desc: 'componentProps.button.variant' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", desc: 'componentProps.button.size' },
  { name: 'block', type: 'boolean', desc: 'componentProps.button.block' },
  { name: 'round', type: 'boolean', desc: 'componentProps.button.round' },
  { name: 'icon', type: 'IconName | JSX.Element', desc: 'componentProps.button.icon' },
  { name: 'iconPosition', type: "'left' | 'right'", desc: 'componentProps.button.iconPosition' },
  { name: 'disabled', type: 'boolean', desc: 'componentProps.button.disabled' },
  { name: 'loading', type: 'boolean', desc: 'componentProps.button.loading' },
  { name: 'loadingText', type: 'string', desc: 'componentProps.button.loadingText' },
  { name: 'color', type: 'string', desc: 'componentProps.button.color' },
  { name: 'textColor', type: 'string', desc: 'componentProps.button.textColor' },
  { name: 'href', type: 'string', desc: 'componentProps.button.href' },
  { name: 'target', type: 'string', desc: 'componentProps.button.target' },
  { name: 'nativeType', type: "'button' | 'submit' | 'reset'", desc: 'componentProps.button.nativeType' },
  { name: 'onClick', type: '(e: MouseEvent) => void', desc: 'componentProps.button.onClick' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px', 'align-items': 'center' as const },
};

export const ButtonMobile: Component<ButtonMobileProps> = (props) => {
  const t = useT();
  const [loading, setLoading] = createSignal(false);
  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <MobilePreview title={t('demo.buttonMobileTitle')} props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 语义色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.semanticType')}</div>
        <div style={CARD.desc}>{t('demo.buttonSemanticTypeMobileDesc')}</div>
        <div style={CARD.body}>
          <Button type="primary" text="Primary" />
          <Button type="secondary" text="Secondary" />
          <Button type="success" text="Success" />
          <Button type="warning" text="Warning" />
          <Button type="danger" text="Danger" />
          <Button type="info" text="Info" />
        </div>
      </div>

      {/* 尺寸 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.size')}</div>
        <div style={CARD.desc}>{t('demo.buttonSizeMobileDesc')}</div>
        <div style={CARD.body}>
          <Button type="primary" size="xs" text="XS" />
          <Button type="primary" size="sm" text="SM" />
          <Button type="primary" size="md" text="MD" />
          <Button type="primary" size="lg" text="LG" />
        </div>
      </div>

      {/* 填充方式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.variant')}</div>
        <div style={CARD.desc}>{t('demo.buttonVariantMobileDesc')}</div>
        <div style={CARD.body}>
          <Button type="primary" variant="solid" text="Solid" />
          <Button type="primary" variant="outline" text="Outline" />
          <Button type="primary" variant="ghost" text="Ghost" />
        </div>
      </div>

      {/* 胶囊 & 通栏 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.buttonRoundBlock')}</div>
        <div style={CARD.desc}>{t('demo.buttonRoundBlockMobileDesc')}</div>
        <div style={{ ...CARD.body, 'flex-direction': 'column' as const }}>
          <div style={{ display: 'flex' as const, gap: '8px' }}>
            <Button type="primary" round text={t('demo.buttonCapsule')} />
            <Button type="danger" variant="outline" round text="Danger" />
            <Button variant="ghost" round text="Ghost" />
          </div>
          <div style={{ width: '100%' }}>
            <Button type="primary" block round size="lg" text={t('demo.buttonBuyNow')} />
          </div>
          <div style={{ width: '100%', display: 'flex' as const, gap: '8px' }}>
            <Button variant="outline" block text={t('demo.buttonAddToCart')} />
            <Button variant="ghost" block text={t('demo.buttonFavorite')} />
          </div>
        </div>
      </div>

      {/* 图标按钮 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.iconText')}</div>
        <div style={CARD.desc}>{t('demo.buttonIconMobileDesc')}</div>
        <div style={CARD.body}>
          <Button icon="star" text={t('demo.buttonFavorite')} />
          <Button icon="arrow-right" text={t('demo.buttonNext')} iconPosition="right" type="primary" />
          <Button icon="edit" text={t('demo.buttonEdit')} variant="outline" />
          <Button icon="search" aria-label={t('demo.buttonSearch')} variant="ghost" />
          <Button icon="settings" aria-label={t('demo.buttonSettings')} variant="ghost" />
        </div>
      </div>

      {/* 状态 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.buttonLoadingDisabled')}</div>
        <div style={CARD.desc}>{t('demo.buttonLoadingDisabledMobileDesc')}</div>
        <div style={CARD.body}>
          <Button type="primary" text={loading() ? t('demo.buttonSubmitting') : t('demo.buttonClickSubmit')} loading={loading()} loadingText={t('demo.buttonSubmitting')} onClick={handleLoading} />
          <Button type="primary" text="Disabled" disabled />
          <Button variant="outline" text="Disabled" disabled />
          <Button type="danger" text="Disabled" disabled />
        </div>
      </div>

      {/* 自定义颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customColor')}</div>
        <div style={CARD.desc}>{t('demo.customColorDesc')}</div>
        <div style={CARD.body}>
          <Button color="#6366f1" text="Indigo" />
          <Button color="#ec4899" text="Pink" />
          <Button color="#f59e0b" text="Amber" />
          <Button color="#10b981" text="Emerald" />
        </div>
      </div>
    </MobilePreview>
  );
};
