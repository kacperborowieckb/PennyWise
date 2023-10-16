const { findWallet } = require('../utils/findWallet');

const getExpenses = async (req, res) => {
  const wallet = await findWallet(req?.params?.uid, res);
  let categoriesExpenses = {};
  Object.keys(wallet.categoriesExpenses).map(
    (expense) => (categoriesExpenses[expense] = Number(wallet.categoriesExpenses[expense]))
  );

  return res.json({
    totalExpenses: Number(wallet.expenses),
    expenses: categoriesExpenses,
  });
};

const addExpense = async (req, res) => {
  const { uid, category, amount } = req.body;

  const wallet = await findWallet(uid, res);
  const createdAt = new Date();

  wallet.balance = (Number(wallet.balance) - amount).toFixed(2);
  wallet.expenses = (Number(wallet.expenses) + amount).toFixed(2);
  wallet.categoriesExpenses[category.toLowerCase()] = (
    Number(wallet.categoriesExpenses[category.toLowerCase()]) + amount
  ).toFixed(2);
  wallet.transactions.push({ category, amount, createdAt });

  await wallet.save();

  res.json(`New ${category} transaction added. Amount: ${amount}, At: ${createdAt}`);
};

module.exports = {
  getExpenses,
  addExpense,
};
