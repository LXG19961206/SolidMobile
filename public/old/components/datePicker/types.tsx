import { PickerProps } from "../picker/types";

export const datePickerType = {
  year: 'year',
  month: 'month',
  day: 'day'
} as const


export interface DatePickerProps extends PickerProps {
  type?: keyof typeof datePickerType,
  startDate?: `${string}-${string}-${string}`,
  endDate?: `${string}-${string}-${string}`,
}