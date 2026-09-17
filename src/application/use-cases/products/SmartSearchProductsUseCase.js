class SmartSearchProductsUseCase {
  constructor(productRepository, aiService) {
    this.productRepository = productRepository;
    this.aiService = aiService;
  }

  async execute(queryText) {
    const queryVector = await this.aiService.generateEmbedding(queryText);
    if (!queryVector) return [];
    return await this.productRepository.smartSearch(queryVector);
  }
}

module.exports = SmartSearchProductsUseCase;