import { range } from "lodash"
import { getDays } from "../../util/date"
import { ObservableFixedDeque } from "../../util/FixedDeque"
import { Accessor, createSignal, For } from 'solid-js'
import { useTouchMoveY } from "../../hooks/touchMoveY"
import './index.less'

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

  if (!(totalDay % 7)) return totalDay / 7

  const [tempRows, restDays] = [
    Math.floor(totalDay / 7), totalDay % 7
  ]
  
  return 7 - firstDay >= restDays ? tempRows + 1 : tempRows + 2

}

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

export default () => {

  const maxCalcCount = 5

  const [dateSouce, setDateSource] = createSignal<YearMonthAndFirstDay []>([])

  const dateQueue = new ObservableFixedDeque<YearMonthAndFirstDay>(maxCalcCount, setDateSource)

  const [endYear, endMonth] = [2023, 3]

  const [wrapper, setWrapper] = createSignal<HTMLElement>()

  const [translateGetter, translateSetter] = createSignal(0) 

  range(maxCalcCount).forEach((no: number) => (
    dateQueue.addFront(getPreMonthDateInfo(endYear, endMonth, -no))
  ))

  useTouchMoveY(wrapper as Accessor<HTMLElement>, {
    callback({ chunkMove, distance }) {
      translateSetter(translateGetter() + chunkMove)
    }
  })

  return (
    <div 
      ref={setWrapper} 
      class="solidMobile-calendar-wrapper">
      <div
        style={{ transform: `translateY(${translateGetter()}px)` }}
        class="solidMobile-calendar-content">
        <For each={dateSouce()}>
          {
            (item, idx) => (
              <div class="month">
                <For each={range(item[3])}>
                  { () => <span>  </span> }
                </For>
                <For each={range(item[2])}>
                  { (item) => <span> { item + 1 } </span> }
                </For>
              </div>
            )
          }
        </For>
      </div>
    </div>
  )

}