import city from './city'
import Picker from '../picker'
import { CityPickerProps } from './types'

export default (props: CityPickerProps) => {
  return (
    <Picker
      { ...props }
      columns={city}
    ></Picker>
  )
}