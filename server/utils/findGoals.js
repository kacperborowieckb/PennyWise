const Goals = require('../model/Goals');

const findGoals = async (uid, res) => {
  if (!uid) return res.status(400).json({ message: 'User ID required' });

  const goals = await Goals.findOne({ uid }).exec();

  if (!goals) return res.status(400).json({ message: 'Goals not found' });
  return goals;
};

module.exports = { findGoals };
