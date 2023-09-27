const Wallet = require('../model/Wallet');

const getBalance = async (req, res) => {
  if (!req?.params?.uid) return res.status(400).json({ message: 'User ID required' });
  const uid = req.params.uid;
  const wallet = await Wallet.findOne({ uid }).exec();

  if (!wallet) return res.status(400).json({ message: 'Wallent not found' });

  return res.json(wallet.balance);
};

const addBalance = async (req, res) => {
  const { uid, amount } = req.body;

  if (!uid) return res.status(400).json({ message: 'User id required' });

  const wallet = await Wallet.findOne({ uid }).exec();

  if (!wallet) return res.status(400).json({ message: 'Wallent not found' });

  wallet.balance += amount;

  await wallet.save();

  res.json(`${amount} added to balance!`);
};

module.exports = {
  getBalance,
  addBalance,
};
