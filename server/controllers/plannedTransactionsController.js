const { findWallet } = require('../utils/findWallet');

const getPlannedTransactions = async (req, res) => {
  const wallet = await findWallet(req?.params?.uid, res);

  return res.json(wallet.plannedTransactions);
};

module.exports = {
  getPlannedTransactions,
};
