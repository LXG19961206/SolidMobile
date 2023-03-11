export class FixedDeque<T = unknown> {

  capacity: number

  _value: T []

  get length () {
    return this._value.length
  }


  constructor (capacity: number) {

    this.capacity = capacity

    this._value = []

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