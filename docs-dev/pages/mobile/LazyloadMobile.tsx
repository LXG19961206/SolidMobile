import { createSignal, onMount, For, Show, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useT } from '../../doc-i18n';

export interface LazyloadMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Lazyload } from '../../../src/components/Lazyload';
import { Loading } from '../../../src/components/Loading';
import { Center } from '../../../src/components/Center';
import { Avatar } from '../../../src/components/Avatar';
import { Button } from '../../../src/components/Button';

const propsData = [
  { name: 'placeholder', type: 'JSX.Element', desc: 'componentProps.lazyload.placeholder' },
  { name: 'children', type: 'JSX.Element', desc: 'componentProps.lazyload.children' },
  { name: 'active', type: 'boolean', desc: 'componentProps.lazyload.active' },
  { name: 'rootMargin', type: 'string', desc: 'componentProps.lazyload.rootMargin' },
  { name: 'height', type: 'number | string', desc: 'componentProps.lazyload.height' },
  { name: 'threshold', type: 'number | number[]', desc: 'componentProps.lazyload.threshold' },
  { name: 'once', type: 'boolean', desc: 'componentProps.lazyload.once' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

/* ── Deferred content — 模拟网络延迟 ── */

const DeferredContent: Component<{ delay?: number; children: any }> = (props) => {
  const [ready, setReady] = createSignal(false);
  onMount(() => {
    const t = setTimeout(() => setReady(true), props.delay ?? 800);
  });
  return (
    <Show when={ready()} fallback={<Center><Loading size={20} /></Center>}>
      {props.children}
    </Show>
  );
};

/* ── Skeleton ── */

const Skeleton = () => (
  <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px', padding: '12px 0' }}>
    <div style={{ width: '40px', height: '40px', 'border-radius': '50%', background: 'var(--sc-doc-card-placeholder, #e5e7eb)' }} />
    <div style={{ flex: 1 }}>
      <div style={{ width: '60%', height: '14px', 'border-radius': '4px', background: 'var(--sc-doc-card-placeholder, #e5e7eb)', 'margin-bottom': '8px' }} />
      <div style={{ width: '40%', height: '12px', 'border-radius': '4px', background: 'var(--sc-doc-card-placeholder, #e5e7eb)' }} />
    </div>
  </div>
);

const GallerySkeleton = () => (
  <div style={{ height: '100px', 'border-radius': '8px', background: 'var(--sc-doc-card-placeholder, #e5e7eb)' }} />
);

/* ── Data ── */

const COLORS = ['#1677ff', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];
const TITLES = ['产品设计稿', '前端架构', '数据库 ER 图', 'API 接口规范', '测试用例报告', '部署运维手册', '用户调研分析', '竞品对比', '迭代排期', '季度回顾'];
const TIMES = ['2 小时前', '昨天', '3 天前', '1 周前', '上周', '2 周前', '1 月前', '刚刚', '5 小时前', '昨天'];

const DocItem: Component<{ idx: number }> = (props) => (
  <div style={{ display: 'flex' as const, 'align-items': 'center' as const, gap: '12px', padding: '12px 0', 'border-bottom': '1px solid #f3f4f6' }}>
    <Avatar size="md" color={COLORS[props.idx % COLORS.length]} text={TITLES[props.idx % TITLES.length][0]} />
    <div>
      <div style={{ 'font-size': '0.85rem', color: 'var(--sc-doc-card-text, #374151)' }}>{TITLES[props.idx % TITLES.length]}</div>
      <div style={{ 'font-size': '0.7rem', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{TIMES[props.idx % TIMES.length]}</div>
    </div>
  </div>
);

const GalleryItem: Component<{ idx: number }> = (props) => (
  <div style={{
    height: '100px', 'border-radius': '8px', background: COLORS[props.idx % COLORS.length],
    display: 'flex' as const, 'align-items': 'center' as const, 'justify-content': 'center' as const,
  }}>
    <Avatar size="lg" color="rgba(255,255,255,0.3)" text={TITLES[props.idx % TITLES.length][0]} />
  </div>
);

export const LazyloadMobile: Component<LazyloadMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="Lazyload 懒加载" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 列表懒加载 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>列表懒加载</div>
        <div style={CARD.desc}>
          顶部固定占位区将列表推出首屏，向下滚动后卡片逐个进入视口触发加载。
        </div>
        <div style={CARD.body}>
          <div style={{ height: '380px', overflow: 'auto' as const, '-webkit-overflow-scrolling': 'touch', border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px' }}>
            {/* 撑高区域 */}
            <Center flexX flexY style={{ height: '280px', color: 'var(--sc-doc-card-muted, #9ca3af)', 'text-align': 'center', 'flex-direction': 'column' as const }}>
              <div style={{ 'font-size': '1rem', 'margin-bottom': '6px' }}>⬇ 向下滚动</div>
              <div style={{ 'font-size': '0.75rem' }}>下方列表进入视口后加载</div>
            </Center>
            {/* 懒加载列表 */}
            <div style={{ padding: '0 12px' }}>
              <For each={Array.from({ length: 10 })}>
                {(_, i) => (
                  <Lazyload height={60} rootMargin="0px" placeholder={<Skeleton />}>
                    <DeferredContent>
                      <DocItem idx={i()} />
                    </DeferredContent>
                  </Lazyload>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>

      {/* 图片画廊懒加载 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>图片画廊</div>
        <div style={CARD.desc}>双列网格 + 懒加载。滚动触发彩色卡片逐个出现。</div>
        <div style={CARD.body}>
          <div style={{ height: '360px', overflow: 'auto' as const, '-webkit-overflow-scrolling': 'touch', border: '1px solid var(--sc-doc-card-divider, #f3f4f6)', 'border-radius': '8px' }}>
            <Center flexX flexY style={{ height: '240px', color: 'var(--sc-doc-card-muted, #9ca3af)', 'text-align': 'center', 'flex-direction': 'column' as const }}>
              <div style={{ 'font-size': '1rem', 'margin-bottom': '6px' }}>⬇ 向下滚动</div>
              <div style={{ 'font-size': '0.75rem' }}>图片卡片进入视口后加载</div>
            </Center>
            <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '8px', padding: '8px' }}>
              <For each={Array.from({ length: 12 })}>
                {(_, i) => (
                  <Lazyload height={100} rootMargin="0px" placeholder={<GallerySkeleton />}>
                    <DeferredContent>
                      <GalleryItem idx={i()} />
                    </DeferredContent>
                  </Lazyload>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>

      {/* 受控模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>受控模式 active</div>
        <div style={CARD.desc}>不依赖滚动，通过按钮手动控制加载。</div>
        <div style={CARD.body}>
          <ControlledDemo />
        </div>
      </div>
    </MobilePreview>
  );
};

/* ── Controlled Demo ── */

const ControlledDemo: Component = () => {
  const [loaded, setLoaded] = createSignal(false);
  return (
    <div style={{ display: 'flex' as const, 'flex-direction': 'column' as const, gap: '8px' }}>
      <div style={{ display: 'flex' as const, gap: '8px', 'margin-bottom': '4px' }}>
        <Button size="sm" text={loaded() ? '已激活' : '点击加载'} onClick={() => setLoaded(true)} />
        <Button size="sm" variant="outline" text="重置" onClick={() => setLoaded(false)} />
      </div>
      <Lazyload active={loaded()} height={60} placeholder={<Skeleton />}>
        <DeferredContent>
          <DocItem idx={0} />
        </DeferredContent>
      </Lazyload>
      <Lazyload active={loaded()} height={60} placeholder={<Skeleton />}>
        <DeferredContent>
          <DocItem idx={1} />
        </DeferredContent>
      </Lazyload>
      <Lazyload active={loaded()} height={60} placeholder={<Skeleton />}>
        <DeferredContent>
          <DocItem idx={2} />
        </DeferredContent>
      </Lazyload>
    </div>
  );
};
