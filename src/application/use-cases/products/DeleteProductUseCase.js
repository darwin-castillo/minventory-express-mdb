const { ProductNotFoundError } = require('../../../domain');

class DeleteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new ProductNotFoundError(id);
    }
    await this.productRepository.delete(id);
  }
}

module.exports = DeleteProductUseCase;