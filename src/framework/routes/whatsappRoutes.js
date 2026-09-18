const { Router } = require('express');
const makeWhatsAppController = require('../controllers/whatsappController');

function createWhatsAppRouter() {
  const router = Router();
  const ctrl = makeWhatsAppController();

  router.post('/', ctrl.handleWhatsApp);
  router.get('/', ctrl.verifyWebhook);

  return router;
}

module.exports = createWhatsAppRouter;