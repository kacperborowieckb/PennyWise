const { findWallet } = require('../utils/findWallet');

const deletePlannedTransaction = async (req, res) => {
  const { uid, ids } = req.body;
  if (ids.length < 0) return res.json(400, { Message: 'Transaction ids required' });
  const wallet = await findWallet(uid, res);
  const newTransactions = wallet.plannedTransactions.filter(
    ({ _id }) => ids.indexOf(_id.toString()) === -1
  );

  wallet.plannedTransactions = [...newTransactions];

  wallet.save();

  return res.json(200);
};

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
  deletePlannedTransaction,
};
