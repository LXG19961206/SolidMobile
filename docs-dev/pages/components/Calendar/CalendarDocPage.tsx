import { createSignal, Show, useContext } from 'solid-js';
import { Calendar } from '../../../../src/components/Calendar';
import { Cell } from '../../../../src/components/Cell';
import { DemoBlock, PropsTable, DocLayout, PhoneTargetContext } from '../../../../src/doc-utils';
import type { PropRow, TOCItem } from '../../../../src/doc-utils';
import { useT } from '../../../doc-i18n';
import css from './CalendarDocPage.module.css';

const propsData: PropRow[] = [
  { name: 'type', type: "'single' | 'multiple' | 'range'", default: "'single'", required: false, desc: '选择模式。' },
  { name: 'value', type: 'Date | Date[] | [Date, Date]', default: '—', required: false, desc: '当前选中值。' },
  { name: 'onChange', type: '(value) => void', default: '—', required: false, desc: '值变化回调。' },
  { name: 'popup', type: 'boolean', default: 'true', required: false, desc: '弹出模式。设为 false 平铺展示。' },
  { name: 'show', type: 'boolean', default: '—', required: false, desc: '弹出层受控显示。' },
  { name: 'title', type: 'string | JSX.Element', default: "'选择日期'", required: false, desc: '弹出层标题。' },
  { name: 'closeable', type: 'boolean', default: 'false', required: false, desc: '关闭按钮。' },
  { name: 'minDate', type: 'Date', default: '—', required: false, desc: '最小可选日期。' },
  { name: 'maxDate', type: 'Date', default: '—', required: false, desc: '最大可选日期。' },
  { name: 'firstDayOfWeek', type: 'number', default: '0', required: false, desc: '一周起始日。' },
  { name: 'weekdays', type: 'string[]', default: "['日','一',...]", required: false, desc: '星期标题。' },
  { name: 'titleFormatter', type: '(y, m) => string', default: '—', required: false, desc: '月份标题格式。' },
  { name: 'activeColor', type: 'string', default: "'#1677ff'", required: false, desc: '选中态颜色。' },
  { name: 'dayRender', type: '(day: DayInfo) => JSX.Element', default: '—', required: false, desc: '日期格子渲染。' },
  { name: 'maxCount', type: 'number', default: '—', required: false, desc: '多选最大天数。' },
  { name: 'maxRange', type: 'number', default: '—', required: false, desc: '范围最大跨度。' },
  { name: 'showConfirm', type: 'boolean', default: 'false', required: false, desc: '范围模式确认按钮。' },
  { name: 'readonly', type: 'boolean', default: 'false', required: false, desc: '只读。' },
  { name: 'lunar', type: 'boolean', default: 'false', required: false, desc: '农历，属于中国玩家的浪漫。' },
  { name: 'teleport', type: 'string | Element', default: 'document.body', required: false, desc: '挂载目标。' },
];

const cssVarRows: PropRow[] = [
  { name: '--sc-calendar-bg', type: 'color', default: '#fff', required: false, desc: '日历背景色。' },
  { name: '--sc-calendar-text', type: 'color', default: '#1f2937', required: false, desc: '日期文字颜色。' },
  { name: '--sc-calendar-title-height', type: 'dimension', default: '44px', required: false, desc: '月份标题高度。' },
  { name: '--sc-calendar-weekday-height', type: 'dimension', default: '30px', required: false, desc: '星期栏高度。' },
  { name: '--sc-calendar-day-size', type: 'dimension', default: '64px', required: false, desc: '日期格子高度。' },
  { name: '--sc-calendar-month-gap', type: 'dimension', default: '20px', required: false, desc: '月份间距。' },
  { name: '--sc-calendar-active-bg', type: 'color', default: '#1677ff', required: false, desc: '选中态背景色。' },
  { name: '--sc-calendar-active-color', type: 'color', default: '#fff', required: false, desc: '选中态文字色。' },
  { name: '--sc-calendar-today-border', type: 'color', default: '#1677ff', required: false, desc: '今天标记点颜色。' },
  { name: '--sc-calendar-other-month', type: 'color', default: '#d1d5db', required: false, desc: '非当月日期文字色。' },
  { name: '--sc-calendar-disabled-opacity', type: 'number', default: '0.3', required: false, desc: '禁用态透明度。' },
  { name: '--sc-calendar-mark-color', type: 'color', default: '#f5f5f7', required: false, desc: '月份水印数字颜色。' },
  { name: '--sc-calendar-header-shadow', type: 'shadow', default: '0 5px 20px rgba(0,0,0,0.05)', required: false, desc: '标题栏阴影。' },
  { name: '--sc-calendar-confirm-height', type: 'dimension', default: '50px', required: false, desc: '确认按钮区高度。' },
  { name: '--sc-calendar-confirm-color', type: 'color', default: '#1677ff', required: false, desc: '确认按钮颜色。' },
];

