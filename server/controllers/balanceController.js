const { findWallet } = require('../utils/findWallet');

const getBalance = async (req, res) => {
  const wallet = await findWallet(req?.params?.uid, res);

  return res.json(Number(wallet.balance));
};

const addBalance = async (req, res) => {
  const { uid, amount } = req.body;

  const wallet = await findWallet(uid, res);
  const createdAt = new Date();

  wallet.balance = (Number(wallet.balance) + amount).toFixed(2);
  wallet.transactions.push({ category: 'Income', amount, createdAt });

  await wallet.save();

  res.json(`${amount} added to balance!`);
};

module.exports = {
  getBalance,
  addBalance,
};
