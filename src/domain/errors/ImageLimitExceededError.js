const DomainError = require('./DomainError');

class ImageLimitExceededError extends DomainError {
  constructor() {
    super('Límite de imágenes excedido. Máximo 5 imágenes por producto', 400);
  }
}

module.exports = ImageLimitExceededError;
