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
    <Cascader 
      title={ <span style={{"font-weight": 300}}> 城市选择 </span> }
      closeable
      color="red"
      onChange={console.log.bind(console)}
      source={city}></Cascader>
  )
}