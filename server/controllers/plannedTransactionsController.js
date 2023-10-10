const { findWallet } = require('../utils/findWallet');

const getPlannedTransactions = async (req, res) => {
  const wallet = await findWallet(req?.params?.uid, res);

  return res.json(wallet.plannedTransactions);
};

const addPlannedTransaction = async (req, res) => {
  const { uid, amount, plannedFor, category } = req.body;
  const wallet = await findWallet(uid, res);
  const createdAt = new Date();

  wallet.plannedTransactions.push({ amount, plannedFor, category, createdAt });

  await wallet.save();

  res.json(`${category} transaction for ${amount} added to calendar for ${plannedFor}!`);
};

module.exports = {
  getPlannedTransactions,
  addPlannedTransaction,
};
