const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, storeController.createStore);
router.get('/', storeController.getAllStores);
router.get('/:id', storeController.getStoreById);
router.put('/:id', protect, storeController.updateStore);
router.delete('/:id', protect, storeController.deleteStore);

module.exports = router;
