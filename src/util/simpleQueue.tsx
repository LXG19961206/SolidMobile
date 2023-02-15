export class SimpleQueue<T = unknown> {

  size: number

  _value: T []

  constructor (size: number) {

    this.size = size

    this._value = []

  }

  get isEmpty () {
    return !this._value.length
  }

  push (item: T) {
    if (this._value.length >= this.size) {
      this.shift()
    }
    this._value.push(item)
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

  getLast () {
    return this._value[this._value.length - 1]
  }

  getFirst () {
    return this._value[0]
  }

}