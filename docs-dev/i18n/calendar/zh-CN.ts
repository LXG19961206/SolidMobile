export default {
    demo: {
        calendarCustom: '自定义',
        calendarCustomDesc: '自定义颜色和渲染。',
        calendarHoliday: 'Holiday',
        calendarHolidayDesc: '节假日。',
        calendarInline: 'Inline',
        calendarLunar: 'Lunar',
        calendarRange: '范围',
        calendarRangeDesc: '范围选择。',
        calendarSingle: '单选',
        calendarSingleDesc: '单选。',
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
        CalendarIntro: '支持单选和范围选择，默认弹出模式（底部半屏）。也可平铺展示。所有样式通过 CSS 变量控制。'
    },
    cssVars: {
        Calendar: {
            __sc_calendar_active_bg: '选中态背景色。',
            __sc_calendar_active_color: '选中态文字色。',
            __sc_calendar_bg: '日历背景色。',
            __sc_calendar_confirm_color: '确认按钮颜色。',
            __sc_calendar_confirm_height: '确认按钮区高度。',
            __sc_calendar_day_size: '日期格子高度。',
            __sc_calendar_disabled_opacity: '禁用态透明度。',
            __sc_calendar_header_shadow: '标题栏阴影。',
            __sc_calendar_mark_color: '月份水印数字颜色。',
            __sc_calendar_month_gap: '月份间距。',
            __sc_calendar_other_month: '非当月日期文字色。',
            __sc_calendar_text: '日期文字颜色。',
            __sc_calendar_title_height: '月份标题高度。',
            __sc_calendar_today_border: '今天标记点颜色。',
            __sc_calendar_weekday_height: '星期栏高度。'
        }
    },
    demoDesc: {
        calendar_single: '弹出模式，标题自动跟随滚动月份。',
        calendar_range: 'range + showConfirm，标题同上动态。若需固定可传 title。',
        calendar_custom: 'range 模式展示，activeColor 改选中色，dayRender 自定义格子。',
        calendar_holidays: '通过 dayRender 自定义格子内容，标记周末和节假日。',
        calendar_inline: 'popup={false} 直接嵌入页面。',
        calendar_lunar: 'lunar={true} 启用农历显示，月初显示月名、其他显示日名，节气日显示节气名。'
    },
    componentProps: {
        calendar: {
            type: '选择模式：single / range / multiple。',
            value: '当前选中值。',
            onChange: '值变化回调。',
            popup: '弹出模式。设为 false 平铺展示。',
            show: '弹出层受控显示。',
            title: '弹出层标题。',
            closeable: '显示关闭按钮。',
            minDate: '最小可选日期。',
            maxDate: '最大可选日期。',
            firstDayOfWeek: '一周起始日，0=周日。',
            weekdays: '星期标题数组。',
            titleFormatter: '月份标题格式化函数。',
            activeColor: '选中态颜色。',
            dayRender: '日期格子自定义渲染函数。',
            maxCount: '多选最大天数。',
            maxRange: '范围选择最大跨度（天）。',
            showConfirm: '范围模式确认按钮。',
            readonly: '只读。',
            lunar: '中国玩家的浪漫。',
            teleport: '挂载目标。'
        }
    }
};
