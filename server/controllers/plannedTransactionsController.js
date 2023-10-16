const { findWallet } = require('../utils/findWallet');

const deletePlannedTransaction = async (req, res) => {
  const { uid, ids } = req.body;
  if (ids.length < 0) return res.json(400, { Message: 'Transaction ids required' });
  const wallet = await findWallet(uid, res);
  wallet.plannedTransactions = wallet.plannedTransactions.filter(
    ({ _id }) => ids.indexOf(_id.toString()) === -1
  );

  wallet.save();

  return res.json(200);
};

const getPlannedTransactions = async (req, res) => {
  const wallet = await findWallet(req?.params?.uid, res);

  const plannedTransactions = wallet.plannedTransactions.map((transaction) => ({
    createdAt: transaction.createdAt,
    plannedFor: transaction.plannedFor,
    amount: Number(transaction.amount),
    category: transaction.category,
    _id: transaction._id,
  }));
  return res.json(plannedTransactions);
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
  deletePlannedTransaction,
};
