const { findWallet } = require('../utils/findWallet');

const getBalance = async (req, res) => {
  const wallet = await findWallet(req?.params?.uid, res);

  return res.json(wallet.balance);
};

const addBalance = async (req, res) => {
  const { uid, amount } = req.body;

  const wallet = await findWallet(uid, res);

  wallet.balance += amount;

  await wallet.save();

  res.json(`${amount} added to balance!`);
};

module.exports = {
  getBalance,
  addBalance,
};
