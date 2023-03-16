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

type YearMonthAndFirstDay = [Year, Month, DayCount, Day]

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

  return [
    retYear, 
    retMonth, 
    getDays(retYear, retMonth),
    new Date(`${retYear}/${retMonth}/1`).getDay(), 
  ]

}

export default () => {

  const maxCalcCount = 5

  const [dateSouce, setDateSource] = createSignal<YearMonthAndFirstDay []>([])

  const dateQueue = new ObservableFixedDeque<YearMonthAndFirstDay>(maxCalcCount, setDateSource)

  const [endYear, endMonth] = [2023, 3]

  const [wrapper, setWrapper] = createSignal<HTMLElement>()

  range(maxCalcCount).forEach((no: number) => (
    dateQueue.addFront(getPreMonthDateInfo(endYear, endMonth, -no))
  ))

  useTouchMoveY(wrapper as Accessor<HTMLElement>, {
    callback({ chunkMove, distance }) {
      console.log(chunkMove, distance)
    }
  })

  return (
    <div ref={setWrapper}>
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
  )

}