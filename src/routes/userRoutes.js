const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', userController.updateUser);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;