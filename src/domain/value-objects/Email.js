const { InvalidEmailError } = require('../errors');

class Email {
  constructor(value) {
    if (!value || typeof value !== 'string' || !this._isValid(value)) {
      throw new InvalidEmailError(value);
    }
    this._value = value.toLowerCase();
  }

  _isValid(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  get value() {
    return this._value;
  }

  equals(other) {
    return other instanceof Email && this._value === other.value;
  }

  toJSON() {
    return this._value;
  }
}

module.exports = Email;
