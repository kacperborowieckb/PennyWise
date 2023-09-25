const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  expenses: {
    type: Number,
    default: 0,
  },
  categoriesExpenses: {
    bills: {
      type: Number,
      default: 0,
    },
    personal: {
      type: Number,
      default: 0,
    },
    groceries: {
      type: Number,
      default: 0,
    },
    travel: {
      type: Number,
      default: 0,
    },
    health: {
      type: Number,
      default: 0,
    },
  },
  transactions: [
    {
      transactionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      createdAt: { type: Date, required: true },
      value: { type: Number, required: true },
      category: { type: String, required: true },
    },
  ],
  plannedTransactions: [
    {
      transactionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      createdAt: { type: Date, required: true },
      plannedFor: { type: String, required: true },
      value: { type: Number, required: true },
      category: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Wallet', walletSchema);
