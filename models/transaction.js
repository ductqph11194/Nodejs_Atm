const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({

    type: {
        type: String, // 'withdraw', 'transfer'
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

})
module.exports = mongoose.model("transaction", transactionSchema);
