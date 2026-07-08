import { type Component } from 'solid-js';
import { CodeBlock } from '../../doc-utils';
import { useLocale } from '../../doc-i18n';

const H2 = { 'font-size': '1.1rem', 'font-weight': 600, margin: '2rem 0 0.75rem' };

const eventsTable = [
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
  ['NavBar', 'click', '{ side: "left" | "right", action?: "back" }'],
  ['Notify', 'show', 'NotifyOptions'],
  ['Picker', 'change / confirm / cancel', '{ items, vals }'],
  ['PullRefresh', 'refresh', 'undefined'],
  ['Radio / RadioGroup', 'change', 'boolean / unknown'],
  ['Rate', 'change', 'number'],
  ['Select', 'change / confirm', 'string | number'],
  ['Slider', 'change', 'number | number[]'],
  ['Stepper', 'change', 'number'],
  ['Swiper', 'change', 'number (current index)'],
  ['Switch', 'change', 'boolean'],
  ['TabBar', 'change', 'string | number (tab name)'],
  ['Tabs', 'change', 'string | number'],
  ['Textarea', 'change', 'string'],
  ['TimePicker', 'change / confirm', 'string (HH:mm:ss)'],
  ['Toast', 'show', 'ToastOptions'],
  ['Upload', 'change / delete / success / error', 'UploadFile[] | { file, url/message }'],
];

