import type { LocaleMessages } from './types';
export { FALLBACK_LOCALE } from './types';

/**
 * Built-in component-runtime translation dictionaries.
 *
 * Only contains keys consumed by components at runtime (button labels,
 * placeholders, status text, etc.).  Doc-site strings live in
 * `docs-dev/doc-dictionaries.ts`.
 */
export const messages: LocaleMessages = {
  'zh-CN': {
    component: {
      picker: {
        cancel: '取消',
        confirm: '确认',
        select: '请选择',
        selectDate: '选择日期',
        selectTime: '选择时间',
      },
      datePicker: {
        panelTitle: '选择日期',
        placeholder: '请选择日期',
        units: { year: '年', month: '月', day: '日' },
      },
      cityPicker: {
        title: '选择地区',
        placeholder: '请选择地区',
      },
      timePicker: {
        placeholder: '请选择时间',
      },
      cascader: {
        placeholder: '请选择',
      },
      list: {
        loading: '加载中...',
        finished: '没有更多了',
        empty: '暂无数据',
        error: '加载失败，点击重试',
      },
      loading: { label: '加载中' },
      stepper: { decrement: '减', increment: '加' },
      tag: { close: '关闭' },
      dialog: {
        confirmText: '确认',
        cancelText: '取消',
      },
      select: {
        placeholder: '请选择',
      },
      upload: {
        upload: '上传',
        addFile: '添加文件',
        pending: '等待上传',
        uploading: '上传中',
        done: '已完成',
        error: '上传失败',
        retry: '重试',
      },
      pullRefresh: {
        pulling: '下拉刷新',
        loosing: '释放刷新',
        loading: '刷新中...',
        success: '刷新成功',
      },
      calendar: {
        confirmText: '确定',
        confirmDisabledText: '请选择日期范围',
      },
    },
  },

  'en-US': {
    component: {
      picker: {
        cancel: 'Cancel',
        confirm: 'Confirm',
        select: 'Please select',
        selectDate: 'Select Date',
        selectTime: 'Select Time',
      },
      datePicker: {
        panelTitle: 'Select Date',
        placeholder: 'Please select a date',
        units: { year: '', month: '', day: '' },
      },
      cityPicker: {
        title: 'Select Region',
        placeholder: 'Please select a region',
      },
      timePicker: {
        placeholder: 'Please select a time',
      },
      cascader: {
        placeholder: 'Please select',
      },
      list: {
        loading: 'Loading...',
        finished: 'No more',
        empty: 'No data',
        error: 'Load failed, tap to retry',
      },
      loading: { label: 'Loading' },
      stepper: { decrement: 'Decrease', increment: 'Increase' },
      tag: { close: 'Close' },
      dialog: {
        confirmText: 'OK',
        cancelText: 'Cancel',
      },
      select: {
        placeholder: 'Please select',
      },
      upload: {
        upload: 'Upload',
        addFile: 'Add File',
        pending: 'Pending',
        uploading: 'Uploading',
        done: 'Completed',
        error: 'Upload Failed',
        retry: 'Retry',
      },
      pullRefresh: {
        pulling: 'Pull to refresh',
        loosing: 'Release to refresh',
        loading: 'Refreshing...',
        success: 'Refresh successful',
      },
      calendar: {
        confirmText: 'OK',
        confirmDisabledText: 'Select a date range',
      },
    },
  },
};
