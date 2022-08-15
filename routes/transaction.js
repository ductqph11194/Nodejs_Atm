const transactionController = require('../controller/transaction');
var express = require('express');

const router = express.Router();

router.get('/transactions', transactionController.getTransaction);
router.get('/get-transaction', transactionController.getTransactionById);
router.post('/withdraw', transactionController.createWithdraw);
router.post('/transfer', transactionController.createTransfer);

module.exports = router;