import { range, add, pickBy } from "lodash"
import { getDays } from "../../util/date"
import { Accessor, createMemo, createSignal, For, mergeProps, onMount } from 'solid-js'
import ActionSheet from "../actionSheet"
import './index.less'
import { BaseCalendarProps, CalendarTypeDict } from "./types"
import Toast from "../toast"

type Year = number

type Month = number

type Day = number

type DayCount = number

type Rows = number

type YearMonthAndFirstDay = [Year, Month, DayCount, Day, Rows]

const getRows = (
  totalDay: number,
  firstDay: number
): number => {

  if (!firstDay) return Math.ceil(totalDay / 7)

  const [tempRows, restDays] = [Math.floor(totalDay / 7), totalDay % 7]

  return 7 - firstDay >= restDays ? tempRows + 1 : tempRows + 2

}

const inRange = (target: number, min: number, max: number) => (
  target >= min && target <= max
)

const getPreMonthDateInfo = (
  year: number,
  month: number,
  step: number
): YearMonthAndFirstDay => {

  let [retYear, retMonth] = [year, month]

  retYear = retYear + Math.ceil((month + step - 12) / 12)

  retMonth = month + step > 12
    ? (month + step) % 12
    : month + step < 1
      ? 12 + step + retMonth
      : step + retMonth

  const totalDay = getDays(retYear, retMonth)

  const firstDay = new Date(`${retYear}/${retMonth}/1`).getDay()

  return [
    retYear,
    retMonth,
    totalDay,
    firstDay,
    getRows(totalDay, firstDay)
  ]

}

const getItemCount = (
  endYear: number,
  endMonth: number,
  startYear: number,
  startMonth: number
) => ((endYear - startYear) * 12) + (endMonth - startMonth)

const generateSource = (
  endYear: number,
  endMonth: number,
  startYear: number,
  startMonth: number
) => range(
  getItemCount(endYear, endMonth, startYear, startMonth)
).reduce((prev, idx) => [
  getPreMonthDateInfo(endYear, endMonth, -idx),
  ...prev
], [] as YearMonthAndFirstDay[])
 
const weekdays = ['日', '一', '二', '三', '四', '五', '六']

