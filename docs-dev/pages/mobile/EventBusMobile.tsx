import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';
import { CodeBlock } from '../../doc-utils';
import { useT, useLocale } from '../../doc-i18n';

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
  const isEn = () => useLocale() === 'en-US';
  return (
    <MobilePreview title="EventBus" components={props.components} onNavigate={props.onNavigate}>
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Design Philosophy' : '设计定位'}</div>
        <div style={CARD.desc}>
          {isEn()
            ? <>Global event bus. When any component fires a built-in event, in addition to its original callback, a structured event is also pushed to the global bus. Suitable for telemetry, audit logging, AOP interception, and debugging.</>
            : <>全局事件总线。所有组件在触发内置事件时，除执行原有回调外，还会将结构化事件推送至全局总线。适用于埋点遥测、审计日志、AOP 拦截、开发调试等场景。</>
          }
        </div>
        <div style={{ ...CARD.body, ...note }}>
          {isEn()
            ? <><b>This EventBus is designed for interception and aspect observation, not as a general message channel.</b> It is specifically built for cross-cutting concerns like <b>telemetry, audit logging, and AOP interception</b>, providing a unified observation entry point. We do NOT recommend using it for component communication, state synchronization, or event-driven business flows — use props, callbacks, and other explicit contracts for those. EventBus plays the role of a <b>passive observer</b>: silently recording everything that happens, without participating in or altering the execution path of business logic.</>
            : <><b>本库的 EventBus 定位为拦截与切面，而非通用消息通道。</b>它专为<b>埋点遥测、审计日志、AOP 拦截</b>等横切关注点设计，提供一个统一的观测入口。我们不建议用它来做组件间通信、状态同步或事件驱动的业务流转——这些场景请走 props、回调等显式契约。EventBus 在这里的角色是<b>旁路观察者</b>：静默记录发生的一切，不参与、不改变业务逻辑的执行路径。</>
          }
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Use Cases' : '适用场景'}</div>
        <div style={CARD.body}>
          <div style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-text, #374151)', 'line-height': 1.8 }}>
            {isEn()
              ? <><div>• <strong>Telemetry</strong> — Use <code>event.props</code> to get component configuration context and analyze user behavior</div>
                <div>• <strong>Audit Logging</strong> — Record critical operations (submit, confirm, delete) for compliance</div>
                <div>• <strong>AOP Interception</strong> — Globally pre/post-process component events without modifying business code</div>
                <div>• <strong>Debugging</strong> — Register one handler to observe all component interactions in real time</div></>
              : <><div>• <strong>埋点 / 遥测</strong> — 利用 <code>event.props</code> 获取组件配置上下文，统计用户行为与组件使用模式</div>
                <div>• <strong>审计日志</strong> — 记录关键操作（提交、确认、删除），合规追溯</div>
                <div>• <strong>AOP 拦截</strong> — 全局前置/后置处理组件事件，无需侵入业务代码</div>
                <div>• <strong>开发调试</strong> — 注册一个 handler 即可实时查看所有组件交互，无需给每个组件加 log</div></>
            }
          </div>
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Quick Start' : '快速开始'}</div>
        <div style={CARD.desc}>
          {isEn()
            ? <>Call <code>setEventBusHandler</code> once at the app entry — no Provider, no extra dependencies. When unregistered, <code>emitEvent</code> performs a single null check with zero runtime overhead.</>
            : <>在应用入口调用一次 <code>setEventBusHandler</code>，无需 Provider、无额外依赖。未注册时 <code>emitEvent</code> 仅做一次 null 检查，零运行时开销。</>
          }
        </div>
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
        <div style={CARD.title}>{isEn() ? 'Event Structure' : '事件结构'}</div>
        <div style={CARD.body}>
          <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.7rem' }}>
            <thead>
              <tr style={{ 'border-bottom': '2px solid var(--sc-doc-card-border, #e5e7eb)' }}>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{isEn() ? 'Field' : '字段'}</th>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{isEn() ? 'Type' : '类型'}</th>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{isEn() ? 'Description' : '说明'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '5px 4px', 'font-weight': 500 }}>component</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace' }}>string</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-desc, #6b7280)' }}>{isEn() ? <>Component name, e.g. <code>Picker</code>, <code>Upload</code></> : <>触发事件的组件名，如 <code>Picker</code>、<code>Upload</code></>}</td>
              </tr>
              <tr>
                <td style={{ padding: '5px 4px', 'font-weight': 500 }}>type</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace' }}>string</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-desc, #6b7280)' }}>change / click / confirm / clear / delete / submit / success / error / refresh / select / show / cancel</td>
              </tr>
              <tr>
                <td style={{ padding: '5px 4px', 'font-weight': 500 }}>payload</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace' }}>unknown</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-desc, #6b7280)' }}>{isEn() ? 'Event-specific data, varies by component/event type' : '事件特异数据，因组件/事件类型而异'}</td>
              </tr>
              <tr style={{ background: 'color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent)' }}>
                <td style={{ padding: '5px 4px', 'font-weight': 600, color: 'var(--sc-color-primary, #1677ff)' }}>props</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace' }}>unknown</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-text, #374151)' }}>
                  {isEn()
                    ? <><b>Props snapshot at the time the event fired.</b> The most overlooked but most valuable field — you can get all configuration info (placeholder, maxCount, columns, disabled, etc.) without reading from a component instance. Use it for telemetry to analyze "under what configuration did the user trigger this event?".</>
                    : <><b>组件触发事件时的 props 快照。</b>这是最容易被忽略但价值最高的字段——你可以从 props 中拿到组件的所有配置信息（placeholder、maxCount、columns、disabled 等），无需额外从组件实例读取。用于遥测时分析「用户是在什么配置下触发了这个事件」。</>
                  }
                </td>
              </tr>
              <tr>
                <td style={{ padding: '5px 4px', 'font-weight': 500 }}>timestamp</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-color-primary, #1677ff)', 'font-family': 'monospace' }}>number</td>
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-desc, #6b7280)' }}>{isEn() ? 'Millisecond timestamp' : '毫秒时间戳'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={CARD.wrapper}>
        <div style={CARD.title}>{isEn() ? 'Available Events' : '可用事件一览'}</div>
        <div style={CARD.desc}>
          {isEn()
            ? <>The following {EVENTS_LIST.length} components are connected to EventBus, automatically pushing structured events on built-in triggers. Each event includes <strong>props</strong> (component props snapshot) and <strong>timestamp</strong>.</>
            : <>以下 {EVENTS_LIST.length} 个组件已接入 EventBus，触发内置事件时自动推送。每条事件均携带 props（组件 props 快照）和 timestamp。</>
          }
        </div>
        <div style={{ ...CARD.body, 'overflow-x': 'auto' as const }}>
          <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.7rem' }}>
            <thead>
              <tr style={{ 'border-bottom': '2px solid var(--sc-doc-card-border, #e5e7eb)' }}>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{isEn() ? 'Component' : '组件'}</th>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>{isEn() ? 'Event' : '事件'}</th>
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
        <div style={CARD.title}>{isEn() ? 'Notes' : '注意事项'}</div>
        <div style={CARD.body}>
          <div style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'line-height': 1.8 }}>
            {isEn()
              ? <><div>• When no handler is registered, <code>emitEvent</code> has zero overhead (a single null check)</div>
                <div>• Avoid long-running operations inside the handler; prefer async processing</div>
                <div>• <code>event.payload</code> is event-specific data — narrow based on component/type</div>
                <div>• <code>event.props</code> is the component's props snapshot at event time — useful for telemetry to read current config (placeholder, maxCount, etc.)</div></>
              : <><div>• 未注册 handler 时 <code>emitEvent</code> 为零开销（仅一次 null 检查）</div>
                <div>• handler 内避免执行耗时操作，建议异步处理</div>
                <div>• <code>event.payload</code> 为事件特异数据（选中值、输入值等），需根据 component/type 自行窄化</div>
                <div>• <code>event.props</code> 为组件触发事件时的 props 快照，可用于遥测获取组件的当前配置（如 placeholder、maxCount 等）</div></>
            }
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
