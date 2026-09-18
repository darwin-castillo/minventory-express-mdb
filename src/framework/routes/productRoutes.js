const { Router } = require('express');
const { protect } = require('../../middleware/authMiddleware');
const makeProductController = require('../controllers/productController');

function createProductRouter(deps) {
  const router = Router();
  const ctrl = makeProductController(deps.productController);

  router.post('/', protect, ctrl.createProduct);
  router.get('/', ctrl.getAllProducts);
  router.get('/:id', ctrl.getProductById);
  router.put('/:id', protect, ctrl.updateProduct);
  router.delete('/:id', protect, ctrl.deleteProduct);

  return router;
}

module.exports = createProductRouter;