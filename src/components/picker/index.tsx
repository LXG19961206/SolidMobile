import { isArray, isString, range, round, flow, curryRight } from 'lodash'
import { PickerOptions, PickerProps } from './types'
import {
  createEffect,
  createMemo,
  createSignal,
  on,
  For,
  onMount,
  onCleanup,
  mergeProps,
  Index,
  createRenderEffect
} from 'solid-js'
import { Portal } from 'solid-js/web'
import { disabledIOSElasticScroll } from '../../util/dom'
import { FixedQueue } from '../../util/FixedQueue'
import { Millisecond, Second } from '../../dict/time'
import Overlay from '../overlay'
import './index.less'

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

const calcApproximate = curryRight((num: number, lineHeight: number) => round(num / lineHeight) * lineHeight)


const idxRangeFix = (idx: number, maxIdx: number) => {
  return idx < 0 ? 0 : idx > maxIdx ? maxIdx : idx
}

const calcStyle = (
  idx: number,
  currentTranslate: number,
  count: number,
  lineHeight: number,
  disabled: boolean
) => {

  const currentIdx = -parseInt((currentTranslate / lineHeight).toString())

  const levelCount = Math.ceil(0.5 * count)

  if (Math.abs(idx - currentIdx) > levelCount) {

    return { visibility: 'hidden' as const }

  } else if (idx === currentIdx && disabled) {

    return { opacity: 1, "font-weight": 400 }

  } else {
    return {
      transform: `rotate3D(1,0,0,${(idx - currentIdx) * -10}deg)`,
      opacity: disabled ? 0.6 - (Math.abs(idx - currentIdx) * 0.1) : ''
    }
  }
}

const genPlaceHolderItems = (
  placeholders: string | string[],
  index: number,
  isFlat: boolean,
  totalCount: number
): PickerOptions => {
  return ({
    ...{
      text: isString(placeholders) ? placeholders : (placeholders as string[])[index],
      value: ''
    },
    ...(index + 1 < totalCount && !isFlat)
      ? { children: [genPlaceHolderItems(placeholders, index + 1, isFlat, totalCount)] }
      : {}
  })

}

const defaultDuration = 0.4

const moveDuration = 0.05

