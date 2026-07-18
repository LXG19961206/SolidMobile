import { createSignal, onMount, For, Show, type Component } from 'solid-js';
import { useT, registerLocale } from '../../doc-i18n';
import { Card } from '../../../src/components/Card';
import { Lazyload } from '../../../src/components/Lazyload';
import { Loading } from '../../../src/components/Loading';
import { Center } from '../../../src/components/Center';
import { Avatar } from '../../../src/components/Avatar';
import { Button } from '../../../src/components/Button';
import { MobilePropsSheet } from '../../doc-utils/MobilePropsSheet';
import { MobilePreview } from '../../doc-utils/mobile/MobilePreview';
import zhCN from './zh-CN';
import enUS from './en-US';
import { useLazyloadTableData } from './tableData';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

/* ── Simulate delayed content ── */
const DeferredContent: Component<{ delay?: number; children: any }> = (props) => {
  const [ready, setReady] = createSignal(false);
  onMount(() => { const t = setTimeout(() => setReady(true), props.delay ?? 800); });
  return (
    <Show when={ready()} fallback={<Center><Loading size={20} /></Center>}>
      {props.children}
    </Show>
  );
};

/* ── Skeleton ── */
const SkeletonRow = () => (
  <div style={{ display: 'flex', 'align-items': 'center', gap: '12px', padding: '12px 0' }}>
    <div style={{ width: '40px', height: '40px', 'border-radius': '50%', background: 'var(--sc-color-background-secondary, #e5e7eb)' }} />
    <div style={{ flex: 1 }}>
      <div style={{ width: '60%', height: '14px', 'border-radius': '4px', background: 'var(--sc-color-background-secondary, #e5e7eb)', 'margin-bottom': '8px' }} />
      <div style={{ width: '40%', height: '12px', 'border-radius': '4px', background: 'var(--sc-color-background-secondary, #e5e7eb)' }} />
    </div>
  </div>
);

const SkeletonBlock = () => (
  <div style={{ height: '100px', 'border-radius': '8px', background: 'var(--sc-color-background-secondary, #e5e7eb)' }} />
);

/* ── Data ── */
const COLORS = ['#1677ff', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];
const TITLES = ['Design Draft', 'Architecture', 'API Spec', 'Test Report', 'Research', 'Analytics', 'Sprint Plan'];
const TIMES = ['2h ago', 'Yesterday', '3 days ago', '1 week ago', 'Just now', '5h ago', 'Yesterday'];

const DocItem: Component<{ idx: number }> = (props) => (
  <div style={{ display: 'flex', 'align-items': 'center', gap: '12px', padding: '12px 0', 'border-bottom': '1px solid var(--sc-color-border, #f3f4f6)' }}>
    <Avatar size="md" color={COLORS[props.idx % COLORS.length]} text={TITLES[props.idx % TITLES.length][0]} />
    <div>
      <div style={{ 'font-size': '0.85rem', color: 'var(--sc-color-text, #374151)' }}>{TITLES[props.idx % TITLES.length]}</div>
      <div style={{ 'font-size': '0.7rem', color: 'var(--sc-color-text-secondary, #9ca3af)' }}>{TIMES[props.idx % TIMES.length]}</div>
    </div>
  </div>
);

const GalleryCard: Component<{ idx: number }> = (props) => (
  <div style={{ height: '100px', 'border-radius': '8px', background: COLORS[props.idx % COLORS.length], display: 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
    <Avatar size="lg" color="rgba(255,255,255,0.3)" text={TITLES[props.idx % TITLES.length][0]} />
  </div>
);

/* ── Controlled Demo ── */
const ControlledDemo: Component = () => {
  const t = useT();
  const [loaded, setLoaded] = createSignal(false);
  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button size="sm" onClick={() => setLoaded(true)}>{loaded() ? t('lazyload.misc.activated') : t('lazyload.misc.clickToLoad')}</Button>
        <Button size="sm" variant="outline" onClick={() => setLoaded(false)}>{t('lazyload.misc.reset')}</Button>
      </div>
      <For each={[0, 1, 2]}>{(i) => (
        <Lazyload active={loaded()} height={60} placeholder={<SkeletonRow />}>
          <DeferredContent><DocItem idx={i} /></DeferredContent>
        </Lazyload>
      )}</For>
    </div>
  );
};

export const LazyloadMobile = () => {
  const t = useT();
  const { propsTables } = useLazyloadTableData();

  return (
    <MobilePreview title="Lazyload">
      <MobilePropsSheet propsTables={propsTables} />

      <style>{'.lazy-scroll::-webkit-scrollbar { width:4px; } .lazy-scroll::-webkit-scrollbar-thumb { background:var(--sc-color-border,#d1d5db); border-radius:2px; } .lazy-scroll::-webkit-scrollbar-track { background:transparent; } html.dark .lazy-scroll::-webkit-scrollbar-thumb { background:#475569; }'}</style>

      <div style={{ padding: '12px', display: 'flex', 'flex-direction': 'column', gap: '12px' }}>
        {/* List lazy load */}
        <Card title={t('lazyload.demo.list')}>
          <div class="lazy-scroll" style={{ height: '380px', overflow: 'auto', 'border-radius': '8px', border: '1px solid var(--sc-color-border, #e5e7eb)' }}>
            <Center style={{ height: '260px', color: 'var(--sc-color-text-secondary, #9ca3af)', 'text-align': 'center', 'flex-direction': 'column' }}>
              <div style={{ 'font-size': '0.9rem', 'margin-bottom': '4px' }}>{t('lazyload.misc.scrollDown')}</div>
              <div style={{ 'font-size': '0.75rem' }}>{t('lazyload.misc.scrollHint')}</div>
            </Center>
            <div style={{ padding: '0 12px' }}>
              <For each={Array.from({ length: 8 })}>{(_, i) => (
                <Lazyload height={60} rootMargin="0px" placeholder={<SkeletonRow />}>
                  <DeferredContent><DocItem idx={i()} /></DeferredContent>
                </Lazyload>
              )}</For>
            </div>
          </div>
        </Card>

        {/* Gallery */}
        <Card title={t('lazyload.demo.gallery')}>
          <div class="lazy-scroll" style={{ height: '360px', overflow: 'auto', 'border-radius': '8px', border: '1px solid var(--sc-color-border, #e5e7eb)' }}>
            <Center style={{ height: '240px', color: 'var(--sc-color-text-secondary, #9ca3af)', 'text-align': 'center', 'flex-direction': 'column' }}>
              <div style={{ 'font-size': '0.9rem', 'margin-bottom': '4px' }}>{t('lazyload.misc.scrollDown')}</div>
              <div style={{ 'font-size': '0.75rem' }}>{t('lazyload.misc.scrollHint')}</div>
            </Center>
            <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '8px', padding: '8px' }}>
              <For each={Array.from({ length: 10 })}>{(_, i) => (
                <Lazyload height={100} rootMargin="0px" placeholder={<SkeletonBlock />}>
                  <DeferredContent><GalleryCard idx={i()} /></DeferredContent>
                </Lazyload>
              )}</For>
            </div>
          </div>
        </Card>

        {/* Controlled */}
        <Card title={t('lazyload.demo.controlled')}>
          <div style={{ padding: '8px 0' }}>
            <ControlledDemo />
          </div>
        </Card>
      </div>
    </MobilePreview>
  );
};
