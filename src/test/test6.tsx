import CityPicker from "../components/cityPicker"
import DatePicker from "../components/datePicker"
import Cascader from "../components/cascader"
import city from "./city"
import Calendar from "../components/calendar"
import Switch from '../components/switch'
import { createSignal } from "solid-js"

export default () => {
  const [isChecked, setCheckedStatus] = createSignal(1)
  return (
    <>
      <span> { isChecked() } </span>
      <Switch  
        activedValue={1}
        inactivedValue={0}
        bind={[isChecked, setCheckedStatus]}
      ></Switch>
    </>
    // <Calendar></Calendar>
  )
}