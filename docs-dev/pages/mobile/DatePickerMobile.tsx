import { createSignal, type Component } from 'solid-js';


import { useT } from '../../doc-i18n';
import { MobilePreview, type ComponentEntry } from '../../doc-utils/mobile/MobilePreview';

export interface DatePickerMobileProps {
  components?: ComponentEntry[];
  onNavigate?: (key: string) => void;
}
import { DatePicker } from '../../../src/components/DatePicker';

const propsData = [
  { name: 'value', type: 'string', desc: 'componentProps.datepicker.value' },
  { name: 'onChange', type: '(value: string) => void', desc: 'componentProps.datepicker.onChange' },
  { name: 'onConfirm', type: '(value: string) => void', desc: 'componentProps.datepicker.onConfirm' },
  { name: 'onCancel', type: '() => void', desc: 'componentProps.datepicker.onCancel' },
  { name: 'type', type: "'date' | 'year-month' | 'datetime'", desc: 'componentProps.datepicker.type' },
  { name: 'startDate', type: 'string', desc: 'componentProps.datepicker.startDate' },
  { name: 'endDate', type: 'string', desc: 'componentProps.datepicker.endDate' },
  { name: 'disabledDate', type: '(y,m,d) => boolean', desc: 'componentProps.datepicker.disabledDate' },
  { name: 'placeholder', type: 'string', desc: 'componentProps.datepicker.placeholder' },
  { name: 'title', type: 'string', desc: 'componentProps.datepicker.title' },
  { name: 'cancelText', type: 'string', desc: 'componentProps.datepicker.cancelText' },
  { name: 'confirmText', type: 'string', desc: 'componentProps.datepicker.confirmText' },
  { name: 'visibleItemCount', type: 'number', desc: 'componentProps.datepicker.visibleItemCount' },
  { name: 'show', type: 'boolean', desc: 'componentProps.datepicker.show' },
  { name: 'onUpdateShow', type: '(show) => void', desc: 'componentProps.datepicker.onUpdateShow' },
];

const CARD = {
  wrapper: { background: 'var(--sc-doc-card-bg, #fff)', 'border-radius': '10px', overflow: 'hidden' as const, 'box-shadow': '0 1px 4px rgba(0,0,0,0.06)', 'margin-bottom': '16px' },
  title: { 'font-size': '0.9rem', 'font-weight': 600, padding: '16px 16px 4px', color: 'var(--sc-doc-card-title, #1f2937)' },
  desc: { 'font-size': '0.8rem', color: 'var(--sc-doc-card-desc, #6b7280)', padding: '0 16px 12px' },
  body: { padding: '0 16px 16px' },
};

export const DatePickerMobile: Component<DatePickerMobileProps> = (props) => {
  const t = useT();
  const [showDate, setShowDate] = createSignal(false);
  const [showMonth, setShowMonth] = createSignal(false);
  const [dateVal, setDateVal] = createSignal('');
  const [monthVal, setMonthVal] = createSignal('');
  const [disabledVal, setDisabledVal] = createSignal('');
  const [rangeVal, setRangeVal] = createSignal('');
  const [showDateTime, setShowDateTime] = createSignal(false);
  const [dateTimeVal, setDateTimeVal] = createSignal('');

  return (
    <MobilePreview title="DatePicker" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Date selection */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.dateSelect')}</div>
        <div style={CARD.desc}>{t('demo.dateSelectDesc')}</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: dateVal() || '#9ca3af' }}
            onClick={() => setShowDate(true)}
          >
            {dateVal() || 'Select date'}
          </div>
          <DatePicker
            type="date"
            show={showDate()}
            onUpdateShow={setShowDate}
            value={dateVal()}
            onChange={setDateVal}
            onConfirm={(v) => { setDateVal(v); setShowDate(false); }}
            onCancel={() => setShowDate(false)}
            title="Select Date"
          />
        </div>
      </div>

      {/* Year-month selection */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.yearMonthSelect')}</div>
        <div style={CARD.desc}>{t('demo.yearMonthSelectDesc')}</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: monthVal() || '#9ca3af' }}
            onClick={() => setShowMonth(true)}
          >
            {monthVal() || 'Select year-month'}
          </div>
          <DatePicker
            type="year-month"
            show={showMonth()}
            onUpdateShow={setShowMonth}
            value={monthVal()}
            onChange={setMonthVal}
            onConfirm={(v) => { setMonthVal(v); setShowMonth(false); }}
            onCancel={() => setShowMonth(false)}
            title="Select Year-Month"
          />
        </div>
      </div>

      {/* Disabled dates */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.disabledDate')}</div>
        <div style={CARD.desc}>{t('demo.disabledDateDesc')}</div>
        <div style={CARD.body}>
          <DatePicker
            type="date"
            value={disabledVal()}
            onChange={setDisabledVal}
            placeholder="Weekends disabled"
            disabledDate={(y, m, d) => {
              const date = new Date(y, m - 1, d);
              return date.getDay() === 0 || date.getDay() === 6;
            }}
          />
        </div>
      </div>

      {/* Custom date range */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.customDateRange')}</div>
        <div style={CARD.desc}>{t('demo.customDateRangeDesc')}</div>
        <div style={CARD.body}>
          <DatePicker
            type="date"
            value={rangeVal()}
            onChange={setRangeVal}
            placeholder="2025-01-01 to 2025-12-31"
            startDate="2025-01-01"
            endDate="2025-12-31"
          />
        </div>
      </div>

      {/* Date & time (datetime) */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.dateTime')}</div>
        <div style={CARD.desc}>{t('demo.dateTimeDesc')}</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: dateTimeVal() || '#9ca3af' }}
            onClick={() => setShowDateTime(true)}
          >
            {dateTimeVal() || 'Select date & time'}
          </div>
          <DatePicker
            type="datetime"
            show={showDateTime()}
            onUpdateShow={setShowDateTime}
            value={dateTimeVal()}
            onChange={setDateTimeVal}
            onConfirm={(v) => { setDateTimeVal(v); setShowDateTime(false); }}
            onCancel={() => setShowDateTime(false)}
            title="Select Date & Time"
          />
        </div>
      </div>
    </MobilePreview>
  );
};
