import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { useT, registerLocale } from '../../doc-i18n';
import { AllTokens } from '../../../src/design-tokens/DesignTokenShowcase';
import zhCN from '../guide/DesignTokens/zh-CN';
import enUS from '../guide/DesignTokens/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const DesignTokensMobile: Component<{ components?: ComponentEntry[]; onNavigate?: (key: string) => void }> = (props) => {
  const t = useT();
  return (
    <MobilePreview title={t('dtokens.title')} components={props.components} onNavigate={props.onNavigate}>
      <div style={{ padding: '12px' }}>
        <AllTokens />
      </div>
    </MobilePreview>
  );
};
