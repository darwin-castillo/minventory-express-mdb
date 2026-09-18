const { Router } = require('express');
const makeUserController = require('../controllers/userController');

function createUserRouter(deps) {
  const router = Router();
  const ctrl = makeUserController(deps.userController);

  router.get('/', ctrl.getAll);
  router.get('/:id', ctrl.getById);
  router.put('/:id', ctrl.updateUser);
  router.post('/register', ctrl.register);
  router.post('/login', ctrl.login);

  return router;
}

module.exports = createUserRouter;