const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Decimal128 = require('mongodb').Decimal128;

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
    type: Decimal128,
    default: 0.0,
  },
  expenses: {
    type: Decimal128,
    default: 0.0,
  },
  categoriesExpenses: {
    bills: {
      type: Decimal128,
      default: 0.0,
    },
    personal: {
      type: Decimal128,
      default: 0.0,
    },
    groceries: {
      type: Decimal128,
      default: 0.0,
    },
    travel: {
      type: Decimal128,
      default: 0.0,
    },
    health: {
      type: Decimal128,
      default: 0.0,
    },
  },
  transactions: [
    {
      createdAt: { type: Date, required: true },
      amount: { type: Decimal128, required: true },
      category: { type: String, required: true },
    },
  ],
  plannedTransactions: [
    {
      createdAt: { type: Date, required: true },
      plannedFor: { type: String, required: true },
      amount: { type: Decimal128, required: true },
      category: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Wallet', walletSchema);
