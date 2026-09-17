const DomainError = require('./DomainError');

class StoreNotFoundError extends DomainError {
  constructor(id) {
    super(`Tienda con id ${id} no encontrada`, 404);
  }
}

module.exports = StoreNotFoundError;
