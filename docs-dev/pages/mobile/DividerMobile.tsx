import { type Component } from 'solid-js';

import zhCN from '../../i18n/divider/zh-CN';
import enUS from '../../i18n/divider/en-US';
import { registerLocale } from '../../doc-i18n';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });
import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface DividerMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Divider } from '../../../src/components/Divider';

const propsData = [
  { name: 'direction', type: "'horizontal' | 'vertical'", desc: 'componentProps.divider.direction' },
  { name: 'text', type: 'string', desc: 'componentProps.divider.text' },
  { name: 'dashed', type: 'boolean', desc: 'componentProps.divider.dashed' },
  { name: 'color', type: 'string', desc: 'componentProps.divider.color' },
  { name: 'size', type: 'string | number', desc: 'componentProps.divider.size' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const DividerMobile: Component<DividerMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Divider" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础水平 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.horizontalBasic')}</div>
        <div style={CARD.desc}>{t('demo.horizontalBasicDesc')}</div>
        <div style={CARD.body}>
          <div style={{ padding: '12px 0' }}>Content above</div>
          <Divider />
          <div style={{ padding: '12px 0' }}>Content below</div>
        </div>
      </div>

      {/* 带文字 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.dividerText')}</div>
        <div style={CARD.desc}>{t('demo.dividerTextDesc')}</div>
        <div style={CARD.body}>
          <Divider text="I am a divider" />
          <div style={{ height: '16px' }} />
          <Divider text="Or like this" />
          <div style={{ height: '16px' }} />
          <Divider text="No more content" />
        </div>
      </div>

      {/* 虚线 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.dashedDivider')}</div>
        <div style={CARD.desc}>{t('demo.dashedDividerDesc')}</div>
        <div style={CARD.body}>
          <Divider dashed />
          <div style={{ height: '16px' }} />
          <Divider dashed text="Dashed text" />
        </div>
      </div>

      {/* 自定义颜色 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customColorAndSize')}</div>
        <div style={CARD.desc}>{t('demo.customColorAndSizeDesc')}</div>
        <div style={CARD.body}>
          <Divider color="var(--sc-color-primary, #1677ff)" size={2} />
          <div style={{ height: '16px' }} />
          <Divider color="#ef4444" text="Red warning" size={2} />
          <div style={{ height: '16px' }} />
          <Divider color="#22c55e" dashed text="Green dashed" />
        </div>
      </div>

      {/* 垂直分割 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.verticalDividerDemo')}</div>
        <div style={CARD.desc}>{t('demo.verticalDividerDemoDesc')}</div>
        <div style={{ ...CARD.body, display: 'flex' as const, 'align-items': 'center' as const, height: '40px', gap: '12px' }}>
          <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>Text One</span>
          <Divider direction="vertical" />
          <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>Text Two</span>
          <Divider direction="vertical" dashed color="var(--sc-color-primary, #1677ff)" />
          <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>Text Three</span>
          <Divider direction="vertical" color="#ef4444" size={2} />
          <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>Text Four</span>
        </div>
      </div>
    </MobilePreview>
  );
};
