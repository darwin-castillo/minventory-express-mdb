const {
  MongooseProductRepository,
  MongooseStoreRepository,
  MongooseUserRepository,
  GeminiAIAdapter,
  FirebaseImageAdapter,
  BcryptAuthService,
} = require('../../infrastructure');

const {
  CreateProductUseCase,
  GetAllProductsUseCase,
  GetProductByIdUseCase,
  GetProductsByStoreUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
  SmartSearchProductsUseCase,
  CreateStoreUseCase,
  GetAllStoresUseCase,
  GetStoreByIdUseCase,
  UpdateStoreUseCase,
  DeleteStoreUseCase,
  RegisterUserUseCase,
  LoginUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  AskChatbotUseCase,
} = require('../../application').useCases;

function buildDependencies() {
  const productRepository = new MongooseProductRepository();
  const storeRepository = new MongooseStoreRepository();
  const userRepository = new MongooseUserRepository();
  const aiService = new GeminiAIAdapter();
  const imageService = new FirebaseImageAdapter();
  const authService = new BcryptAuthService();

  const smartSearchUseCase = new SmartSearchProductsUseCase(productRepository, aiService);

  return {
    productController: {
      create: new CreateProductUseCase(productRepository, aiService),
      getAll: new GetAllProductsUseCase(productRepository),
      getById: new GetProductByIdUseCase(productRepository),
      getByStore: new GetProductsByStoreUseCase(productRepository),
      update: new UpdateProductUseCase(productRepository, imageService, aiService),
      delete: new DeleteProductUseCase(productRepository),
    },
    storeController: {
      create: new CreateStoreUseCase(storeRepository),
      getAll: new GetAllStoresUseCase(storeRepository),
      getById: new GetStoreByIdUseCase(storeRepository),
      update: new UpdateStoreUseCase(storeRepository),
      delete: new DeleteStoreUseCase(storeRepository),
    },
    userController: {
      register: new RegisterUserUseCase(userRepository, authService),
      login: new LoginUserUseCase(userRepository, authService),
      getAll: new GetAllUsersUseCase(userRepository),
      getById: new GetUserByIdUseCase(userRepository),
      update: new UpdateUserUseCase(userRepository, authService),
    },
    chatController: {
      ask: new AskChatbotUseCase(smartSearchUseCase, aiService),
    },
  };
}

module.exports = { buildDependencies };