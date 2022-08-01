const Account = require('../models/account');
const formidable = require('formidable');

const getAccounts = async (req, res) => {
    const result = await Account.find()
    res.send(result);
}
const createAccout = async (req, res) => {
    const data = req.body
    console.log(req.body);
    const result = await new Account(data).save()
    res.json(result);
}
const getAccById = (req, res) => {
    const id = req.params.accId;
    Account.findById(id)
        .select("_id name phone")
        .then((result) => {
            res.status(200).json({
                result
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "This account does not exist",
                error: err.message,
            });
        });
}
const getBalance = (req, res) => {
    const id = req.params.accId;
    Account.findById(id)
        .select("balance name phone accountNumber")
        .then((result) => {
            res.status(200).json({
                result
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "This account does not exist",
                error: err.message,
            });
        });
}


module.exports = { getAccounts, createAccout, getAccById, getBalance } 