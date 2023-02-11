import CellGroup from "../components/cellGroup"
import Form from "../components/form"
import Input from "../components/input"

export default () => {
  return (
    <Form>
      <CellGroup>
        <Input name="name" label="name"></Input>
        <Input name="age" label="age"></Input>
        <Input name="gender" label="gender"></Input>
        <Input name="otherinfo" label="otherinfo"></Input>
      </CellGroup>
    </Form>
  )
}