const tocItems: TOCItem[] = [
  { id: 'props', title: '属性 / Props' },
  { id: 'cssvars', title: 'CSS 变量' },
  { id: 'demo', title: '示例' },
];

const fmt = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

const PopupSingle = () => {
  const pt = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [date, setDate] = createSignal<Date | null>(null);
  return (
    <>
      <Cell title={t('demo.calendarSingle')} value={date() ? fmt(date()!) : '请选择'} clickable onClick={() => setShow(true)} />
      <Calendar show={show()} onUpdateShow={setShow} value={date() || undefined} onChange={(v) => { setDate(v as Date); setShow(false); }} closeable teleport={pt?.()} />
    </>
  );
};

const PopupRange = () => {
  const pt = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [range, setRange] = createSignal<[Date, Date] | null>(null);
  return (
    <>
      <Cell title={t('demo.calendarRange')} value={range() ? `${fmt(range()![0])} ~ ${fmt(range()![1])}` : '请选择'} clickable onClick={() => setShow(true)} />
      <Calendar type="range" showConfirm show={show()} onUpdateShow={setShow} value={range() || undefined} onChange={(v) => { setRange(v as [Date, Date]); }} closeable teleport={pt?.()} />
    </>
  );
};

const PopupColor = () => {
  const pt = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [range, setRange] = createSignal<[Date, Date] | null>(null);
  return (
    <>
      <Cell title={t('demo.customColor')} value={range() ? `${fmt(range()![0])} ~ ${fmt(range()![1])}` : '请选择'} clickable onClick={() => setShow(true)} />
      <Calendar type="range" showConfirm show={show()} onUpdateShow={setShow} value={range() || undefined} onChange={(v) => setRange(v as [Date, Date])} closeable activeColor="#22c55e" dayRender={(d) => d.isToday ? <span style="font-weight:800">今</span> : <>{d.day}</>} teleport={pt?.()} />
    </>
  );
};

// Simulated holiday/special dates
const specialDates: Record<string, { label: string; color: string }> = {};
const now = new Date();
const y = now.getFullYear(), m = now.getMonth() + 1;
// Mark all weekends as "休"
for (let d = 1; d <= 31; d++) {
  const date = new Date(y, m - 1, d);
  if (date.getMonth() + 1 !== m) continue;
  const dow = date.getDay();
  if (dow === 0 || dow === 6) specialDates[`${y}-${m}-${d}`] = { label: '休', color: '#f59e0b' };
}
// Mark some as holidays
specialDates[`${y}-${m}-1`] = { label: '假', color: '#ef4444' };
specialDates[`${y}-${m}-15`] = { label: '假', color: '#ef4444' };

