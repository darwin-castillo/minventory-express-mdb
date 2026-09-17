const DomainError = require('./DomainError');
const ProductNotFoundError = require('./ProductNotFoundError');
const StoreNotFoundError = require('./StoreNotFoundError');
const UserNotFoundError = require('./UserNotFoundError');
const DuplicateEmailError = require('./DuplicateEmailError');
const InvalidCredentialsError = require('./InvalidCredentialsError');
const InvalidPriceError = require('./InvalidPriceError');
const InvalidStockError = require('./InvalidStockError');
const InvalidEmailError = require('./InvalidEmailError');
const ImageLimitExceededError = require('./ImageLimitExceededError');

module.exports = {
  DomainError,
  ProductNotFoundError,
  StoreNotFoundError,
  UserNotFoundError,
  DuplicateEmailError,
  InvalidCredentialsError,
  InvalidPriceError,
  InvalidStockError,
  InvalidEmailError,
  ImageLimitExceededError,
};
