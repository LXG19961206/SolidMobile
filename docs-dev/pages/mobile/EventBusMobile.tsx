import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';
import { CodeBlock } from '../../../src/doc-utils';
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
          全局事件总线。所有组件在触发内置事件时，除执行原有回调外，还会将结构化事件推送至全局总线。
        </div>
        <div style={{ ...CARD.body, ...note }}>
          本库的 EventBus 定位为<b>拦截与切面</b>，而非通用消息通道。它专为埋点遥测、审计日志、AOP 拦截等横切关注点设计。我们不建议用它做组件间通信或状态同步——这些场景请走 props、回调或 Form。
        </div>
      </div>

      {/* 场景 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>适用场景</div>
        <div style={CARD.body}>
          <div style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-text, #374151)', 'line-height': 1.8 }}>
            <div>• <strong>埋点/遥测</strong> — 利用 props 获取组件配置上下文</div>
            <div>• <strong>审计日志</strong> — 记录关键操作，合规追溯</div>
            <div>• <strong>AOP 拦截</strong> — 全局统一前置/后置处理</div>
            <div>• <strong>开发调试</strong> — 一个 handler 查看所有交互</div>
          </div>
        </div>
      </div>

      {/* 使用 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>如何使用</div>
        <div style={CARD.desc}>应用入口调用一次 setEventBusHandler，无需 Provider。未注册时零开销。</div>
        <div style={CARD.body}>
          <CodeBlock lang="tsx" code={`import { setEventBusHandler } from 'solid-component';

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
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-desc, #6b7280)' }}>触发事件的组件名</td>
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
                <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-text, #374151)' }}><b>组件触发事件时的 props 快照。</b>可以拿到组件的所有配置信息（placeholder、maxCount、columns 等），用于遥测上下文分析。</td>
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
            <div>• 未注册 handler 时 emitEvent 为零开销（仅一次 null 检查）</div>
            <div>• handler 内避免执行耗时操作，建议异步处理</div>
            <div>• payload 和 props 类型均为 unknown，需根据 component/type 自行窄化</div>
            <div>• EventBus 不做组件间通信——组件协作请用 props / 回调 / Form</div>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
