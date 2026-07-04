import { createSignal, type Component } from 'solid-js';
import { MobilePreview, type ComponentEntry } from '../../../src/doc-utils/mobile/MobilePreview';

export interface DatePickerMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { DatePicker } from '../../../src/components/DatePicker';

const propsData = [
  { name: 'value', type: 'string', desc: '当前值，格式 YYYY-MM-DD 或 YYYY-MM-DD HH:mm:ss（datetime）' },
  { name: 'onChange', type: '(value: string) => void', desc: '值变化回调' },
  { name: 'onConfirm', type: '(value: string) => void', desc: '确认按钮回调' },
  { name: 'onCancel', type: '() => void', desc: '取消按钮回调' },
  { name: 'type', type: "'date' | 'year-month' | 'datetime'", desc: '选择类型，datetime 增加时/分/秒' },
  { name: 'startDate', type: 'string', desc: '范围起点，默认 2014-01-01' },
  { name: 'endDate', type: 'string', desc: '范围终点，默认 2034-12-31' },
  { name: 'disabledDate', type: '(y,m,d) => boolean', desc: '禁用特定日期' },
  { name: 'placeholder', type: 'string', desc: '占位文字' },
  { name: 'title', type: 'string', desc: '面板标题' },
  { name: 'cancelText', type: 'string', desc: '取消按钮文字' },
  { name: 'confirmText', type: 'string', desc: '确认按钮文字' },
  { name: 'visibleItemCount', type: 'number', desc: '可见行数，默认 7' },
  { name: 'show', type: 'boolean', desc: '是否显示面板（受控）' },
  { name: 'onUpdateShow', type: '(show) => void', desc: '面板开关回调' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const DatePickerMobile: Component<DatePickerMobileProps> = (props) => {
  const [showDate, setShowDate] = createSignal(false);
  const [showMonth, setShowMonth] = createSignal(false);
  const [dateVal, setDateVal] = createSignal('');
  const [monthVal, setMonthVal] = createSignal('');
  const [disabledVal, setDisabledVal] = createSignal('');
  const [rangeVal, setRangeVal] = createSignal('');
  const [showDateTime, setShowDateTime] = createSignal(false);
  const [dateTimeVal, setDateTimeVal] = createSignal('');

  return (
    <MobilePreview title="DatePicker 日期选择" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* 年月日 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>年月日选择 date</div>
        <div style={CARD.desc}>滚轮选择年-月-日</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: dateVal() || '#9ca3af' }}
            onClick={() => setShowDate(true)}
          >
            {dateVal() || '请选择日期'}
          </div>
          <DatePicker
            type="date"
            show={showDate()}
            onUpdateShow={setShowDate}
            value={dateVal()}
            onChange={setDateVal}
            onConfirm={(v) => { setDateVal(v); setShowDate(false); }}
            onCancel={() => setShowDate(false)}
            title="选择日期"
          />
        </div>
      </div>

      {/* 年月 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>年月选择 year-month</div>
        <div style={CARD.desc}>滚轮选择年-月，无日列</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: monthVal() || '#9ca3af' }}
            onClick={() => setShowMonth(true)}
          >
            {monthVal() || '请选择年月'}
          </div>
          <DatePicker
            type="year-month"
            show={showMonth()}
            onUpdateShow={setShowMonth}
            value={monthVal()}
            onChange={setMonthVal}
            onConfirm={(v) => { setMonthVal(v); setShowMonth(false); }}
            onCancel={() => setShowMonth(false)}
            title="选择年月"
          />
        </div>
      </div>

      {/* 带禁用日期 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>禁用特定日期</div>
        <div style={CARD.desc}>disabledDate 禁用周末（周六=6, 周日=0）</div>
        <div style={CARD.body}>
          <DatePicker
            type="date"
            value={disabledVal()}
            onChange={setDisabledVal}
            placeholder="周末不可选"
            disabledDate={(y, m, d) => {
              const date = new Date(y, m - 1, d);
              return date.getDay() === 0 || date.getDay() === 6;
            }}
          />
        </div>
      </div>

      {/* 自定义范围 */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>自定义日期范围</div>
        <div style={CARD.desc}>startDate / endDate 限制可选范围</div>
        <div style={CARD.body}>
          <DatePicker
            type="date"
            value={rangeVal()}
            onChange={setRangeVal}
            placeholder="2025年范围内"
            startDate="2025-01-01"
            endDate="2025-12-31"
          />
        </div>
      </div>

      {/* 日期+时间 datetime */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>日期+时间 datetime</div>
        <div style={CARD.desc}>type='datetime' 增加时/分/秒三列，格式 YYYY-MM-DD HH:mm:ss</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: dateTimeVal() || '#9ca3af' }}
            onClick={() => setShowDateTime(true)}
          >
            {dateTimeVal() || '请选择日期时间'}
          </div>
          <DatePicker
            type="datetime"
            show={showDateTime()}
            onUpdateShow={setShowDateTime}
            value={dateTimeVal()}
            onChange={setDateTimeVal}
            onConfirm={(v) => { setDateTimeVal(v); setShowDateTime(false); }}
            onCancel={() => setShowDateTime(false)}
            title="选择日期时间"
          />
        </div>
      </div>
    </MobilePreview>
  );
};
