const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const User = require('../models/account');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (request, response) => {

  const checkaccountNumberExist = await User.findOne({ accountNumber: request.body.accountNumber });

  if (checkaccountNumberExist) return response.status(422).send('accountNumber is exist');

  const salt = await bcrypt.genSalt(10);
  const hashpin = await bcrypt.hash(request.body.pin, salt);

  const user = new User({
    name: request.body.name,
    accountNumber: request.body.accountNumber,
    pin: hashpin,
    balance: 0

  });

  try {
    const newUser = await user.save();
    response.send({ newUser });
  } catch (err) {
    response.status(400).send(err);
  }
});

router.post('/login', async (request, response) => {
  const user = await User.findOne({ accountNumber: request.body.accountNumber });
  if (!user) return response.status(422).send('accountNumber or pin is not correct');
  console.log(user);
  const checkpin = await bcrypt.compare(request.body.pin, user.pin);

  if (!checkpin) return response.status(422).send('accountNumber or pin is not correct');

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
  response.header('auth-token', token).send(token);
})

router.get('/get-users', verifyToken, (request, response) => {
  User.find({}).exec(function (err, users) {
    response.send(users);
  });
});

module.exports = router;

