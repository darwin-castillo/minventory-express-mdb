const { InvalidStockError } = require('../errors');

class Stock {
  constructor(value) {
    if (!Number.isInteger(value) || value < 0) {
      throw new InvalidStockError(value);
    }
    this._value = value;
  }

  get value() {
    return this._value;
  }

  isLow(threshold = 3) {
    return this._value < threshold;
  }

  equals(other) {
    return other instanceof Stock && this._value === other.value;
  }

  toJSON() {
    return this._value;
  }
}

module.exports = Stock;
