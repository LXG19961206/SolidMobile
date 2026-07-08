import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { CodeBlock } from '../../doc-utils';
import { useT } from '../../doc-i18n';

export interface EventBusMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px', 'line-height': 1.6 },
  body: { padding: '0 16px 16px' },
};

const note = {
  background: 'color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent)',
  'border-left': '3px solid var(--sc-color-primary, #1677ff)',
  padding: '10px 12px',
  'border-radius': '0 6px 6px 0',
  'font-size': '0.8rem',
  'line-height': 1.7,
  color: 'var(--sc-doc-card-desc, #6b7280)',
};

const EVENTS_LIST = [
  ['ActionSheet', 'select', '{ item, index }'],
  ['Button', 'click', 'MouseEvent'],
  ['Calendar', 'change', 'Date | Date[] | [Date,Date]'],
  ['Cascader', 'change', '(string | number)[]'],
  ['Checkbox / CheckboxGroup', 'change', 'boolean / unknown[]'],
  ['CityPicker', 'change / confirm', '(string | number)[]'],
  ['DatePicker', 'change / confirm', 'string'],
  ['Dialog', 'show', 'DialogOptions'],
  ['Form', 'submit', 'FormValue'],
  ['Input', 'change / clear', 'string'],
  ['NavBar', 'click', '{ side, action }'],
  ['Notify', 'show', 'NotifyOptions'],
  ['Picker', 'change / confirm / cancel', '{ items, vals }'],
  ['PullRefresh', 'refresh', 'undefined'],
  ['Radio / RadioGroup', 'change', 'boolean / unknown'],
  ['Rate', 'change', 'number'],
  ['Select', 'change / confirm', 'string | number'],
  ['Slider', 'change', 'number | number[]'],
  ['Stepper', 'change', 'number'],
  ['Swiper', 'change', 'number (index)'],
  ['Switch', 'change', 'boolean'],
  ['TabBar', 'change', 'string | number'],
  ['Tabs', 'change', 'string | number'],
  ['Textarea', 'change', 'string'],
  ['TimePicker', 'change / confirm', 'string (HH:mm:ss)'],
  ['Toast', 'show', 'ToastOptions'],
  ['Upload', 'change / delete / success / error', 'UploadFile[] | { file, ... }'],
];

