import { range, zipObject } from 'lodash'
import { createMemo, createSignal, createEffect, on, mergeProps } from 'solid-js'
import { DatePickerProps } from './types'
import Picker from '../picker'

const now = new Date()

const thisYear = now.getFullYear()

const isLeapYear = (year: number) => (!(year % 4) && year % 100) || !(year % 400)

const largeMonth = [1, 3, 5, 7, 8, 10, 12]

const getDays = (
  year: number,
  month: number,
) => (
  isLeapYear(year) && month === 2
    ? 29 : month === 2
      ? 28 : largeMonth.includes(month)
        ? 31 : 30
)

const rangeFix = (
  day: number,
  max: number,
  min: number,
) => {
  return (
    day > min
      ? range(day - min + 1).map((_, idx) => min + idx)
      : day > max
        ? range(max).map((_, idx) => idx + 1)
        : range(day).map((_, idx) => idx + 1)
  )
}



export default (preProps: DatePickerProps) => {

  const props = mergeProps({
    startDate: `${thisYear - 10}-01-01`,
    endDate: `${thisYear + 10}-12-31`,
  }, preProps)

  const startDate = () => props.startDate.split(/-|\/|_|,/)

  const endDate = () => props.endDate.split(/-|\/|_|,/)

  const [date, setDate] = createSignal([thisYear, now.getMonth() + 1, now.getDate()])

  const years = createMemo(() => {
    const [startYear] = startDate(), [endYear] = endDate()
    return range(+endYear - +startYear + 1).map((_, idx) => ({
      text: +startYear + idx + '年',
      value: +startYear + idx
    }))
  })

  const month = createMemo(() => {
    const [year] = date()
    const [maxYear, maxMonth] = endDate()
    const [minYear, minMonth] = startDate()
    return year === +maxYear
      ? range(12)
        .map((item) => ({ text: item + 1 + '月', value: +item + 1 }))
        .filter(item => item.value <= +maxMonth)
      : year === +minYear
        ? range(12)
          .map((item) => ({ text: item + 1 + '月', value: +item + 1 }))
          .filter(item => item.value >= +minMonth)
        : range(12)
          .map((item) => ({ text: item + 1 + '月', value: +item + 1 }))
  })

  const day = createMemo(() => (
    rangeFix(
      getDays(date()[0], date()[1]),
      endDate().slice(0, 2).every((item, i) => +item === +date()[i]) ? +endDate()[2] : 31,
      startDate().slice(0, 2).every((item, i) => +item === +date()[i]) ? +startDate()[2] : 1,
    ).map(item => ({ value: item, text: item + '日' }))
  ))

  createEffect(on(date, ([year, month, day], oldVal) => {
    if (
      oldVal
      && [year, month, day].every((item, i) => Object.is(item, oldVal[i]))
    ) {
      setDate([year, month, day])
    }
  }, { defer: true }))




  return (
    <Picker
      bind={[date, setDate]}
      placeholders="请选择"
      resetChildrenPos
      columns={[years(), month(), day()]}
    ></Picker>
  )
}
