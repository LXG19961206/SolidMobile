import { createSignal, For, onCleanup, onMount, type Component } from 'solid-js';
import { CodeBlock } from '../../doc-utils';
import { registerLocale, useT } from '../../doc-i18n';
import { Button, Input } from '../../../src/components';
import { setEventBusHandler, getEventBusHandler } from '../../../src/event-bus';
import zhCN from './EventBus/zh-CN';
import enUS from './EventBus/en-US';
registerLocale({ 'zh-CN': zhCN, 'en-US': enUS });

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
  ['TimePicker', 'change / confirm', 'string'],
  ['Toast', 'show', 'ToastOptions'],
  ['Upload', 'change / delete / success / error', 'UploadFile[] | { file, url/message }'],
];

type LogEntry = { comp: string; type: string; detail: string; time: string; id: number };

const EventBusDocPage: Component = () => {
  const t = useT();
  const [logs, setLogs] = createSignal<LogEntry[]>([]);
  let id = 0;

  onMount(() => {
    const prev = getEventBusHandler();
    setEventBusHandler((event) => {
      const p = (event.props as Record<string, unknown>) || {};
      let detail = '';
      if (event.component === 'Button') {
        detail = [p.type, p.variant, p.size, p.round && 'round', p.disabled && 'disabled'].filter(Boolean).join(' ');
      } else if (event.component === 'Input' && typeof event.payload === 'string') {
        detail = `"${event.payload.length > 15 ? event.payload.slice(0, 15) + '…' : event.payload}"`;
      } else if (typeof event.payload === 'string') {
        detail = `"${event.payload.slice(0, 20)}"`;
      } else if (typeof event.payload === 'number' || typeof event.payload === 'boolean') {
        detail = String(event.payload);
      }
      setLogs(prev => {
        const next = [...prev, { comp: event.component, type: event.type, detail, time: new Date(event.timestamp).toLocaleTimeString(), id: ++id }];
        return next.length > 6 ? next.slice(-6) : next;
      });
      prev?.(event);
    });
    onCleanup(() => setEventBusHandler(prev));
  });

  return (

      <div class="guide-card">
        <h1 style={{ 'font-size': '1.5rem', 'font-weight': 700, margin: '0 0 0.5rem' }}>EventBus</h1>
        <p style={{ color: '#6b7280', margin: '0 0 1.5rem', 'line-height': 1.6 }}>{t('eventbus.intro')}</p>
        <blockquote style="margin:0 0 1.5rem;padding:0.75rem 1rem;border-left:3px solid var(--sc-color-primary, #1677ff);background:color-mix(in srgb, var(--sc-color-primary, #1677ff) 4%, transparent);border-radius:0 6px 6px 0;color:var(--sc-color-text-secondary,#6b7280);font-size:0.9rem;line-height:1.7">
          {t('eventbus.warning')}
        </blockquote>

        {/* Inline demo */}
        <h2 style={H2}>{t('eventbus.demoTitle')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem' }}>{t('eventbus.demoDesc')}</p>
        <div style={{ display: 'flex', gap: '6px', 'flex-wrap': 'wrap', 'margin-bottom': '8px' }}>
          <Button size="sm" onClick={() => { }}>Click</Button>
          <Button type="success" size="sm" onClick={() => { }}>OK</Button>
          <Button type="warning" size="sm" onClick={() => { }}>Warn</Button>
          <Button type="danger" size="sm" onClick={() => { }}>Del</Button>
        </div>
        <Input placeholder="Type to watch change events…" clearable style={{ 'margin-bottom': '8px', 'font-size': '0.85rem' }} />
        <div style={{ background: 'var(--sc-doc-code-bg, #f5f5f5)', color: '#374151', 'border-radius': '6px', padding: '8px 10px', 'min-height': '40px', 'font-family': 'monospace', 'font-size': '0.75rem', 'line-height': 1.8, border: '1px solid #e5e7eb' }}>
          <For each={logs()}>{(log) => (
            <div><span style={{ color: '#1677ff' }}>[{log.comp}]</span><span style={{ color: '#16a34a', 'margin-left': '4px' }}>{log.type}</span><span style={{ color: '#6b7280', 'margin-left': '6px' }}>{log.detail}</span><span style={{ color: '#9ca3af', float: 'right' }}>{log.time}</span></div>
          )}</For>
          {logs().length === 0 && <div style={{ color: '#9ca3af' }}>{t('eventbus.demoHint')}</div>}
        </div>

        <h2 style={H2}>{t('eventbus.quickTitle')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem', 'line-height': 1.6 }}>{t('eventbus.quickDesc')}</p>
        <CodeBlock lang="tsx" code={`import { setEventBusHandler } from 'solid-mobile';
setEventBusHandler((event) => {
  console.log(event.component, event.type, event.payload);
  // Send to analytics / audit / debug panel
});`} />

        <h2 style={H2}>{t('eventbus.structTitle')}</h2>
        <div class="guide-table-wrap"><table>
          <thead><tr><th>{t('eventbus.structTh1')}</th><th>{t('eventbus.structTh2')}</th><th>{t('eventbus.structTh3')}</th></tr></thead>
          <tbody>
            <tr><td style="font-weight:500;font-family:monospace;font-size:0.85rem">component</td><td style="font-family:monospace;font-size:0.8rem;color:#1677ff">string</td><td style="font-size:0.85rem;color:#6b7280">{t('eventbus.structComp')}</td></tr>
            <tr><td style="font-weight:500;font-family:monospace;font-size:0.85rem">type</td><td style="font-family:monospace;font-size:0.8rem;color:#1677ff">string</td><td style="font-size:0.85rem;color:#6b7280">{t('eventbus.structType')} — change click confirm cancel clear delete submit success error refresh select show</td></tr>
            <tr><td style="font-weight:500;font-family:monospace;font-size:0.85rem">payload</td><td style="font-family:monospace;font-size:0.8rem;color:#1677ff">unknown</td><td style="font-size:0.85rem;color:#6b7280">{t('eventbus.structPayload')}</td></tr>
            <tr style="background:color-mix(in srgb, var(--sc-color-primary) 4%, transparent)"><td style="font-weight:600;font-family:monospace;font-size:0.85rem;color:var(--sc-color-primary)">props</td><td style="font-family:monospace;font-size:0.8rem;color:var(--sc-color-primary)">unknown</td><td style="font-size:0.85rem"><strong>{t('eventbus.structPropsTitle')}</strong>{' '}{t('eventbus.structPropsDesc')}</td></tr>
            <tr><td style="font-weight:500;font-family:monospace;font-size:0.85rem">timestamp</td><td style="font-family:monospace;font-size:0.8rem;color:#1677ff">number</td><td style="font-size:0.85rem;color:#6b7280">{t('eventbus.structTimestamp')}</td></tr>
          </tbody>
        </table></div>

        <h2 style={H2}>{t('eventbus.useTitle')}</h2>
        <ul style={{ color: '#6b7280', 'line-height': 1.8, 'padding-left': '1.2rem' }}>
          <li><strong>{t('eventbus.use1')}</strong></li>
          <li><strong>{t('eventbus.use2')}</strong></li>
          <li><strong>{t('eventbus.use3')}</strong></li>
          <li><strong>{t('eventbus.use4')}</strong></li>
        </ul>

        <h2 style={H2}>{t('eventbus.eventsTitle')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem', 'line-height': 1.6, 'font-size': '0.85rem' }}>{t('eventbus.eventsDesc')}</p>
        <div class="guide-table-wrap"><table>
          <thead><tr><th>{t('eventbus.eventsTh1')}</th><th>{t('eventbus.eventsTh2')}</th><th>payload</th></tr></thead>
          <tbody>{eventsTable.map(([comp, evt, payload]) => (
            <tr><td style={{ 'font-weight': 500 }}>{comp}</td><td style={{ 'font-family': 'monospace', 'font-size': '0.8rem', color: '#1677ff' }}>{evt}</td><td style={{ 'font-family': 'monospace', 'font-size': '0.75rem', color: '#6b7280' }}>{payload}</td></tr>
          ))}</tbody>
        </table></div>

        <h2 style={H2}>{t('eventbus.customTitle')}</h2>
        <p style={{ color: '#6b7280', margin: '0 0 0.75rem', 'line-height': 1.6 }}>{t('eventbus.customDesc')}</p>
        <CodeBlock lang="tsx" code={`import { emitEvent } from 'solid-mobile';
function MyChart(props: { data: Bar[] }) {
  const handleClick = (bar: Bar) => {
    emitEvent({ component: 'MyChart', type: 'click', payload: { bar, value: bar.value }, props, timestamp: Date.now() });
  };
  return <div>...</div>;
}`} />

        <h2 style={H2}>{t('eventbus.notesTitle')}</h2>
        <ul style={{ color: '#6b7280', 'line-height': 1.8, 'padding-left': '1.2rem' }}>
          <li>{t('eventbus.notes1')}</li>
          <li>{t('eventbus.notes2')}</li>
          <li>{t('eventbus.notes3')}</li>
          <li>{t('eventbus.notes4')}</li>
        </ul>
      </div>

  );
};

export { EventBusDocPage };
