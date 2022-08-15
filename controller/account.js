const Account = require('../models/account');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Validator } = require('node-input-validator');

const getAccounts = async (req, res) => {
    const result = await Account.find()
    res.send(result);
}

const createAccout = async (req, res) => {
    const data = req.body
    const result = await new Account(data).save()
    res.json(result);
}


const getAccById = (req, res) => {
    const id = req.userId
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
    const id = req.userId
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

// const changePin = async (req, res) => {
//     const id = req.userId
//     const salt = await bcrypt.genSalt(10);
//     const hashpin = await bcrypt.hash(request.body.newPin, salt);
//     const user = await Account.findOne({ pin: request.body.oldPin });
//     const checkpin = await bcrypt.compare(request.body.pin, user.pin);

//     if (!checkpin) return response.status(200).json({ code: 422, message: ' pin is not correct' });
//     console.log(id);
//     const updatePin = await Account.findOneAndUpdate({ pin: id }, { $set: { pin: hashpin } })

//     res.json(id);
// }

const changePin = async (req, res) => {
    try {
        const checkInput = new Validator(req.body, {
            oldPin: 'required',
            newPin: 'required',
            confirmPin: 'required|same:newPin'
        });

        const matched = await checkInput.check();

        if (!matched) {
            return res.status(200).json(checkInput.errors);
        }
        const id = req.userId
        const user = await Account.findOne({ _id: id });
        if (bcrypt.compareSync(req.body.oldPin, user.pin)) {

            let hashPassword = bcrypt.hashSync(req.body.newPin, 10);
            await Account.updateOne({
                _id: user._id
            }, {
                pin: hashPassword
            });

            const token = jwt.sign({ _id: user._id, accNumber: user.accountNumber }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.header('auth-token', token).json({
                code: 200,
                message: 'Pin successfully updated',
                data: user
            });;

        } else {
            return res.status(200).json({
                code: 422,
                message: 'Old Pin does not matched',
            });
        }

    } catch (err) {
        return res.status(200).json({
            code: 422,
            message: err.message,
            data: err
        });
    }

}


module.exports = { getAccounts, createAccout, getAccById, getBalance, changePin } 