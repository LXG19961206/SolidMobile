import { JSXElement } from "solid-js"

export const datePickerType = {
  year: 'year',
  month: 'month',
  day: 'day'
} as const

export interface DatePickerProps {

  type: keyof typeof datePickerType

  minDate: string

  maxDate: string

  titie: string | JSXElement

  confirmButtonText: string | JSXElement

  visibleItemCount?: number

  ratio?: number

  optionHeight?: number

  swipeDuration?: number

  useMomentum?: boolean

}