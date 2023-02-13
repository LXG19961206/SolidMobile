import CellGroup from "../components/cellGroup"
import Form from "../components/form"
import Input from "../components/input"
import { createSignal } from 'solid-js'
import Button from "../components/button"
import { ValidateRules } from "../components/form/types"
import Toast from "../components/toast"

let FormWithGeneric = Form<{ name: string, age: string, gender: number }>

export default () => {

  const [val, setVal] = createSignal({ name: 'tom', age: '20', gender: 1 })

  const rules: ValidateRules = {
    name: [
      {
        validator: /^[a-zA-Z]{1,10}$/,
        errTip: '姓名必须是1-10位的英文字母'
      },
      {
        validator: val => !['admin', 'root', 'sudo'].includes(val as string),
        errTip: (val) => `不能以${val}命名`,
        failCallback () {
          Toast({ message: '姓名未通过检验' })
        }
      }
    ],
    age: [
      {
        validator: val => (val as number) <= 60,
        errTip: '年龄在60岁以上不能参与投保'
      },
    ]
  }

  const rulesGender = [{
    validator: /^[0,1]{1}$/,
    errTip: '性别必须为0或者1'
  }]

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
        <Input label="age" size="large"></Input>
        <Input  rules={rulesGender} label="gender"></Input>
        <Input validator={ val => val.length > 30 } errorText="请输入正确的信息" showError label="otherinfo"></Input>
        <Button
          size="large"
          type="success"
          nativeType="submit"> 提交
        </Button>
      </CellGroup>
    </FormWithGeneric>
  )
}