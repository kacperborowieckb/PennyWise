const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalsSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  goals: [String],
  goalsProperties: [
    {
      name: { type: String, required: true },
      amount: { type: String, required: true },
      goal: { type: String, required: true },
    },
  ],
});
