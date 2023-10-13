const { findGoals } = require('../utils/findGoals');

const addNewGoal = async (req, res) => {
  const { uid, name, goal } = req.body;
  const goals = await findGoals(uid, res);

  goals.goals.push({ uid, name, goal });
  goals.save();

  return res.json({ message: `New goal: ${name} added!` });
};

const transferToGoal = async (req, res) => {
  return res.json(200);
};

const getUserGoals = async (req, res) => {
  const goals = await findGoals(req?.params?.uid, res);

  return res.json(goals.goals);
};

module.exports = {
  transferToGoal,
  getUserGoals,
  addNewGoal,
};
