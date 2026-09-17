const DomainError = require('./DomainError');

class DuplicateEmailError extends DomainError {
  constructor(email) {
    super(`El email ${email} ya está registrado`, 409);
  }
}

module.exports = DuplicateEmailError;