const EventBusDocPage: Component = () => {
  const isEn = () => useLocale() === 'en-US';

  return (
    <div class="guide-card">
      <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '0 0 0.5rem' }}>EventBus</h1>
      <p style={{ color: 'var(--sc-color-text-secondary, #6b7280)', margin: '0 0 1.5rem', 'line-height': 1.6 }}>
        {isEn()
          ? <>Global event bus. When any component fires a built-in event, in addition to its original callback, a structured event is also pushed to the global bus. Suitable for telemetry, audit logging, AOP interception, and debugging.</>
          : <>全局事件总线。所有组件触发内置事件时，除执行原有回调外，还会将结构化事件推送至全局总线。适用于埋点遥测、审计日志、AOP 拦截、开发调试等场景。</>
        }
      </p>
      <blockquote style="margin:0 0 1.5rem;padding:0.75rem 1rem;border-left:3px solid var(--sc-color-primary, #1677ff);background:color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent);border-radius:0 6px 6px 0;color:var(--sc-color-text-secondary,#6b7280);font-size:0.9rem;line-height:1.7">
        {isEn()
          ? <><strong>This EventBus is designed for interception and aspect observation, not as a general message channel.</strong><br />
            It is specifically built for cross-cutting concerns like <strong>telemetry, audit logging, and AOP interception</strong>, providing a unified observation entry point.
            We do NOT recommend using it for component communication, state synchronization, or event-driven business flows — use props, callbacks, and other explicit contracts for those.<br />
            EventBus plays the role of a passive observer: silently recording everything that happens, without participating in or altering the execution path of business logic.</>
          : <><strong>本库的 EventBus 定位为拦截与切面，而非通用消息通道。</strong><br />
            它专为<strong>埋点遥测、审计日志、AOP 拦截</strong>等横切关注点设计，提供一个统一的观测入口。
            我们不建议用它来做组件间通信、状态同步或事件驱动的业务流转——这些场景请走 props、回调等显式契约。<br />
            EventBus 在这里的角色是旁路观察者：静默记录发生的一切，不参与、不改变业务逻辑的执行路径。</>
        }
      </blockquote>

      <h2 style={H2}>{isEn() ? 'Quick Start' : '快速开始'}</h2>
      <p style={{ color: 'var(--sc-color-text-secondary, #6b7280)', margin: '0 0 0.75rem', 'line-height': 1.6 }}>
        {isEn()
          ? <>Call <code>setEventBusHandler</code> once at the app entry — no Provider, no extra dependencies. When unregistered, <code>emitEvent</code> only performs a single null check, with zero runtime overhead.</>
          : <>在应用入口调用一次 <code>setEventBusHandler</code>，无需 Provider、无额外依赖。未注册时 <code>emitEvent</code> 仅做一次 null 检查，零运行时开销。</>
        }
      </p>

      <CodeBlock lang="tsx" code={`import { setEventBusHandler } from 'solid-mobile';

setEventBusHandler((event) => {
  // event.component  — 组件名，如 'Picker'、'DatePicker'
  // event.type      — 事件类型，如 'change'、'confirm'、'click'
  // event.payload   — 事件特异数据（选中值、输入值、文件列表等）
  // event.props     — 组件收到的最新 props 快照（可用于遥测上下文）
  // event.timestamp — 毫秒时间戳

  console.log(event.component, event.type, event.payload);
  // 发送到埋点平台 / 审计系统 / 调试面板
});`} />

      <h2 style={H2}>{isEn() ? 'Event Structure' : '事件结构'}</h2>
      <div class="guide-table-wrap">
        <table>
          <thead>
            <tr>
              <th style="min-width:100px">{isEn() ? 'Field' : '字段'}</th>
              <th>{isEn() ? 'Type' : '类型'}</th>
              <th>{isEn() ? 'Description' : '说明'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight:500;font-family:monospace;font-size:0.85rem">component</td>
              <td style="font-family:monospace;font-size:0.8rem;color:var(--sc-color-primary, #1677ff)">EventBusComponent</td>
              <td style="font-size:0.85rem;color:var(--sc-color-text-secondary,#6b7280)">
                {isEn() ? <>Name of the component that fired the event, e.g. <code>'Picker'</code>, <code>'Upload'</code></> : <>触发事件的组件名，如 <code>'Picker'</code>、<code>'Upload'</code></>}
              </td>
            </tr>
            <tr>
              <td style="font-weight:500;font-family:monospace;font-size:0.85rem">type</td>
              <td style="font-family:monospace;font-size:0.8rem;color:var(--sc-color-primary, #1677ff)">EventBusEventType</td>
              <td style="font-size:0.85rem;color:var(--sc-color-text-secondary,#6b7280)">
                {isEn() ? <>Event category: <code>change</code> <code>click</code> <code>confirm</code> <code>cancel</code> <code>clear</code> <code>delete</code> <code>submit</code> <code>success</code> <code>error</code> <code>refresh</code> <code>select</code> <code>show</code></> : <>事件类别：<code>change</code> <code>click</code> <code>confirm</code> <code>cancel</code> <code>clear</code> <code>delete</code> <code>submit</code> <code>success</code> <code>error</code> <code>refresh</code> <code>select</code> <code>show</code></>}
              </td>
            </tr>
            <tr>
              <td style="font-weight:500;font-family:monospace;font-size:0.85rem">payload</td>
              <td style="font-family:monospace;font-size:0.8rem;color:var(--sc-color-primary, #1677ff)">unknown</td>
              <td style="font-size:0.85rem;color:var(--sc-color-text-secondary,#6b7280)">
                {isEn() ? <>Event-specific data. Different component/event type combinations have different payload shapes — narrow the type based on <code>component + type</code>. See the event list below.</> : <>事件特异数据。不同组件/事件类型的 payload 不同，需根据 <code>component + type</code> 组合窄化类型。详见下方事件一览表。</>}
              </td>
            </tr>
            <tr style="background:color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent)">
              <td style="font-weight:600;font-family:monospace;font-size:0.85rem;color:var(--sc-color-primary, #1677ff)">props</td>
              <td style="font-family:monospace;font-size:0.8rem;color:var(--sc-color-primary, #1677ff)">unknown</td>
              <td style="font-size:0.85rem;color:var(--sc-color-text,#323233)">
                {isEn()
                  ? <><strong>Props snapshot at the time the event fired.</strong> The most overlooked but most valuable field — you can get all configuration info (placeholder, maxCount, columns, disabled, etc.) without reading from a component instance. Use it for telemetry to analyze "under what configuration did the user trigger this event?".</>
                  : <><strong>组件触发事件时的 props 快照。</strong>这是最容易被忽略但价值最高的字段——你可以从 props 中拿到组件的所有配置信息（placeholder、maxCount、columns、disabled 等），无需额外从组件实例读取。用于遥测时分析「用户是在什么配置下触发了这个事件」。</>
                }
              </td>
            </tr>
            <tr>
              <td style="font-weight:500;font-family:monospace;font-size:0.85rem">timestamp</td>
              <td style="font-family:monospace;font-size:0.8rem;color:var(--sc-color-primary, #1677ff)">number</td>
              <td style="font-size:0.85rem;color:var(--sc-color-text-secondary,#6b7280)">
                {isEn() ? <>Millisecond timestamp of when the event occurred (<code>Date.now()</code>)</> : <>事件发生时间的毫秒时间戳（<code>Date.now()</code>）</>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 style={H2}>{isEn() ? 'Use Cases' : '适用场景'}</h2>
      <ul style={{ color: 'var(--sc-color-text-secondary, #6b7280)', 'line-height': 1.8, 'padding-left': '1.2rem' }}>
        {isEn()
          ? <>
            <li><strong>Telemetry</strong> — Use <code>event.props</code> to get component configuration context and analyze user behavior patterns</li>
            <li><strong>Audit Logging</strong> — Record critical operations (submit, confirm, delete) for compliance traceability</li>
            <li><strong>AOP Interception</strong> — Globally pre/post-process component events without modifying business code</li>
            <li><strong>Debugging</strong> — Register one handler to observe all component interactions in real time, no per-component logging needed</li>
          </>
          : <>
            <li><strong>埋点 / 遥测</strong> — 利用 <code>event.props</code> 获取组件配置上下文，统计用户行为与组件使用模式</li>
            <li><strong>审计日志</strong> — 记录关键操作（提交、确认、删除），合规追溯</li>
            <li><strong>AOP 拦截</strong> — 全局前置/后置处理组件事件，无需侵入业务代码</li>
            <li><strong>开发调试</strong> — 注册一个 handler 即可实时查看所有组件交互，无需给每个组件加 log</li>
          </>
        }
      </ul>

      <h2 style={H2}>{isEn() ? 'Available Events' : '可用事件一览'}</h2>
      <p style={{ color: 'var(--sc-color-text-secondary, #6b7280)', margin: '0 0 0.75rem', 'line-height': 1.6, 'font-size': '0.85rem' }}>
        {isEn()
          ? <><strong>payload</strong> in the table below is the type of <code>event.payload</code>. Each event also carries <strong>props</strong> (component props snapshot, typed as the corresponding component's Props interface) and <strong>timestamp</strong>.</>
          : <>下表中的 <strong>payload</strong> 是 <code>event.payload</code> 的类型。每一条事件同时携带 <strong>props</strong>（组件 props 快照，类型为对应组件的 Props 接口）和 <strong>timestamp</strong>。</>
        }
      </p>
      <div class="guide-table-wrap">
        <table>
          <thead>
            <tr><th>{isEn() ? 'Component' : '组件'}</th><th>{isEn() ? 'Event Type' : '事件类型'}</th><th>payload</th></tr>
          </thead>
          <tbody>
            {eventsTable.map(([comp, evt, payload]) => (
              <tr>
                <td style={{ 'font-weight': 500 }}>{comp}</td>
                <td style={{ 'font-family': 'monospace', 'font-size': '0.8rem', color: '#1677ff' }}>{evt}</td>
                <td style={{ 'font-family': 'monospace', 'font-size': '0.75rem', color: 'var(--sc-color-text-secondary, #6b7280)' }}>{payload}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={H2}>{isEn() ? 'Notes' : '注意事项'}</h2>
      <ul style={{ color: 'var(--sc-color-text-secondary, #6b7280)', 'line-height': 1.8, 'padding-left': '1.2rem' }}>
        {isEn()
          ? <>
            <li>When no handler is registered, <code>emitEvent</code> has zero overhead (a single null check)</li>
            <li>Avoid long-running operations inside the handler; prefer async processing</li>
            <li><code>event.payload</code> is event-specific data (selected values, input, etc.) — narrow based on component/type</li>
            <li><code>event.props</code> is the component's props snapshot at event time — useful for telemetry to read current config (placeholder, maxCount, etc.)</li>
          </>
          : <>
            <li>未注册 handler 时 <code>emitEvent</code> 为零开销（仅一次 null 检查）</li>
            <li>handler 内避免执行耗时操作，建议异步处理</li>
            <li><code>event.payload</code> 为事件特异数据（选中值、输入值等），需根据 component/type 自行窄化</li>
            <li><code>event.props</code> 为组件触发事件时的 props 快照，可用于遥测获取组件的当前配置（如 placeholder、maxCount 等）</li>
          </>
        }
      </ul>
    </div>
  );
};

export { EventBusDocPage };
