class GetAllStoresUseCase {
  constructor(storeRepository) {
    this.storeRepository = storeRepository;
  }

  async execute() {
    return await this.storeRepository.findAll();
  }
}

module.exports = GetAllStoresUseCase;