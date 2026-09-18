const { Router } = require('express');
const makeChatController = require('../controllers/chatController');

function createChatRouter(deps) {
  const router = Router();
  const ctrl = makeChatController(deps.chatController);

  router.post('/', ctrl.chat);

  return router;
}

module.exports = createChatRouter;