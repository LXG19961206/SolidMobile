import { eq, get, range, throttle, add } from "lodash"
import { getDays } from "../../util/date"
import { ObservableFixedDeque } from "../../util/FixedDeque"
import { Accessor, createMemo, createSignal, For } from 'solid-js'
import { useTouchMoveY } from "../../hooks/touchMoveY"
import './index.less'
import { useComponentsEffect, useBanZoom } from "../../hooks"
import { HTMLNativeEvent } from "../../dict/native"
import { Second } from "../../dict/time"
import ActionSheet from "../actionSheet"

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
  target >= min && target < max
)

const getPreMonthDateInfo = (
  year: number,
  month: number,
  step: number
): YearMonthAndFirstDay => {

  let [retYear, retMonth] = [year, month]

  retYear = Math.floor(retYear + step / 12)

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
], [] as YearMonthAndFirstDay[]
)

const weekdays = ['日', '一', '二', '三', '四', '五', '六']


export default () => {

  useBanZoom()

  const [show,setShow] = createSignal(true)

  const [dateSouce, setDateSource] = createSignal<YearMonthAndFirstDay[]>([])

  const [endYear, endMonth] = [2023, 3]

  const [startYear, startMonth] = [2022, 3]

  const [wrapper, setWrapper] = createSignal<HTMLElement>()

  const [currentIdx, setCurrtIdx] = createSignal(0)

  const currentDateStr = createMemo(
    () => dateSouce().length ? `${dateSouce()[currentIdx()][0]}年${dateSouce()[currentIdx()][1]}月` : ''
  )

  const refsAccessors = createMemo(
    () => range(dateSouce().length).map(_ => createSignal<HTMLElement>())
  )

  const allEls = createMemo(() => refsAccessors().map(([getter]) => getter()))

  const allClientHeight = createMemo(() => allEls().map(item => () => get(item, 'clientHeight')))

  useComponentsEffect.addEventListener(

    wrapper as Accessor<HTMLElement>,

    HTMLNativeEvent.scroll,

    throttle((evt) => {

      const allHeight = allEls().map(item => get(item, 'clientHeight', 0))

      const allSumHeight = allHeight.map((_, i, arr) => (arr.slice(0, i).reduce(add, 0)))

      setCurrtIdx(
        allSumHeight.findIndex((item, i, arr) => (
          inRange((evt.target as HTMLElement).scrollTop, item, arr[i + 1])
        ))
      )

    }, Second * 0.2)
  )


  setDateSource(generateSource(
    endYear, endMonth, startYear, startMonth
  ))

  return (
    <ActionSheet
      bind={[show,setShow]}
      overlay
      lockScroll={false}
      title="日期选择"
      round
    >
      <div
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
          ref={setWrapper}
          style={{ "max-height": window.innerHeight + 1 + 'px' }}
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
                    <For each={range(item[3])}>
                      {() => <span>  </span>}
                    </For>
                    <For each={range(item[2])}>
                      {(item) => <span> {item + 1} </span>}
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