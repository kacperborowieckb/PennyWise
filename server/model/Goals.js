const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalsSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  goals: [
    {
      name: { type: String, required: true },
      amount: { type: Number, required: true, default: 0 },
      goal: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Goals', goalsSchema);
