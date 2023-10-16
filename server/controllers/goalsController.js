const { findGoals } = require('../utils/findGoals');
const { findWallet } = require('../utils/findWallet');

const addNewGoal = async (req, res) => {
  const { uid, name, goal } = req.body;
  const goals = await findGoals(uid, res);

  const duplicate = goals.goals.find((goal) => goal.name === name);
  if (duplicate) return res.sendStatus(409); //Conflict

  goals.goals.push({ uid, name, goal });
  goals.save();

  return res.json({ message: `New goal: ${name} added!` });
};

const deleteGoal = async (req, res) => {
  const { uid, name, amount } = req.body;
  const goals = await findGoals(uid, res);
  const wallet = await findWallet(uid, res);

  goals.goals = [...goals.goals.filter((goal) => goal.name !== name)];
  wallet.balance += amount;

  goals.save();
  wallet.save();

  return res.json({ message: `${name} deleted, ${amount} transferred to balance` });
};

const transferToGoal = async (req, res) => {
  const { uid, amount, name } = req.body;
  const goals = await findGoals(uid, res);
  const wallet = await findWallet(uid, res);

  const currentGoal = goals.goals.find((goal) => goal.name === name);
  const isFinished =
    currentGoal.amount + amount >= currentGoal.goal && currentGoal.amount < currentGoal.goal;
  currentGoal.amount += amount;
  goals.save();
  wallet.balance -= amount;
  wallet.save();

  return res.json({ message: `${amount} transferred to ${name}`, isFinished });
};

const getUserGoals = async (req, res) => {
  const goals = await findGoals(req?.params?.uid, res);

  return res.json(goals.goals);
};

const withdrawFromGoal = async (req, res) => {
  const { uid, name, amount } = req.body;

  const goals = await findGoals(uid, res);
  const wallet = await findWallet(uid, res);

  const currentGoal = goals.goals.find((goal) => goal.name === name);

  currentGoal.amount -= amount;
  wallet.balance += amount;

  wallet.save();
  goals.save();

  return res.json({ message: `Transferred ${amount} to balance!` });
};

module.exports = {
  transferToGoal,
  getUserGoals,
  addNewGoal,
  deleteGoal,
  withdrawFromGoal,
};
