const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

router.post('/whatsapp/message', whatsappController.handleWhatsApp);
router.get('/whatsapp/verify', whatsappController.verifyWebhook);

module.exports = router;