export const EventBusMobile: Component<EventBusMobileProps> = (props) => {
  const t = useT();
  return (
    <MobilePreview title="EventBus 事件总线" components={props.components} onNavigate={props.onNavigate}>
      {/* 定位 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>设计定位</div>
        <div style={CARD.desc}>
          全局事件总线。所有组件在触发内置事件时，除执行原有回调外，还会将结构化事件推送至全局总线。适用于埋点遥测、审计日志、AOP 拦截、开发调试等场景。
        </div>
        <div style={{ ...CARD.body, ...note }}>
          <b>本库的 EventBus 定位为拦截与切面，而非通用消息通道。</b>它专为<b>埋点遥测、审计日志、AOP 拦截</b>等横切关注点设计，提供一个统一的观测入口。我们不建议用它来做组件间通信、状态同步或事件驱动的业务流转——这些场景请走 props、回调等显式契约。EventBus 在这里的角色是<b>旁路观察者</b>：静默记录发生的一切，不参与、不改变业务逻辑的执行路径。
        </div>
      </div>

      {/* 场景 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>适用场景</div>
        <div style={CARD.body}>
          <div style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-text, #374151)', 'line-height': 1.8 }}>
            <div>• <strong>埋点 / 遥测</strong> — 利用 <code>event.props</code> 获取组件配置上下文，统计用户行为与组件使用模式</div>
            <div>• <strong>审计日志</strong> — 记录关键操作（提交、确认、删除），合规追溯</div>
            <div>• <strong>AOP 拦截</strong> — 全局前置/后置处理组件事件，无需侵入业务代码</div>
            <div>• <strong>开发调试</strong> — 注册一个 handler 即可实时查看所有组件交互，无需给每个组件加 log</div>
          </div>
        </div>
      </div>

      {/* 快速开始 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>快速开始</div>
        <div style={CARD.desc}>在应用入口调用一次 <code>setEventBusHandler</code>，无需 Provider、无额外依赖。未注册时 <code>emitEvent</code> 仅做一次 null 检查，零运行时开销。</div>
        <div style={CARD.body}>
          <CodeBlock lang="tsx" code={`import { setEventBusHandler } from 'solid-mobile';

setEventBusHandler((event) => {
  // event.component  — 组件名
  // event.type      — 事件类型
  // event.payload   — 事件特异数据
  // event.props     — 组件 props 快照
  // event.timestamp — 毫秒时间戳

  console.log(event.component, event.type, event.payload);
  // 发送到埋点平台 / 审计系统等
});`} />
        </div>
      </div>

      {/* 事件结构 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>事件结构</div>
        <div style={CARD.body}>
          <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.7rem' }}>
            <thead>
              <tr style={{ 'border-bottom': '2px solid var(--sc-doc-card-border, #e5e7eb)' }}>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>字段</th>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>类型</th>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '5px 4px', 'font-weight': 500 }}>component</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace' }}>string</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-desc, #6b7280)' }}>触发事件的组件名，如 <code>Picker</code>、<code>Upload</code></td>
              </tr>
              <tr>
                <td style={{ padding: '5px 4px', 'font-weight': 500 }}>type</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace' }}>string</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-desc, #6b7280)' }}>change / click / confirm / clear / delete / submit / success / error / refresh / select / show / cancel</td>
              </tr>
              <tr>
                <td style={{ padding: '5px 4px', 'font-weight': 500 }}>payload</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace' }}>unknown</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-desc, #6b7280)' }}>事件特异数据，因组件/事件类型而异</td>
              </tr>
              <tr style={{ background: 'color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent)' }}>
                <td style={{ padding: '5px 4px', 'font-weight': 600, color: 'var(--sc-color-primary, #1677ff)' }}>props</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace' }}>unknown</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-text, #374151)' }}><b>组件触发事件时的 props 快照。</b>这是最容易被忽略但价值最高的字段——你可以从 props 中拿到组件的所有配置信息（placeholder、maxCount、columns、disabled 等），无需额外从组件实例读取。用于遥测时分析「用户是在什么配置下触发了这个事件」。</td>
              </tr>
              <tr>
                <td style={{ padding: '5px 4px', 'font-weight': 500 }}>timestamp</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace' }}>number</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-desc, #6b7280)' }}>毫秒时间戳</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 事件一览 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>可用事件一览</div>
        <div style={CARD.desc}>以下 {EVENTS_LIST.length} 个组件已接入 EventBus，触发内置事件时自动推送。每条事件均携带 props（组件 props 快照）和 timestamp。</div>
        <div style={{ ...CARD.body, 'overflow-x': 'auto' as const }}>
          <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.7rem' }}>
            <thead>
              <tr style={{ 'border-bottom': '2px solid var(--sc-doc-card-border, #e5e7eb)' }}>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>组件</th>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>事件</th>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Payload</th>
              </tr>
            </thead>
            <tbody>
              {EVENTS_LIST.map(([comp, evt, payload]) => (
                <tr style={{ 'border-bottom': '1px solid var(--sc-doc-card-divider, #f3f4f6)' }}>
                  <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-text, #374151)', 'font-weight': 500 }}>{comp}</td>
                  <td style={{ padding: '5px 4px', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace', 'font-size': '0.65rem' }}>{evt}</td>
                  <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-desc, #6b7280)', 'font-family': 'monospace', 'font-size': '0.6rem' }}>{payload}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 注意 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>注意事项</div>
        <div style={CARD.body}>
          <div style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'line-height': 1.8 }}>
            <div>• 未注册 handler 时 <code>emitEvent</code> 为零开销（仅一次 null 检查）</div>
            <div>• handler 内避免执行耗时操作，建议异步处理</div>
            <div>• <code>event.payload</code> 为事件特异数据（选中值、输入值等），需根据 component/type 自行窄化</div>
            <div>• <code>event.props</code> 为组件触发事件时的 props 快照，可用于遥测获取组件的当前配置（如 placeholder、maxCount 等）</div>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
