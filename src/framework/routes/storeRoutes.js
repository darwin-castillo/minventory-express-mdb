const { Router } = require('express');
const { protect } = require('../../middleware/authMiddleware');
const makeStoreController = require('../controllers/storeController');

function createStoreRouter(deps) {
  const router = Router();
  const ctrl = makeStoreController(deps.storeController);

  router.post('/', protect, ctrl.createStore);
  router.get('/', ctrl.getAllStores);
  router.get('/:id', ctrl.getStoreById);
  router.put('/:id', protect, ctrl.updateStore);
  router.delete('/:id', protect, ctrl.deleteStore);

  return router;
}

module.exports = createStoreRouter;