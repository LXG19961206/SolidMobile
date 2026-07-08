import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface CenterMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { useT } from '../../doc-i18n';
import { Center } from '../../../src/components/Center';

const propsData = [
  { name: 'flexX', type: 'boolean', desc: 'componentProps.center.flexX' },
  { name: 'flexY', type: 'boolean', desc: 'componentProps.center.flexY' },
  { name: 'text', type: 'boolean', desc: 'componentProps.center.text' },
  { name: 'vertical', type: 'boolean', desc: 'componentProps.center.vertical' },
  { name: 'position', type: 'boolean', desc: 'componentProps.center.position' },
  { name: 'inline', type: 'boolean', desc: 'componentProps.center.inline' },
  { name: 'as', type: 'string', desc: 'componentProps.center.as' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

const stage = (h?: string) => ({
  background: 'var(--sc-doc-card-demo, #f8fafc)',
  border: '1px dashed #cbd5e1',
  'border-radius': '8px',
  width: '100%',
  ...(h ? { height: h } : {}),
  position: 'relative' as const,
});

const chip = {
  background: 'var(--sc-color-primary, #1677ff)', color: '#fff', padding: '6px 16px',
  'border-radius': '16px', 'font-size': '0.8rem', 'font-weight': 600,
  'white-space': 'nowrap' as const,
};

export const CenterMobile: Component<CenterMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Center 居中" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Default: no props = full center */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.centerDefaultMobile')}</div>
        <div style={CARD.desc}>{t('demo.centerDefaultMobileDesc')}</div>
        <div style={CARD.body}>
          <div style={stage('80px')}>
            <Center>
              <span style={chip}>Full center</span>
            </Center>
          </div>
        </div>
      </div>

      {/* flexX — horizontal only */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.centerFlexXMobile')}</div>
        <div style={CARD.desc}>{t('demo.centerFlexXMobileDesc')}</div>
        <div style={CARD.body}>
          <div style={{ ...stage(), padding: '12px', display: 'flex' as const, gap: '8px' }}>
            <span style={{ padding: '4px 10px', background: 'var(--sc-color-background-secondary, #e2e8f0)', 'border-radius': '12px', 'font-size': '0.75rem', color: '#64748b' }}>Tag A</span>
            <span style={{ padding: '4px 10px', background: 'var(--sc-color-background-secondary, #e2e8f0)', 'border-radius': '12px', 'font-size': '0.75rem', color: '#64748b' }}>Tag B</span>
          </div>
          <div style={{ height: '8px' }} />
          <div style={stage()}>
            <Center flexX>
              <span style={chip}>Horizontal only</span>
            </Center>
          </div>
        </div>
      </div>

      {/* flexY — vertical only */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.centerFlexYMobile')}</div>
        <div style={CARD.desc}>{t('demo.centerFlexYMobileDesc')}</div>
        <div style={CARD.body}>
          <div style={stage('80px')}>
            <Center flexY>
              <span style={chip}>Vertical center</span>
            </Center>
          </div>
        </div>
      </div>

      {/* flexX + flexY — full center */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.centerBothMobile')}</div>
        <div style={CARD.desc}>{t('demo.centerBothMobileDesc')}</div>
        <div style={CARD.body}>
          <div style={stage('120px')}>
            <Center flexX flexY>
              <div style={{ 'text-align': 'center' }}>
                <div style={{ 'font-size': '1.6rem', 'margin-bottom': '4px' }}>📦</div>
                <div style={{ 'font-size': '0.85rem', 'font-weight': 600, color: 'var(--sc-doc-card-text, #374151)' }}>No data</div>
                <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Please add content</div>
              </div>
            </Center>
          </div>
        </div>
      </div>

      {/* text — text-align center */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.centerTextMobile')}</div>
        <div style={CARD.desc}>{t('demo.centerTextMobileDesc')}</div>
        <div style={CARD.body}>
          <div style={{ ...stage(), padding: '16px' }}>
            <Center text>
              <div>
                <div style={{ 'font-size': '0.9rem', 'font-weight': 600, color: 'var(--sc-doc-card-text, #374151)' }}>Centered Title</div>
                <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '4px' }}>{t('demo.centeredTitleDesc')}</div>
              </div>
            </Center>
          </div>
        </div>
      </div>

      {/* vertical — inline vertical-align */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.centerVerticalMobile')}</div>
        <div style={CARD.desc}>{t('demo.centerVerticalMobileDesc')}</div>
        <div style={CARD.body}>
          <div style={{ ...stage(), padding: '16px', 'font-size': '0.85rem', 'line-height': '32px' }}>
            <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>Left text</span>
            <Center vertical inline style={{ width: '48px', 'text-align': 'center' }}>
              <span style={{ 'font-size': '1.2rem' }}>⭐</span>
            </Center>
            <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>Middle</span>
            <Center vertical inline style={{ width: '48px', 'text-align': 'center' }}>
              <span style={{ 'font-size': '1.2rem' }}>❤️</span>
            </Center>
            <span style={{ color: 'var(--sc-doc-card-text, #374151)' }}>Right text</span>
          </div>
        </div>
      </div>

      {/* position — absolute centering */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.centerPositionMobile')}</div>
        <div style={CARD.desc}>{t('demo.centerPositionMobileDesc')}</div>
        <div style={CARD.body}>
          <div style={stage('100px')}>
            <Center position>
              <span style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '6px 16px', 'border-radius': '20px', 'font-size': '0.75rem', 'white-space': 'nowrap' }}>
                🔒 Overlay center
              </span>
            </Center>
            <div style={{ position: 'absolute' as const, bottom: '6px', right: '10px', 'font-size': '0.6rem', color: '#94a3b8' }}>Parent relative</div>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
