const express = require('express');
const router = express.Router();
const goalsController = require('../../controllers/goalsController');

router.route('/').post(goalsController.transferToGoal);

router.route('/:uid').get(goalsController.getUserGoals);

module.exports = router;
