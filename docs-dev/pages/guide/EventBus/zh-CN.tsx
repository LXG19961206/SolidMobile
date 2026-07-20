import type { JSX } from 'solid-js';
const C = (p: { children: string }) => <code style={{ background: '#f3f4f6', padding: '1px 4px', 'border-radius': '3px', 'font-size': '0.9em' }}>{p.children}</code>;
const S = (p: { children: JSX.Element }) => <strong>{p.children}</strong>;

export default {
  eventbus: {
    title: 'EventBus 事件总线',
    intro: '全局事件总线。所有组件触发内置事件时，除执行原有回调外，还会将结构化事件推送至全局总线。适用于埋点遥测、审计日志、AOP 拦截、开发调试等场景。',
    warning: <><S>本库的 EventBus 定位为拦截与切面，而非通用消息通道。</S><br />它专为<S>埋点遥测、审计日志、AOP 拦截</S>等横切关注点设计，提供一个统一的观测入口。我们不建议用它来做组件间通信、状态同步或事件驱动的业务流转——这些场景请走 props、回调等显式契约。<br />EventBus 在这里的角色是旁路观察者：静默记录发生的一切，不参与、不改变业务逻辑的执行路径。</>,

    demoTitle: '实时事件演示',
    demoDesc: '点击按钮或输入文字，事件日志实时显示在下方：',
    demoHint: '点击按钮或输入文字...',
    quickTitle: '快速开始',
    quickDesc: <>在应用入口调用一次 <C>setEventBusHandler</C>，无需 Provider、无额外依赖。未注册时 <C>emitEvent</C> 仅做一次 null 检查，零运行时开销。</>,

    structTitle: '事件结构',
    structTh1: '字段', structTh2: '类型', structTh3: '说明',
    structComp: '触发事件的组件名',
    structType: '事件类别',
    structPayload: '事件特异数据。不同组件/事件类型的 payload 不同，需根据 component + type 组合窄化类型。详见下方事件一览表。',
    structPropsTitle: '组件触发事件时的 props 快照。',
    structPropsDesc: '这是最容易被忽略但价值最高的字段——你可以从 props 中拿到组件的所有配置信息（placeholder、maxCount、columns、disabled 等），无需额外从组件实例读取。用于遥测时分析「用户是在什么配置下触发了这个事件」。',
    structTimestamp: '事件发生时间的毫秒时间戳（Date.now()）',

    useTitle: '适用场景',
    use1: '埋点 / 遥测 — 利用 event.props 获取组件配置上下文，统计用户行为与组件使用模式',
    use2: '审计日志 — 记录关键操作（提交、确认、删除），合规追溯',
    use3: 'AOP 拦截 — 全局前置/后置处理组件事件，无需侵入业务代码',
    use4: '开发调试 — 注册一个 handler 即可实时查看所有组件交互，无需给每个组件加 log',

    eventsTitle: '可用事件一览',
    eventsDesc: <>下表中的 <S>payload</S> 是 <C>event.payload</C> 的类型。每一条事件同时携带 <S>props</S>（组件 props 快照）和 <S>timestamp</S>。</>,
    eventsTh1: '组件', eventsTh2: '事件类型',

    customTitle: '自定义组件',
    customDesc: <><C>emitEvent</C> 已作为公开 API 导出。你自己的组件也能按 <C>EventBusEvent</C> 签名把结构化事件推送到同一个全局总线。</>,

    notesTitle: '注意事项',
    notes1: '未注册 handler 时 emitEvent 为零开销（仅一次 null 检查）',
    notes2: 'handler 内避免执行耗时操作，建议异步处理',
    notes3: 'event.payload 为事件特异数据（选中值、输入值等），需根据 component/type 自行窄化',
    notes4: 'event.props 为组件触发事件时的 props 快照，可用于遥测获取组件的当前配置',
  },
};
