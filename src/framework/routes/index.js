const { Router } = require('express');
const { buildDependencies } = require('../di/container');
const createProductRouter = require('../routes/productRoutes');
const createStoreRouter = require('../routes/storeRoutes');
const createUserRouter = require('../routes/userRoutes');
const createChatRouter = require('../routes/chatRoutes');
const createWhatsAppRouter = require('../routes/whatsappRoutes');

function createAppRouter() {
  const deps = buildDependencies();
  const router = Router();

  router.use('/api/products', createProductRouter(deps));
  router.use('/api/stores', createStoreRouter(deps));
  router.use('/api/users', createUserRouter(deps));
  router.use('/api/chat', createChatRouter(deps));
  router.use('/service/whatsapp', createWhatsAppRouter());

  return router;
}

module.exports = createAppRouter;