import { createSignal } from "solid-js"
import Input from "../components/input"
import { CellGroup } from '../components/cell'
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

      <CellGroup>
        <Input
          bind={[val, setVal]}
          leftIcon="Loading"
          clearable
          autofocus
          onClickLeftIcon={() => console.log(123)}
          formatter={(val) => val.toUpperCase()}
          maxlength={5}
          placeholder="请输入用户信息"
          label="文本"
        />
        <Input
          bind={[val, setVal]}
          leftIcon="Loading"
          clearable
          autofocus
          onClickLeftIcon={() => console.log(123)}
          formatter={(val) => val.toUpperCase()}
          maxlength={5}
          placeholder="请输入用户信息"
          label="文本"
        />
        <Input
          bind={[val, setVal]}
          leftIcon="Loading"
          clearable
          autofocus
          onClickLeftIcon={() => console.log(123)}
          formatter={(val) => val.toUpperCase()}
          maxlength={5}
          placeholder="请输入用户信息"
          label="文本"
        />
      </CellGroup>
      <Button
        size="large"> hello world </Button>
    </>
  )

}