export default (preProps: PickerProps) => {

  const props = mergeProps({
    swipeDuration: 1,
    ratio: 1.5,
    visibleItemCount: 7,
    cancelText: '取消',
    confirmText: '确认',
    title: '请选择',
    overlay: true,
    optionHeight: (
      getComputedStyle(document.documentElement).getPropertyValue('--solidMobile-picker-content-item-lineHeight') || 50
    ),
  }, preProps)

  const lineHeight = parseFloat(
    props.optionHeight?.toString()
  )

  const [bindValGetter, bindValSetter] = props.bind || []

  const queue = new FixedQueue<[number, number, boolean, number]>(30)

  const colCount = createMemo(() => getColCount(props.columns))

  const [maskEl, setMaskEl] = createSignal<HTMLElement>()

  const [overlay, setOverlay] = createSignal<HTMLElement>()

  const colAccessors = createMemo(
    _ => range(colCount()).map(() => createSignal<PickerOptions[]>([]))
  )

  const idxAccessors = createMemo(
    _ => range(colCount()).map(() => createSignal<number>(0))
  )

  const translateAccessors = createMemo(
    _ => range(colCount()).map((_, idx) => (createSignal<number>(0)))
  )

  const durationAccessors = createMemo(
    _ => range(colCount()).map(() => createSignal<number>(0))
  )

  const allCols = createMemo(_ => colAccessors().map(([getter]) => getter()))

  const allCurrentIdxs = createMemo(_ => idxAccessors().map(([getter]) => getter()))

  const allTranslate = createMemo(_ => translateAccessors().map(([getter]) => getter()))

  const allDuration = createMemo(_ => durationAccessors().map(([getter]) => getter()))

  const [targetIdx, setTargetIdx] = createSignal(0)

  const [currentValue, setCurrentVal] = createSignal(new Array(allCols().length).fill(""))

  const placeHolderItems = createMemo(

    () => allCols().map((col) => {

      const topItemCount = Math.floor(props.visibleItemCount / 2)

      const bottomItemCount = props.visibleItemCount - ((col.length + topItemCount) % props.visibleItemCount)

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

    on([allCurrentIdxs, () => props.columns], () => {

      let currentDepth = 0, isFlat = !isTree(), target = props.columns

      while (currentDepth < colCount()) {

        const [_getter, setter] = colAccessors()[currentDepth]

        const [idxGetter, _] = idxAccessors()[currentDepth]

        const finalIndex = idxRangeFix(
          idxGetter() - +!!props.placeholders, target.length - 1
        )

        if (isFlat) {

          !props.placeholders
            ? setter((props.columns as PickerOptions[][])[currentDepth])
            : setter([
              genPlaceHolderItems(props.placeholders, currentDepth, isFlat, colCount()),
              ...(props.columns as PickerOptions[][])[currentDepth]
            ])

        } else {

          const showPlaceholder = currentDepth === 0 || (allCurrentIdxs()[currentDepth - 1])

          !props.placeholders
            ? setter(target as PickerOptions[])
            : setter([
              genPlaceHolderItems(props.placeholders, currentDepth, false, colCount()),
              ...(showPlaceholder ? target as PickerOptions[] : [])
            ])

          if (currentDepth + 1 <= colCount() && (target as PickerOptions[])[finalIndex]) {

            target = (target as PickerOptions[])[finalIndex].children!

          }

        }

        ++currentDepth

      }

    }))


  colAccessors().forEach(([getter], idx) => {

    createRenderEffect(

      on(getter, (
        newVal: PickerOptions[],
        oldVal: PickerOptions[] | void,
      ) => {

        if (!oldVal) return

        const currentIdx = allCurrentIdxs()[idx]

        if (currentIdx + 1 > newVal.length) {

          durationAccessors()[idx][1](0)

          idxAccessors()[idx][1](newVal.length - 1)

          translateAccessors()[idx][1](
            -lineHeight * currentIdx
          )

          setTimeout(() => {

            durationAccessors()[idx][1](defaultDuration)

            translateAccessors()[idx][1](
              -lineHeight * (newVal.length - 1)
            )

          })

        }
      })
    )
  })


  bindValGetter && createEffect(on(bindValGetter, (
    newVal, oldVal
  ) => {

    if (newVal && newVal.length && !Object.is(newVal, oldVal)) {


      (async function () {

        let i = 0

        while (i < newVal.length) {

          const val = newVal[i]

          const source = allCols()[i]

          const idx = source.findIndex(item => item.value === val)

          if (idx === -1) break

          idxAccessors()[i][1](idx)

          translateAccessors()[i][1](idx * lineHeight * -1)

          i++

          await Promise.resolve()

        }
      })()


    }

  }))


  const pointerDown = (evt: PointerEvent) => {

    setTargetIdx(Math.floor(evt.offsetX / (evt.target as HTMLElement).clientWidth / (1 / colCount())))

    setTimeout(() => setDisabled(false), Millisecond * 50)

    const [__, durationSetter] = durationAccessors()[targetIdx()]

    durationSetter(moveDuration)

    queue.clear()

    lastPosY = evt.clientY

  }


  const setTranslateAndIdx = async (value: number) => {

    const [_, translateSetter] = translateAccessors()[targetIdx()]

    const [__, idxSetter] = idxAccessors()[targetIdx()]

    translateSetter(value)

    idxSetter(-value / lineHeight)

  }

  const pointerMove = (evt: PointerEvent) => {

    if (disabled()) return

    evt.stopPropagation()

    evt.stopImmediatePropagation()

    const chunkDistance = (evt.clientY - lastPosY) * props.ratio

    const [translateGetter, translateSetter] = translateAccessors()[targetIdx()]

    translateSetter(translateGetter() + chunkDistance)

    queue.push([chunkDistance, evt.timeStamp, false, translateGetter()])

    lastPosY = evt.clientY

  }

  const pointerUp = async (evt: PointerEvent) => {

    setTranslateAndIdx(allTranslate()[targetIdx()])

    setDisabled(true)

    const [durationGetter, durationSetter] = durationAccessors()[targetIdx()]

    const useMomentum = (
      queue.length > 2 &&
      queue.tail()[1] - queue.head()[1] < Millisecond * 300
    )

    durationSetter(
      useMomentum ? props.swipeDuration : defaultDuration
    )

    const finalTranslate = flow(momentumCalc, boundaryCalc, disabledFixed)(useMomentum)

    setTranslateAndIdx(finalTranslate)

    !useMomentum && setDisabled(true)

    setCurrentVal(
      allCurrentIdxs().map((selectedIdx, i) => allCols()[i][selectedIdx].value)
    )

    setTimeout(() => {

      const [curItem, curVal] = getCurrentItemAndVal()

      props.onChange?.call(void 0, curItem, curVal)

      bindValSetter?.call(void 0, curVal)

    }, (useMomentum ? durationGetter() : 300 * Millisecond) * 0.5)

    lastPosY = evt.clientY

  }

  const getCurrentItemAndVal = (): [PickerOptions[], (string | number)[]] => {
    return [
      allCols().map((cols, i) => cols[allCurrentIdxs()[i]]),
      currentValue()
    ]
  }


  const boundaryCalc = (
    value: number
  ) => {

    const boundaryBottom = (1 - allCols()[targetIdx()].length) * lineHeight, boundaryTop = 0

    return value > boundaryTop ? boundaryTop : value < boundaryBottom ? boundaryBottom : value

  }

  const disabledFixed = (value: number, isDownDirection?: boolean): number => {

    const currentItems = allCols()[targetIdx()]

    const idx = idxRangeFix(
      value / -lineHeight, currentItems.length - 1
    )

    isDownDirection = isDownDirection || (Math.abs(queue.tail()[3]) - Math.abs(queue.head()[3])) > 0

    if (value > 0) {

      return disabledFixed(0, false)

    } else if (value < currentItems.length * -lineHeight) {

      return disabledFixed(-lineHeight * currentItems.length + lineHeight, true)

    } else if (allCols()[targetIdx()][idx].disabled) {

      return isDownDirection ? disabledFixed(value - lineHeight) : disabledFixed(value + lineHeight)

    } else {

      return value

    }

  }

  const momentumCalc = (
    enableMomentum: boolean
  ): number => {

    const currentTranslate = allTranslate()[targetIdx()];

    if (!enableMomentum) {

      return calcApproximate(currentTranslate, lineHeight)

    } else {

      const [theLastDistance] = queue.tail()

      const [secondLastDistance] = queue.value().slice(-2)[0]

      const lastMove = theLastDistance - secondLastDistance;

      return calcApproximate(currentTranslate - (lastMove) * 5, lineHeight)

    }
  }

  const cancel = () => {
    props.onCancel?.call(void 0, ...getCurrentItemAndVal())
  }

  const confirm = () => {
    props.onConfirm?.call(void 0, ...getCurrentItemAndVal())
  }

  onMount(() => {
    releaser = disabledIOSElasticScroll()
  })

  onCleanup(() => {
    releaser()
  })



  return (
    <>
      <Overlay show={props.overlay}>
        <div ref={setOverlay} class="solidMobile-picker-overlay"></div>
      </Overlay>
      <Portal mount={props.overlay ? overlay() : document.documentElement}>
        <div class="solidMobile-picker">
          <div class="solidMobile-picker-topArea">
            <p
              onClick={cancel}
              class="solidMobile-picker-topArea-cancel"> {props.cancelText}
            </p>
            <p
              class="solidMobile-picker-topArea-title"> {props.title}
            </p>
            <p
              onClick={confirm}
              class="solidMobile-picker-topArea-confirm"> {props.confirmText}
            </p>
          </div>
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
                    "transition-duration": `${allDuration()[i()]}s`,
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
                            style={calcStyle(index(), allTranslate()[i()], props.visibleItemCount, lineHeight, disabled())}
                            classList={{
                              [`${item.className}`]: true,
                              "solidMobile-picker-content-item-disabled": item.disabled,
                              "solidMobile-picker-content-item": true
                            }}> {item.text}
                          </p>
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
      </Portal>
    </>
  )

}