const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({

    type: {
        type: String,
        trim: true,
        required: true,
    },
    amount: {
        type: Number,
        trim: true,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    dest: {
        type: String,
    },

}, { timestamps: true })
module.exports = mongoose.model("transaction", transactionSchema);
