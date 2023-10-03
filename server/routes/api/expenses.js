const express = require('express');
const router = express.Router();
const expenseController = require('../../controllers/expenseController');

router.route('/').post(expenseController.addExpense);

router.route('/:uid').get(expenseController.getExpenses);

module.exports = router;
