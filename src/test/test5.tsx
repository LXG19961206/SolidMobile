import "./test.less"
import { createSignal, createEffect, onMount } from 'solid-js'
import Toast from "../components/toast"
import picker from "../components/picker"
import { SimpleQueue } from "../util/simpleQueue"

export default () => {

  const [el, setEl] = createSignal<HTMLDivElement>()

  const [translate, setTranslate] = createSignal<number>(0)

  const [translate2, setTranslate2] = createSignal<number>(0)

  const [currentIndex, setIndex] = createSignal(0)

  const [duration, setDuration] = createSignal(500)

  const [duration2, setDuration2] = createSignal(500)


  let lastPos = 0
  let distance = 0
  let start = false

  let currentTargetIndex = 0
  
  const queue = new SimpleQueue<[number, number]>(60)

  onMount(() => {

    document.documentElement.addEventListener('touchstart', (e) => {
      e.preventDefault()
    }, { passive: false })
    document.documentElement.addEventListener('touchmove', (e) => {
      e.preventDefault()

    }, { passive: false })
    document.documentElement.addEventListener('touchend', (e) => {
      e.preventDefault()

    }, { passive: false })


    el()?.addEventListener('pointerdown', (evt) => {

     currentTargetIndex = Math.ceil(
       evt.offsetX / (evt.target as HTMLElement).clientWidth / 0.5 )
     

      currentTargetIndex === 1 ? setDuration(500) : setDuration2(500)
      evt.stopPropagation()
      evt.stopImmediatePropagation()
      start = true
      lastPos = evt.clientY
    })

    el()?.addEventListener('pointermove', (evt) => {

      evt.stopPropagation()

      evt.stopImmediatePropagation()

      if (!start) return


      distance += (evt.clientY - lastPos) * 2.5

      queue.push([ distance, evt.timeStamp])

      if (distance > 0) {
        distance = 200
        start = false
        setTimeout(() => {
          distance = 0
         currentTargetIndex === 1 ? setTranslate(distance) :setTranslate2(distance)
        }, 200)
      }

      if (distance < -50 * 99) {
        distance = -50 * 99 - 200
        setTimeout(() => {
          distance = -50 * 99
         currentTargetIndex === 1 ? setTranslate(distance) :setTranslate2(distance)
        }, 200)
      }

      currentTargetIndex === 1 ? setTranslate(Math.floor(distance / 50) * 50) :setTranslate2(Math.floor(distance / 50) * 50)


      lastPos = evt.clientY

    })

    el()?.addEventListener('pointerup', (evt) => {

      currentTargetIndex === 1 ? setDuration(1500) : setDuration2(1500)

      let value = queue.value()

      if (value.length > 2) {

        const [d, t] = queue.getLast()

        const [d2, t2] = value.slice(-2)[0]

        distance += (d - d2) * 2

        currentTargetIndex === 1 ? setTranslate(Math.floor(distance / 50) * 50) :setTranslate2(Math.floor(distance / 50) * 50)

      }

      lastPos = evt.clientY


      evt.stopPropagation()

      evt.stopImmediatePropagation()

      let result = translate() / -50

      queue.clear()

      setIndex(result)

      start = false

    })
  })

  return (
    <div id="wrapper">
      <div class="overlay"  ref={setEl}></div>
      <div class="bar"></div>
      <div class={"content"} style={{ 
        transform: `translateY(${translate()}px)` ,
        "transition-duration": `${duration()}ms`
      }}>
        <div 
          style={{ transform: `translateY(${-translate()}px)` }}
          class="mask">
        </div>
        <p> </p>
        <p> </p>
        <p> </p>

        {
          new Array(100).fill(0).map((item, i) => (
            <p > {i} </p>
          ))
        }
        <p> </p>
        <p> </p>
        <p> </p>
      </div>
      <div class={"content"} style={{ 
        transform: `translateY(${translate2()}px)` ,
        "transition-duration": `${duration2()}ms`
      }}>
        <div 
          style={{ transform: `translateY(${-translate2()}px)` }}
          class="mask">
        </div>
        <p> </p>
        <p> </p>
        <p> </p>

        {
          new Array(100).fill(0).map((item, i) => (
            <p > {i} </p>
          ))
        }
        <p> </p>
        <p> </p>
        <p> </p>
      </div>
    </div>
  )
}

picker({
  columns: [
    {
      text: '浙江',
      value: 'Zhejiang',
      children: [
        {
          text: '杭州',
          value: 'Hangzhou',
          children: [
            { text: '西湖区', value: 'Xihu' },
            { text: '余杭区', value: 'Yuhang' },
          ],
        },
        {
          text: '温州',
          value: 'Wenzhou',
          children: [
            { text: '鹿城区', value: 'Lucheng' },
            { text: '瓯海区', value: 'Ouhai' },
          ],
        },
      ],
    },
    {
      text: '福建',
      value: 'Fujian',
      children: [
        {
          text: '福州',
          value: 'Fuzhou',
          children: [
            { text: '鼓楼区', value: 'Gulou' },
            { text: '台江区', value: 'Taijiang' },
          ],
        },
        {
          text: '厦门',
          value: 'Xiamen',
          children: [
            { text: '思明区', value: 'Siming' },
            { text: '海沧区', value: 'Haicang' },
          ],
        },
      ],
    },
  ]
})