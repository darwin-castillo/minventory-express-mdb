const DomainError = require('./DomainError');

class InvalidEmailError extends DomainError {
  constructor(value) {
    super(`Email inválido: ${value}`, 400);
  }
}

module.exports = InvalidEmailError;
