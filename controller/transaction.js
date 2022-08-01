const Transaction = require('../models/transaction');
const Account = require('../models/account');

const getTransaction = async (req, res) => {
    const result = await Transaction.find()
    res.send(result);
    console.log(result);
}

const updateTransaction = async (req, res) => {
    const data = req.body
    const result = await new Transaction(data).save()
    res.json(result);
}

const createWithdraw = async (req, res) => {

    // validate
    if (req.body.amount <= 0) {
        return res.status(400).json({
            error: "bạn cần nhập số lớn hơn 0"
        })
    } else {

        const data = { amount: req.body.amount, source: req.body.accountNumber, type: 'withdraw' }
        const result = await new Transaction(data).save()

        // update AccountBalance
        console.log(req.body.accountNumber);
        const updatedBalance = await Account.findOneAndUpdate({ accountNumber: req.body.accountNumber }, {
            $inc: { balance: -req.body.amount },
        });

        res.json(result);
    }
}

const createTransfer = async (req, res) => {

    // validate
    if (req.body.amount <= 0) {
        return res.status(400).json({
            error: "bạn cần nhập số lớn hơn 0"
        })
    } else {

        const data = { amount: req.body.amount, source: req.body.accountNumber, dest: req.body.accountNumberReceiver, type: 'transfer' }
        const result = await new Transaction(data).save()

        // update AccountBalance
        console.log(req.body.accountNumber);
        const updatedBalanceTransfer = await Account.findOneAndUpdate({ accountNumber: req.body.accountNumberReceiver }, {
            $inc: { balance: +req.body.amount },
        });
        const updatedBalance = await Account.findOneAndUpdate({ accountNumber: req.body.accountNumber }, {
            $inc: { balance: -req.body.amount },
        });

        res.json({ result });
    }
}




module.exports = { getTransaction, updateTransaction, createWithdraw, createTransfer } 