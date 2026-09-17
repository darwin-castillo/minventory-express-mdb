const { Product, ProductNotFoundError } = require('../../../domain');

class CreateProductUseCase {
  constructor(productRepository, aiService) {
    this.productRepository = productRepository;
    this.aiService = aiService;
  }

  async execute(data) {
    const product = new Product({
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price,
      cost: data.cost,
      stock: data.stock ?? 0,
      images: data.images || [],
      storeId: data.storeId,
    });

    const saved = await this.productRepository.save(product);

    const embeddingText = saved.buildEmbeddingText();
    const embeddingVector = await this.aiService.generateEmbedding(embeddingText);
    if (embeddingVector) {
      const updated = await this.productRepository.update(saved.id, { embeddings: embeddingVector });
      return updated;
    }

    return saved;
  }
}

module.exports = CreateProductUseCase;