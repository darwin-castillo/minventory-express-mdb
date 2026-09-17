const { StoreNotFoundError } = require('../../../domain');

class DeleteStoreUseCase {
  constructor(storeRepository) {
    this.storeRepository = storeRepository;
  }

  async execute(id) {
    const existing = await this.storeRepository.findById(id);
    if (!existing) throw new StoreNotFoundError(id);
    return await this.storeRepository.delete(id);
  }
}

module.exports = DeleteStoreUseCase;