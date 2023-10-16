const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Decimal128 = require('mongodb').Decimal128;

const goalsSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  goals: [
    {
      name: { type: String, required: true },
      amount: { type: Decimal128, required: true, default: 0.0 },
      goal: { type: Decimal128, required: true },
    },
  ],
});

module.exports = mongoose.model('Goals', goalsSchema);
