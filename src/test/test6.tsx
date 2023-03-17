import CityPicker from "../components/cityPicker"
import DatePicker from "../components/datePicker"
import Cascader from "../components/cascader"
import city from "./city"
import Calendar from "../components/calendar"
import Switch from '../components/switch'
import { createSignal } from "solid-js"

export default () => {
  const [isChecked, setCheckedStatus] = createSignal(false)
  return (
    <Switch size={35} bind={[isChecked, setCheckedStatus]}></Switch>
    // <Calendar></Calendar>
  )
}