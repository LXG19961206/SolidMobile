import { range } from 'lodash/fp'
import { createMemo } from 'solid-js'
import { DatePickerProps } from './types'

const months = range(12), 
      days = range(31),
      thisyear = new Date().getFullYear()

export default (props: DatePickerProps) => {
  
}
