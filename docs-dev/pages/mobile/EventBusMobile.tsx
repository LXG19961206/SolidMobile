import { type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

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

const codeBlock = {
  background: 'var(--sc-doc-card-placeholder, #f3f4f6)',
  color: 'var(--sc-doc-card-desc, #6b7280)',
  padding: '12px 14px',
  'border-radius': '6px',
  'font-size': '0.7rem',
  'font-family': 'monospace',
  'line-height': 1.6,
  'overflow-x': 'auto' as const,
  'white-space': 'pre-wrap' as const,
} as const;

const EVENTS_LIST = [
  ['Button', 'click', 'MouseEvent'],
  ['Picker', 'change / confirm / cancel', '{ items, vals }'],
  ['Slider', 'change', 'number | number[]'],
  ['Input', 'change', 'string'],
  ['Switch', 'change', 'boolean'],
  ['Rate', 'change', 'number'],
  ['Stepper', 'change', 'number'],
  ['Tabs', 'change', 'string | number'],
  ['Radio / RadioGroup', 'change', 'boolean / unknown'],
  ['Checkbox / CheckboxGroup', 'change', 'boolean / unknown[]'],
  ['Calendar', 'change', 'Date | Date[] | [Date,Date]'],
  ['Cascader', 'change', '(string | number)[]'],
  ['Select', 'change / confirm', 'string | number'],
  ['DatePicker', 'change / confirm', 'string'],
  ['CityPicker', 'change / confirm', '(string | number)[]'],
  ['Toast', 'show', 'ToastOptions'],
  ['Notify', 'show', 'NotifyOptions'],
  ['Dialog', 'show', 'DialogOptions'],
  ['ActionSheet', 'select', '{ item, index }'],
  ['Form', 'submit', 'FormValue'],
];

export const EventBusMobile: Component<EventBusMobileProps> = (props) => {
  return (
    <MobilePreview title="EventBus 事件总线" components={props.components} onNavigate={props.onNavigate}>
      {/* What */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>什么是 EventBus</div>
        <div style={CARD.desc}>
          全局事件总线。所有组件在触发内置事件（点击、值变化、确认等）时，除执行原有回调外，
          还会将事件信息推送至全局总线。用户注册一个回调即可监听整个应用内所有组件的交互。
        </div>
      </div>

      {/* Use cases */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>适用场景</div>
        <div style={CARD.body}>
          <div style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-text, #374151)', 'line-height': 1.8 }}>
            <div>• <strong>埋点/遥测 Telemetry</strong> — 统计用户行为，分析组件使用频率</div>
            <div>• <strong>审计日志 Audit</strong> — 记录关键操作，合规追溯</div>
            <div>• <strong>AOP 拦截</strong> — 在全局层面对组件事件做统一前置/后置处理</div>
            <div>• <strong>调试 Debug</strong> — 开发阶段实时查看所有组件交互</div>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>如何使用</div>
        <div style={CARD.desc}>在应用入口调用 setEventBusHandler 注册回调，无需 Provider。</div>
        <div style={CARD.body}>
          <div style={codeBlock}>
{`import { setEventBusHandler } from 'solid-component';

setEventBusHandler((event) => {
  console.log(
    \`[\${event.component}] \${event.type}\`,
    event.payload
  );
  // 发送到埋点平台 / 审计系统等
});`}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>可用事件一览</div>
        <div style={CARD.desc}>以下 20 个组件已接入 EventBus，触发内置事件时自动推送。</div>
        <div style={{ ...CARD.body, 'overflow-x': 'auto' as const }}>
          <table style={{ width: '100%', 'border-collapse': 'collapse', 'font-size': '0.7rem' }}>
            <thead>
              <tr style={{ 'border-bottom': '2px solid var(--sc-doc-card-border, #e5e7eb)' }}>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Component</th>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Event</th>
                <th style={{ 'text-align': 'left', padding: '6px 4px', color: 'var(--sc-doc-card-muted, #9ca3af)' }}>Payload</th>
              </tr>
            </thead>
            <tbody>
              {EVENTS_LIST.map(([comp, evt, payload]) => (
                <tr style={{ 'border-bottom': '1px solid var(--sc-doc-card-divider, #f3f4f6)' }}>
                  <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-text, #374151)', 'font-weight': 500 }}>{comp}</td>
                  <td style={{ padding: '5px 4px', color: '#1677ff', 'font-family': 'monospace', 'font-size': '0.65rem' }}>{evt}</td>
                  <td style={{ padding: '5px 4px', color: 'var(--sc-doc-card-desc, #6b7280)', 'font-family': 'monospace', 'font-size': '0.6rem' }}>{payload}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>注意事项</div>
        <div style={CARD.body}>
          <div style={{ 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', 'line-height': 1.8 }}>
            <div>• 未注册 handler 时 emitEvent 为零开销（仅一次 null 检查）</div>
            <div>• handler 内避免执行耗时操作，建议异步处理</div>
            <div>• payload 类型为 unknown，需根据 component/type 自行窄化</div>
          </div>
        </div>
      </div>
    </MobilePreview>
  );
};
