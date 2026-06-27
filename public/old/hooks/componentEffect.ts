import { onMount, onCleanup, Ref } from 'solid-js'
import { isFunction } from 'lodash'

export const useComponentsEffect = {

  /**
   * 建立一个只在当前组件范围内可以工作的 定时器
   * 组件销毁则自动消除副作用
   */
  setTimeout(...arg: Parameters<typeof setTimeout>) {

    const browserTimerIntance = setTimeout(...arg)

    onCleanup(() => clearTimeout(browserTimerIntance))

  },

  /**
   * 建立一个只在当前组件范围内可以工作的 interval定时器
   * 组件销毁则自动消除副作用
   */
  setInterval(...arg: Parameters<typeof setInterval>) {

    const browserTimerIntance = setInterval(...arg)

    onCleanup(() => clearInterval(browserTimerIntance))

  },

  /**
   * 为元素绑定事件
   * 当组件销毁时候
   */
  addEventListener(

    target: HTMLElement | (() => HTMLElement),

    ...rest: Parameters<typeof document.addEventListener>

  ) {

    onMount(() => {
      const el = isFunction(target) ? target() : target
      el && el.addEventListener(...rest)
    })

    onCleanup(() => {
      const el = isFunction(target) ? target() : target
      el && el.removeEventListener(...rest)
    })

  }
}