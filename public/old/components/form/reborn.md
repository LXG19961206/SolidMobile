### 关于状态的传递

在我理解上，

form 是一个自上而下管理其下面诸多 控件的组件

每个 form-item 可能是 input , 可能是 picker ， 可能是 radio ， 可能是 checkbox 种类繁多

对于非受控表单，比如用户只写了

```jsx
<Form model={formValue}/>
```

那么意味着其下所有控件的值 ，都在读取 和 不断修改着 formValue 里面的某个字段

这个过程涉及到了越级

比如用户可能在 input 外面包个 cell ，包个 div ，甚至他自定义的组件

我们把一个 form 视为一个完整的数据 scope， 我认为这里采用 context 比较好，

form 子孙组件要反复读写 Form 的状态，而且层级不确定

form 要自上而下地管理其下所有子控件的状态，子控件负责交互

### 关于组件自管理

非受控方式下，开发者可能编写出这样的代码

```jsx
<Form>
    <Input value={value} onChange={xxx}></Input>
</Form>
```

此时 form 身上的一些校验和值收集还要不要做，还是完全交给子组件自己去搞

### 关于 FormItem

我之前没有实现这个属性好像，是通过逻辑把职能放到 具体的 表单组件上了，但是业界通用的玩法好像都有这一层，我们可以加上

我目前想到要实现的

form

form-item

input

textarea

radio and group

checkbox and group

select 有了 picker 是否还做

date-picker 无非就是 picker 指定数据源的变种罢了

upload