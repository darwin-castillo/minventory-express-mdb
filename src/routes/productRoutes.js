const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Twilio Webhook
router.post('/whatsappWebhook', productController.handleWhatsApp);


// Standard API Endpoints
router.post('/api/products', productController.createProduct);
router.get('/api/products', productController.getAllProducts);

module.exports = router;