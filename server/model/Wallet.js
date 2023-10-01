const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    default: '$',
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
      createdAt: { type: Date, required: true },
      amount: { type: Number, required: true },
      category: { type: String, required: true },
    },
  ],
  plannedTransactions: [
    {
      createdAt: { type: Date, required: true },
      plannedFor: { type: String, required: true },
      amount: { type: Number, required: true },
      category: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Wallet', walletSchema);