export default (preProps: Partial<BaseCalendarProps>) => {

  const props = mergeProps({
    type: CalendarTypeDict.single,
    maxCount: 5
  }, preProps)

  const [dateSouce, setDateSource] = createSignal<YearMonthAndFirstDay[]>([])

  const [endYear, endMonth] = [2023, 3]

  const [show,setShow] = createSignal(true)

  const [startYear, startMonth] = [2022, 3]

  const [contentEl, setContentEl] = createSignal<HTMLElement>()

  const [wrapper, setWrapper] = createSignal<HTMLElement>()

  const [wrapperMaxHeight, setMaxHeight] = createSignal('inherit')

  const [currentIdx, setCurrtIdx] = createSignal(0)

  const [dateActivedMap, setActiveMap] = createSignal<Record<string, boolean>>({})

  const [dateRangeMap, setDateRangeMap] = createSignal<Record<'start' | 'end', number | null>>({
    start: null, end: null
  })

  const currentDateStr = createMemo(
    () => dateSouce().length ? `${dateSouce()[currentIdx()][0]}年${dateSouce()[currentIdx()][1]}月` : ''
  )

  const refsAccessors = createMemo(
    () => range(dateSouce().length).map(_ => createSignal<HTMLElement>())
  )

  const select = (
    year: number | string,
    month: number | string,
    day: number | string
  ) => {

    const date = `${year}/${month}/${day}`

    if (props.type === CalendarTypeDict.single) {

      setActiveMap({ [date]: true })

    } else if (props.type === CalendarTypeDict.multiple) {

      if (
        !(date in dateActivedMap()) &&
        Object.keys(dateActivedMap()).length >= props.maxCount
      ) {
        return Toast({
          message: `您最多只能选择${props.maxCount}个日期`
        })
      }
      
      setActiveMap(prev => pickBy(
        ({ ...prev, [date]: date in prev ? !prev[date] : true }), Boolean
      ))

    } else {

      const currentRange = dateRangeMap()

      const dateTime = +new Date(date)

      if (currentRange.end && currentRange.start) {

        setDateRangeMap({ start: null, end: null })

        Promise.resolve().then(select.bind(void 0, year, month, day))

      } else if (!currentRange.end && !currentRange.start) {

        setDateRangeMap({ start: +new Date(date), end: null })

      } else if (currentRange.start) {
        
        dateTime >= +new Date(currentRange.start)
          ? setDateRangeMap({ start: currentRange.start, end: dateTime })
          : setDateRangeMap({ end: currentRange.start, start: dateTime })
        
      }

    }

    props.onChange?.call(void 0, [
      ...Object.keys(dateActivedMap()).filter(key => !!dateActivedMap()[key])
    ])

  }

  const rangeTypeDateItems = createMemo<Record<number, boolean>>(() => {

    const currentRange = dateRangeMap()

    if (!currentRange.start && !currentRange.end) {

      return {}

    } else if (!currentRange.end) {

      return {
        [currentRange.start!]: true
      }

    } else {

      let current = currentRange.start, dict: Record<number, boolean> = {}

      while (current! <= currentRange.end) {

        dict[current!] = true

        current! += 86400000
      }

      return dict

    }

  })


  const recalc = (evt: Event) => {

    const allHeight = Array.prototype.map.call(
      (evt.target as HTMLElement).childNodes, item => (item as HTMLElement).clientHeight
    ) as number []

    const allSumHeight = allHeight.map((_, i, arr) => (arr.slice(0, i).reduce(add, 0)))

    const idx = allSumHeight.findIndex((item, i, arr) => (
      inRange((evt.target as HTMLElement).scrollTop, item, arr[i + 1])
    ))

    idx > -1 && setCurrtIdx(idx)

  }

  setDateSource(generateSource(
    endYear, endMonth, startYear, startMonth
  ))

  onMount(() => {

    const parentEl = (wrapper()?.parentElement)

    if (!parentEl) return

    const parentMaxHeight = getComputedStyle(parentEl).maxHeight

    setMaxHeight(
      parentMaxHeight && parentMaxHeight !== 'none' ? 'inherit' : window.innerHeight + 'px'
    )

  })

  return (
    <ActionSheet
      bind={[show, setShow]}
      closeable
      overlay
      lockScroll={false}
      title="日期选择"
      round
    >
      <div
        ref={setWrapper}
        style={{ "max-height": wrapperMaxHeight() }}
        class="solidMobile-calendar-wrapper">
        <div class="solidMobile-calendar-header">
          <p class="solidMobile-calendar-header-title"> {currentDateStr} </p>
          <p class="solidMobile-calendar-header-weekdays">
            <For each={weekdays}>
              {day => (<span> {day} </span>)}
            </For>
          </p>
        </div>
        <div
          ref={setContentEl}
          onScroll={recalc}
          class="solidMobile-calendar-content">
          <For each={dateSouce()}>
            {
              (item, idx) => (
                <div
                  ref={refsAccessors()[idx()][1]}
                  class="solidMobile-calendar-content-item">
                  <p class="solidMobile-calendar-content-item-title">
                    {`${item[0]}年${item[1]}月`}
                  </p>
                  <p class="solidMobile-calendar-content-item-mark">
                    {item[1]}
                  </p>
                  <div
                    class="month">
                    <For each={range(item[2])}>
                      {
                        (dateIdx) => (
                          <span
                            onClick={ () => select(item[0], item[1], dateIdx + 1) } 
                            classList={{ 
                              first: dateRangeMap().start === +new Date(`${item[0]}/${item[1]}/${dateIdx + 1}`),
                              last: dateRangeMap().end === +new Date(`${item[0]}/${item[1]}/${dateIdx + 1}`),
                              range: rangeTypeDateItems()[+new Date(`${item[0]}/${item[1]}/${dateIdx + 1}`)],
                              actived: !!dateActivedMap()[`${item[0]}/${item[1]}/${dateIdx + 1}`]
                            }} > {dateIdx + 1} 
                          </span>
                        )
                      }
                    </For>
                  </div>
                </div>
              )
            }
          </For>
        </div>
      </div>
    </ActionSheet>
  )

}