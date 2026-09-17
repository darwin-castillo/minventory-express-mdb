const { InvalidPriceError } = require('../errors');

class Price {
  constructor(value) {
    if (typeof value !== 'number' || value < 0 || isNaN(value)) {
      throw new InvalidPriceError(value);
    }
    this._value = value;
  }

  get value() {
    return this._value;
  }

  equals(other) {
    return other instanceof Price && this._value === other.value;
  }

  toJSON() {
    return this._value;
  }
}

module.exports = Price;
