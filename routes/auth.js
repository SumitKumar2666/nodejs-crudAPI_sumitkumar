const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// to login
router.post('/login', authController.login);

// to register
router.post('/register', authController.register);

module.exports = router;