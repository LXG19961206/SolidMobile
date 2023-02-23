export class FixedQueue<T = unknown> {

  capacity: number

  _value: T []

  constructor (capacity: number) {

    this.capacity = capacity

    this._value = []

  }

  get isEmpty () {
    return !this._value.length
  }

  push (item: T) {
    if (this._value.length >= this.capacity) {
      this.shift()
    }
    this._value.push(item)
  }

  at (idx: number) {
    return idx >= 0 ? this._value[idx] : this._value.slice(idx)[0]
  }

  clear () {
    this._value.splice(0, this._value.length)
  }

  shift () {
    return this._value.shift()
  }

  value () {
    return this._value
  }

  toString () {
    return this._value.toString()
  }

  tail () {
    return this._value[this._value.length - 1]
  }

  head () {
    return this._value[0]
  }

  get length () {
    return this._value.length
  }

}