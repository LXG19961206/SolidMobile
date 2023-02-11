import CellGroup from "../components/cellGroup"
import Form from "../components/form"
import Input from "../components/input"
import { createSignal } from 'solid-js'
import Button from "../components/button"
import { ValidateRules } from "../components/form/types"

let FormWithGeneric = Form<{ name: string, age: string, gender: number }>

export default () => {

  const [val, setVal] = createSignal({ name: 'tom', age: '20', gender: 1 })

  const rules: ValidateRules = {
    name: [
      [(val) => (val as string).length < 10, '姓名长度必须小于10位'],
      [/^[A-Za-z]{1,}$/, '姓名必须为英文']
    ],
    age: [
      [(age) => (age as number) < 60, '很抱歉，投保人年龄必须小于60岁'],
      [(age, value) => (age as number) > (value.name as string).length, '很抱歉，不能低于被保人年龄'],
      [/^\d{1,3}$/, '请输入合法的年龄'],
    ]
  }

  return (
    <FormWithGeneric
      lazy
      scrollToErr
      showError
      validateOnChange
      errorTextAlign="left"
      ValidateRules={rules}
      bind={[val, setVal]}
    >
      <CellGroup isCard>
        <Input textarea autofocus autosize label="name" showWordLimit maxlength={50}></Input>
        <Input label="age"></Input>
        <Input label="gender"></Input>
        <Input label="otherinfo"></Input>
        <Button
          size="large"
          type="success"
          nativeType="submit"> 提交
        </Button>
      </CellGroup>
    </FormWithGeneric>
  )
}