const express = require('express');
const router = express.Router();
const authController = require('../controller/authenticate');

router.post('/register', authController.createAccount);

router.post('/login', authController.logIn)

module.exports = router;

