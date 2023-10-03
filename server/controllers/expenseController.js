const { findWallet } = require('../utils/findWallet');

const getExpenses = async (req, res) => {
  const wallet = await findWallet(req?.params?.uid, res);

  return res.json({ totalExpenses: wallet.expenses, expenses: wallet.categoriesExpenses });
};

const addExpense = async (req, res) => {
  const { uid, category, amount } = req.body;

  const wallet = await findWallet(uid, res);
  const createdAt = new Date();

  wallet.balance -= amount;
  wallet.expenses += amount;
  wallet.categoriesExpenses[category.toLowerCase()] += amount;
  wallet.transactions.push({ category, amount, createdAt });

  await wallet.save();

  res.json(`New ${category} transaction added. Amount: ${amount}, At: ${createdAt}`);
};

module.exports = {
  getExpenses,
  addExpense,
};
