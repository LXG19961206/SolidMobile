import CellGroup from "../components/cellGroup"
import Form from "../components/form"
import Input from "../components/input"
import { createSignal } from 'solid-js'

let FormWithGeneric = Form<{ name: string, age: string, gender: number }>

export default () => {

  const [val, setVal] = createSignal({ name: 'tom', age: '20', gender: 1 })

  return (
    <FormWithGeneric
      bind={[val, setVal]}
      lazy>
      <CellGroup>
        <Input name="name" label="name"></Input>
        <Input name="age" label="age"></Input>
        <Input name="gender" label="gender"></Input>
        <Input name="otherinfo" label="otherinfo"></Input>
      </CellGroup>
    </FormWithGeneric>
  )
}