import type { JSX } from 'solid-js';
const C = (p: { children: string }) => <code style={{ background: '#f3f4f6', padding: '1px 4px', 'border-radius': '3px', 'font-size': '0.9em' }}>{p.children}</code>;
const S = (p: { children: JSX.Element }) => <strong>{p.children}</strong>;

export default {
  eventbus: {
    title: 'EventBus',
    intro: 'Global event bus. When any component fires a built-in event, in addition to its original callback, a structured event is also pushed to the global bus. Suitable for telemetry, audit logging, AOP interception, and debugging.',
    warning: <><S>This EventBus is designed for interception and aspect observation, not as a general message channel.</S><br />It is specifically built for cross-cutting concerns like <S>telemetry, audit logging, and AOP interception</S>, providing a unified observation entry point. We do NOT recommend using it for component communication, state synchronization, or event-driven business flows — use props, callbacks, and other explicit contracts for those.<br />EventBus plays the role of a passive observer: silently recording everything that happens, without participating in or altering the execution path of business logic.</>,

    demoTitle: 'Live Event Demo',
    demoDesc: 'Click buttons or type text — event logs appear in real time below:',
    demoHint: 'Tap a button or type...',
    quickTitle: 'Quick Start',
    quickDesc: <>Call <C>setEventBusHandler</C> once at the app entry — no Provider, no extra dependencies. When unregistered, <C>emitEvent</C> only performs a single null check, with zero runtime overhead.</>,

    structTitle: 'Event Structure',
    structTh1: 'Field', structTh2: 'Type', structTh3: 'Description',
    structComp: 'Name of the component that fired the event',
    structType: 'Event category',
    structPayload: 'Event-specific data. Different component/type combinations have different payload shapes — narrow based on component + type. See the event list below.',
    structPropsTitle: 'Props snapshot at the time the event fired.',
    structPropsDesc: "The most overlooked but most valuable field — you can get all configuration info (placeholder, maxCount, columns, disabled, etc.) without reading from a component instance. Use it for telemetry to analyze 'under what configuration did the user trigger this event?'",
    structTimestamp: 'Millisecond timestamp of when the event occurred (Date.now())',

    useTitle: 'Use Cases',
    use1: 'Telemetry — Use event.props to get component configuration context and analyze user behavior patterns',
    use2: 'Audit Logging — Record critical operations (submit, confirm, delete) for compliance traceability',
    use3: 'AOP Interception — Globally pre/post-process component events without modifying business code',
    use4: 'Debugging — Register one handler to observe all component interactions in real time, no per-component logging needed',

    eventsTitle: 'Available Events',
    eventsDesc: <><S>payload</S> in the table below is the type of <C>event.payload</C>. Each event also carries <S>props</S> (component props snapshot) and <S>timestamp</S>.</>,
    eventsTh1: 'Component', eventsTh2: 'Event Type',

    customTitle: 'Custom Components',
    customDesc: <><C>emitEvent</C> is exported as a public API. Your own components can push structured events to the same global bus by following the <C>EventBusEvent</C> signature.</>,

    notesTitle: 'Notes',
    notes1: 'When no handler is registered, emitEvent has zero overhead (a single null check)',
    notes2: 'Avoid long-running operations inside the handler; prefer async processing',
    notes3: 'event.payload is event-specific data — narrow based on component/type',
    notes4: "event.props is the component's props snapshot at event time — useful for telemetry to read current config",
  },
};
