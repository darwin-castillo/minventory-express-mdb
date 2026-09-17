const DomainError = require('./DomainError');

class InvalidPriceError extends DomainError {
  constructor(value) {
    super(`Precio inválido: ${value}. Debe ser un número mayor o igual a 0`, 400);
  }
}

module.exports = InvalidPriceError;
