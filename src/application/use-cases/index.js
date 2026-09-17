const productUseCases = require('./products');
const storeUseCases = require('./stores');
const userUseCases = require('./users');
const chatUseCases = require('./chat');

module.exports = {
  ...productUseCases,
  ...storeUseCases,
  ...userUseCases,
  ...chatUseCases,
};