const PopupHoliday = () => {
  const pt = useContext(PhoneTargetContext);
  const [show, setShow] = createSignal(false);
  const [date, setDate] = createSignal<Date | null>(null);
  return (
    <>
      <Cell title={t('demo.calendarHoliday')} value={date() ? fmt(date()!) : '请选择'} clickable onClick={() => setShow(true)} />
      <Show when={date()}><span class={css.result}>{fmt(date()!)}</span></Show>
      <Calendar
        show={show()} onUpdateShow={setShow}
        value={date() || undefined}
        onChange={(v) => { setDate(v as Date); setShow(false); }}
        title="选择日期" closeable
        dayRender={(d) => {
          const key = `${d.year}-${d.month}-${d.day}`;
          const spec = specialDates[key];
          return (
            <span style="display:flex;flex-direction:column;align-items:center;line-height:1.2">
              <span>{d.day}</span>
              {spec && <span style={`font-size:0.65rem;color:${spec.color};font-weight:600`}>{spec.label}</span>}
            </span>
          );
        }}
        teleport={pt?.()}
      />
    </>
  );
};

export const CalendarDocPage = () => {
  const t = useT();
  return (
    <DocLayout>
    <div class={css.page}>
      <h1 class={css.h1}>Calendar 日历</h1>
      <p class={css.intro}>
        {t(\'componentIntro.CalendarIntro\')}
      </p>

      <h2 id="props" class={css.h2}>{t('common.props')}</h2>
      <PropsTable rows={propsData} />

      <h2 id="cssvars" class={css.h2}>{t('common.cssVars')}</h2>
      <p class={css.intro} style="margin-bottom:1rem">通过 <code>:root</code> 或组件 <code>style</code> 覆盖以下变量。</p>
      <PropsTable rows={cssVarRows} />

      <h2 id="demo" class={css.h2}>{t('demo.examples')}</h2>

      <DemoBlock title={t('demo.calendarSingle')} desc="弹出模式，标题自动跟随滚动月份。" code={`const [show, setShow] = createSignal(false);\n\n<Calendar\n  show={show()}\n  onUpdateShow={setShow}\n  value={date()}\n  onChange={(v) => { setDate(v); setShow(false); }}\n  closeable\n/>`}>
        <PopupSingle />
      </DemoBlock>

      <DemoBlock title={t('demo.calendarRange')} desc="range + showConfirm，标题同上动态。若需固定可传 title。" code={`<Calendar\n  type="range"\n  showConfirm\n  show={show()}\n  onUpdateShow={setShow}\n  closeable\n/>`}>
        <PopupRange />
      </DemoBlock>

      <DemoBlock title={t('demo.calendarCustom')} desc="range 模式展示，activeColor 改选中色，dayRender 自定义格子。" code={`<Calendar\n  type="range"\n  showConfirm\n  activeColor="#22c55e"\n  dayRender={(d) => d.isToday ? <strong>今</strong> : d.day}\n  show={show()}\n  onUpdateShow={setShow}\n/>`}>
        <PopupColor />
      </DemoBlock>

      <DemoBlock
        title={t('demo.calendarHoliday')}
        desc="通过 dayRender 自定义格子内容，标记周末和节假日。"
        code={`// 构建特殊日期映射\nconst special = { '2026-6-1': { label: '假', color: '#ef4444' } };\n\n<Calendar\n  dayRender={(d) => {\n    const spec = special[\`$\{d.year}-$\{d.month}-$\{d.day}\`];\n    return (\n      <span>\n        <span>{d.day}</span>\n        {spec && <small style={{color:spec.color}}>{spec.label}</small>}\n      </span>\n    );\n  }}\n  show={show()}\n  onUpdateShow={setShow}\n  title="选择日期"\n/>`}
      >
        <PopupHoliday />
      </DemoBlock>

      <DemoBlock title={t('demo.calendarInline')} desc="popup={false} 直接嵌入页面。" code={'<Calendar popup={false} />'}>
        <Calendar popup={false} />
      </DemoBlock>

      <DemoBlock title={t('demo.calendarLunar')} desc="lunar={true} 启用农历显示，月初显示月名、其他显示日名，节气日显示节气名。" code={'<Calendar popup={false} lunar />'}>
        <Calendar popup={false} lunar />
      </DemoBlock>
    </div>
  </DocLayout>
  );
};
