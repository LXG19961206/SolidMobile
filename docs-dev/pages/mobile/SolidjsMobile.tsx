import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { useLocale } from '../../../src/i18n';

export interface SolidjsMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const P = { padding: '0 16px 16px', 'font-size': '0.85rem', 'line-height': 1.8, color: 'var(--sc-color-text-secondary, #6b7280)' };
const H2 = { 'font-size': '0.95rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-color-text, #323233)' };
const LINK = { color: 'var(--sc-color-primary, #1677ff)', 'font-weight': 600 };

export const SolidjsMobile: Component<SolidjsMobileProps> = (props) => {
  const isEn = () => useLocale() === 'en-US';

  return (
  <MobilePreview title={isEn() ? 'About Solid.js' : '关于 Solid.js'} components={props.components} onNavigate={props.onNavigate}>
    <div style={{ padding: '12px 0' }}>

      <h2 style={H2}>{isEn() ? 'What Is It' : '它是什么'}</h2>
      <p style={P}>
        {isEn() ? (
          <><a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={LINK}>Solid.js</a> is a declarative, fine-grained reactive JavaScript UI framework. Its programming model is nearly identical to React — JSX, Hooks, Context, Suspense — every familiar concept is there.</>
        ) : (
          <><a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={LINK}>Solid.js</a> 是一个声明式、细粒度响应式的 JavaScript UI 框架。编程模型和 React 几乎一样——JSX、组件、Hooks、Context、Suspense……有甚至会写 React 还顺手。</>
        )}
      </p>

      <h2 style={H2}>{isEn() ? 'Performance' : '性能'}</h2>
      <p style={P}>
        {isEn() ? (
          "Solid has no virtual DOM. Component functions run once, then a fine-grained reactivity system updates the DOM directly. It consistently ranks in the top tier of every major benchmark."
        ) : (
          "Solid 没有虚拟 DOM。组件函数只执行一次，之后由编译器生成的细粒度响应式系统直接更新 DOM 节点。在所有主流前端框架的性能基准中，Solid 始终处于第一梯队。"
        )}
      </p>
      <p style={P}>
        {isEn() ? (
          <>The "no VDOM + fine-grained reactivity" design inspired Vue 3.6's <a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={LINK}>Vapor Mode</a>.</>
        ) : (
          <>这个「无虚拟 DOM + 细粒度响应式」的设计启发了 Vue 3.6 的 <a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" style={LINK}>Vapor Mode</a>。</>
        )}
      </p>

      <h2 style={H2}>{isEn() ? 'A Missed Opportunity' : '惋惜'}</h2>
      <p style={P}>
        {isEn() ? (
          "Solid arrived too late. Released in 2021, it entered a world where React's ecosystem was an immovable mountain, Vue was deeply entrenched, and Svelte had already captured the compiler-framework narrative."
        ) : (
          "但 Solid 诞生得太晚了。它 2021 年才正式发布，那时前端世界早已完成了一轮又一轮的框架洗牌。React 的生态像一座无人能撼动的大山，Vue 在国内社区根深蒂固，Svelte 和 Qwik 又分别在各自的方向上建立了护城河。"
        )}
      </p>
      <blockquote style="margin:0.75rem 16px;padding:0.75rem 1rem;border-left:3px solid var(--sc-color-primary, #1677ff);background:color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent);border-radius:0 6px 6px 0;color:var(--sc-color-text-secondary,#6b7280);font-size:0.85rem;line-height:1.7">
        <strong>{isEn() ? "Framework competition is no longer just about technology — it's about ecosystem and first-mover advantage." : "前端框架的竞争早已不只是技术的竞争，而是生态和先发优势的竞争。"}</strong>
      </blockquote>
      <p style={P}>
        {isEn() ? (
          "The lack of third-party component libraries, starter templates, and enterprise solutions makes most teams hesitate — this is the ecosystem gap we're trying to help fill."
        ) : (
          "这也是为什么尽管它足够优秀，社区生态却始终没有真正起来——第三方组件库、企业级解决方案的匮乏，让大多数团队在评估时犹豫。"
        )}
      </p>

      <h2 style={H2}>{isEn() ? 'Why We Chose It' : '我们为什么选它'}</h2>
      <p style={P}>
        {isEn() ? (
          "Fine-grained reactivity and single-execution components are the best foundation for a component system. No massive runtime diff, no stale closures — just simple JavaScript."
        ) : (
          "选择 Solid 不是追随潮流——它的细粒度响应式和编译策略恰好是构建组件系统的最佳土壤。一次执行的组件函数让状态管理回归最简单的 JavaScript 变量和函数。我们相信这套组件库本身就是帮它补齐生态短板的一步。"
        )}
      </p>

      <h2 style={H2}>{isEn() ? 'Further Reading' : '延伸阅读'}</h2>
      <div style={{ padding: '0 16px 16px', 'line-height': 2 }}>
        <div><a href="https://www.solidjs.com/" target="_blank" rel="noopener" style={LINK}>Solid.js {isEn() ? 'Website' : '官网'}</a></div>
        <div><a href="https://www.solidjs.com/docs/latest/api" target="_blank" rel="noopener" style={LINK}>Solid API {isEn() ? 'Reference' : '参考'}</a></div>
        <div><a href="https://krausest.github.io/js-framework-benchmark/" target="_blank" rel="noopener" style={LINK}>JS Framework Benchmark</a></div>
      </div>
    </div>
  </MobilePreview>
  );
};
