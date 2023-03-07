import CityPicker from "../components/cityPicker"
import DatePicker from "../components/datePicker"
import Cascader from "../components/cascader"
import city from "./city"

export default () => {
  return (
    // <CityPicker></CityPicker>
    // <DatePicker 
    //   startDate="2013-05-18"
    //   endDate="2029-05-01"
    // ></DatePicker>
    <Cascader source={city}></Cascader>
  )
}