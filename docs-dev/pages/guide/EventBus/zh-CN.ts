export default {
  eventbus: {
    title: 'EventBus 事件总线',
    intro: 'solid-mobile 内置了一个轻量的事件总线，所有组件在关键操作时都会发出事件（Picker 选择、Button 点击、Form 提交等）。你可以注册全局处理器来监听、日志记录、埋点上报，或做自动化测试。',
    handlerTitle: '全局事件处理器',
    handlerDesc: '通过 setEventBusHandler() 注册一个全局回调。所有组件的 emitEvent() 调用都会经过这个函数。',
    logTitle: '默认日志行为',
    logDesc: '不设置处理器时，事件只会通过内部 emitEvent 输出，不做额外处理。设置处理器后可以拦截所有事件并自行决定如何处理。',
    phoneTitle: '手机预览 — 实时事件日志',
    phoneDesc: '点击下方按钮操作组件，事件日志会实时显示在下方。每条日志包含组件名、事件类型和详细 payload：',
    component: '组件',
    event: '事件',
    detail: '详情',
    time: '时间',
    clear: '清空',
    clickMe: '点我',
  },
};
