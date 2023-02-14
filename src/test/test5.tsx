import "./test.less"
import { createSignal, createEffect } from 'solid-js'
import Toast from "../components/toast"
export default () => {

  const [el, setEl] = createSignal<HTMLDivElement>()

  const [translate, setTranslate] = createSignal<number>(0)

  const [currentIndex, setIndex] = createSignal(0)

  let lastPos = 0
  let distance = 0
  let start = false

  createEffect(() => {

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
      evt.stopPropagation()
      evt.stopImmediatePropagation()
      start = true
      lastPos = evt.clientY
    })

    el()?.addEventListener('pointermove', (evt) => {

      evt.stopPropagation()

      evt.stopImmediatePropagation()

      if (!start) return


      distance += (evt.clientY - lastPos) * 2

      if (distance > 0) {
        distance = 200
        start = false
        setTimeout(() => {
          distance = 0
          setTranslate(distance)
        }, 200)
      }

      if (distance < -50 * 99) {
        distance = -50 * 99 - 200
        setTimeout(() => {
          distance = -50 * 99
          setTranslate(distance)
        }, 200)
      }

      setTranslate(Math.floor(distance / 50) * 50)

      lastPos = evt.clientY

    })

    el()?.addEventListener('pointerup', (evt) => {

      evt.stopPropagation()

      evt.stopImmediatePropagation()

      let result = translate() / -50

      setIndex(result)

      start = false

    })
  })

  return (
    <div id="wrapper">
      <div class="content" ref={setEl} style={{ transform: `translateY(${translate()}px)` }}>
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
    </div>
  )
}