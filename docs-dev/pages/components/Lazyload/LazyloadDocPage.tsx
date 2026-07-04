import { createSignal, onMount, For, Show, type Component } from 'solid-js';
import { Lazyload } from '../../../../src/components/Lazyload';
import { Avatar } from '../../../../src/components/Avatar';
import { Button } from '../../../../src/components/Button';
import { Loading } from '../../../../src/components/Loading';
import { Center } from '../../../../src/components/Center';
import { DemoBlock, PropsTable, DocLayout } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import css from './LazyloadDocPage.module.css';
import { useT } from '../../../doc-i18n';

const propsData: PropRow[] = [
  { name: 'active', type: 'boolean', default: '—', required: false, desc: '受控模式：外部控制是否激活。' },
  { name: 'placeholder', type: 'JSX.Element', default: '—', required: false, desc: '未激活时显示的占位内容。' },
  { name: 'children', type: 'JSX.Element', default: '—', required: false, desc: '激活后渲染的实际内容。' },
  { name: 'rootMargin', type: 'string', default: "'50px'", required: false, desc: '提前触发的距离。' },
  { name: 'height', type: 'number | string', default: '—', required: false, desc: '最小高度，占位期间撑住布局，避免加载后抖动。' },
  { name: 'threshold', type: 'number | number[]', default: '0', required: false, desc: '可见比例阈值。' },
  { name: 'once', type: 'boolean', default: 'true', required: false, desc: '是否只触发一次。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'basic', title: '列表懒加载' },
  { id: 'controlled', title: '受控模式' },
  { id: 'scroll', title: '滚动画廊' },
];

/* ── Data ── */

const COLORS = ['#1677ff', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];
const ICONS = ['person', 'star', 'map-pin', 'mail', 'calendar', 'chat', 'book', 'settings', 'clock', 'tag'];
const TITLES = ['产品设计稿', '前端架构文档', '数据库 ER 图', 'API 接口规范', '测试用例报告', '部署运维手册', '用户调研分析', '竞品对比矩阵', '迭代计划排期', 'OKR 季度回顾'];
const SUBTITLES = ['更新于 2 小时前', '更新于 昨天', '更新于 3 天前', '更新于 1 周前', '更新于 上周', '更新于 2 周前', '更新于 1 个月前', '更新于 刚刚', '更新于 5 小时前', '更新于 昨天'];

/* ── DeferredContent — 模拟网络延迟，展现懒加载的完整生命周期 ── */

const DeferredContent = (props: { delay?: number; children: any }) => {
  const [ready, setReady] = createSignal(false);
  let timer: ReturnType<typeof setTimeout>;

  onMount(() => {
    timer = setTimeout(() => setReady(true), props.delay ?? 1000);
  });

  return (
    <Show when={ready()} fallback={<Center><Loading /></Center>}>
      {props.children}
    </Show>
  );
};

/* ── Skeleton Placeholders ── */

const SkeletonCard = () => (
  <div class={css.skeleton}>
    <div class={css.skeletonAvatar} />
    <div class={css.skeletonLines}>
      <div class={css.skeletonLine} style={{ width: '60%' }} />
      <div class={css.skeletonLine} style={{ width: '40%' }} />
    </div>
  </div>
);

const SkeletonGallery = () => (
  <div class={css.galleryItem}>
    <div class={css.skeletonImage} />
    <div class={css.skeletonTitle} />
  </div>
);

/* ── Real Content ── */

const DocCard = (props: { idx: number }) => (
  <div class={css.card}>
    <Avatar size="md" color={COLORS[props.idx % COLORS.length]} text={ICONS[props.idx % ICONS.length][0]} />
    <div class={css.cardBody}>
      <div class={css.cardTitle}>{TITLES[props.idx % TITLES.length]}</div>
      <div class={css.cardSub}>{SUBTITLES[props.idx % SUBTITLES.length]}</div>
    </div>
  </div>
);

const GalleryCard = (props: { idx: number }) => (
  <div class={css.galleryItem} style={{ background: COLORS[props.idx % COLORS.length] }}>
    <Avatar size="lg" color="rgba(255,255,255,0.3)" text={ICONS[props.idx % ICONS.length]} />
    <div style={{ 'margin-top': '8px', color: '#fff', 'font-size': '0.85rem', 'font-weight': 500, 'text-align': 'center' }}>
      {TITLES[props.idx % TITLES.length].slice(0, 4)}
    </div>
  </div>
);

/* ── Controlled Demo ── */

const ControlledDemo: Component = () => {
  const [loaded, setLoaded] = createSignal(false);
  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '0.75rem', 'align-items': 'flex-start' }}>
      <div style={{ display: 'flex', gap: '0.5rem', 'align-items': 'center' }}>
        <Button type="primary" size="sm" text={loaded() ? '已激活' : '点击加载'} onClick={() => setLoaded(!loaded())} />
        <Button variant="outline" size="sm" text="重置" onClick={() => setLoaded(false)} />
      </div>
      <Lazyload active={loaded()} height={64} placeholder={<SkeletonCard />}>
        <DeferredContent>
          <DocCard idx={0} />
        </DeferredContent>
      </Lazyload>
      <Lazyload active={loaded()} height={64} placeholder={<SkeletonCard />}>
        <DeferredContent>
          <DocCard idx={1} />
        </DeferredContent>
      </Lazyload>
      <Lazyload active={loaded()} height={64} placeholder={<SkeletonCard />}>
        <DeferredContent>
          <DocCard idx={2} />
        </DeferredContent>
      </Lazyload>
    </div>
  );
};

