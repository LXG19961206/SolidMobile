import { createSignal } from "solid-js"
import Input from "../components/input"
import CellGroup from '../components/cellGroup'
import Loading from "../components/loading"
import Button from "../components/button"

import { upperCase } from 'lodash'

export default () => {

  const [val, setVal] = createSignal('')

  return (
    <>
      <Loading
        color="red"
        textColor="red"
        icon={"success"}>
        {val()}
      </Loading>

      <CellGroup isCard>
        <Input
          autosize
          textarea
          required
          showWordLimit
          maxlength={30}
          showError
          errorText="请输入正确的身份证号"
          clearable
          validator={[/^\d{10,18}$/]}
          bind={[val, setVal]}
          autofocus
          onClickLeftIcon={() => console.log(123)}
          formatter={(val) => val.toUpperCase()}
          placeholder="请输入用户信息"
          label="文本"
        />
        <Input
          leftIcon="Loading"
          clearable
          maxlength={5}
          autofocus
          onClickLeftIcon={() => console.log(123)}
          formatter={(val) => val.toUpperCase()}
          placeholder="请输入用户信息"
          label="文本"
        />
        <Input
          bind={[val, setVal]}
          leftIcon="Loading"
          clearable
          autofocus
          maxlength={7}
          onClickLeftIcon={() => console.log(123)}
          formatter={(val) => val.toUpperCase()}
          placeholder="请输入用户信息"
          label="文本"
        />
      </CellGroup>
      <Button
        size="large"> hello world </Button>
    </>
  )

}