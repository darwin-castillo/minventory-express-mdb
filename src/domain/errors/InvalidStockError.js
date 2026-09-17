const DomainError = require('./DomainError');

class InvalidStockError extends DomainError {
  constructor(value) {
    super(`Stock inválido: ${value}. Debe ser un número entero mayor o igual a 0`, 400);
  }
}

module.exports = InvalidStockError;
