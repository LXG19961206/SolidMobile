export default {
    demo: {
        calendarCustom: 'Custom',
        calendarCustomDesc: 'Custom color & render.',
        calendarHoliday: 'Holiday',
        calendarHolidayDesc: 'Holidays.',
        calendarInline: 'Inline',
        calendarLunar: 'Lunar',
        calendarRange: 'Range',
        calendarRangeDesc: 'Range select.',
        calendarSingle: 'Single',
        calendarSingleDesc: 'Single select.',
        calendarInlineTitle: 'Inline Mode',
        calendarInlineMobileDesc: 'popup=false displays calendar panel directly',
        calendarPopupTitle: 'Popup Mode',
        calendarPopupMobileDesc: 'Click trigger button to show calendar picker',
        calendarRangeTitle: 'Range Selection',
        calendarRangeMobileDesc: 'type=range select start and end dates',
        calendarLunarTitle: 'Lunar Display',
        calendarLunarMobileDesc: 'lunar=true shows lunar calendar info'
    },
    componentIntro: {
        CalendarIntro: 'Date picker with single and range selection. Popup or inline mode.'
    },
    nav: {
        calendar: 'Calendar'
    },
    cssVars: {
        Calendar: {
            __sc_calendar_active_bg: 'Calendar selected date background.',
            __sc_calendar_active_color: 'Calendar selected date text color.',
            __sc_calendar_bg: 'Calendar background color.',
            __sc_calendar_confirm_color: 'Calendar confirm button color.',
            __sc_calendar_confirm_height: 'Calendar confirm button area height.',
            __sc_calendar_day_size: 'Calendar day cell height.',
            __sc_calendar_disabled_opacity: 'Calendar disabled state opacity.',
            __sc_calendar_header_shadow: 'Calendar header shadow.',
            __sc_calendar_mark_color: 'Calendar month watermark number color.',
            __sc_calendar_month_gap: 'Calendar month spacing.',
            __sc_calendar_other_month: 'Calendar non-current month text color.',
            __sc_calendar_text: 'Calendar date text color.',
            __sc_calendar_title_height: 'Calendar month title height.',
            __sc_calendar_today_border: 'Calendar today marker dot color.',
            __sc_calendar_weekday_height: 'Calendar weekday row height.'
        }
    },
    demoDesc: {
        calendar_single: 'Popup mode with title auto-following the month.',
        calendar_range: 'Range mode with confirm. Title is dynamic; pass title for fixed text.',
        calendar_custom: 'Range mode. activeColor for selection, dayRender for custom cells.',
        calendar_holidays: 'Use dayRender to mark weekends and holidays.',
        calendar_inline: 'Use popup={false} to embed inline.',
        calendar_lunar: 'Enable lunar calendar with lunar={true}. Shows month name on first day, solar terms on term days.'
    },
    componentProps: {
        calendar: {
            type: 'Selection mode: single / range / multiple.',
            value: 'Current value.',
            onChange: 'Value change callback.',
            popup: 'Popup mode. Set false to display inline.',
            show: 'Controlled popup visibility.',
            title: 'Popup title.',
            closeable: 'Show close button.',
            minDate: 'Minimum selectable date.',
            maxDate: 'Maximum selectable date.',
            firstDayOfWeek: 'First day of week, 0=Sunday.',
            weekdays: 'Weekday label array.',
            titleFormatter: 'Month title formatter function.',
            activeColor: 'Active color.',
            dayRender: 'Custom day cell render function.',
            maxCount: 'Max days for multi-select.',
            maxRange: 'Max span in days for range.',
            showConfirm: 'Show confirm button for range mode.',
            readonly: 'Readonly.',
            lunar: '中国玩家的浪漫。',
            teleport: 'Mount target.'
        }
    },
    component: {
        calendar: {
            weekdays: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
            titleFormatter: null,
            startLabel: 'Start',
            endLabel: 'End',
            confirm: 'OK',
            confirmDisabled: 'Select a date range',
            placeholder: 'Select Date'
        }
    }
};
