const express = require('express');
const UserController = require('../controllers/userController');
const { validateSignup, validateLogin } = require('../utils/validation');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', validateSignup, UserController.signup);
router.post('/login', validateLogin, UserController.login);
router.put('/profile', authMiddleware, UserController.updateProfile);

module.exports = router;