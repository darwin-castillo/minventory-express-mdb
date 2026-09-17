const { ProductNotFoundError } = require('../../../domain');

class GetProductByIdUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new ProductNotFoundError(id);
    }
    return product;
  }
}

module.exports = GetProductByIdUseCase;