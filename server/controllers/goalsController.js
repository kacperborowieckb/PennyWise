const { findGoals } = require('../utils/findGoals');
const Goals = require('../model/Goals');

const transferToGoal = async (req, res) => {
  return res.json(200);
};

const getUserGoals = async (req, res) => {
  const { goals } = await findGoals(req?.params?.uid, res);

  return res.json(goals);
};

module.exports = {
  transferToGoal,
  getUserGoals,
};
