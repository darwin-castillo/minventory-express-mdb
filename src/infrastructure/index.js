const MongooseProductRepository = require('./repositories/MongooseProductRepository');
const MongooseStoreRepository = require('./repositories/MongooseStoreRepository');
const MongooseUserRepository = require('./repositories/MongooseUserRepository');
const GeminiAIAdapter = require('./services/GeminiAIAdapter');
const FirebaseImageAdapter = require('./services/FirebaseImageAdapter');
const BcryptAuthService = require('./services/BcryptAuthService');

module.exports = {
  MongooseProductRepository,
  MongooseStoreRepository,
  MongooseUserRepository,
  GeminiAIAdapter,
  FirebaseImageAdapter,
  BcryptAuthService,
};