/* ── Code Snippets ── */

const codeBasic = `<Lazyload rootMargin="100px" placeholder={<Skeleton />}>
  <DeferredContent>
    <DocCard />
  </DeferredContent>
</Lazyload>`;

const codeControlled = `<Button onClick={() => setLoaded(true)}>加载</Button>
<Lazyload active={loaded()} placeholder={<Skeleton />}>
  <DeferredContent><DocCard /></DeferredContent>
</Lazyload>`;

const codeScroll = `<div style={{ height: '400px', overflow: 'auto' }}>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
    <For each={Array.from({length:20})}>
      {(_, i) => (
        <Lazyload rootMargin="100px" placeholder={<Skeleton />}>
          <DeferredContent><GalleryCard idx={i()} /></DeferredContent>
        </Lazyload>
      )}
    </For>
  </div>
</div>`;

/* ── Main ── */

export const LazyloadDocPage: Component = () => {
  const t = useT();
  return (
    <DocLayout>
      <div class={css.page}>
        <h1 class={css.h1}>Lazyload 懒加载</h1>
        <p class={css.intro}>
          元素进入视口后才渲染内容。demo 中预留 1s 加载延迟，
          模拟真实网络请求，清晰展示骨架屏 → Loading → 内容的完整生命周期。
        </p>

        <h2 id="props" class={css.h2}>{t('common.props')}</h2>
        <PropsTable rows={propsData} />

        {/* ── 基础用法 ── */}
        <h2 id="basic" class={css.h2}>{t('section.listLazy')}</h2>
        <DemoBlock
          title={t('demo.listLazy')}
          desc="上部 320px 是说明区，下面的文档卡片被推出视口。向下滚动后卡片逐个进入视口触发懒加载。"
          code={codeBasic}
        >
          <div style={{ height: '400px', overflow: 'auto', 'border-radius': '8px', border: '1px solid #f3f4f6' }}>
            {/* 固定撑高区域 — 把懒加载列表推出首屏 */}
            <div style={{
              height: '320px', display: 'flex', 'flex-direction': 'column',
              'align-items': 'center', 'justify-content': 'center',
              color: '#999', 'text-align': 'center', padding: '0 24px',
            }}>
              <div style={{ 'font-size': '0.9rem', 'margin-bottom': '8px' }}>⬇ 向下滚动查看更多</div>
              <div style={{ 'font-size': '0.75rem' }}>下方内容进入视口后自动加载</div>
            </div>
            {/* 懒加载列表 */}
            <For each={Array.from({ length: 12 })}>
              {(_, i) => (
                <Lazyload height={64} rootMargin="0px" placeholder={<SkeletonCard />}>
                  <DeferredContent>
                    <DocCard idx={i()} />
                  </DeferredContent>
                </Lazyload>
              )}
            </For>
          </div>
        </DemoBlock>

        {/* ── 受控模式 ── */}
        <h2 id="controlled" class={css.h2}>{t('demo.controlled')}</h2>
        <DemoBlock
          title={t('demo.activeControl')}
          desc="点击按钮触发 active，同样经历 Loading → 显示内容的延迟过程。"
          code={codeControlled}
        >
          <ControlledDemo />
        </DemoBlock>

        {/* ── 滚动画廊 ── */}
        <h2 id="scroll" class={css.h2}>{t('section.scrollGallery')}</h2>
        <DemoBlock
          title={t('demo.imageGallery')}
          desc="上部 280px 标题区推出网格，向下滚动后彩色卡片逐个触发。"
          code={codeScroll}
        >
          <div style={{ height: '400px', overflow: 'auto', 'border-radius': '8px' }}>
            {/* 固定撑高区域 */}
            <div style={{
              height: '280px', display: 'flex', 'flex-direction': 'column',
              'align-items': 'center', 'justify-content': 'center',
              color: '#999', 'text-align': 'center', padding: '0 24px',
            }}>
              <div style={{ 'font-size': '0.9rem', 'margin-bottom': '8px' }}>⬇ 向下滚动查看更多</div>
              <div style={{ 'font-size': '0.75rem' }}>图片卡片将在进入视口后加载</div>
            </div>
            {/* 懒加载网格 */}
            <div style={{ display: 'grid', 'grid-template-columns': '1fr 1fr', gap: '8px', padding: '4px' }}>
              <For each={Array.from({ length: 20 })}>
                {(_, idx) => (
                  <Lazyload height={120} rootMargin="0px" placeholder={<SkeletonGallery />}>
                    <DeferredContent>
                      <GalleryCard idx={idx()} />
                    </DeferredContent>
                  </Lazyload>
                )}
              </For>
            </div>
          </div>
        </DemoBlock>
      </div>
    </DocLayout>
  );
};
