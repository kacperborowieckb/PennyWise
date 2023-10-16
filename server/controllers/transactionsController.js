const { findWallet } = require('../utils/findWallet');

const getTransactions = async (req, res) => {
  const wallet = await findWallet(req?.params?.uid, res);
  const transactions = wallet.transactions.map((transaction) => ({
    createdAt: transaction.createdAt,
    amount: Number(transaction.amount),
    category: transaction.category,
    _id: transaction._id,
  }));

  return res.json(transactions);
};

module.exports = {
  getTransactions,
};
