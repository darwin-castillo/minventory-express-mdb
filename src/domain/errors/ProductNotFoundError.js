const DomainError = require('./DomainError');

class ProductNotFoundError extends DomainError {
  constructor(id) {
    super(`Producto con id ${id} no encontrado`, 404);
  }
}

module.exports = ProductNotFoundError;
