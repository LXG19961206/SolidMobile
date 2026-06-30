import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface CalendarMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { Calendar } from '../../../src/components/Calendar';

const propsData = [
  { name: 'type', type: "'single' | 'multiple' | 'range'", desc: '选择模式，默认 single' },
  { name: 'value', type: 'Date | Date[] | [Date, Date]', desc: '当前值，按 type 不同' },
  { name: 'onChange', type: '(value) => void', desc: '值变化回调' },
  { name: 'minDate', type: 'Date', desc: '最小可选日期' },
  { name: 'maxDate', type: 'Date', desc: '最大可选日期' },
  { name: 'defaultDate', type: 'Date', desc: '默认展示月份' },
  { name: 'firstDayOfWeek', type: 'number', desc: '一周起始日，0=周日' },
  { name: 'activeColor', type: 'string', desc: '选中态颜色' },
  { name: 'lunar', type: 'boolean', desc: '显示农历' },
  { name: 'showConfirm', type: 'boolean', desc: '显示确认按钮' },
  { name: 'popup', type: 'boolean', desc: '弹出层模式，默认 true' },
  { name: 'show', type: 'boolean', desc: '弹出层显示（受控）' },
  { name: 'onUpdateShow', type: '(show) => void', desc: '弹出层关闭回调' },
  { name: 'title', type: 'string | JSX.Element', desc: '弹出层标题' },
];

const CARD = {
  wrapper: { background: '#fff', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: '#1f2937' },
  desc: { 'font-size': '0.8rem', color: '#6b7280', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const CalendarMobile: Component<CalendarMobileProps> = (props) => {
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
            style={{ padding: '12px 16px', border: '1px solid #e5e7eb', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: selectedDate() || '#9ca3af' }}
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
