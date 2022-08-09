
const Account = require('../models/account');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createAccount = async (request, response) => {

    const checkaccountNumberExist = await Account.findOne({ accountNumber: request.body.accountNumber });

    if (checkaccountNumberExist) return response.status(200).send({ code: 422, message: 'accountNumber is exist' });

    const salt = await bcrypt.genSalt(10);
    const hashpin = await bcrypt.hash(request.body.pin, salt);

    const user = new Account({
        name: request.body.name,
        accountNumber: request.body.accountNumber,
        pin: hashpin,
        balance: 0

    });

    try {
        const newUser = await user.save();
        response.json({ code: 200, newUser });
    } catch (err) {
        response.status(400).json(err);
    }
}

const logIn = async (request, response) => {
    const user = await Account.findOne({ accountNumber: request.body.accountNumber });
    if (!user) return response.status(200).json({ code: 422, message: 'accountNumber or pin is not correct' });
    const checkpin = await bcrypt.compare(request.body.pin, user.pin);

    if (!checkpin) return response.status(200).json({ code: 422, message: 'accountNumber or pin is not correct' });

    const token = jwt.sign({ _id: user._id, accNumber: user.accountNumber }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
    response.header('auth-token', token).json({ code: 200, token });;
}

module.exports = { createAccount, logIn }