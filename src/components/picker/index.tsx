import { isArray, range, add } from 'lodash'
import './index.less'
import { PickerOptions, PickerProps } from './types'
import { createEffect, createMemo, createSignal, on, For, onMount, onCleanup, Setter, Accessor, Index } from 'solid-js'
import { disabledIOSElasticScroll } from '../../util/dom'
import { FixedQueue } from '../../util/FixedQueue'
import { Millisecond, Second } from '../../dict/time'
import { HTMLNativeEvent } from '../../dict/native'

const getColCount = (cols: PickerProps['columns']) => {
  // if get a empty list, return 0
  if (!cols.length) {

    return 0

  } else if ((cols as Array<unknown>).every(isArray)) {

    return cols.length

  } else {

    let depth = 1, pointer = (cols as PickerOptions[])[0]

    while (pointer && pointer.children) {
      depth += 1
      pointer = pointer.children[0]
    }

    return depth

  }
}

const calcStyle = (
  idx: number,
  currentIdx: number,
  count: number,
  disabled: boolean
) => {

  const levelCount = Math.ceil(0.5 * count)

  if (Math.abs(idx - currentIdx) > levelCount) {

    return { visibility: 'hidden' as const }

  } else if (disabled && idx === currentIdx) {

    return { opacity: 1, "font-weight": 500 }

  } else {
    return {
      transform: `rotate3D(1,0,0,${(idx - currentIdx) * -15}deg)`,
      opacity: 0.6 - (Math.abs(idx - currentIdx) * 0.1)
    }
  }
}

