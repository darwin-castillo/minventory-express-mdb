const entities = require('./entities');
const errors = require('./errors');
const valueObjects = require('./value-objects');
const repositories = require('./ports/repositories');
const services = require('./ports/services');

module.exports = {
  ...entities,
  ...errors,
  ...valueObjects,
  ...repositories,
  ...services,
};
