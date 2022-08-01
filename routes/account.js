const accountController = require('../controller/account');
var express = require('express');

const router = express.Router();

router.get('/accounts', accountController.getAccounts);
router.post('/accountss', accountController.createAccout);
router.get('/account/:accId', accountController.getAccById);
router.get('/account/:accId/balance-inquiry', accountController.getBalance);

module.exports = router;