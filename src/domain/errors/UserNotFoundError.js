const DomainError = require('./DomainError');

class UserNotFoundError extends DomainError {
  constructor(id) {
    super(`Usuario con id ${id} no encontrado`, 404);
  }
}

module.exports = UserNotFoundError;
