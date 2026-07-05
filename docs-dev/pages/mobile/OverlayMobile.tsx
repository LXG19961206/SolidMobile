import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface OverlayMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Overlay } from '../../../src/components/Overlay';
import { Button } from '../../../src/components/Button';
import { Loading } from '../../../src/components/Loading';
import { useT } from '../../doc-i18n';

const propsData = [
  { name: 'open', type: 'boolean', desc: 'componentProps.overlay.open' },
  { name: 'onClose', type: '() => void', desc: 'componentProps.overlay.onClose' },
  { name: 'zIndex', type: 'number', desc: 'componentProps.overlay.zIndex' },
  { name: 'lockScroll', type: 'boolean', desc: 'componentProps.overlay.lockScroll' },
  { name: 'duration', type: 'number', desc: 'componentProps.overlay.duration' },
  { name: 'mount', type: 'Node', desc: 'componentProps.overlay.mount' },
  { name: 'children', type: 'JSX.Element', desc: 'componentProps.overlay.children' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px', display: 'flex' as const, 'flex-wrap': 'wrap' as const, gap: '8px' },
};

export const OverlayMobile: Component<OverlayMobileProps> = (props) => {
  const t = useT();
  const [show1, setShow1] = createSignal(false);
  const [show2, setShow2] = createSignal(false);

  return (
    <MobilePreview title="Overlay 遮罩层" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 基础遮罩 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.overlayBasic')}</div>
        <div style={CARD.desc}>{t('demo.overlayBasicDesc')}</div>
        <div style={CARD.body}>
          <Button size="sm" text={t('demo.showOverlay')} onClick={() => setShow1(true)} />
          <Overlay open={show1()} onClose={() => setShow1(false)} />
        </div>
      </div>

      {/* 遮罩 + Loading */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.overlayWithContent')}</div>
        <div style={CARD.desc}>{t('demo.overlayWithContentDesc')}</div>
        <div style={CARD.body}>
          <Button size="sm" text={t('demo.simulateSubmit')} onClick={() => {
            setShow2(true);
            setTimeout(() => setShow2(false), 2000);
          }} />
          <Overlay open={show2()} zIndex={1500}>
            <div style={{
              background: 'var(--sc-doc-card-bg, #fff)', padding: '32px 40px', 'border-radius': '12px',
              display: 'flex' as const, 'flex-direction': 'column' as const,
              'align-items': 'center' as const, gap: '16px',
              'box-shadow': '0 8px 32px rgba(0,0,0,0.12)',
            }}>
              <Loading type="circular" size={36} color="var(--sc-color-primary, #1677ff)" />
              <div style={{ 'text-align': 'center' }}>
                <div style={{ 'font-size': '0.9rem', 'font-weight': 600, color: 'var(--sc-doc-card-title, #1f2937)' }}>{t('demo.submitting')}</div>
                <div style={{ 'font-size': '0.75rem', color: 'var(--sc-doc-card-muted, #9ca3af)', 'margin-top': '4px' }}>{t('demo.pleaseWait')}</div>
              </div>
            </div>
          </Overlay>
        </div>
      </div>

    </MobilePreview>
  );
};
