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
          required
          showError
          validator={(va) => va.length > 10 }
          bind={[val, setVal]}
          clearable
          errorTextAlign="right"
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