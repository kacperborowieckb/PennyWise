const Wallet = require('../model/Wallet');

const findWallet = async (uid, res) => {
  if (!uid) return res.status(400).json({ message: 'User ID required' });

  const wallet = await Wallet.findOne({ uid }).exec();

  if (!wallet) return res.status(400).json({ message: 'Wallent not found' });
  return wallet;
};

module.exports = { findWallet };
