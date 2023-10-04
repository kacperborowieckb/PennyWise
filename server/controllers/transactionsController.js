const { findWallet } = require('../utils/findWallet');

const getTransactions = async (req, res) => {
  const wallet = await findWallet(req?.params?.uid, res);

  return res.json(wallet.transactions);
};

module.exports = {
  getTransactions,
};
