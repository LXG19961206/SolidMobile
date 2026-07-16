import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { useLocale } from '../../../src/i18n';

export interface SolidjsMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', margin: '0 0 12px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '14px 14px 2px', color: 'var(--sc-doc-card-title, #1f2937)' },
  body: { padding: '2px 14px 14px', 'font-size': '0.85rem', 'line-height': 1.8, color: 'var(--sc-color-text-secondary, #6b7280)' },
};

const LINK = { color: 'var(--sc-color-primary, #1677ff)', 'font-weight': 600 };
const BLOCKQUOTE = { margin: '0.75rem 0', padding: '0.75rem 1rem', 'border-left': '3px solid var(--sc-color-primary, #1677ff)', background: 'color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent)', 'border-radius': '0 6px 6px 0', color: 'var(--sc-color-text-secondary, #6b7280)', 'font-size': '0.85rem', 'line-height': 1.7 };

export const SolidjsMobile: Component<SolidjsMobileProps> = (props) => {
  const isEn = () => useLocale() === 'en-US';

  return (
  <MobilePreview title={isEn() ? 'About Solid.js' : '关于 Solid.js'} components={props.components} onNavigate={props.onNavigate}>
    <div style={{ padding: '12px 0' }}>

      {/* What Is It */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'What Is It' : '它是什么'}</div>
        <div style={CARD.body}>
          {isEn() ? (
            <>
              <a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={LINK}>Solid.js</a>
              {" "}is a declarative, fine-grained reactive JavaScript UI framework. Its programming model is nearly identical to React — JSX, components, Hooks, Context, Suspense… every familiar concept is there, and it feels even more "React" than React itself.
            </>
          ) : (
            <>
              <a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={LINK}>Solid.js</a>
              {" "}是一个声明式、细粒度响应式的 JavaScript UI 框架。它的编程模型和 React 几乎一模一样——JSX、组件、Hooks、Context、Suspense……你能想到的 React 里有的概念，它都有，而且写得比 React 还「React」。
            </>
          )}
        </div>
      </div>

      {/* Performance */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Performance' : '性能'}</div>
        <div style={CARD.body}>
          <p style={{ margin: '0 0 0.75rem' }}>
            {isEn() ? (
              "Solid has no virtual DOM. Component functions run exactly once; after that, a compiler-generated fine-grained reactivity system updates DOM nodes directly. This means extremely low runtime overhead — Solid consistently ranks in the top tier of every major frontend framework benchmark, and in some scenarios it's the fastest."
            ) : (
              "Solid 没有虚拟 DOM。组件函数只执行一次，之后由编译器生成的细粒度响应式系统直接更新 DOM 节点。这意味着它的运行时开销极低——在所有主流前端框架的性能基准测试中，Solid 始终处于第一梯队，在某些场景下甚至是最快的那个。"
            )}
          </p>
          <p style={{ margin: '0 0 0' }}>
            {isEn() ? (
              <>This "no virtual DOM + fine-grained reactivity" design has, in a sense, inspired Vue 3.6's{" "}
                <a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={LINK}>Vapor Mode</a>
                {" "}— a compilation strategy that eliminates the need for a virtual DOM. Solid was ahead of the entire industry on this front.</>
            ) : (
              <>这个「无虚拟 DOM + 细粒度响应式」的设计，在某种意义上启发了 Vue 3.6 的{" "}
                <a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={LINK}>Vapor Mode</a>
                {" "}——一种不需要虚拟 DOM 的编译策略。可以说，Solid 在这个方向上领先了整个行业。</>
            )}
          </p>
        </div>
      </div>

      {/* A Missed Opportunity */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'A Missed Opportunity' : '惋惜'}</div>
        <div style={CARD.body}>
          <p style={{ margin: '0 0 0.75rem' }}>
            {isEn() ? "But Solid arrived too late." : "但 Solid 诞生得太晚了。"}
          </p>
          <p style={{ margin: '0 0 0.75rem' }}>
            {isEn() ? (
              "It was officially released in 2021, by which time the frontend landscape had already been reshaped many times over. React's ecosystem is an immovable mountain. Vue is deeply entrenched in developer communities worldwide. Svelte captured the \"compile-time framework\" narrative, while Qwik carved out the \"resumability\" niche. Solid, despite being technically superior in many ways, found itself squeezed between giants."
            ) : (
              "它 2021 年才正式发布，那时前端世界早已完成了一轮又一轮的框架洗牌。React 的生态像一座无人能撼动的大山，Vue 在中小团队和国内社区根深蒂固，Svelte 抢走了「编译时框架」的叙事，而 Qwik 又在「可恢复性」方向上建立了护城河。"
            )}
          </p>
          <p style={{ margin: '0 0 0.75rem' }}>
            {isEn() ? (
              "From a technical standpoint, Solid delivers almost everything you could want from a \"React replacement\" — better performance, simpler state management, cleaner side-effect handling (no dependency arrays, no stale closures). But it ran into an iron law:"
            ) : (
              "从技术角度看，Solid 几乎做到了你能对「React 的完美替代品」期待的一切——更好的性能、更简单的状态管理、更干净的副作用处理（没有依赖数组，没有 stale closure）。但它撞上了一个铁律："
            )}
          </p>
          <blockquote style={BLOCKQUOTE}>
            <strong>{isEn() ? "Framework competition is no longer just about technology — it's about ecosystem and first-mover advantage." : "前端框架的竞争早已不只是技术的竞争，而是生态和先发优势的竞争。"}</strong>
          </blockquote>
          <p style={{ margin: '0.75rem 0 0' }}>
            {isEn() ? (
              "This is why, despite its excellence, Solid's ecosystem has never truly flourished. The lack of third-party component libraries, starter templates, and enterprise-grade solutions makes most teams hesitate — nobody wants to be the one who has to fill every gap alone."
            ) : (
              "这也是为什么尽管它足够优秀，社区生态却始终没有真正起来的原因——第三方组件库、脚手架模板、企业级解决方案的匮乏，让大多数团队在评估时会因为「万一遇到问题没人填坑」而犹豫。"
            )}
          </p>
        </div>
      </div>

      {/* Why We Chose It */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Why We Chose It' : '我们为什么选它'}</div>
        <div style={CARD.body}>
          <p style={{ margin: '0 0 0.75rem' }}>
            {isEn() ? (
              "We chose Solid to build this component library not because it's trendy — quite the opposite. Its reactivity model and compilation strategy happen to be the best foundation for building a component system. Fine-grained updates mean components don't need a massive runtime diff to locate changes. Single-execution component functions let state management return to simple JavaScript variables and functions, without yet another framework API to learn."
            ) : (
              "选择 Solid 来写这套组件库，不是因为追随什么潮流——恰恰相反，是因为它的响应式模型和编译策略恰好是构建组件系统的最佳土壤。细粒度的更新意味着组件不需要依赖庞大的运行时 diff 来定位变化；一次执行的组件函数让状态管理回归到最简单的 JavaScript 变量和函数，而不是一套需要额外学习的框架 API。"
            )}
          </p>
          <p style={{ margin: '0' }}>
            {isEn() ? (
              <>We believe this component library itself is a step toward filling Solid's ecosystem gap. If this article sparked even a little interest, check out the{" "}
                <a href="https://www.solidjs.com/tutorial" target="_blank" rel="noopener" style={LINK}>official tutorial</a>
                {" "}— ten minutes, and you'll discover a world that's cleaner and lighter than React.</>
            ) : (
              <>我们相信这套组件库本身，就是帮它补齐生态Short板的一步。If 你读完这篇文章，对 Solid 产生了哪怕一点点兴趣，都可以去它的{" "}
                <a href="https://www.solidjs.com/tutorial" target="_blank" rel="noopener" style={LINK}>官方教程</a>
                {" "}看看——十分钟，你会发现一个比 React 更干净、更轻量的世界。</>
            )}
          </p>
        </div>
      </div>

      {/* Further Reading */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Further Reading' : '延伸阅读'}</div>
        <div style={CARD.body}>
          <ul style={{ 'line-height': 2, 'padding-left': '1.2rem', margin: 0 }}>
            <li><a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={LINK}>Solid.js {isEn() ? 'Website' : '官网'}</a> — {isEn() ? 'Docs, tutorials, playground' : '文档、教程、Playground'}</li>
            <li><a href="https://www.solidjs.com/docs/latest/api" target="_blank" rel="noopener" style={LINK}>Solid API {isEn() ? 'Reference' : '参考'}</a> — {isEn() ? 'Compare with React API, 10 min to get started' : '和 React 的 API 对照着看，10 分钟上手'}</li>
            <li><a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={LINK}>Vue Vapor Mode</a> — {isEn() ? 'A no-VDOM compilation strategy inspired by Solid' : '受 Solid 启发的无虚拟 DOM 编译策略'}</li>
            <li><a href="https://krausest.github.io/js-framework-benchmark/" target="_blank" rel="noopener" style={LINK}>JS Framework Benchmark</a> — {isEn() ? 'Solid consistently tops the charts' : '主流框架性能基准，Solid 常年榜首'}</li>
          </ul>
        </div>
      </div>
    </div>
  </MobilePreview>
  );
};
