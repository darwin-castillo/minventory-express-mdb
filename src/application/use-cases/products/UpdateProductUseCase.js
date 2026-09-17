const { ProductNotFoundError } = require('../../../domain');

class UpdateProductUseCase {
  constructor(productRepository, imageService, aiService) {
    this.productRepository = productRepository;
    this.imageService = imageService;
    this.aiService = aiService;
  }

  async execute(id, data) {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new ProductNotFoundError(id);
    }

    if (data.images && data.images.length > 0) {
      const uploadedImages = [];
      let imgIndex = 1;
      for (const image of data.images) {
        const ext = image.split('.').pop();
        const url = await this.imageService.uploadImage(image, `products/${id}/${imgIndex++}.${ext}`);
        uploadedImages.push(url);
      }
      data.images = uploadedImages;
    }

    const updated = await this.productRepository.update(id, data);

    const nameChanged = data.name && data.name !== existing.name;
    const descChanged = data.description !== undefined && data.description !== existing.description;
    if (nameChanged || descChanged) {
      const embeddingText = updated.buildEmbeddingText();
      const embeddingVector = await this.aiService.generateEmbedding(embeddingText);
      if (embeddingVector) {
        return await this.productRepository.update(id, { embeddings: embeddingVector });
      }
    }

    return updated;
  }
}

module.exports = UpdateProductUseCase;