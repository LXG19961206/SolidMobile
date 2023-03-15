import { eq } from 'lodash'
export class FixedDeque<T = unknown> {

  capacity: number

  _value = [] as T []

  get length () {
    return this._value.length
  }

  constructor (capacity: number) {

    this.capacity = capacity

  }


  isEmpty () {

    return !this._value.length

  }

  addFront (item: T) {

    while (this.length >= this.capacity) {

      this.rmBack()

    }


    this._value.unshift(item)
    
  }

  rmFront () {

    this._value.shift()

  }

  rmBack () {

    if (this.isEmpty()) return

    this._value.pop()

  }

  addBack (item: T) {

    while (this.length >= this.capacity) {

      this.rmFront()

    }
    this._value.push(item)
  }

  tail () {

    if (!this.length) return null

    return this._value[this.length - 1]

  }

  head () {

    if (!this.length) return null

    return this._value[0]

  }



}

export class ObservableFixedDeque<T = unknown> extends FixedDeque<T> {

  constructor (
    capacity: number,
    onChange: (newVal: T [], oldVal?: T []) => unknown
  ) {

    super(capacity);

    this._value = new Proxy(this._value, {

      get: (target, key) => {

        const effectMethods = ['push', 'pop', 'shift', 'unshift'] as const

        if (effectMethods.some(item => eq(item, key))) {

          return (...args: unknown []) => {
            
            const oldValue = [...this._value]

            Array.prototype[key as keyof typeof Array.prototype].call(
              this._value, ...args
            )

            onChange(this._value, oldValue)

          }

        } else {

          return target[key as keyof typeof target]

        }


      }

    })

    onChange([])

  }

}