export default {
  eventbus: {
    title: 'EventBus',
    intro: 'solid-mobile includes a lightweight event bus. Every component emits events on key operations (Picker selection, Button clicks, Form submits, etc.). Register a global handler to intercept for logging, analytics, or automated testing.',
    handlerTitle: 'Global Event Handler',
    handlerDesc: 'Register a global callback via setEventBusHandler(). All component emitEvent() calls pass through this function.',
    logTitle: 'Default Behavior',
    logDesc: 'Without a handler, events are only emitted internally. Set a handler to intercept all events and decide what to do with them.',
    phoneTitle: 'Phone Preview — Live Event Log',
    phoneDesc: 'Click the controls below — event logs appear in real time. Each log entry shows component name, event type, and payload:',
    component: 'Component',
    event: 'Event',
    detail: 'Detail',
    time: 'Time',
    clear: 'Clear',
    clickMe: 'Click Me',
  },
};
