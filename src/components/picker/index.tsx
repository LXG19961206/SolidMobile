import { isArray, range, add } from 'lodash'
import './index.less'
import { PickerOptions, PickerProps } from './types'
import { createEffect, createMemo, createSignal, on, For, onMount, onCleanup, Setter, Accessor, Index } from 'solid-js'
import { disabledIOSElasticScroll } from '../../util/dom'
import { FixedQueue } from '../../util/FixedQueue'
import { Millisecond, Second } from '../../dict/time'

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



const columns = [
  {
    text: '浙江',
    value: 'Zhejiang',
    children: [
      {
        text: '杭州',
        value: 'Hangzhou',
        children: [
          { text: '西湖区', value: 'Xihu' },
          { text: '余杭区', value: 'Yuhang' },
        ],
      },
      {
        text: '温州',
        value: 'Wenzhou',
        children: [
          { text: '鹿城区', value: 'Lucheng' },
          { text: '瓯海区', value: 'Ouhai' },
        ],
      },
    ],
  },
  {
    text: '福建',
    value: 'Fujian',
    children: [
      {
        text: '福州',
        value: 'Fuzhou',
        children: [
          { text: '鼓楼区', value: 'Gulou' },
          { text: '台江区', value: 'Taijiang' },
        ],
      },
      {
        text: '厦门',
        value: 'Xiamen',
        children: [
          { text: '思明区', value: 'Siming' },
          { text: '海沧区', value: 'Haicang' },
        ],
      },
    ],
  },
];

export default (props: PickerProps) => {

  const lineHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--solidMobile-picker-content-item-lineHeight')
  )

  const swipeDuration = () => props.swipeDuration || Second * 2

  const queue = new FixedQueue<[number, number, boolean]>(30)

  const ratio = () => props.ratio || 2

  const colCount = createMemo(() => getColCount(props.columns))

  const [maskEl, setMaskEl] = createSignal<HTMLElement>()

  const accessors = createMemo(
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

  const allCols = createMemo(_ => accessors().map(([getter]) => getter()))

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

  let disabled = true

  const isTree = () => !isArray(props.columns[0])

  let releaser: () => unknown

  let lastPosY: number = 0

  createEffect(

    on(allCurrentIdxs, (
      oldVal: number[],
      newVal: number[] | void
    ) => {

      if (oldVal && newVal) {

        differAndReset(
          oldVal,
          newVal
        )

      }

      let currentDepth = 0, isFlat = !isTree(), target = props.columns

      while (currentDepth < colCount()) {

        const [_getter, setter] = accessors()[currentDepth]

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

    disabled = false

    queue.clear()

    setTargetIdx(Math.floor(evt.offsetX / (evt.target as HTMLElement).clientWidth / (1 / colCount())))

    lastPosY = evt.clientY

  }

  const pointerMove = (evt: PointerEvent) => {

    if (disabled || (!evt.pressure && !evt.tangentialPressure)) return

    const [__, durationSetter] = durationAccessors()[targetIdx()]

    durationSetter(Millisecond * 300)

    evt.stopPropagation()

    evt.stopImmediatePropagation()

    const chunkDistance = (evt.clientY - lastPosY) * ratio()

    queue.push([chunkDistance, evt.timeStamp, false])

    const [translateGetter, translateSetter] = translateAccessors()[targetIdx()]

    const sumChunkDistance = queue.value()
      .filter(item => !item[2])
      .map(item => item[0])
      .reduce(add, 0)

    if (Math.abs(sumChunkDistance) > lineHeight) {

      translateSetter(translateGetter() + (sumChunkDistance > 0 ? lineHeight : -lineHeight))

      queue.value().forEach(item => item[2] = true)

    }

    lastPosY = evt.clientY

  }

  const pointerUp = (evt: PointerEvent) => {

    disabled = true

    const [translateGetter, translateSetter] = translateAccessors()[targetIdx()]

    if (false && queue.value().length > 2 && evt.timeStamp - queue.getFirst()[1] < 300) {
      

      const [_, durationSetter] = durationAccessors()[targetIdx()]

      durationSetter(swipeDuration())

      let [lastDistance, lastTime] = queue.getLast()

      let [secondLastDistance, secondLastTime] = queue.value().slice(-2)[0]

      let chunkDistance = lastDistance - secondLastDistance,
        chunkTime = lastTime - secondLastTime

      while (chunkTime < swipeDuration()) {
        chunkDistance += 0.9 * chunkDistance
        chunkTime *= 2
      }

      debugger

      translateSetter(translateGetter() + chunkDistance)

    }

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

    setTimeout(releaser)

    const [_, idxSetter] = idxAccessors()[targetIdx()]

    if (value() > 0) {

      setter(lineHeight)

      setTimeout(() => {

        setter(0)

        idxSetter(-(value() / lineHeight))

        disabled = false

      }, Millisecond * 200)

    } else if (value() < -(lineHeight * boundaryVal) + lineHeight) {

      setTimeout(() => {

        setter(-lineHeight * boundaryVal + lineHeight)

        idxSetter(-(value() / lineHeight))

      }, Millisecond * 200)

    } else {

      setter(Math.floor(value() / lineHeight) * lineHeight)

      idxSetter(-(value() / lineHeight))

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
                transform: `translate3D(0,${allTranslate()[i()]}px,0)`
              }}
              class="solidMobile-picker-content">
              {
                <>
                  <Index each={(placeHolderItems()[i()][0])}>
                    {() => (<p class="solidMobile-picker-content-item"></p>)}
                  </Index>
                  <For each={cols}>
                    {item => (<p class="solidMobile-picker-content-item"> {item.text} </p>)}
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