const { Store } = require('../../../domain');

class CreateStoreUseCase {
  constructor(storeRepository) {
    this.storeRepository = storeRepository;
  }

  async execute(data) {
    const store = new Store({ name: data.name, location: data.location });
    return await this.storeRepository.save(store);
  }
}

module.exports = CreateStoreUseCase;