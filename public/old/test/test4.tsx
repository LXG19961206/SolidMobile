import { Col, Row } from "../components/layout"
import Button from "../components/button"
export default () => {
  return (
    <>
      <Row gutter={20}>
        <Col span={8}>
          <Button size="large" type="success"> hello world </Button>
        </Col>
        <Col span={8}>
          <Button size="large" type="success"> hello world </Button>
        </Col>
        <Col span={8}>
          <Button size="large" type="success"> hello world </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button size="large" type="primary"> hello world </Button>
        </Col>
        <Col span={12}>
          <Button size="large" type="danger"> hello world </Button>
        </Col>
        <Col span={12}>
          <Button size="large" type="warning"> hello world </Button>
        </Col>
        <Col span={12} offset={12}>
          <Button size="large" type="warning"> hello world </Button>
        </Col>
      </Row>
    </>
  )
}