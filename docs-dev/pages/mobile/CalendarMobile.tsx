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
    <MobilePreview title="Calendar" props={propsData} components={props.components} onNavigate={props.onNavigate}>
      {/* Inline */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.calendarInlineTitle')}</div>
        <div style={CARD.desc}>{t('demo.calendarInlineMobileDesc')}</div>
        <div style={CARD.body}>
          <Calendar
            type="single"
            value={singleVal()}
            onChange={(v) => setSingleVal(v as Date)}
            popup={false}
                      />
        </div>
      </div>

      {/* Popup mode */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.calendarPopupTitle')}</div>
        <div style={CARD.desc}>{t('demo.calendarPopupMobileDesc')}</div>
        <div style={CARD.body}>
          <div
            style={{ padding: '12px 16px', border: '1px solid var(--sc-doc-card-border, #e5e7eb)', 'border-radius': '8px', cursor: 'pointer', 'font-size': '0.9rem', color: selectedDate() || '#9ca3af' }}
            onClick={() => setShow(true)}
          >
            {selectedDate() || "Select Date"}
          </div>
          <Calendar
            type="single"
            show={show()}
            onUpdateShow={setShow}
            title="Select Date"
            showConfirm
            onChange={(v) => setSelectedDate((v as Date).toLocaleDateString('en-US'))}
          />
        </div>
      </div>

      {/* Range selection */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.calendarRangeTitle')}</div>
        <div style={CARD.desc}>{t('demo.calendarRangeMobileDesc')}</div>
        <div style={CARD.body}>
          <Calendar
            type="range"
            popup={false}
                        showConfirm
          />
        </div>
      </div>

      {/* Lunar */}
      <div style={CARD.wrapper}>
        <div style={CARD.title}>{t('demo.calendarLunarTitle')}</div>
        <div style={CARD.desc}>{t('demo.calendarLunarMobileDesc')}</div>
        <div style={CARD.body}>
          <Calendar
            type="single"
            popup={false}
            lunar
                      />
        </div>
      </div>
    </MobilePreview>
  );
};
