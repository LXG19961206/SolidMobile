import { Component, createSignal } from 'solid-js';
import loading from './assets/loading.svg'
import Button from './components/button'
import Cell, { CellGroup } from './components/cell'
import { Size } from './@types/common';


const App: Component = () => {
  const [size, setSize] = createSignal<Size>('large')
  return (
    <>
      <CellGroup>
        <Cell title="你好" value="solid"></Cell>
        <Cell
          icon={'https://himg.bdimg.com/sys/portraitn/item/public.1.8fb343.gFYvYD3TGlifN2UIGJ3ZOQ'}
          title="旅客居住地"
          value={'插件'}></Cell>
        <Cell
          isLink
          detail="弃我去者，昨日之日不可留，乱我心者，今日之日多烦忧，长风万里宋秋燕，收到即可拉伸就"
          title="旅客详细住址"
          value="海港区秦皇小区83号楼"
        ></Cell>
      </CellGroup>
      <CellGroup isCard>
        <Cell title="你好" value="solid"></Cell>
        <Cell
          icon={'https://himg.bdimg.com/sys/portraitn/item/public.1.8fb343.gFYvYD3TGlifN2UIGJ3ZOQ'}
          title="旅客居住地"
          value={<span> 暂无 </span>}></Cell>
        <Cell
          isLink
          detail="弃我去者，昨日之日不可留，乱我心者，今日之日多烦忧，长风万里宋秋燕，收到即可拉伸就"
          title="旅客详细住址"
          value="海港区秦皇小区83号楼"
        ></Cell>
      </CellGroup>
      <Button onClick={() => setSize('mini')} size={size()} type='success' loadingStatus block>
        正在处理中，请稍等
      </Button>
      <Button onClick={() => setSize('mini')} icon={loading} type='primary'>
        {size}
      </Button>
      <Button
        action={alert.bind(window)}
        type='danger'>
        {size}
      </Button>
    </>
  );
};

export default App;
