class GetProductsByStoreUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(storeId) {
    return await this.productRepository.findByStore(storeId);
  }
}

module.exports = GetProductsByStoreUseCase;