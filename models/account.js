const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 11
    },
    balance: {
        type: Number,
        trim: true,
        required: true,
    },
    accountNumber: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    pin: {
        type: Number,
        trim: true,
        required: true,
    }

})
module.exports = mongoose.model("account", accountSchema);
