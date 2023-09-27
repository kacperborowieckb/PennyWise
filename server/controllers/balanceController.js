const Wallet = require('../model/Wallet');

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
  addBalance,
};
