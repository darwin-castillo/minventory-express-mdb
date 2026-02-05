const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

router.post('/service/whatsapp', whatsappController.handleWhatsApp);
router.get('/service/whatsapp', whatsappController.verifyWebhook);

module.exports = router;
