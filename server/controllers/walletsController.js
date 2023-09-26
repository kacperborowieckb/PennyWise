const Wallet = require('../model/Wallet');

const addBalance = async (req, res) => {
  const { _id, amount } = req.body;

  if (!_id) return res.status(400).json({ message: 'User id required' });

  const wallet = await Wallet.findById({ uid: _id }).exec();

  if (!wallet) return res.status(400).json({ message: 'Wallent not found' });

  wallet.balance += amount;

  wallet.save();

  res.json(`${amount} added to balance!`);
};

module.exports = {
  addBalance,
};
