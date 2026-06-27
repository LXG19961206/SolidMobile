export const nextTick = (cb: Function) => Promise.resolve().then(() => cb())

export const waitUntilNextMicrotask = () => new Promise(resolve => resolve)

export const waitUntilNextMacrotask = () => new Promise(resolve => setTimeout(resolve))




