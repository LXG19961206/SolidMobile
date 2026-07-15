import { type Component } from 'solid-js';
import { useLocale } from '../../../src/i18n';

const AboutPage: Component = () => {
  const isEn = () => useLocale() === 'en-US';
  const completed = ['Button', 'Icon', 'Center', 'Divider', 'Layout', 'SafeArea',
    'Avatar', 'Badge', 'Tag', 'Image', 'Empty', 'Lazyload', 'List', 'SwipeCell', 'Swiper', 'PullRefresh',
    'Tabs', 'TabBar', 'NavBar', 'Cell',
    'Picker', 'Calendar', 'Cascader', 'DatePicker', 'TimePicker', 'CityPicker',
    'Toast', 'Notify', 'Dialog', 'Overlay', 'ActionSheet', 'Loading',
    'Form', 'Input', 'Textarea', 'Radio', 'Checkbox', 'Switch', 'Rate', 'Stepper', 'Slider', 'Select', 'Upload'];
  const upcoming = ['Grid', 'Table', 'SKU', 'RichText', 'LiveRoom'];

  return (
    <div class="guide-card">
      <h1 style={{ 'font-size': '1.6rem', 'font-weight': 700, margin: '0 0 1rem' }}>
        {isEn() ? 'About the Project' : '关于项目'}
      </h1>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Origins' : '缘起'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          "This project began in 2023, when Solid.js was still in its early days and its ecosystem was sparse — a situation that, candidly, hasn't changed as much as one would hope. Solid the framework is exceptional: it delivers the DX of React with none of the historical baggage, and its performance was — and remains — best-in-class."
        ) : (
          "本项目始于 2023 年。那时的 Solid.js 尚在早期，生态几近空白——坦诚地讲，时至今日也远谈不上繁荣。Solid 框架本身极为出色：它提供了 React 般的开发体验，却无需背负其历史包袱；性能方面，当时已是第一梯队，至今依然。"
        )}
      </p>
      <p style={{ color: '#6b7280', 'line-height': 1.8, 'margin-top': '0.75rem' }}>
        {isEn() ? (
          <>The author makes no claim to being a UI designer — the color palette, spacing, and overall visual language draw significant inspiration from{" "}
            <a href="https://vant-ui.github.io/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>Vant</a>
            {" "}— one of the most mature mobile component libraries in the Vue ecosystem. We gratefully acknowledge their pioneering work. At the time, no comparable library existed for Solid.js, and cross-framework migration carried prohibitive cost; the natural conclusion was to build one.</>
        ) : (
          <>作者本人并不擅长 UI 设计——配色、间距和整体视觉风格大量参考了{" "}
            <a href="https://vant-ui.github.io/" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>Vant</a>
            {" "}——Vue 生态中最成熟的移动端组件库之一，在此深表敬意与感谢。彼时 Solid.js 尚无同类轮子，跨框架迁移的成本与风险亦非个人开发者所能承受，于是决定自己动手。</>
        )}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'The First Version' : '第一版'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          "The initial iteration, built over several months, included Picker, DatePicker, Cascader, ActionSheet, Dialog, and a handful of form components — the ceiling of what could be achieved with the technical understanding and tooling available at the time. Life intervened, the frontend world moved on, and the project entered a long hibernation."
        ) : (
          "初版断断续续实现了 Picker、DatePicker、Cascader、ActionSheet、Dialog 及若干表单组件，已是在当时技术认知与工具条件下的极限。随后因种种原因，项目进入了漫长的搁置期。"
        )}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Renaissance' : '重构'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          "The rapid advancement of AI tooling in recent years provided both the catalyst and the means to resurrect this long-deferred undertaking. The first version served as a blueprint; years of accumulated engineering experience supplied the architectural judgment. The entire library has been rebuilt from the ground up with a unified design token system, first-class TypeScript support, and a commitment to configurability — every visual property that reasonably should be a variable, is."
        ) : (
          "近两年 AI 技术的快速演进为这个搁置已久的项目提供了重启的契机与工具。以初版为蓝本，结合多年来积累的工程化理解，对整套组件库进行了从底层的重构。统一的 Design Token 体系、完整的 TypeScript 类型支持、以可配置性为核心的设计原则——所有应当可被定制的视觉属性，均通过 CSS 变量暴露。"
        )}
      </p>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Current Status' : '当前进度'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          <>The library currently ships <strong>{completed.length} components</strong> across all major categories — basic, display, navigation, form, feedback, and selector. Features include Tree Shaking, dark mode, ConfigProvider-based global theming with automatic color derivation, a complete documentation site with mobile simulator previews, and i18n support (zh-CN / en-US).</>
        ) : (
          <>当前已交付 <strong>{completed.length} 个组件</strong>，覆盖基础、展示、导航、表单、反馈、选择器六大类别。支持 Tree Shaking、暗色模式、基于 ConfigProvider 的全局主题配置与自动色彩派生、完整的文档站与移动端模拟器预览、以及中英文国际化。</>
        )}
      </p>

      {/* Component table — grouped by category */}
      <div style={{ 'margin-top': '1rem', display: 'grid', 'grid-template-columns': 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {([
          { title: isEn() ? 'Basic' : '基础', items: ['Button', 'Icon', 'Center', 'Divider', 'Layout', 'SafeArea'] },
          { title: isEn() ? 'Display' : '展示', items: ['Avatar', 'Badge', 'Tag', 'Image', 'Empty', 'Lazyload', 'List', 'SwipeCell', 'Swiper', 'PullRefresh'] },
          { title: isEn() ? 'Navigation' : '导航', items: ['Tabs', 'TabBar', 'NavBar', 'Cell'] },
          { title: isEn() ? 'Form' : '表单', items: ['Form', 'Input', 'Textarea', 'Radio', 'Checkbox', 'Switch', 'Rate', 'Stepper', 'Slider', 'Select', 'Upload'] },
          { title: isEn() ? 'Feedback' : '反馈', items: ['Toast', 'Notify', 'Dialog', 'Overlay', 'ActionSheet', 'Loading'] },
          { title: isEn() ? 'Selector' : '选择器', items: ['Picker', 'Calendar', 'Cascader', 'DatePicker', 'TimePicker', 'CityPicker'] },
        ]).map(cat => (
          <div style={{
            background: 'var(--sc-doc-card-placeholder, #f9fafb)',
            'border-radius': '8px', padding: '12px 14px',
          }}>
            <div style={{ 'font-size': '0.7rem', 'font-weight': 600, color: 'var(--sc-doc-card-muted, #9ca3af)', 'text-transform': 'uppercase', 'letter-spacing': '0.05em', 'margin-bottom': '8px' }}>
              {cat.title} <span style={{ 'font-weight': 400, opacity: 0.6 }}>({cat.items.length})</span>
            </div>
            <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '4px' }}>
              {cat.items.map(name => (
                <span style={{
                  'font-size': '0.78rem', 'font-family': 'monospace',
                  color: 'var(--sc-doc-card-title, #374151)',
                  background: 'var(--sc-doc-card-bg, #fff)',
                  padding: '2px 8px', 'border-radius': '4px',
                  border: '1px solid var(--sc-doc-card-border, #e5e7eb)',
                }}>{name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Roadmap' : '后续规划'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          "Near-term priorities include completing the remaining specialized components, expanding i18n coverage, and preparing the initial npm release. Medium-term goals involve business-scenario components and a richer documentation experience."
        ) : (
          "短期重心：完善国际化覆盖、准备初版 npm 发布。中长期方向：业务场景组件、更丰富的文档交互体验。"
        )}
      </p>
      <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '6px', 'margin-top': '0.75rem' }}>
        {upcoming.map(name => (
          <span style={{
            padding: '4px 10px', 'font-size': '0.8rem',
            background: '#fef3c7', 'border-radius': '4px',
            'font-family': 'monospace', color: '#92400e',
          }}>{name}</span>
        ))}
      </div>

      <h2 style={{ 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' }}>
        {isEn() ? 'Acknowledgments' : '致谢'}
      </h2>
      <p style={{ color: '#6b7280', 'line-height': 1.8 }}>
        {isEn() ? (
          <>This is a solo project, built across evenings and weekends. It is also — in the spirit of full disclosure — a collaboration between one human and one AI: the author and Claude together contributed the vast majority of the code, docs, and design decisions in this repository. {" "}
            <a href="https://github.com/LXG19961206/SolidMobile" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>GitHub</a>{" "}is always open. Stars, issues, and pull requests are genuinely appreciated.</>
        ) : (
          <>这是一个个人项目，利用业余时间完成。坦诚地讲，这也是一个人与一个 AI 的合作项目——作者与 Claude 共同贡献了本仓库中绝大多数的代码、文档与设计决策。{" "}
            <a href="https://github.com/LXG19961206/SolidMobile" target="_blank" rel="noopener" style={{ color: 'var(--sc-color-primary, #1677ff)' }}>GitHub</a>{" "}始终开放。每一个 star、每一条 issue、每一个 PR，都发自内心地感谢。</>
        )}
      </p>
    </div>
  );
};

export { AboutPage };