export default (props: PickerProps) => {

  const lineHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--solidMobile-picker-content-item-lineHeight')
  )

  const swipeDuration = () => props.swipeDuration || Second * 1

  const queue = new FixedQueue<[number, number, boolean]>(30)

  const ratio = () => props.ratio || 2

  const colCount = createMemo(() => getColCount(props.columns))

  const [maskEl, setMaskEl] = createSignal<HTMLElement>()

  const colAccessors = createMemo(
    _ => new Array(colCount()).fill(0).map(() => createSignal<PickerOptions[]>([]))
  )

  const idxAccessors = createMemo(
    _ => new Array(colCount()).fill(0).map(() => createSignal<number>(0))
  )

  const translateAccessors = createMemo(
    _ => new Array(colCount()).fill(0).map((_, idx) => (createSignal<number>(0)))
  )

  const durationAccessors = createMemo(
    _ => new Array(colCount()).fill(0).map(() => createSignal<number>(0))
  )

  const itemCount = () => props.visibleItemCount || 7

  const allCols = createMemo(_ => colAccessors().map(([getter]) => getter()))

  const allCurrentIdxs = createMemo(_ => idxAccessors().map(([getter]) => getter()))

  const allTranslate = createMemo(_ => translateAccessors().map(([getter]) => getter()))

  const allDuration = createMemo(_ => durationAccessors().map(([getter]) => getter()))

  const [targetIdx, setTargetIdx] = createSignal(0)

  const placeHolderItems = createMemo(

    () => allCols().map((col) => {

      const topItemCount = Math.floor(itemCount() / 2)

      const bottomItemCount = itemCount() - ((col.length + topItemCount) % itemCount())

      return ([
        range(topItemCount),
        range(bottomItemCount)
      ])

    })
  )

  const [disabled, setDisabled] = createSignal(true)

  const isTree = () => !isArray(props.columns[0])

  let releaser: () => unknown

  let lastPosY: number = 0

  createEffect(

    on(allCurrentIdxs, (
      oldVal: number[],
      newVal: number[] | void
    ) => {

      if (oldVal && newVal && (
        isTree() || props.resetChildrenPos
      )) {

        differAndReset(
          oldVal, newVal
        )

      }

      let currentDepth = 0, isFlat = !isTree(), target = props.columns

      while (currentDepth < colCount()) {

        const [_getter, setter] = colAccessors()[currentDepth]

        const [idxGetter, _idxSetter] = idxAccessors()[currentDepth]

        if (isFlat) {

          setter((props.columns as PickerOptions[][])[currentDepth])

        } else {

          setter(target as PickerOptions[])

          if (currentDepth + 1 <= colCount()) {

            target = (target as PickerOptions[])[idxGetter()].children!

          }

        }

        ++currentDepth

      }

    }))

  const differAndReset = (
    oldVal: number[],
    newVal: number[]
  ) => {

    const changedIdx = newVal.findIndex((item, i) => !Object.is(item, oldVal[i]))
    
    if (changedIdx > -1) {

      idxAccessors().forEach(([_, setter], i) => {
        i > changedIdx && setter(0)
      })

      translateAccessors().forEach(([_, setter], i) => {
        i > changedIdx && setter(0)
      })

    }

  }

  const pointerDown = (evt: PointerEvent) => {

    setTargetIdx(Math.floor(evt.offsetX / (evt.target as HTMLElement).clientWidth / (1 / colCount())))

    setTimeout(() => setDisabled(false), Millisecond * 50)

    const [__, durationSetter] = durationAccessors()[targetIdx()]

    durationSetter(Millisecond * 500)

    queue.clear()

    lastPosY = evt.clientY

  }

  const pointerMove = (evt: PointerEvent) => {

    if (disabled()) return 

    evt.stopPropagation()

    evt.stopImmediatePropagation()

    const chunkDistance = (evt.clientY - lastPosY) * ratio()

    queue.push([chunkDistance, evt.timeStamp, false])

    const [translateGetter, translateSetter] = translateAccessors()[targetIdx()]

    const [_, idxSetter] = idxAccessors()[targetIdx()]

    const sumChunkDistance = queue.value()
      .filter(([_distance, _time, hasCalc]) => !hasCalc)
      .map(([distance]) => distance)
      .reduce(add, 0)

    if (Math.abs(sumChunkDistance) > lineHeight) {

      translateSetter(translateGetter() + (sumChunkDistance > 0 ? lineHeight : -lineHeight))

      idxSetter(-(translateGetter() / lineHeight))

      queue.value().forEach(item => item[2] = true)

    }

    lastPosY = evt.clientY

  }

  const pointerUp = (evt: PointerEvent) => {

    const [translateGetter, translateSetter] = translateAccessors()[targetIdx()]

    boundaryHandle(
      translateSetter,
      translateGetter,
      allCols()[targetIdx()].length
    )

    lastPosY = evt.clientY

  }



  const boundaryHandle = (
    setter: Setter<number>,
    value: Accessor<number>,
    boundaryVal: number
  ) => {

    handleMomentum()

    setTimeout(releaser)

    const [_, idxSetter] = idxAccessors()[targetIdx()]

    if (value() > 0) {

      setter(lineHeight)

      setTimeout(() => {

        setter(0)

        setDisabled(true)

        idxSetter(-(value() / lineHeight))

      }, Millisecond * 200)

    } else if (value() < -(lineHeight * boundaryVal) + lineHeight) {

      setTimeout(() => {

        setter(-lineHeight * boundaryVal + lineHeight)

        setDisabled(true)

        idxSetter(-(value() / lineHeight))

      }, Millisecond * 200)

    } else {

      setter(Math.floor(value() / lineHeight) * lineHeight)

      idxSetter(-(value() / lineHeight))

      setDisabled(true)

    }
  }

  const handleMomentum = () => {

    setDisabled(false)

    if (queue.length < 2) return

    const [theLastDistance, theLastTime] = queue.getLast()

    const [secondLastDistance, _] = queue.value().slice(-2)[0]

    if (
      theLastTime - queue.getFirst()[1] < Millisecond * 300
    ) {

      const lastMove = theLastDistance - secondLastDistance

      const [getter, setter] = translateAccessors()[targetIdx()]

      durationAccessors()[targetIdx()][1](swipeDuration())

      setter((lastMove > 0 ? Math.ceil : Math.floor)((getter() - lastMove * 5) / 50) * 50)

      setTimeout(() => setDisabled(true), swipeDuration() * 0.5)
      
    }
  }

  onMount(() => {
    releaser = disabledIOSElasticScroll()
  })

  onCleanup(() => {
    releaser()
  })



  return (
    <div class="solidMobile-picker">
      <div
        ref={setMaskEl}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerDown={pointerDown}
        class="solidMobile-picker-mask">
      </div>
      <div
        class="solidMobile-picker-reference"></div>
      <For each={allCols()}>
        {
          (cols, i) => (
            <div
              style={{
                flex: `0 0 ${100 / colCount()}%`,
                "transition-duration": `${allDuration()[i()]}ms`,
                transform: `translate3D(0,${allTranslate()[i()]}px,0)`
              }}
              class="solidMobile-picker-content">
              {
                <>
                  <Index each={(placeHolderItems()[i()][0])}>
                    {() => (<p class="solidMobile-picker-content-item"></p>)}
                  </Index>
                  <For each={cols}>
                    {(item, index) => (
                      <p
                        style={ calcStyle( index(), allCurrentIdxs()[i()], itemCount(), disabled() )}
                        class="solidMobile-picker-content-item"> {item.text} </p>
                    )}
                  </For>
                  <Index each={(placeHolderItems()[i()][1])}>
                    {() => (<p class="solidMobile-picker-content-item"></p>)}
                  </Index>
                </>
              }
            </div>
          )
        }
      </For>
    </div>
  )

}