const accountController = require('../controller/account');
var express = require('express');
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router();

router.get('/accounts', verifyToken, accountController.getAccounts);
router.post('/accountss', accountController.createAccout);
router.get('/account/', accountController.getAccById);
router.get('/account/balance-inquiry', accountController.getBalance);

module.exports = router;