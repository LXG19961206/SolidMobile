import { createSignal } from "solid-js"
import Input from "../components/input"
import Loading from "../components/loading"

export default () => {

  const [val, setVal] = createSignal('')

  return (
    <>
      <Loading 
        color="red" 
        textColor="red" 
        icon={"success"}> 
        { val() } 
      </Loading>
      <Input
        bind={[val, setVal]}
        clearable
        colon
        formatterTrigger="blur"
        formatter={ (val) => val.toUpperCase() }
        maxlength={5}
        placeholder="请输入用户信息"
        label="文本"
      />
    </>
  )

}