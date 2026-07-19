import { createSignal } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Overlay } from '../../../src/components/Overlay';
import { Button } from '../../../src/components/Button';
import { Loading } from '../../../src/components/Loading';
import { Switch } from '../../../src/components/Switch';
import { DialogComponent } from '../../../src/components/Dialog';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useOverlayTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

export const OverlayMobile = () => {
  const t = useT();
  const { propsTables } = useOverlayTableData();
  const [basicOpen, setBasicOpen] = createSignal(false);
  const [loadingOpen, setLoadingOpen] = createSignal(false);
  const [scrollOpen, setScrollOpen] = createSignal(false);
  const [lockScroll, setLockScroll] = createSignal(true);

  return (
    <MobilePreview title="Overlay">
      <MobilePropsSheet propsTables={propsTables} />

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* Basic — plain overlay, no children */}
        <Card title={t('overlay.demo.basic')}>
          <Button size="sm" onClick={() => setBasicOpen(true)}>Show Overlay</Button>
          <Overlay open={basicOpen()} onClose={() => setBasicOpen(false)} />
        </Card>

        {/* Content + Loading */}
        <Card title={t('overlay.demo.content')}>
          <Button size="sm" onClick={() => {
            setLoadingOpen(true);
            setTimeout(() => setLoadingOpen(false), 2000);
          }}>Simulate Submit</Button>
          <Overlay open={loadingOpen()}>
            <div style={{ background: 'var(--sc-color-cell-bg, #fff)', padding: '32px 40px', 'border-radius': '12px', 'text-align': 'center' }}>
              <Loading type="circular" size={36} color="var(--sc-color-primary, #1677ff)" />
              <div style={{ 'font-size': '0.9rem', 'font-weight': 600, 'margin-top': '12px' }}>Submitting...</div>
              <div style={{ 'font-size': '0.75rem', color: 'var(--sc-color-text-secondary, #9ca3af)', 'margin-top': '4px' }}>Please wait</div>
            </div>
          </Overlay>
        </Card>

      </div>

      {/* Scroll Through — outside Card, toggle lockScroll with Switch */}
      <div style={{ padding: '12px 12px 6px', 'font-size': '0.85rem', 'font-weight': 600, color: 'var(--sc-color-text, #374151)' }}>
        {t('overlay.demo.scroll')}
      </div>
      <div style={{ padding: '0 12px', 'font-size': '0.85rem', 'line-height': 1.8, color: 'var(--sc-color-text-secondary, #6b7280)' }}>
        <div style={{ display: 'flex', 'align-items': 'center', gap: '10px', 'margin-bottom': '16px', padding: '10px 14px', background: 'var(--sc-color-background-secondary, #f5f5f5)', 'border-radius': '8px', 'font-size': '0.85rem' }}>
          <Switch checked={lockScroll()} onChange={setLockScroll} size={22} />
          <span style={{ color: 'var(--sc-color-text, #374151)' }}>lockScroll: <strong>{lockScroll() ? 'true (locked)' : 'false (passthrough)'}</strong></span>
        </div>
        <p style={{ 'margin-bottom': '12px' }}>Open the overlay below, then toggle <strong>lockScroll</strong> to compare the difference.</p>
        <p style={{ 'margin-bottom': '12px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p style={{ 'margin-bottom': '12px' }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <div style={{ 'text-align': 'center', 'margin': '16px 0' }}>
          <Button size="sm" variant="outline" onClick={() => setScrollOpen(true)}>Open Overlay</Button>
        </div>
        <p style={{ 'margin-bottom': '12px' }}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        <p style={{ 'margin-bottom': '12px' }}>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
      </div>

      <Overlay open={scrollOpen()} onClose={() => setScrollOpen(false)} lockScroll={lockScroll()}>
        <DialogComponent
          show
          overlay={false}
          title="Scrollable Overlay"
          message={`lockScroll: ${lockScroll() ? 'true — locked' : 'false — passthrough'}`}
          showCancelButton
          cancelText="Close"
          onCancel={() => setScrollOpen(false)}
          onClose={() => setScrollOpen(false)}
        />
      </Overlay>
    </MobilePreview>
  );
};
