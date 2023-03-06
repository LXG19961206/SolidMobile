export const HTMLNativeEvent = {
  click: 'click',
  mouseover: 'mouseover',
  keyup: 'keyup',
  keydown: 'keydown',
  focus: 'focus',
  blur: 'blur',
  scroll: 'scroll',
  input: 'input',
  change: 'change',
  resize: 'resize',
  load: 'load',
  error: 'error',
  touchStart: 'touchstart',
  pointerDown: 'pointerdown',
  pointerMove: 'pointermove',
  pointerUp: 'pointerup',
  touchEnd: 'touchend',
  drag: 'drag',
  touchMove: 'touchmove',
  popstate: 'popstate',
  visibilitychange: 'visibilitychange',
  pagehide: 'pagehide',
  pageshow: 'pageshow'
  // TODO
} as const

export const JavaScriptNativeType = {
  string: 'string',
  number: 'number',
  function: 'function',
  object: 'object'
}