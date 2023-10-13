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
      amount: { type: String, required: true, default: 0 },
      goal: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Goals', goalsSchema);
