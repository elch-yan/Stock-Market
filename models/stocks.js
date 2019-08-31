const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stocks = new Schema({
    name: { type: String, required: true },
    price: {
        amount: { type: Number },
        currency: { type: String }
    },
    owner_id: { type: Schema.ObjectId, ref: 'users' },
    onSell: { type: Boolean },
    description: { type: String }
});

module.exports = mongoose.model('stocks', Stocks);
