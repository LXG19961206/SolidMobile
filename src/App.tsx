import { Component, createSignal } from 'solid-js';
import Button from './components/button'
import Cell, { CellGroup } from './components/cell'
import Icon from './components/icon';
import Title from './components/title';
import Overlay from './components/overlay';
import { Size } from './@types/common';
import Toast from './components/toast';
import ActionSheet from './components/actionSheet';

const App: Component = () => {
  const [size, setSize] = createSignal<Size>('large')
  const [show, setShow] = createSignal<boolean>(true)

  return (
    <>
      {/* <Overlay
        portal={document.getElementById('root')!} 
        show={show()}>
        <CellGroup isCard>
          <Cell
            action={() => setShow(false)} 
            title="你好" value="solid"></Cell>
          <Cell
            icon={<Icon name="shouye" size={16} color="#aaa"></Icon>}
            title="旅客居住地"
            value={'插件'}></Cell>
          <Cell
            isLink
            detail="弃我去者，昨日之日不可留，乱我心者，今日之日多烦忧，长风万里宋秋燕，收到即可拉伸就"
            title="旅客详细住址"
            value="海港区秦皇小区83号楼"
          ></Cell>
        </CellGroup>
      </Overlay> */}
      <ActionSheet
        bind={[show, setShow]}
        closeOnSelect
        overlay 
        closeWhenClickOverlay
        onSelect={console.log.bind(console)}
        round
        items={[
          { name: '去你妈大家' },
          { name: '多擦呈现出', subname: '吃啥' },
          { name: '的撒的阿是撒阿是' },
          { name: '大撒大声地', subname: '啥的' },
        ]}
      >
      </ActionSheet>
      <Title
        fixed
        backArrow
        backAction={ () => Toast({ 
          message: <> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat, tempora! </>, 
          type: 'loading', 
          duration: 30000,
          closeWhenClickOverlay: true,
          overlay: true,
          position: 'bottom'
        }) }
        rightTextOrIcon={<Icon name="shouye"></Icon>}
        leftTextOrIcon='返回'
        background='#fff'
        color='#000'
        zIndex={3}
        placeholder
        title="投保-影像件上传">
      </Title>
      <CellGroup>
        <Cell
          action={() => setShow(true)} 
          title="你好" value="solid"></Cell>
        <Cell
          icon={<Icon name="shouye" size={16} color="#aaa"></Icon>}
          title="旅客居住地"
          value={'插件'}></Cell>
        <Cell
          isLink
          detail="弃我去者，昨日之日不可留，乱我心者，今日之日多烦忧，长风万里宋秋燕，收到即可拉伸就"
          title="旅客详细住址"
          value="海港区秦皇小区83号楼"
        ></Cell>
      </CellGroup>
      <CellGroup>
        <Cell title="你好" value="solid"></Cell>
        <Cell
          icon={<Icon name="shouye" size={16} color="#aaa"></Icon>}
          title="旅客居住地"
          value={'插件'}></Cell>
        <Cell
          isLink
          detail="弃我去者，昨日之日不可留，乱我心者，今日之日多烦忧，长风万里宋秋燕，收到即可拉伸就"
          title="旅客详细住址"
          value="海港区秦皇小区83号楼"
        ></Cell>
      </CellGroup>
      <CellGroup>
        <Cell title="你好" value="solid"></Cell>
        <Cell
          icon={<Icon name="shouye" size={16} color="#aaa"></Icon>}
          title="旅客居住地"
          value={'插件'}></Cell>
        <Cell
          isLink
          detail="弃我去者，昨日之日不可留，乱我心者，今日之日多烦忧，长风万里宋秋燕，收到即可拉伸就"
          title="旅客详细住址"
          value="海港区秦皇小区83号楼"
        ></Cell>
      </CellGroup>
      <CellGroup>
        <Cell title="你好" value="solid"></Cell>
        <Cell
          icon={<Icon name="shouye" size={16} color="#aaa"></Icon>}
          title="旅客居住地"
          value={'插件'}></Cell>
        <Cell
          isLink
          detail="弃我去者，昨日之日不可留，乱我心者，今日之日多烦忧，长风万里宋秋燕，收到即可拉伸就"
          title="旅客详细住址"
          value="海港区秦皇小区83号楼"
        ></Cell>
      </CellGroup>
      <CellGroup
        isCard>
        <Cell
          title={
            <>
              <Icon name="shouye" size={16} color="#ccc"></Icon>您好，ButtonProps
            </>
          }
          value="solid"></Cell>
        <Cell
          icon={'search'}
          title="旅客居住地"
          value={<span> 暂无 </span>}></Cell>
        <Cell
          isLink
          detail={<span>弃我去者，昨日之日不可留，乱我心者，今日之日多烦忧，长风万里宋秋燕，收到即可拉伸就</span>}
          title="旅客详细住址"
          value="海港区秦皇小区83号楼"
        ></Cell>
      </CellGroup>
      <Button
        onClick={() => setSize('mini')} size={"large"} type='success' loadingStatus block>
        正在处理中，请稍等
      </Button>
      <Button
        block
        round
        plain
        onClick={() => setSize('mini')} icon={
          <Icon name="Loading" color='blue' size={20}></Icon>
        } type='primary'>
        点我变小
      </Button>
      <Button
        block
        type='danger'>
        {size}
      </Button>
      <Button
        block
        size="small"
        type='danger'>
        {size}
      </Button>
      <Icon name="search" size={33} color="red"></Icon>
      <Icon name="shouye" size={33} color="red"></Icon>
    </>
  );
};

export default App;
