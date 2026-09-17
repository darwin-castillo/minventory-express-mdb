const DomainError = require('./DomainError');

class InvalidCredentialsError extends DomainError {
  constructor() {
    super('Credenciales inválidas', 401);
  }
}

module.exports = InvalidCredentialsError;
