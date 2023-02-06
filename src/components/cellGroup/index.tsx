import "./index.less"
import { CellGroupProps } from './types'

export default (props: CellGroupProps) => {
  return (
    <div classList={{
      "solidMobile-cell-group": true,
      "solidMobile-cell-group-card": props.isCard
    }}>
      {<> {props.children} </>}
    </div>
  )
}