import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CalendarMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { useT } from '../../doc-i18n';
import { Calendar } from '../../../src/components/Calendar';

const propsData = [
  { name: 'type', type: "'single' | 'multiple' | 'range'", desc: 'componentProps.calendar.type' },
  { name: 'value', type: 'Date | Date[] | [Date, Date]', desc: 'componentProps.calendar.value' },
  { name: 'onChange', type: '(value) => void', desc: 'componentProps.calendar.onChange' },
  { name: 'minDate', type: 'Date', desc: 'componentProps.calendar.minDate' },
  { name: 'maxDate', type: 'Date', desc: 'componentProps.calendar.maxDate' },
  { name: 'defaultDate', type: 'Date', desc: 'componentProps.calendar.defaultDate' },
  { name: 'firstDayOfWeek', type: 'number', desc: 'componentProps.calendar.firstDayOfWeek' },
  { name: 'activeColor', type: 'string', desc: 'componentProps.calendar.activeColor' },
  { name: 'lunar', type: 'boolean', desc: 'componentProps.calendar.lunar' },
  { name: 'showConfirm', type: 'boolean', desc: 'componentProps.calendar.showConfirm' },
  { name: 'popup', type: 'boolean', desc: 'componentProps.calendar.popup' },
  { name: 'show', type: 'boolean', desc: 'componentProps.calendar.show' },
  { name: 'onUpdateShow', type: '(show) => void', desc: 'componentProps.calendar.onUpdateShow' },
  { name: 'title', type: 'string | JSX.Element', desc: 'componentProps.calendar.title' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const CalendarMobile: Component<CalendarMobileProps> = (props) => {
  const t = useT();
  const [singleVal, setSingleVal] = createSignal<Date>(new Date());
  const [show, setShow] = createSignal(false);
  const [selectedDate, setSelectedDate] = createSignal('');

  return (
    <MobilePreview title="Calendar 日历" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 嵌入式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>嵌入式模式</div>
        <div style={CARD.desc}>popup=false 直接展示日历面板</div>
        <div style={CARD.body}>
          <Calendar
            type="single"
            value={singleVal()}
            onChange={(v) => setSingleVal(v as Date)}
            popup={false}
            activeColor="#1677ff"
          />
        </div>
      </div>

      {/* Popup 模式 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>Popup 弹出模式</div>
        <div style={CARD.desc}>点击触发按钮弹出日历选择</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: selectedDate() || '#9ca3af' }}
            onClick={() => setShow(true)}
          >
            {selectedDate() || '选择日期'}
          </div>
          <Calendar
            type="single"
            show={show()}
            onUpdateShow={setShow}
            title="选择日期"
            showConfirm
            onChange={(v) => setSelectedDate((v as Date).toLocaleDateString('zh-CN'))}
          />
        </div>
      </div>

      {/* 范围选择 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>范围选择 range</div>
        <div style={CARD.desc}>type=range 选择起止日期</div>
        <div style={CARD.body}>
          <Calendar
            type="range"
            popup={false}
            activeColor="#1677ff"
            showConfirm
          />
        </div>
      </div>

      {/* 农历 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>农历显示</div>
        <div style={CARD.desc}>lunar=true 显示农历日期信息</div>
        <div style={CARD.body}>
          <Calendar
            type="single"
            popup={false}
            lunar
            activeColor="#1677ff"
          />
        </div>
      </div>
    </MobilePreview>
  );
};
